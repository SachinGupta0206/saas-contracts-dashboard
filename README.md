# SaaS Contracts Dashboard

A modern React-based dashboard for managing SaaS contracts with AI-powered insights and risk analysis.

## 🚀 Live Demo

[View Live Demo](https://your-deployment-url.vercel.app) _(Will be updated after deployment)_

## 📋 Features

- **Authentication**: Mock login system (username: any, password: test123)
- **Contract Management**: View, search, and filter contracts
- **File Upload**: Drag & drop contract upload with progress tracking
- **Contract Details**: Detailed view with clauses, AI insights, and evidence
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **State Management**: Context API for global state management
- **Mock API**: JSON-based mock data for contracts and details

## 🛠 Tech Stack

- **Frontend**: React 18 (Functional Components + Hooks)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: React Context API
- **HTTP Client**: Fetch API
- **Build Tool**: Create React App
- **Deployment**: Vercel/Netlify ready

## 📁 Project Structure

```
src/
├── components/
│   ├── Login.js              # Authentication page
│   ├── Layout.js             # Main layout with sidebar/topbar
│   ├── Dashboard.js          # Contracts list with filters
│   ├── ContractDetail.js     # Individual contract details
│   ├── UploadModal.js        # File upload modal
│   ├── ProtectedRoute.js     # Route protection wrapper
│   ├── Insights.js           # Insights page (placeholder)
│   ├── Reports.js            # Reports page (placeholder)
│   └── Settings.js           # Settings page (placeholder)
├── context/
│   ├── AuthContext.js        # Authentication state management
│   └── ContractsContext.js   # Contracts state management
├── App.js                    # Main app component with routing
└── index.js                  # App entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd saas-contracts-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Login Credentials

- **Username**: Any username (e.g., "admin", "user", "demo")
- **Password**: `test123`

## 📊 Mock Data

The application uses JSON files for mock data:

- `public/contracts.json` - List of contracts
- `public/contract-details.json` - Detailed contract information

## 🎨 UI/UX Features

### Responsive Design

- Mobile-first approach with Tailwind CSS
- Collapsible sidebar on mobile devices
- Responsive tables and cards

### State Management

- Loading states for all async operations
- Error handling with user-friendly messages
- Empty states with helpful guidance
- Form validation and feedback

### User Experience

- Smooth navigation between pages
- Drag & drop file upload
- Real-time search and filtering
- Pagination for large datasets
- Modal dialogs for detailed views

## 🔧 Key Components

### Authentication (AuthContext)

- Mock JWT-based authentication
- Persistent login state with localStorage
- Protected route handling

### Contracts Management (ContractsContext)

- Contract listing with search/filter
- File upload simulation
- Contract details fetching
- Pagination state management

### Dashboard Features

- **Search**: Real-time search by contract name or parties
- **Filters**: Status (Active, Expired, Renewal Due) and Risk (Low, Medium, High)
- **Pagination**: 10 items per page with navigation
- **Upload**: Drag & drop file upload with progress tracking

### Contract Details

- **Metadata**: Contract information and status
- **Clauses**: Key contract clauses with confidence scores
- **AI Insights**: Risk analysis and recommendations
- **Evidence Panel**: Source snippets with relevance scores

## 🎯 Design Decisions

### State Management

- **Context API**: Chosen over Redux for simplicity and project size
- **Separation of Concerns**: Auth and Contracts contexts separated
- **Local Storage**: For authentication persistence

### Styling Approach

- **Tailwind CSS**: Utility-first CSS for rapid development
- **Component-based**: Reusable styling patterns
- **Responsive**: Mobile-first design principles

### Mock API Strategy

- **Static JSON**: Simple mock data for demonstration
- **Realistic Data**: Comprehensive contract information
- **Error Simulation**: Realistic loading and error states

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Deploy to Netlify

1. Build the project: `npm run build`
2. Drag the `build` folder to Netlify
3. Or connect your Git repository

## 🔮 Future Enhancements

- Real API integration
- Advanced filtering and sorting
- Contract templates
- Notification system
- Export functionality
- Advanced analytics dashboard
- Multi-tenant support

## 🐛 Known Issues

- File upload is simulated (no actual file processing)
- Mock authentication (not production-ready)
- Limited contract data (5 sample contracts)

## 📝 License

This project is created for demonstration purposes.

## 👨‍💻 Developer Notes

### Assumptions Made

1. **Authentication**: Simple mock auth sufficient for demo
2. **Data**: Static JSON files adequate for showcase
3. **File Upload**: Simulation acceptable for UI/UX demonstration
4. **Browser Support**: Modern browsers with ES6+ support

### Performance Considerations

- Lazy loading for large datasets
- Debounced search functionality
- Optimized re-renders with proper state management
- Minimal bundle size with tree shaking

### Accessibility

- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly
- Color contrast compliance

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
