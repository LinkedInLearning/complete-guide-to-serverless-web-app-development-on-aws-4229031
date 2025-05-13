import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apprunner from '@aws-cdk/aws-apprunner-alpha';
import * as ecr from 'aws-cdk-lib/aws-ecr';


export class AppRunnerDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const observabilityConfiguration = new apprunner.ObservabilityConfiguration(this, 'AppRunnerObservabilityConf', {
      observabilityConfigurationName: 'AppRunnerObservabilityConf',
      traceConfigurationVendor: apprunner.TraceConfigurationVendor.AWSXRAY,
    });

    const service = new apprunner.Service(this, 'AppRunnerService', {
      source: apprunner.Source.fromEcr({
        imageConfiguration: { port: 8080 },
        repository: ecr.Repository.fromRepositoryName(this, 'WaterIntakeNodejs', 'water-tracking-api'),
        tagOrDigest: 'latest',
      }),
      observabilityConfiguration: observabilityConfiguration,
      cpu: apprunner.Cpu.ONE_VCPU,
      memory: apprunner.Memory.TWO_GB,

  });

  
}  
}
