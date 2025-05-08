// tslint:disable
// this is an auto generated file. This will be overwritten

export const getFeature = /* GraphQL */ `
  query GetFeature($id: ID!) {
    getFeature(id: $id) {
      createdAt
      endTime
      id
      owner
      status
      text
      updatedAt
      voteCount
    }
  }
`;
export const listFeatures = /* GraphQL */ `
  query ListFeatures(
    $filter: ModelFeatureFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFeatures(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        endTime
        id
        owner
        status
        text
        updatedAt
        voteCount
      }
      nextToken
    }
  }
`;
