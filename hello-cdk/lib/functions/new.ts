export const handler = async (event: any) => {
    console.log('Request received:', event);
  
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Hello, world! This is your new Lambda responding.',
        input: event,
      }),
    };
  };
  