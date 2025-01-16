# User & News API Project

## Introduction

This project is an API built with **Node.js** and **Express**, connected to a **MongoDB database** via Mongoose. Its purpose is to manage two entities: **User** and **News**. The API provides full **CRUD functionalities**, validations, pagination, search functionalities and is designed according to the specified specifications.

## Features

### Gebruikersfunctionaliteiten:
- **CRUD** operations for both USERS and NEWS.
- **Search**: Search users by their name.
- **Pagination** with limit and offset for listing users.
  
### Extra:
- The API contains a root page (`index.html`) that documents all available endpoints.

---
### Prerequisites
---
- Node.js (v20 or later)
- MongoDB database
- Postman for API testing

## Installation

To get started with the Game Console API, follow the steps below:



### 1. Clone the repository

Clone the repository to your local machine using Git:

```bash
gh repo clone ebenhaj2005/BackendWeb2
```
Navigate into the project directory:

```bash
cd BackendWeb2
```

### 2. Install dependencies

   ```bash
   npm install
```

### 3. Set up the MySQL database
Create a MongoDB database for the project. 
You can do this by logging into MongoDB.
Create a new cluster if you haven’t already.
Once the cluster is ready, click Browse Collections to start working with your database.

Using a Local MongoDB Installation:

Ensure MongoDB is installed on your system. If not, download it from the MongoDB website.
Open a terminal or command prompt.
Start the MongoDB server with the command:

mongod

In another terminal, open the MongoDB shell with:
mongo

Step 2: Create a New Database
In MongoDB, databases are created implicitly when you insert data into them. Here’s how to explicitly create one:

MongoDB Shell (mongosh)
Open the MongoDB shell.
Run the following commands to create and switch to the database:
use BackendWeb2

   ```bash
   PORT=3000
   DATABASE_URL=<JOUW_MONGODB_CONNECTION_STRING>
```
### 4. Set up environment variables

Create a `.env` file in the project root directory to store sensitive information such as the database credentials. For example:
```env
PORT=3000
MONGO_URI= MongoDB-CONNECTIONSTRING.
```
### 6. Start the server

   ```bash
   node server.js
```
### 7. Test the API

You can now test the API using Postman or any other API testing tool. You can access the full API documentation at the root endpoint (`/`).
