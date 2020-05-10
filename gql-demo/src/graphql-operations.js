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

/*
export const FIND_STOCK_PREMIUM  = gql`
query basicRecord($query: BasicRecordQueryInput!){
  basicRecord(query: $query){
    _id
		companyName
		shortName
  }
}
`;
*/