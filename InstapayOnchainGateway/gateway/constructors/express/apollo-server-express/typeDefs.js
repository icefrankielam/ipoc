module.exports = `
  scalar JSON
  
  directive @AuthorizedUser on QUERY | MUTATION | FIELD_DEFINITION

  enum Role {
    ADMIN
    EMPLOYER
    USER
    UNKNOWN
  }

  type TokenData {
    accessToken: String!
    refreshToken: String
  }

  type EthTransaction {
    nonce: String
    gasPrice: String
    gas: String
    to: String
    value: String
    input: String
    v: String
    r: String
    s: String
    hash: String
  }
  type EthSignTransactionResult {
    raw: String
    tx: EthTransaction
  }

  type EthTransactionResponse {  
    blockHash: String
    blockNumber: Int
    contractAddress: String
    cumulativeGasUsed: Int
    from: String
    gasUsed: Int
    logs: [String]
    logsBloom: String
    status: String
    to: String
    transactionHash: String
    transactionIndex: Int
  }

  type RegisterResponse {
    user: User
    tokenData: TokenData
  }

  type LoginResponse {
    user: User
    tokenData: TokenData
  }

  type User {
    id: ID!
    employerId: Int
    userType: String
    wallet: String
    firstName: String
    lastName: String
    email: String
    wagesPerDay: Int
    balance: Float
  }

  type Employer {
    id: ID!
    name: String
    email: String
    employerCode: String
    phone: Int
    zipcode: Int
  }

  type LinkEmployeeToEmployerRequest {
    id: ID!
    employerId: Int
    userId: Int
    status: String
  }

  # The "Query" type is the root of all GraphQL queries.
  type Query {
    me(token: String): User @AuthorizedUser
    myEmployer: Employer @AuthorizedUser
    myBalances: [User] @AuthorizedUser
    employers: [Employer] @AuthorizedUser
    linkEmployeeToEmployerRequests: [LinkEmployeeToEmployerRequest] @AuthorizedUser
    employerLinkedUsers(employerId: Int): [User] @AuthorizedUser
    myLinkEmployerRequest: LinkEmployeeToEmployerRequest @AuthorizedUser
  }

  type Mutation {
    register(
      userType: String,
      email: String,
      password: String,
      firstName: String,
      lastName: String,
      phone: String,
      employerId: Int,
      employerName: String,
      wallet: String,
    ): RegisterResponse

    login(
      identifier: String!,
      password: String!,
    ): LoginResponse

    logout: Boolean

    createInstapay: EthTransactionResponse @AuthorizedUser
    repay(userId: Int): EthTransactionResponse @AuthorizedUser

    updateUser(employerId: Int, wallet: String, wagesPerDay: Int): User @AuthorizedUser
    createLinkEmployeeToEmployerRequest(employerId: Int): LinkEmployeeToEmployerRequest @AuthorizedUser
    updateLinkEmployeeToEmployerRequest(linkEmployeeRequestId: Int, status: String): LinkEmployeeToEmployerRequest @AuthorizedUser
  }
`