pragma solidity ^0.4.25;

import "./_Ownable.sol";
import "./KyberNetworkProxy.sol";


/// @title InstaPay On Chain Reserve Pool Contract
/// @dev 1) Fund contract with ETH, convert everything to DAI. Borrow and repay in DAI.
///      2) Faciliate reserve pool functions: transfer in/out, threshold warning
///         and loan repay.
///      3) Transactions should be tracked on chain. Due to lack of daemon
///         support in this version, it is tracked by mapping for now.
///      TODO: remove mapping when daemon is implemented
contract InstaPayPool is Ownable {
    /* Ropsten */
    ///  Kyber Network Setup
    // KyberNetworkProxy public proxy = KyberNetworkProxy(0x818E6FECD516Ecc3849DAf6845e3EC868087B755);
    // ERC20 DAI = ERC20(0xaD6D458402F60fD3Bd25163575031ACDce07538D);
    // ERC20 ETH = ERC20(0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE); // Dummy ETH token address for Kyber

    /* MAIN NET */
    ///  Kyber Network Setup
    KyberNetworkProxy public proxy = KyberNetworkProxy(0x818E6FECD516Ecc3849DAf6845e3EC868087B755);
    ERC20 DAI = ERC20(0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359);
    ERC20 ETH = ERC20(0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE); // Dummy ETH token address for Kyber

    uint public DECIMALS = 18;                              // Both DAI & ETH uses 18 decimals
    uint public MAX_DAI_AMOUNT = 100000 * 10 ** DECIMALS;   // Maximum amount of DAI from ETH
    uint public OUTSTANDING_LOAN_AMOUNT = 0;                // in DAI
    uint public THRESHOLD = 10 * 10 ** DECIMALS;            // 10 DAI
    uint public RELOAD_AMOUNT = 5 * 10 ** DECIMALS;         //  5 DAI
    bool public BELOW_THRESHOLD = false;                    // initiate loan order if below
    bool public UNDER_FUNDED = false;                       // pool < outstanding loans

    mapping(address => uint) public balances;

    event logThresholdUpdated(uint _oldThreshold, uint _threshold);
    event logReloadAmountUpdated(uint _oldAmount, uint _amount);

    event warnBelowThreshold(uint _threshold, uint _balance);
    event warnUnderFunded(uint _loanBalance, uint _balance);

    event logLoanFulfilled(address _borrower, uint _amount);
    event logLoanFailed(address _borrower, uint _amount);
    event logLoanRepaid(address _borrower, uint _amount);

    event logSwapped(address _src, uint _srcAmount, address _dest, uint _destAmount);
    event logSwapFailed(address _src, uint _srcAmount, address _dest);

    event logFundReceived(address _sender, uint _amount);

    // @dev fall back function
    function () external payable {
        revert();
    }

    // @dev accept ETH funding
    function fund() external payable {
        emit logFundReceived(msg.sender, msg.value);
    }

    // @dev Convert all ETH to DAI
    function stabilize() public onlyOwner returns(bool success) {
        uint srcQty = address(this).balance;    // Convert all ETH to DAI
        require(
            srcQty > 0,
            "Nothing to stabilize"
        );
        uint maxDestAmount = MAX_DAI_AMOUNT;
        uint minConversionRate;
        uint newTokenCount;
        address walletId = address(0);  // not using this param
        (minConversionRate,) = proxy.getExpectedRate(ETH, DAI, srcQty);
        newTokenCount = proxy.trade.value(srcQty)(
            ETH,
            srcQty,
            DAI,
            address(this),
            maxDestAmount,
            minConversionRate,
            walletId
        );
        if (newTokenCount > 0) {
            _checkThreshold();
            _checkLoanBalance();
            emit logSwapped(ETH, srcQty, DAI, newTokenCount);
            success = true;
        } else {
            emit logSwapFailed(ETH, srcQty, DAI);
        }
    }

    // @dev Transfer _amount to _borrower wallet, update mapping the loan amount
    // @param _borrower wallet address of the borrower
    // @param _amount in DAI (USD), with 18 decimals
    function loan(address _borrower, uint _amount) public onlyOwner returns(bool success) {
        require(
            _amount > 0 && _amount <= DAI.balanceOf(address(this)),
            "Invalid amount."
        );
        success = DAI.transfer(_borrower, _amount);

        if (success) {
            // Bookkeeping
            OUTSTANDING_LOAN_AMOUNT += _amount;
            balances[_borrower] = balances[_borrower] + _amount;
            _checkThreshold();
            _checkLoanBalance();
            emit logLoanFulfilled(_borrower, _amount);
        } else {
            emit logLoanFailed(_borrower, _amount);
        }
    }

    // @dev Need to call DAI.transfer, upon success, trigger a call to this function
    // @param _borrower wallet address of the borrower
    // @param _amount in DAI (USD), with 18 decimals
    function repay(address _borrower, uint _amount) public onlyOwner {
        require(
            _amount > 0 && _amount <= balances[_borrower],
            "Invalid amount"
        );
        OUTSTANDING_LOAN_AMOUNT -= _amount;
        balances[_borrower] = balances[_borrower] - _amount;
        _checkThreshold();
        _checkLoanBalance();
    }

    /* Internal functions: Fund status checks */
    function _checkThreshold() internal {
        if (DAI.balanceOf(address(this)) < THRESHOLD) {
            BELOW_THRESHOLD = true;
            emit warnBelowThreshold(THRESHOLD, address(this).balance);
        } else {
            BELOW_THRESHOLD = false;
        }
    }

    function _checkLoanBalance() internal {
        if (DAI.balanceOf(address(this)) < OUTSTANDING_LOAN_AMOUNT) {
            UNDER_FUNDED = true;
            emit warnUnderFunded(OUTSTANDING_LOAN_AMOUNT, DAI.balanceOf(address(this)));
        } else {
            UNDER_FUNDED = false;
        }
    }

    /* Admin functions below */
    function updateThreshold(uint _threshold) external onlyOwner {
        uint oldThreshold = THRESHOLD;
        THRESHOLD = _threshold;
        emit logThresholdUpdated(oldThreshold, _threshold);
    }

    function updateReloadAmount(uint _amount) external onlyOwner {
        uint oldAmount = RELOAD_AMOUNT;
        RELOAD_AMOUNT = _amount;
        emit logReloadAmountUpdated(oldAmount, _amount);
    }

    /* Withdraw ETH balance */
    function withdraw() external onlyOwner {
        owner.transfer(address(this).balance);
    }

    /* Withdraw DAI balance */
    function withdrawDai() external onlyOwner returns(bool success) {
        success = DAI.transfer(owner, DAI.balanceOf(address(this)));
    }
}
