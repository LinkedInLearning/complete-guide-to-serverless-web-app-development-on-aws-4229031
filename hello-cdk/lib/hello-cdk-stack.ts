import * as cdk from 'aws-cdk-lib';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import path from 'path';

export class HelloCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define the Lambda function
    const lambdaFunction = new NodejsFunction(this, 'HelloFunction', {
      entry: path.join(__dirname, 'functions/hello.ts'), // Use entry instead of code
      handler: 'handler', // Function name in the Lambda file
      runtime: Runtime.NODEJS_20_X,

      // Bundle configuration
      bundling: {
        minify: true,         // Minify code
        sourceMap: true,      // Include source maps
        externalModules: [    // Modules that should be excluded from bundling
            'aws-sdk',
        ],
      },
    });

    // Define API Gateway and attach it to the Lambda function
    new apigateway.LambdaRestApi(this, 'HelloApi', {
      handler: lambdaFunction,
    });

    const newLambdaFunction = new NodejsFunction(this, 'NewFunction', {
      entry: path.join(__dirname, 'functions/new.ts'), // Use entry instead of code
      handler: 'handler', // Function name in the Lambda file
      runtime: Runtime.NODEJS_20_X,
      
      // Bundle configuration
      bundling: {
        minify: true,         // Minify code
        sourceMap: true,      // Include source maps
        externalModules: [    // Modules that should be excluded from bundling
            'aws-sdk',
        ],
      }
    });

    new apigateway.LambdaRestApi(this, 'NewApi', {
      handler: newLambdaFunction,
    });
  }
}
