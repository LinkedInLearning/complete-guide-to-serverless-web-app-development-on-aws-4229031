import { AmplifyGraphqlApi, AmplifyGraphqlDefinition, FieldLogLevel, RetentionDays } from '@aws-amplify/graphql-api-construct';
import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Role } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import path = require('path');


interface AppSyncStackProps extends StackProps {
    readonly identityPoolId: string,
    readonly authenticatedRoleArn: string,
    readonly unauthenticatedRoleArn: string 
}

export class AppSyncStack extends Stack {
    public readonly appSyncURL: CfnOutput;

    constructor(scope: Construct, id: string, props: AppSyncStackProps) {
        super(scope, id, props);

        const authenticatedRole = Role.fromRoleArn(this, 'ImportedAuthenticatedRole', props.authenticatedRoleArn);
        const unauthenticatedRole = Role.fromRoleArn(this, 'ImportedUnauthenticatedRole', props.unauthenticatedRoleArn);


        // Creates GraphQL API
        const api = new AmplifyGraphqlApi(this, 'AppSyncAPIVotingAppWebApp01', {
            apiName: 'voting-api',
            
            definition: AmplifyGraphqlDefinition.fromFiles(
                path.join(__dirname, 'schema/schema.graphql')
            ),

            authorizationModes: {
                defaultAuthorizationMode: 'AWS_IAM',

                identityPoolConfig: {
                    identityPoolId: props.identityPoolId,
                    authenticatedUserRole: authenticatedRole,
                    unauthenticatedUserRole: unauthenticatedRole
                }
            },

            logging: {
                fieldLogLevel: FieldLogLevel.ALL,
                excludeVerboseContent: false,
                retention: RetentionDays.ONE_DAY
            } 
        })

        this.appSyncURL = new CfnOutput(this, "GraphQLAPIURLVotingAppWebApp", {
            value: api.graphqlUrl
        });
    }
}