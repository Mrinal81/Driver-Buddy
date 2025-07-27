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
        "firstname": "string", // minimum 3 characters
        "lastname": "string"   // optional, minimum 3 characters if provided
    },
    "email": "string",        // must be unique and valid email format
    "password": "string",     // minimum 8 characters
    "vehicle": {
        "color": "string",    // minimum 3 characters
        "plate": "string",    // minimum 3 characters, unique
        "capacity": 4,        // minimum 1
        "vehicleType": "car"  // must be one of: "car", "bike", "auto"
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

### Success Response (201 Created)
```json
{
    "token": "eyJhbGciOiJIUzI1NiIs...", // JWT token, valid for 24 hours
    "captain": {
        "_id": "60f1a5b9e6c7b32d48a9f5c3",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.captain@example.com",
        "vehicle": {
            "color": "Black",
            "plate": "ABC123",
            "capacity": 4,
            "vehicleType": "car"
        },
        "status": "inactive"    // default status for new captains
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

## Captain Login
`POST /captains/login`

Authenticate a captain and get access token.

### Request Body
```json
{
    "email": "string",    // registered email
    "password": "string"  // minimum 8 characters
}
```

### Success Response (200 OK)
```json
{
    "token": "eyJhbGciOiJIUzI1NiIs...", // JWT token, valid for 24 hours
    "captain": {
        "_id": "60f1a5b9e6c7b32d48a9f5c3",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.captain@example.com",
        "vehicle": {
            "color": "Black",
            "plate": "ABC123",
            "capacity": 4,
            "vehicleType": "car"
        },
        "status": "inactive"
    }
}
```

## Get Captain Profile
`GET /captains/profile`

Retrieve the authenticated captain's profile information.

### Headers
```json
{
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIs..." // Valid JWT token
}
```

### Success Response (200 OK)
```json
{
    "_id": "60f1a5b9e6c7b32d48a9f5c3",
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.captain@example.com",
    "vehicle": {
        "color": "Black",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
    },
    "status": "inactive",
    "location": {              // Optional, present if captain has shared location
        "lat": 12.9716,
        "lng": 77.5946
    }
}
```

## Captain Logout
`GET /captains/logout`

Logout the currently authenticated captain and invalidate the token.

### Headers
```json
{
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIs..." // Valid JWT token
}
```

### Success Response (200 OK)
```json
{
    "message": "Logged out successfully"
}
```

### Error Responses (All Routes)
```json
{
    "errors": [
        {
            "msg": "Error description",    // Validation or error message
            "param": "field_name",         // Field causing the error (if applicable)
            "location": "body"             // Location of the error (body, query, etc.)
        }
    ]
}
```

### Status Codes
- **200**: Success (Login, Profile, Logout)
- **201**: Created (Registration)
- **400**: Bad Request (Validation errors)
- **401**: Unauthorized (Invalid/missing token, wrong credentials)
- **409**: Conflict (Email/plate number already exists)
- **500**: Internal Server Error
