# Water Tracking API

A Node.js Express API for tracking daily water intake, featuring a clean architecture with repository pattern implementation.

## Features

- Track water intake with amount and timestamp
- Get water intake history for the last 30 days
- Supports in-memory storage
- Input validation
- TypeScript implementation

## API Endpoints

### Add Water Intake
```bash
# Add 250ml of water
curl -X POST http://localhost:8080/water \
  -H "Content-Type: application/json" \
  -d '{"userId": "user123", "amount": 250}'

# Add 500ml of water
curl -X POST http://localhost:8080/water \
  -H "Content-Type: application/json" \
  -d '{"userId": "user123", "amount": 500}'

# Response example:
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "userId": "user123",
  "amount": 250,
  "timestamp": "2024-03-01T12:00:00.000Z"
}
```

### Get Last 30 Days History
```bash
# Get history for a specific user
curl http://localhost:8080/water/user/user123/last-30-days

# Response example:
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "userId": "user123",
    "amount": 250,
    "timestamp": "2024-03-01T12:00:00.000Z"
  },
  {
    "id": "650e8400-e29b-41d4-a716-446655440000",
    "userId": "user123",
    "amount": 500,
    "timestamp": "2024-03-01T14:30:00.000Z"
  }
]
```

### Get Specific Intake
```bash
# Get intake by ID
curl http://localhost:8080/water/550e8400-e29b-41d4-a716-446655440000

# Response example:
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "userId": "user123",
  "amount": 250,
  "timestamp": "2024-03-01T12:00:00.000Z"
}

# Example with non-existent ID
curl http://localhost:8080/water/invalid-id

# Response for non-existent ID:
{
  "error": "Intake not found"
}
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```


## Docker Instructions

1. Build the Docker image:
   ```bash
   docker build -t water-tracking-api .
   ```

Build if you don't have the linux/amd64 architecture locally.

```bash
docker buildx build --platform linux/amd64 -t water-tracking-api .
```

2. Run the container:
   ```bash
   docker run -p 8080:8080 water-tracking-api
   ```

## Upload to ECR

Log in to ECR:
```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <accountNumber>.dkr.ecr.us-east-1.amazonaws.com
```

Create an ECR repository:
Ensure you're using the same region as your App Runner service.
```bash
aws ecr --region us-east-1 create-repository --repository-name water-tracking-api
```

Verify the repository was created:
```bash
aws ecr --region us-east-1 describe-repositories --query "repositories[*].repositoryUri" --output text
```

Tag the Docker image:
```bash
docker tag water-tracking-api:latest <accountNumber>.dkr.ecr.us-east-1.amazonaws.com/water-tracking-api:latest
```

Push the image to ECR:

```bash
docker push <accountNumber>.dkr.ecr.us-east-1.amazonaws.com/water-tracking-api:latest
```

