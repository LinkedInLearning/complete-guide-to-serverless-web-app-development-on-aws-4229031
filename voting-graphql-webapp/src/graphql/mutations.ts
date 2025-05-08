// tslint:disable
// this is an auto generated file. This will be overwritten

export const createFeature = /* GraphQL */ `
  mutation CreateFeature(
    $condition: ModelFeatureConditionInput
    $input: CreateFeatureInput!
  ) {
    createFeature(condition: $condition, input: $input) {
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
export const deleteFeature = /* GraphQL */ `
  mutation DeleteFeature(
    $condition: ModelFeatureConditionInput
    $input: DeleteFeatureInput!
  ) {
    deleteFeature(condition: $condition, input: $input) {
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
export const sendFeature = /* GraphQL */ `
  mutation SendFeature(
    $email: String
    $id: ID!
    $text: String
    $voteCount: Int
  ) {
    sendFeature(email: $email, id: $id, text: $text, voteCount: $voteCount)
  }
`;
export const updateFeature = /* GraphQL */ `
  mutation UpdateFeature(
    $condition: ModelFeatureConditionInput
    $input: UpdateFeatureInput!
  ) {
    updateFeature(condition: $condition, input: $input) {
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
