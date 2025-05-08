import { SNSClient, SubscribeCommand } from "@aws-sdk/client-sns";

export const handler = async (event: any, context: any) => {
  console.log('Post confirmation trigger', event);

  // Get the user's email from the event
  const userEmail = event.request.userAttributes.email;
  console.log('User email:', userEmail);
  
  // Get the SNS topic ARN from environment variable
  const topicArn = process.env.SNS_TOPIC_ARN;
  console.log('SNS topic ARN:', topicArn);
  
  // Initialize the SNS client
  const snsClient = new SNSClient({ region: process.env.AWS_REGION });

  try {
    // Create the filter policy
    const filterPolicy = {
        "to": [userEmail] // This will match messages where 'to' attribute equals the user's email
      };

    // Create the subscription request
    const subscribeCommand = new SubscribeCommand({
      Protocol: 'email',
      TopicArn: topicArn,
      Endpoint: userEmail,
      ReturnSubscriptionArn: true,
      Attributes: {
        FilterPolicy: JSON.stringify(filterPolicy),
        FilterPolicyScope: 'MessageAttributes' // Specify that we're filtering on message attributes        
      },
    });

    // Subscribe the email to the topic
    const response = await snsClient.send(subscribeCommand);
    console.log('Successfully subscribed email to topic:', response.SubscriptionArn);


  } catch (error) {
    console.error('Error subscribing email to topic:', error);
  }

  return event;
}
