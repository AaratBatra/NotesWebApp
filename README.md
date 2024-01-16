# NotesWebApp

Welcome to NotesWebApp! This is a web application built with Node.js, Express.js, MongoDB Atlas, Mongoose, JWT for authentication, and Bcrypt for secure password hashing. The application allows users to sign up, log in, and manage their notes through a RESTful API. The passwords are securely hashed and stored in the database, and users can perform CRUD operations on their notes without refreshing the website using EJS and asynchronous API calls.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [License](#license)

## Features

- User Sign Up and Login
- Secure password storage using Bcrypt
- JWT authentication for protected routes
- RESTful API for full CRUD operations on notes
- Asynchronous note updates and deletions using EJS and async fetch API
- MongoDB Atlas for cloud database storage

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/NotesWebApp.git
   ```
2. Install dependencies:
   ```bash
   cd NotesWebApp
   npm install
   ```

## Configuration

1. Create a .env file in the root of the project with the following content:
   ```env
   PORT = 4000
   mongo_uri = [Your Mongo DB URI]
   secret_key = [Your Secret Key]
   ```

## Usage

1. Start the server
```bash
   npm run start
```
2. In your browser navigate to (http://localhost:4000/users/register) and register with some fake or real credentials then login
3. After login, you should be redirected to /notes where you can do CRUD with your notes

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (JSON Web Tokens)
- Bcrypt
- EJS (Embedded JavaScript)
- Fetch API (for asynchronous note updates and deletions)

  ## License
  This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
