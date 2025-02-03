# Frontend Dashboard

## Installation

To get started, follow these steps:

### 1. Clone the repository:

```bash
git clone https://github.com/8suraj/streamify-dashboard
```

### 2. Install dependencies:

Make sure you have Node.js (v16 or later) installed. Then, install the dependencies with:

```bash
npm install
```

### 3. Run the project:

To start the development server, run:

```bash
npm run dev
```

This will start the Vite development server and open the project in your default browser at [http://localhost:5173](http://localhost:5173).

## Technologies Used

- **React** (or TypeScript/JavaScript): Frontend framework for building UI components.
- **Vite**: Build tool for fast bundling and hot module replacement.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **ESLint**: Linting tool for consistent code quality.
- **PostCSS**: For processing CSS.
- **Git**: Version control system for tracking changes in the codebase.

## Folder Structure

```plaintext
├── .gitignore             # Git ignore file
├── README.md              # Project documentation
├── index.html             # Main HTML file
├── package.json           # Project metadata and dependencies
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.ts         # Vite configuration
├── postcss.config.js      # PostCSS configuration
├── fonts                  # Font files used in the project
├── src                    # Source code for the project
│   └── components         # React components
│   └── scss               # Tailwind CSS,scss configurations
│   └── pages               # spa pages
│   └── assets             # Image assets
└── .git                   # Git directory for version control
```

## How to Run the Project

1. **Development Mode:**
   After running `npm run dev`, the application will be available at [http://localhost:3000](http://localhost:3000).

2. **Production Build:**
   For creating a production build, run:

   ```bash
   npm run build
   ```

   This will bundle the project for production into the `/dist` directory.

3. **Testing:**
   You can run tests using:
   ```bash
   npm run serve:prod
   ```

---

Got it! Here’s how I would format your design decisions and trade-offs for the README in a clean and organized way:

---

## Design Decisions and Trade-offs

### 1. **Development Tools**

- **Vite for Fast Development:** I chose Vite as the build tool to ensure fast development with hot module reloading (HMR). This significantly improves the developer experience and speeds up build times.

### 2. **Key Metrics Cards**

- **Extra Information with Small Graphs:** For each key metric, I added small graphs that showcase data for the past few months. These graphs provide a quick visual overview of trends. The graph’s value is displayed on hover for a quick glance at the specific data.
- **Top Artist Section:** I introduced a complementary section called "Top Artist" to display the top five artists of the month, giving users more insight into content performance.

### 3. **Charts and Data Visualizations**

- **Interactive Line Charts for User Growth:** I created interactive line charts for tracking the growth of total and active users over time. These charts are zoomable, allowing users to explore the data in more detail.
- **Timeline Graph:** A timeline graph has been provided, where users can click on specific data points to toggle the visibility of different data sets, allowing for a more customized view of the data.
- **Top 5 Most-Streamed Songs:** A bar chart displays the top 5 most-streamed songs over the past 30 days. This also includes the same interactivity as other charts, such as hover effects and data tooltips.
- **Night Angle Pie Chart for Revenue Distribution:** A visually appealing night-angle pie chart was used to display revenue distribution across different sources (subscriptions, ads, etc.). Users can click on sections of the pie chart to see detailed revenue breakdowns for the past few months.

### 4. **Table and User Interaction**

- **Data Grid Table:** For the detailed data table, I used TanStack Table, which supports sorting, filtering, and pagination on the client side. This enables smooth and efficient interaction with the data.
  - **Client-Side Sorting:** Users can sort data by columns like stream count or date.
  - **Pagination:** Implemented client-side pagination to improve performance and provide a better user experience when dealing with large data sets.
  - **Filtering:** Users can filter by artist, song name, or date to quickly find the data they need.

### 5. **Performance Optimization**

- **Lazy Loading for Images:** To optimize load times, I implemented lazy loading for images.
- **Route-Based Code Splitting:** To further optimize performance, I implemented route-based code splitting. This ensures that only the necessary code for the current page is loaded initially, while other parts of the app are loaded only when needed, reducing the initial bundle size and improving page load times.
- **Intersection Observer for Lazy Loading:** I used the Intersection Observer API to handle lazy loading for elements that are not visible in the viewport. This allows images, charts, and other elements to load only when they come into view, improving the overall loading performance and reducing unnecessary network requests.

## Future Improvements

### 1. **Next.js for Improved Performance**

- **Static Site Generation (SSG) with Next.js:** If I had used Next.js for this project, it would have allowed me to take advantage of Static Site Generation (SSG). This would decrease the initial load time, as the pages would be pre-rendered and served as static HTML, improving performance.

### 2. **Enhanced User Demographics Visualization**

- **Map-Based User Demographics:** To provide better insights into the user base, I would implement a map-based visualization showing user demographics. This would allow users to view geographical trends, such as the number of active users or revenue distribution by region. This feature would further enrich the data presentation and offer more meaningful insights into the user behavior.

### 3. **State Management**

- **No External State Management Libraries Used:** Since this dashboard is built with mock data and does not involve fetching data from external APIs or requiring complex state sharing across multiple components, I decided not to use any external state management libraries (such as Redux or Context API). The state is managed locally within each component, which simplifies the architecture and keeps the codebase lean.
