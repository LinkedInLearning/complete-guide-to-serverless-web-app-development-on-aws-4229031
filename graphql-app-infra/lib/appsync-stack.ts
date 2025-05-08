import { AmplifyGraphqlApi, AmplifyGraphqlDefinition, FieldLogLevel, RetentionDays } from '@aws-amplify/graphql-api-construct';
import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Effect, PolicyStatement, Role } from 'aws-cdk-lib/aws-iam';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';
import path = require('path');


interface AppSyncStackProps extends StackProps {
    readonly identityPoolId: string,
    readonly authenticatedRoleArn: string,
    readonly unauthenticatedRoleArn: string,
    readonly snsTopicArn: string
}

export class AppSyncStack extends Stack {
    public readonly appSyncURL: CfnOutput;

    constructor(scope: Construct, id: string, props: AppSyncStackProps) {
        super(scope, id, props);

        const snsTopic = Topic.fromTopicArn(this, 'ImportedSNSTopicVotingWebApp', props.snsTopicArn);

        const sendFeatureFunction = new NodejsFunction(this, 'SendFeatureLambdaVotingWebApp', {
            functionName: 'SendFeatureLambdaVotingWebApp', // MAKE SURE THIS MATCHES THE @function's "name" PARAMETER
            entry: path.join(__dirname, 'functions/sendFeature.ts'), // Use entry instead of code
            runtime: Runtime.NODEJS_20_X,

            environment: {
                SNS_TOPIC_ARN: snsTopic.topicArn
            },
            
            // Bundle configuration
            bundling: {
                minify: true,         // Minify code
                sourceMap: true,      // Include source maps
                externalModules: [    // Modules that should be excluded from bundling
                    'aws-sdk',
                ],
            },
        });

        // Add SNS publish permissions
        sendFeatureFunction.addToRolePolicy(new PolicyStatement({
            effect: Effect.ALLOW,
            actions: ['sns:Publish'],
            resources: [snsTopic.topicArn]
        }));



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