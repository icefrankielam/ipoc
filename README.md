# IPOC: Insta-Pay On Chain

## a.k.a. Payday loan on chain

InstaPayPool Contract
- Ropsten: https://ropsten.etherscan.io/address/0x74506c5651b4e496b369fa4ebdd9422629a0d838
- Interface:
  - function fund() external payable {}
  - function stablize() public onlyOwner returns(bool success) {}
  - function loan(address \_borrower, uint \_amount) public onlyOwner returns(bool success) {}
  - function repay(address \_borrower, uint \_amount) public onlyOwner {}

### Employee (in DAI ONLY)
- Create account on **Status** (Ropsten)
- Employee can get Insta-Pay for all the salary they already earned with a low fee and low interest
- Employee can loan up to the amount of every paycheck with low fee low interest
- Loan gets paid in **DAI** (TODO: support fiat via **Wyre** integration)
- Term: less than 15 days (pay back next paycheck, payroll period < 15 days in USA)

### Employer (Fiat to DAI)
- **IPOC** handles payroll
- Outstanding loan? Paycheck pays back loan (reserve pool contract), remaining amount goes to employee, otherwise goes to employee as usual (employee = employee Status account)
- *(Can work without payroll integration, integration assumed in this hackathon)*

### Pool (invest in ETH ONLY, will convert to DAI)
- Initial reserve pool provided by **IPOC** investors in **ETH** stored in Smart Contract (Solidity)
- ETH in pool will be converted to DAI via `stablize()` call
- Threshold: raise fixed amount (e.g. 50% pool size) via loan when balance is below threshold (50%)
- Submit debt order when below threshold (handled by server), loan amount in ETH goes straight to Smart Contract
- Handles loan repayment on loan due day (NOT implemented)
- Paycheck loan payback goes directly to reserve pool smart contract (NOT implemented)

### Investors (in ETH ONLY)
- Fund loan orders submitted to relay (via Dharma) (Dharma portion NOT implemented)

### Pool Investment
- Pool money can be invested to earn interest? (NOT implemented)
