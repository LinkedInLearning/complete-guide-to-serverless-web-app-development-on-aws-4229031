/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type ModelFeatureConditionInput = {
  and?: Array< ModelFeatureConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  endTime?: ModelStringInput | null,
  not?: ModelFeatureConditionInput | null,
  or?: Array< ModelFeatureConditionInput | null > | null,
  owner?: ModelStringInput | null,
  status?: ModelFeatureStatusInput | null,
  text?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  voteCount?: ModelIntInput | null,
};

export type ModelStringInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}


export type ModelSizeInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelFeatureStatusInput = {
  eq?: FeatureStatus | null,
  ne?: FeatureStatus | null,
};

export enum FeatureStatus {
  CLOSED = "CLOSED",
  OPEN = "OPEN",
}


export type ModelIntInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type CreateFeatureInput = {
  createdAt?: string | null,
  endTime: string,
  id?: string | null,
  owner: string,
  status: FeatureStatus,
  text: string,
  voteCount?: number | null,
};

export type DeleteFeatureInput = {
  id: string,
};

export type UpdateFeatureInput = {
  createdAt?: string | null,
  endTime?: string | null,
  id: string,
  owner?: string | null,
  status?: FeatureStatus | null,
  text?: string | null,
  voteCount?: number | null,
};

export type ModelFeatureFilterInput = {
  and?: Array< ModelFeatureFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  endTime?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelFeatureFilterInput | null,
  or?: Array< ModelFeatureFilterInput | null > | null,
  owner?: ModelStringInput | null,
  status?: ModelFeatureStatusInput | null,
  text?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  voteCount?: ModelIntInput | null,
};

export type ModelIDInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export type ModelSubscriptionFeatureFilterInput = {
  and?: Array< ModelSubscriptionFeatureFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  endTime?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionFeatureFilterInput | null > | null,
  owner?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  text?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  voteCount?: ModelSubscriptionIntInput | null,
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  in?: Array< number | null > | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
  notIn?: Array< number | null > | null,
};

export type CreateFeatureMutationVariables = {
  condition?: ModelFeatureConditionInput | null,
  input: CreateFeatureInput,
};

export type CreateFeatureMutation = {
  createFeature:  {
    __typename: "Feature",
    createdAt: string,
    endTime: string,
    id: string,
    owner: string,
    status: FeatureStatus,
    text: string,
    updatedAt: string,
    voteCount: number | null,
  } | null,
};

export type DeleteFeatureMutationVariables = {
  condition?: ModelFeatureConditionInput | null,
  input: DeleteFeatureInput,
};

export type DeleteFeatureMutation = {
  deleteFeature:  {
    __typename: "Feature",
    createdAt: string,
    endTime: string,
    id: string,
    owner: string,
    status: FeatureStatus,
    text: string,
    updatedAt: string,
    voteCount: number | null,
  } | null,
};

export type SendFeatureMutationVariables = {
  email?: string | null,
  id: string,
  text?: string | null,
  voteCount?: number | null,
};

export type SendFeatureMutation = {
  sendFeature: boolean | null,
};

export type UpdateFeatureMutationVariables = {
  condition?: ModelFeatureConditionInput | null,
  input: UpdateFeatureInput,
};

export type UpdateFeatureMutation = {
  updateFeature:  {
    __typename: "Feature",
    createdAt: string,
    endTime: string,
    id: string,
    owner: string,
    status: FeatureStatus,
    text: string,
    updatedAt: string,
    voteCount: number | null,
  } | null,
};

export type GetFeatureQueryVariables = {
  id: string,
};

export type GetFeatureQuery = {
  getFeature:  {
    __typename: "Feature",
    createdAt: string,
    endTime: string,
    id: string,
    owner: string,
    status: FeatureStatus,
    text: string,
    updatedAt: string,
    voteCount: number | null,
  } | null,
};

export type ListFeaturesQueryVariables = {
  filter?: ModelFeatureFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFeaturesQuery = {
  listFeatures:  {
    __typename: "ModelFeatureConnection",
    items:  Array< {
      __typename: "Feature",
      createdAt: string,
      endTime: string,
      id: string,
      owner: string,
      status: FeatureStatus,
      text: string,
      updatedAt: string,
      voteCount: number | null,
    } | null >,
    nextToken: string | null,
  } | null,
};

export type OnCreateFeatureSubscriptionVariables = {
  filter?: ModelSubscriptionFeatureFilterInput | null,
};

export type OnCreateFeatureSubscription = {
  onCreateFeature:  {
    __typename: "Feature",
    createdAt: string,
    endTime: string,
    id: string,
    owner: string,
    status: FeatureStatus,
    text: string,
    updatedAt: string,
    voteCount: number | null,
  } | null,
};

export type OnDeleteFeatureSubscriptionVariables = {
  filter?: ModelSubscriptionFeatureFilterInput | null,
};

export type OnDeleteFeatureSubscription = {
  onDeleteFeature:  {
    __typename: "Feature",
    createdAt: string,
    endTime: string,
    id: string,
    owner: string,
    status: FeatureStatus,
    text: string,
    updatedAt: string,
    voteCount: number | null,
  } | null,
};

export type OnUpdateFeatureSubscriptionVariables = {
  filter?: ModelSubscriptionFeatureFilterInput | null,
};

export type OnUpdateFeatureSubscription = {
  onUpdateFeature:  {
    __typename: "Feature",
    createdAt: string,
    endTime: string,
    id: string,
    owner: string,
    status: FeatureStatus,
    text: string,
    updatedAt: string,
    voteCount: number | null,
  } | null,
};
