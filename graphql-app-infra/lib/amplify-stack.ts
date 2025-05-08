import { Stack, StackProps, CfnOutput, SecretValue } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
	App,
	GitHubSourceCodeProvider,
	RedirectStatus,
} from '@aws-cdk/aws-amplify-alpha';

interface AmplifyStackProps extends StackProps {
	readonly userPoolId: string;
	readonly userPoolClientId: string;
	readonly identityPoolId: string;
    readonly appsyncURL: string;
}

export class AmplifyHostingStack extends Stack {
    constructor(scope: Construct, id: string, props: AmplifyStackProps) {
		super(scope, id, props);

        // Create the Amplify application
		const amplifyApp = new App(this, `AmplifyAppVotingWebApp`, {
			sourceCodeProvider: new GitHubSourceCodeProvider({
				owner: 'mavi888',
                repository: 'linkedin-voting-app',
                oauthToken: SecretValue.secretsManager('github-token'),
            }),
            environmentVariables: {
                REGION: this.region,
                IS_SERVER_MOCK: 'true',
                IS_AUTH_MOCK: 'false',
                IDENTITY_POOL_ID: props.identityPoolId,
                USER_POOL_ID: props.userPoolId,
                USER_POOL_CLIENT_ID: props.userPoolClientId,
                SERVER_URL: props.appsyncURL
            }
        });

        // Add a branch
        const main = amplifyApp.addBranch('main', {
            autoBuild: true,
            stage: 'PRODUCTION'
        });	

        amplifyApp.addCustomRule({
			source:
				'</^[^.]+$|\\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json|webp)$)([^.]+$)/>',
			target: '/index.html',
			status: RedirectStatus.REWRITE,
		});

        new CfnOutput(this, 'AmplifyAppName', {
			value: amplifyApp.appName,
		});

		new CfnOutput(this, 'AmplifyURL', {
			value: `https://main.${amplifyApp.defaultDomain}`,
		});
    }
}