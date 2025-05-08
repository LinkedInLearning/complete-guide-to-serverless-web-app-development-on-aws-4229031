import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

const snsClient = new SNSClient({ region: process.env.AWS_REGION });

export const handler = async (event: any, context: any) => {
    try {
        // Get the user email from the event 
        console.log(event)
        const userEmail = event.arguments.email; 
        
        // Construct your message
        const message = {
            title: `Here is the feature you requested: ${event.arguments.id}`,
            body: `You requested the feature with ID: ${event.arguments.id}. Here is the feature: ${event.arguments.text} and it currently has ${event.arguments.voteCount} votes.`,
            timestamp: new Date().toISOString()
        };

        console.log(message)

        const command = new PublishCommand({
            TopicArn: process.env.SNS_TOPIC_ARN,
            Message: JSON.stringify(message),
            MessageAttributes: {
                "to": {
                    DataType: "String",
                    StringValue: userEmail
                }
            }
        });

        const response = await snsClient.send(command);
        console.log('Message published successfully:', response);
        return true;

    } catch (error) {
        console.error('Error publishing message:', error);
        return false;
    }
};
