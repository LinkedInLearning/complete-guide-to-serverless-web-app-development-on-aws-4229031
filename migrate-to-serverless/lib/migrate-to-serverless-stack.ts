import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Function, Code, Runtime, FunctionUrlAuthType, LayerVersion, DockerImageFunction, DockerImageCode, Architecture } from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';

export class MigrateToServerlessStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Lambda Adapter Layer
    const layerLambdaAdapter = LayerVersion.fromLayerVersionArn(this, 'LambdaAdapterLayerX86', `arn:aws:lambda:${this.region}:753240598075:layer:LambdaAdapterLayerX86:25`);

    // Lambda function
    const lambdaFunction = new Function(this, 'LambdaFunctionMigratingToLambda', {
      runtime: Runtime.NODEJS_22_X,
      handler: 'run.sh',
      code: Code.fromAsset(path.join(__dirname, 'express-app-demo')),
      layers: [layerLambdaAdapter],
      environment: {
        AWS_LAMBDA_EXEC_WRAPPER: '/opt/bootstrap',
        RUST_LOG: 'info'
      },
      memorySize: 1024,
      timeout: cdk.Duration.minutes(5) 
    });

    // Lambda function url
    const lambdaFunctionUrl = lambdaFunction.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
    });

    // Lambda function with container image
    const lambdaFunctionContainer = new DockerImageFunction(this, 'LambdaContainerFunctionMigratingToLambda', {
      code: DockerImageCode.fromImageAsset(path.join(__dirname, 'water-intake-nodejs')),
      environment: {
        RUST_LOG: 'info'
      },
      architecture: Architecture.ARM_64,
      memorySize: 1024,
      timeout: cdk.Duration.minutes(5)
    });

    // Lambda function url for container function
    const lambdaFunctionContainerUrl = lambdaFunctionContainer.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE
    });

    new cdk.CfnOutput(this, 'LambdaFunctionUrlOutput', {
      value: lambdaFunctionUrl.url,
      description: 'Lambda function url',
    });

    new cdk.CfnOutput(this, 'LambdaFunctionContainerUrlOutput', {
      value: lambdaFunctionContainerUrl.url,
      description: 'Lambda function container url',
    });
  }
}
