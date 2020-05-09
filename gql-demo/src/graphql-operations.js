import gql from "graphql-tag";

export const FIND_STOCK  = gql`
query basicRecord($query: BasicRecordQueryInput!){
  basicRecord(query: $query){
    _id
		companyName
		shortName
  }
}
`;
