# NexTrack - Financial Management Application

A modern, AI-powered financial management application built with Next.js, TypeScript, and Tailwind CSS.

## Features

### Core Functionality
- **Income Tracking**: Record and categorize income transactions
- **Expense Tracking**: Track expenses across multiple categories
- **Budget Management**: Set and monitor spending budgets
- **AI Budget Suggestions**: Get intelligent budget recommendations based on spending patterns
- **Data Visualization**: Interactive charts and graphs for financial insights
- **CSV Import**: Import transactions from bank statements
- **Data Export**: Export your financial data for backup

### Design Features
- **Modern UI**: Clean, intuitive interface with teal color scheme
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Custom Typography**: PT Sans for body text, Space Grotesk for headings
- **Data Visualization**: Beautiful charts using Recharts library
- **Local Storage**: Secure data storage in your browser

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Date Handling**: date-fns
- **State Management**: React hooks with localStorage

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd NextTrack
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Usage

### Adding Transactions
1. Navigate to "Income" or "Expenses" tab
2. Fill in the transaction details (amount, category, description, date)
3. Add optional tags for better organization
4. Submit to save the transaction

### Setting Budgets
1. Go to "Budgets" tab
2. View AI-generated budget suggestions based on your spending
3. Create custom budgets for different categories
4. Monitor budget progress with visual indicators

### Importing Data
1. Navigate to "Import" tab
2. Prepare a CSV file with columns: Description, Amount, Category, Date
3. Upload the file to import transactions
4. Review and confirm imported data

### Data Export
1. Go to "Settings" tab
2. Click "Export Data" to download your financial data as JSON
3. Use this for backup or migration purposes

## Color Scheme

- **Primary**: Teal (#138585) - Trust and clarity
- **Background**: Very light cyan (#E0F8F8) - Clean, airy feel
- **Accent**: Soft sky blue (#77B5FE) - Highlight actions
- **Text**: Dark gray (#1a202c) for primary text, medium gray (#4a5568) for secondary

## Typography

- **Body Text**: PT Sans - Humanist sans-serif for readability
- **Headings**: Space Grotesk - Bold geometric font for modern appeal

## Data Storage

All data is stored locally in your browser's localStorage. No data is sent to external servers, ensuring complete privacy and security.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository. 