#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CognitoStack } from '../lib/cognito-stack';
import { AmplifyHostingStack } from '../lib/amplify-stack';
import { AppSyncStack } from '../lib/appsync-stack';

const app = new cdk.App();

const cognitoStack = new CognitoStack(app, 'VotingWebAppCognitoStack', {});

const appsyncStack = new AppSyncStack(app, 'VotingWebAppAppSyncStack', {
    identityPoolId: cognitoStack.identityPoolId.value,
    authenticatedRoleArn: cognitoStack.authenticatedRoleArn.value,
    unauthenticatedRoleArn: cognitoStack.unauthenticatedRoleArn.value
});

const amplifyStack = new AmplifyHostingStack(app, 'VotingWebAppAmplifyStack', {
    userPoolId: cognitoStack.userPoolId.value,
    userPoolClientId: cognitoStack.userPoolClientId.value,
    identityPoolId: cognitoStack.identityPoolId.value,
    appsyncURL: appsyncStack.appSyncURL.value
})