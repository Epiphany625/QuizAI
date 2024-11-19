# QuizAI Backend API Documentation

This document provides an overview of the API endpoints available in the QuizAI backend. Each endpoint is described with its HTTP method, URL, a sample request, and the expected response.

## Base URL

The base URL for all endpoints is: `http://localhost:<PORT>/api`

## Endpoints

### 1. User Endpoints

#### Get User

- **URL:** `/user/:email`
- **Method:** `GET`
- **Description:** Retrieve user information by email.
- **Sample Request:**

  ```javascript
  axios
    .get("http://localhost:<PORT>/api/user/user@example.com")
    .then((response) => console.log(response.data))
    .catch((error) => console.error(error));
  ```

- **Response:**
  ```json
  {
    "email": "user@example.com",
    "quizRequested": 0,
    "chatbotRequested": 0,
    "summaryRequested": 0,
    "quizGenerated": [],
    "date": "2023-10-01T00:00:00.000Z"
  }
  ```

#### Add Summary Requested

- **URL:** `/user/:email/summary`
- **Method:** `PATCH`
- **Description:** Increment the summary requested count for a user.
- **Sample Request:**

  ```javascript
  axios
    .patch("http://localhost:<PORT>/api/user/user@example.com/summary")
    .then((response) => console.log(response.data))
    .catch((error) => console.error(error));
  ```

- **Response:**
  ```json
  {
      "email": "user@example.com",
      "summaryRequested": 1,
      ...
  }
  ```

#### Add Quiz Generated

- **URL:** `/user/:email/quiz`
- **Method:** `PATCH`
- **Description:** Add a new quiz to the user's generated quizzes.
- **Sample Request:**

  ```javascript
  axios
    .patch(
      "http://localhost:<PORT>/api/user/user@example.com/quiz",
      {
        quiz: {
          url: "http://example.com",
          questions: [
            {
              question: "What is 2+2?",
              choices: ["3", "4", "5"],
              correctAnswer: "4",
            },
          ],
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => console.log(response.data))
    .catch((error) => console.error(error));
  ```

- **Response:**
  ```json
  {
      "email": "user@example.com",
      "quizGenerated": [
          {
              "url": "http://example.com",
              "questions": [
                  {
                      "question": "What is 2+2?",
                      "choices": ["3", "4", "5"],
                      "correctAnswer": "4"
                  }
              ]
          }
      ],
      ...
  }
  ```

### 2. Authentication Endpoints

#### Register User

- **URL:** `/auth/register`
- **Method:** `POST`
- **Description:** Register a new user.
- **Sample Request:**

  ```javascript
  axios
    .post(
      "http://localhost:<PORT>/api/auth/register",
      {
        email: "newuser@example.com",
        password: "password123",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => console.log(response.data))
    .catch((error) => console.error(error));
  ```

- **Response:**
  ```json
  {
    "message": "User registered successfully"
  }
  ```

#### Login User

- **URL:** `/auth/login`
- **Method:** `POST`
- **Description:** Log in an existing user.
- **Sample Request:**

  ```javascript
  axios
    .post(
      "http://localhost:<PORT>/api/auth/login",
      {
        email: "user@example.com",
        password: "password123",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => console.log(response.data))
    .catch((error) => console.error(error));
  ```

- **Response:**
  ```json
  {
    "message": "Login successful",
    "token": "<JWT_TOKEN>"
  }
  ```

#### Verify Token

- **URL:** `/auth/verify-token`
- **Method:** `POST`
- **Description:** Verify a user's JWT token.
- **Sample Request:**

  ```javascript
  axios
    .post(
      "http://localhost:<PORT>/api/auth/verify-token",
      {},
      {
        headers: {
          Authorization: "Bearer <JWT_TOKEN>",
        },
      }
    )
    .then((response) => console.log(response.data))
    .catch((error) => console.error(error));
  ```

- **Response:**
  ```json
  {
      "message": "Token verified",
      "user": {
          "email": "user@example.com",
          ...
      }
  }
  ```

### 3. Summary Endpoints

#### Post Summary

- **URL:** `/summary`
- **Method:** `POST`
- **Description:** Generate a summary from web content.
- **Sample Request:**

  ```javascript
  axios
    .post(
      "http://localhost:<PORT>/api/summary",
      {
        webContent: "<HTML_CONTENT>",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => console.log(response.data))
    .catch((error) => console.error(error));
  ```

- **Response:**
  ```json
  {
    "summary": "<GENERATED_SUMMARY>"
  }
  ```

## Notes

- Replace `<PORT>` with the actual port number your server is running on.
- Ensure that the server is running and the database is connected before making requests.
- For endpoints requiring authentication, replace `<JWT_TOKEN>` with a valid token obtained from the login endpoint.
