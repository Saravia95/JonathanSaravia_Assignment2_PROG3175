
- **POST /api/greet** 
  - **Request Body**:
    ```json
    {
      "timeOfDay": "Morning",
      "language": "English",
      "tone": "Formal"
    }
    ```
  - **Response**:
    ```json
    {
      "greetingMessage": "Good Morning!"
    }
    ```
- **GET /api/timesOfDay** - Returns available `timeOfDay` values.
- **GET /api/languages** - Returns supported languages.