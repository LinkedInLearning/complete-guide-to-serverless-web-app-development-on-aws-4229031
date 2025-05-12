import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Function, Code, Runtime } from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';

export class MigrateToServerlessStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

   // Lambda function
    const lambdaFunction = new Function(this, 'LambdaFunctionMigratingToLambda', {
      runtime: Runtime.NODEJS_22_X,
      handler: 'test-lambda.handler',
      code: Code.fromAsset(path.join(__dirname, 'functions')),
    });
  }
}
