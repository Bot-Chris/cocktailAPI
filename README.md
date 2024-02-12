# cocktailAPI
 The Cocktail API Wrapper is a Node.js application that enhances The Cocktail DB API with additional functionalities like pagination and cross-ingredient filtering. This wrapper makes it easier to search for cocktails by name, category, ingredients (including multiple ingredients), and alcoholic content.
 # Cocktail API Wrapper

The Cocktail API Wrapper is a Node.js application that enhances The Cocktail DB API with additional functionalities like pagination and cross-ingredient filtering. This wrapper makes it easier to search for cocktails by name, category, ingredients (including multiple ingredients), and alcoholic content.

## Features

- **Search by Name**: Look up cocktails by their names.
- **Filter by Category**: Retrieve cocktails from specific categories (e.g., Cocktail, Beer).
- **Filter by Ingredients**: Filter cocktails based on one or more ingredients.
- **Filter by Alcoholic Content**: Filter cocktails by their alcoholic content (Alcoholic, Non_Alcoholic, Optional alcohol).
- **Pagination**: Paginate the results for easier access and navigation.
- **Cross-Ingredient Filtering**: Find cocktails that include a combination of specified ingredients.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm) (usually comes with Node.js)
- [Docker](https://www.docker.com/get-started) (optional, for Docker deployment)

### Installing

1. **Clone the Repository**

git clone https://github.com/Bot-Chris/cocktailAPI.git
cd cocktail-api-wrapper

2. **Install Dependencies**

npm install

3. **Environment Variables**

Create a `.env` file in the root directory and specify any environment variables you need, such as:

PORT=3000

4. **Start the Server**

npm start


Your API should now be running on [http://localhost:3000](http://localhost:3000).


