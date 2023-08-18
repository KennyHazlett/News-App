# News API SPA

This project is a Single Page Application (SPA) created to display and browse the top news of the News API endpoint. It was built using React and demonstrates basic software engineering and architectural principles.

## Goal

The goal of this assignment is to create a SPA to display and browse the top news of the News API endpoint, allowing users to switch between countries, view top news items, and filter the news through a search functionality.

## Functionality

The news application provides the following features:

- Switch between countries (e.g. US and UK) to display top news items.
- Display an overview of the top news items and access their detail pages.
- Filter news articles using a search bar to find articles containing specific keywords.

## Technologies Used

- React
- Axios
- CSS

## Project Structure

- `src/App.js`: Main layout and structure of the application.
- `src/components`: Components for displaying news items and other UI elements.
- `src/styles`: CSS files for customizing the application's appearance.
- `src/utils`: Utility functions for interacting with the News API.

## Getting Started

1. Clone the repository
git clone https://github.com/KennyHazlett/News-App.git

2. Navigate to the project directory
cd News-App

3. Install dependencies
npm install

4. Obtain a News API key from [https://newsapi.org/](https://newsapi.org/) and add it to the `.env` file: REACT_APP_NEWS_API_KEY=your_api_key_here

5. Run the application in development mode
npm start

Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes.

## Build

To build the app for production, run: npm run build

This command will generate a `build` folder containing the optimized production build.

## Testing

To run tests for the application, execute the following command: npm test

## Demo
![demo video](/GIF/News-App.gif) 