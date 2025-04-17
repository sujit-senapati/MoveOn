# User Registration Endpoint

## Endpoint
`POST /users/register`

## Description
This endpoint allows a new user to register by providing their details. It validates the input data, hashes the password, and creates a new user in the database. Upon successful registration, a JWT token is generated and returned.

## Request Body
The request body must be in JSON format and include the following fields:

- `fullname`: An object containing the user's full name.
  - `firstname`: A string representing the user's first name (required, minimum length: 3 characters).
  - `lastname`: A string representing the user's last name (required).
- `email`: A string representing the user's email address (required, must be a valid email format, minimum length: 5 characters).
- `password`: A string representing the user's password (required, minimum length: 6 characters).

### Example Request
{
  "fullname": {  # User Endpoints Documentation
  
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
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword"
}

## Responses
- **201 Created**: Returned when the user is successfully registered. The response includes the generated JWT token and user details.
  - Example Response:
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

- **400 Bad Request**: Returned when the input data is invalid or missing required fields. The response includes an array of error messages.
  - Example Response:
  {
    "errors": [
      {
        "msg": "First name must be at least 3 characters long",
        "param": "fullname.firstname",
        "location": "body"
      }
    ]
  }



  ## User Login Endpoint

  ### Endpoint
  `POST /users/login`

  ### Description
  This endpoint allows an existing user to log in by providing their email and password. Upon successful authentication, a JWT token is generated and returned.

  ### Request Body
  The request body must be in JSON format and include the following fields:

  - `email`: A string representing the user's email address (required, must be a valid email format).
  - `password`: A string representing the user's password (required).

  #### Example Request
  ```json
  {
    "email": "john.doe@example.com",
    "password": "securepassword"
  }
  ```

  ### Responses
  - **200 OK**: Returned when the user is successfully authenticated. The response includes the generated JWT token and user details.
    - Example Response:
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

  - **401 Unauthorized**: Returned when the email or password is incorrect.
    - Example Response:
    ```json
    {
      "error": "Invalid email or password"
    }
    ```

  - **400 Bad Request**: Returned when the input data is invalid or missing required fields.
    - Example Response:
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