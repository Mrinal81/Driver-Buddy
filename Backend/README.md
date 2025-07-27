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

## User Login
`POST /users/login`

Authenticate an existing user and get access token.

### Request Body
```json
{
    "email": "string",
    "password": "string"
}
```

### Required Fields
- **email**: Registered email address
- **password**: User's password

### Response Codes
- **200**: Login successful
- **400**: Bad request (missing or invalid data)
- **401**: Unauthorized (invalid credentials)
- **500**: Internal server error

### Success Response
```json
{
    "token": "jwt_token_string",
    "user": {
        "userId": "string",
        "fullname": {
            "firstname": "string",
            "lastname": "string"
        },
        "email": "string"
    }
}
```

### Error Response
```json
{
    "message": "Invalid email or password"
}
```

### Example Usage
```bash
curl -X POST http://localhost:3000/users/login \
-H "Content-Type: application/json" \
-d '{
    "email": "john@example.com",
    "password": "password123"
}'
```
