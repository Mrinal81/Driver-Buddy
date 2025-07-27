# API Documentation

## User Registration
`POST /users/register`

Register a new user in the system.

### Request Body
```json
{
    "username": "string",
    "email": "string",
    "password": "string",
    "phone": "string"
}
```

### Required Fields
- **username**: User's full name
- **email**: Valid email address
- **password**: Password (min 6 characters)
- **phone**: Valid phone number

### Response Codes
- **201**: User successfully created
- **400**: Bad request (missing or invalid data)
- **409**: Conflict (email already exists)
- **500**: Internal server error

### Success Response
```json
{
    "status": "success",
    "message": "User registered successfully",
    "data": {
        "userId": "string",
        "username": "string",
        "email": "string",
        "phone": "string"
    }
}
```

### Error Response
```json
{
    "status": "error",
    "message": "Error message description"
}
```

### Example Usage
```bash
curl -X POST http://localhost:3000/users/register \
-H "Content-Type: application/json" \
-d '{
    "username": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "1234567890"
}'
```
