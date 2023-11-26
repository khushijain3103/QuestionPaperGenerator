# Question Paper Generator

The **Question Paper Generator** is a web application that allows users to generate question papers based on specified criteria such as total marks and difficulty level percentages. It leverages a MongoDB database to store and retrieve questions of different difficulty levels.

## Features

- **Dynamic Mark Calculation:** Calculate the number of marks for each difficulty level based on user-defined percentage distributions.
- **Question Retrieval:** Retrieve random questions from the database for each difficulty level.
- **Customization:** Users can customize the total marks and percentage distribution for each difficulty level.

## Technologies Used

- **Node.js:** Server-side runtime environment.
- **Express.js:** Web application framework for Node.js.
- **MongoDB:** Database to store and retrieve questions.
- **Mongoose:** MongoDB object modeling for Node.js.
- **Aggregation Framework:** Utilized for aggregating and processing data in the database.

## Getting Started

### Prerequisites

- Node.js and npm installed.
- MongoDB installed and running.

### Installation

1. **Clone the repository:**

   ```bash
    git clone https://github.com/khushijain3103/QuestionPaperGenerator
    cd QuestionPaperGenerator
   ```

2. **Install Dependencies**

   ```bash
   npm i
   ```

3. **Start The Project**

   ````bash
   npm start
   ````

## Usage

1. Access the Question Paper Generator through the provided routes, e.g., `/create-paper`.

2. Provide the required input parameters such as total marks and difficulty level percentages.

3. Generate question papers based on the specified criteria.
