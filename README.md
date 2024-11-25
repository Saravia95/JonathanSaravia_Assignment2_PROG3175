- **Repo**
- **https://github.com/Saravia95/JonathanSaravia_Assignment2_PROG3175.git**
  **https://jonathan-saravia-assignment2-prog-3175.vercel.app/**
- **POST /greet**
  - **Request Body**:
    ```json
    {
      "timeofday": "Morning",
      "language": "English",
      "tone": "Formal"
    }
    ```
  - **Response**:
    ```json
    {
      "greetingmessage": "Good Morning!"
    }
    ```
- **GET /timeofday** - Returns available `timeofday` values.
- **GET /languages** - Returns supported languages.
