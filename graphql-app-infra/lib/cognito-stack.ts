import * as cdk from 'aws-cdk-lib';
import { CfnOutput } from 'aws-cdk-lib';
import { UserPool, UserPoolClient } from 'aws-cdk-lib/aws-cognito';
import { IdentityPool, UserPoolAuthenticationProvider } from 'aws-cdk-lib/aws-cognito-identitypool';
import { Effect, PolicyStatement, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';
import path = require('path');

export class CognitoStack extends cdk.Stack {
  public readonly userPoolArn: CfnOutput;
	public readonly userPoolId: CfnOutput;
	public readonly userPoolClientId: CfnOutput;
	public readonly identityPoolId: CfnOutput;
	public readonly authenticatedRoleArn: CfnOutput;
	public readonly unauthenticatedRoleArn: CfnOutput;
	public readonly snsTopicArn: CfnOutput;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

	// Create a SNS topic
	const snsTopic = new Topic(this, 'SNSTopicVotingWebApp', {
		displayName: 'VotingWebAppTopic',
	});

	const postConfirmationLambda = new NodejsFunction(this, 'PostConfirmationLambdaVotingWebApp', {
		functionName: 'PostConfirmationLambdaVotingWebApp',
		entry: path.join(__dirname, 'functions/postConfirmation.ts'),
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

	// Add SNS permissions to the Lambda function
	postConfirmationLambda.addToRolePolicy(new PolicyStatement({
		effect: Effect.ALLOW,
		actions: ['sns:Subscribe'],
		resources: [snsTopic.topicArn] 
  	}));

    //Create user pool
    const userPool = new UserPool(this, 'UserPoolVotingAppWebApp', {
      userPoolName: 'UserPoolVotingAppWebApp',
      selfSignUpEnabled: true, // Allow users to sign up
      autoVerify: { email: true }, // Verify email addresses by sending a verification code
      signInAliases: { email: true }, // Set email as an alias
	  lambdaTriggers: {
		postConfirmation: postConfirmationLambda
	  }
    });

	postConfirmationLambda.addPermission('PostConfirmationPermission', {
		principal: new ServicePrincipal('cognito-idp.amazonaws.com'),
		sourceArn: userPool.userPoolArn,
	});

    //Create User Pool Client
	const userPoolClient = new UserPoolClient(
		this,
		'UserPoolClientVotingWebApp',
		{
			userPool,
			generateSecret: false, // Don't need to generate secret for web app running on browsers
		}
	);

  // Create an Identity Pool
	const identityPool = new IdentityPool(this, 'IdentityPoolTodoWebApp', {
		allowUnauthenticatedIdentities: true,
		authenticationProviders: {
			userPools: [
				new UserPoolAuthenticationProvider({ 
					userPool: userPool,
					userPoolClient: userPoolClient,
				 })
			 ],
		}
	})

  this.userPoolArn = new CfnOutput(this, 'CFUserPoolARNVotingWebApp', {
		value: userPool.userPoolArn,
	});

	this.userPoolId = new CfnOutput(this, 'CFUserPoolIDVotingWebApp', {
		value: userPool.userPoolId,
	});

	this.userPoolClientId = new CfnOutput(this, 'CFUserPoolClientIDVotingWebApp', {
		value: userPoolClient.userPoolClientId,
	});

	this.identityPoolId = new CfnOutput(this, 'CFIdentityPoolARNVotingWebApp', {
		value: identityPool.identityPoolId
	});

	this.authenticatedRoleArn = new CfnOutput(this,'CFAuthenticatedRoleVotingWebApp',{
		value: identityPool.authenticatedRole.roleArn
	});

	this.unauthenticatedRoleArn = new CfnOutput(this,'CFUnauthenticatedRoleVotingWebApp',{
		value: identityPool.unauthenticatedRole.roleArn,
	});	

	this.snsTopicArn = new CfnOutput(this, 'CFSNSTopicARNVotingWebApp', {
		value: snsTopic.topicArn
	});
  }
}
