
---

# Aryan_ENTNT_Assignment_Frontend(React.js)

## Overview

The Assignment is a modern web application designed to manage and visualize communication schedules, including tracking companies, communication methods, and scheduled activities. This application provides an intuitive UI where users can view, add, and modify communication records in a structured, easy-to-use manner. It leverages **React.js** and **Material-UI** for a seamless and responsive user experience.

---

## Key Features

- **Communication Data Grid**: Displays and manages communication records (companies, methods, schedules).
- **Sorting & Filtering**: Easily sort and filter communication data for quick access and analysis.
- **Add/Update/Delete Communication Records**: Users can manage their communication records dynamically.

- **Backend Integration**: Uses a back-end API for data (also built by myself).

---

## Functionality

- **DataGrid**:
  - Displays communication records with fields such as company name, communication method, and scheduled time.
  - Supports dynamic sorting and filtering of data.
  
- **CRUD Operations**:
  - Add new communication records.

  
- **Search and Sorting**:
  - Search and sort communication records by company, method, or schedule.
  
- **Data Display**:
  - Display mock data for testing purposes, with potential integration for future real data.

---

## Tech Stack

- **Frontend**: 
  - **React.js** (for building components and UI)
  - **Material-UI** (for UI components like DataGrid, buttons, and forms)
  - **React Router** (for page navigation)
  - **JavaScript (ES6+)**
  
- **State Management**: 
  - React's built-in hooks for managing state (useState, useEffect)

- **Deployment**: 
  - **Vercel** or **Netlify** (for hosting the application)

---

## Prerequisites

Before you start, make sure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (v14 or higher)
- [npm](https://www.npmjs.com/get-npm) (Node package manager)

---

## Setup Instructions

1. **Clone the repository**:

   ```bash
   git clone https://github.com/aryanak-18/Aryan_ENTNT_Assignment_Frontend-React.js-.git
   ```

2. **Install dependencies**:

   Navigate to the project folder and install dependencies using npm:

   ```bash
   cd project
   npm install
   ```

3. **Run the development server**:

   Once the dependencies are installed, you can start the application locally:

   ```bash
   npm start
   ```

   This will start the development server and open the application in your browser at [http://localhost:3000](http://localhost:3000).

4. **Building for Production**:

   To create an optimized production build:

   ```bash
   npm run build
   ```

---

## Deployment

This project can be deployed to platforms like **Vercel** or **Netlify**:

- **Vercel**:
  - Push the project to a GitHub repository.
  - Go to [Vercel](https://vercel.com/) and link your GitHub repository to deploy automatically.
  
- **Netlify**:
  - Push the project to a GitHub repository.
  - Go to [Netlify](https://www.netlify.com/) and link your repository to deploy automatically.

Once deployed, you'll receive a live URL to access the application.

---

## External Dependencies

- **@emotion/react**
- **@emotion/styled**
- **@mui/icons-material**
- **@mui/material**
- **@mui/x-data-grid**
- **@testing-library/jest-dom**
- **@testing-library/react**
- **@testing-library/user-event**
- **axios**
- **dayjs**
- **react**
- **react-calendar**
- **react-dom**
- **react-router-dom**
- **react-scripts**
- **react-tooltip**
- **web-vitals**

---


## Testing & Validation

- **Test the UI**: Ensure all components are rendered properly on different screen sizes.
- **Validate sorting/filtering**: Make sure that sorting and filtering work as expected in the DataGrid.
- **Test CRUD operations**: Ensure the add, update, and delete actions function properly.
- **Check performance**: Test the application for any performance bottlenecks and resolve them.

---

## Known Limitations

- The current version uses **mock data** for the companies and communication records. Integration with a real back-end system (e.g., REST API) is a potential future enhancement.
- The DataGrid does not yet support advanced features like pagination or infinite scrolling. These can be added in future versions.
  
---