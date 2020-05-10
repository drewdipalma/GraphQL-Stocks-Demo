import gql from "graphql-tag";

export const FIND_STOCK  = gql`
query RecordWithPrice($query: RecordWithPriceInputType!){
  RecordWithPrice(input: $query){
    _id
    companyName
    shortName
    industry
    description
    website
    ceo
    exchange
    marketCap
    sector
    industryTagA
    industryTagB
    industryTagC
    latestPrice
    isPremium
  }
}
`;

export const UPDATE_USER  = gql`
mutation updateOneUser($query: UserQueryInput, $set: UserUpdateInput!){
  updateOneUser(query: $query, set: $set) {
    _id
    createdTime
    email
    premiumUser
    savedStocks
  }
}
`;