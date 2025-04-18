# User Endpoints Documentation

## 1. User Registration

### Endpoint

`POST /users/register`

### Description

This endpoint allows a new user to register by providing their details. It validates the input data, hashes the password, and creates a new user in the database. Upon successful registration, a JWT token is generated and returned.

### Request Body

The request body must be in JSON format and include the following fields:

- `fullname`: An object containing the user's full name.
  - `firstname`: A string representing the user's first name (required, minimum length: 3 characters).
  - `lastname`: A string representing the user's last name (required).
- `email`: A string representing the user's email address (required, must be a valid email format, minimum length: 5 characters).
- `password`: A string representing the user's password (required, minimum length: 6 characters).

#### Example Request

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

### Responses

- **201 Created**: Returned when the user is successfully registered. The response includes the generated JWT token and user details.

  ```json
  {
    "token": "your_jwt_token",
    "user": {
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

- **400 Bad Request**: Returned when the input data is invalid or missing required fields.

  ```json
  {
    "errors": [
      {
        "msg": "First name must be at least 3 characters long",
        "param": "fullname.firstname",
        "location": "body"
      }
    ]
  }
  ```

## 2. User Login

### Endpoint

`POST /users/login`

### Description

This endpoint allows an existing user to log in by providing their email and password. Upon successful authentication, a JWT token is generated and returned.

### Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

### Responses

- **200 OK**: Successful login

  ```json
  {
    "token": "your_jwt_token",
    "user": {
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

- **401 Unauthorized**: Invalid email or password

  ```json
  {
    "error": "Invalid email or password"
  }
  ```

- **400 Bad Request**: Missing fields or invalid format

  ```json
  {
    "errors": [
      {
        "msg": "Email is required",
        "param": "email",
        "location": "body"
      }
    ]
  }
  ```

## 3. Get User Profile

### Endpoint

`GET /users/profile`

### Description

This endpoint allows an authenticated user to fetch their profile details, such as username, email, and other relevant information.

### Responses

- **200 OK**

  ```json
  {
    "id": 1,
    "username": "johndoe",
    "email": "johndoe@example.com",
    "first_name": "John",
    "last_name": "Doe"
  }
  ```

- **401 Unauthorized**: The user is not authenticated.

## 4. Logout User

### Endpoint

`GET /users/logout`

### Description

This endpoint invalidates the user's session or token, effectively logging them out of the system.

### Responses

- **200 OK**

  ```json
  {
    "message": "Successfully logged out."
  }
  ```

- **401 Unauthorized**: The user is not authenticated.




"""
Endpoint: /captains/register
Method: POST

Registers a new captain in the system.

Request Body:
- `name` (str): The name of the captain. Required.
- `email` (str): The email address of the captain. Must be unique. Required.
- `password` (str): The password for the captain's account. Required.
- `phone` (str, optional): The phone number of the captain. Optional.
- `license_number` (str, optional): The captain's license number. Optional.

Response:
- 201 Created: If the captain is successfully registered.
  - `message` (str): Success message.
  - `captain_id` (int): The unique ID of the newly registered captain.
- 400 Bad Request: If the request body is invalid or missing required fields.
  - `error` (str): Description of the error.
- 409 Conflict: If the email is already in use.
  - `error` (str): Description of the conflict.