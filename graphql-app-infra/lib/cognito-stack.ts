import * as cdk from 'aws-cdk-lib';
import { CfnOutput } from 'aws-cdk-lib';
import { UserPool, UserPoolClient } from 'aws-cdk-lib/aws-cognito';
import { IdentityPool, UserPoolAuthenticationProvider } from 'aws-cdk-lib/aws-cognito-identitypool';
import { Construct } from 'constructs';

export class CognitoStack extends cdk.Stack {
  public readonly userPoolArn: CfnOutput;
	public readonly userPoolId: CfnOutput;
	public readonly userPoolClientId: CfnOutput;
	public readonly identityPoolId: CfnOutput;
	public readonly authenticatedRoleArn: CfnOutput;
	public readonly unauthenticatedRoleArn: CfnOutput;
  
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //Create user pool
    const userPool = new UserPool(this, 'UserPoolVotingAppWebApp', {
      userPoolName: 'UserPoolVotingAppWebApp',
      selfSignUpEnabled: true, // Allow users to sign up
      autoVerify: { email: true }, // Verify email addresses by sending a verification code
      signInAliases: { email: true }, // Set email as an alias
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
  }
}
