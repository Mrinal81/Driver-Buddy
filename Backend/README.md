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

## Get User Profile
`GET /users/profile`

Retrieve the authenticated user's profile information.

### Headers
```
Authorization: Bearer <jwt_token>
```

### Response Codes
- **200**: Success
- **401**: Unauthorized (invalid or missing token)
- **500**: Internal server error

### Success Response
```json
{
    "_id": "string",
    "fullname": {
        "firstname": "string",
        "lastname": "string"
    },
    "email": "string"
}
```

### Example Usage
```bash
curl -X GET http://localhost:3000/users/profile \
-H "Authorization: Bearer your_jwt_token"
```

## User Logout
`GET /users/logout`

Logout the currently authenticated user and invalidate the token.

### Headers
```
Authorization: Bearer <jwt_token>
```

### Response Codes
- **200**: Successfully logged out
- **401**: Unauthorized (invalid or missing token)
- **500**: Internal server error

### Success Response
```json
{
    "message": "Logged out successfully"
}
```

### Example Usage
```bash
curl -X GET http://localhost:3000/users/logout \
-H "Authorization: Bearer your_jwt_token"
```

# Captain API Documentation

## Captain Registration
`POST /captains/register`

Register a new captain in the system.

### Request Body
```json
{
    "fullname": {
        "firstname": "string",
        "lastname": "string"
    },
    "email": "string",
    "password": "string",
    "vehicle": {
        "color": "string",
        "plate": "string",
        "capacity": "number",
        "vehicleType": "car|bike|auto"
    }
}
```

### Required Fields
- **fullname.firstname**: Captain's first name (min 3 characters)
- **fullname.lastname**: Captain's last name (min 3 characters)
- **email**: Valid email address
- **password**: Password (min 8 characters)
- **vehicle.color**: Vehicle color (min 3 characters)
- **vehicle.plate**: Vehicle plate number (min 3 characters)
- **vehicle.capacity**: Vehicle passenger capacity (min 1)
- **vehicle.vehicleType**: Type of vehicle (must be 'car', 'bike', or 'auto')

### Response Codes
- **201**: Captain successfully registered
- **400**: Bad request (missing or invalid data)
- **409**: Conflict (email already exists)
- **500**: Internal server error

### Success Response
```json
{
    "token": "jwt_token_string",
    "captain": {
        "_id": "string",
        "fullname": {
            "firstname": "string",
            "lastname": "string"
        },
        "email": "string",
        "vehicle": {
            "color": "string",
            "plate": "string",
            "capacity": 4,
            "vehicleType": "car"
        },
        "status": "inactive"
    }
}
```

### Error Response
```json
{
    "errors": [
        {
            "msg": "Error message description",
            "param": "field_name"
        }
    ]
}
```

### Example Usage
```bash
curl -X POST http://localhost:3000/captains/register \
-H "Content-Type: application/json" \
-d '{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.captain@example.com",
    "password": "password123",
    "vehicle": {
        "color": "Black",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
    }
}'
```
