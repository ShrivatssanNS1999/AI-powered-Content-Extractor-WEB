# AI-Powered Content Extractor

A modern React application that extracts and analyzes web content using AI, featuring a Notion-like interface with advanced filtering and search capabilities.

## 🚀 Features

- **AI-Powered Content Extraction**: Extract summaries and key points from any public URL
- **Notion-Style Interface**: Clean, modern design with intuitive user experience
- **Advanced Filtering**: Filter by domain, date range, content length, and more
- **Real-time Search**: Search across summaries, key points, URLs, and domains
- **Data Persistence**: Content is saved locally and persists between sessions
- **Export Functionality**: Export individual items or all data as JSON
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Loading States**: Beautiful loading animations and progress indicators

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **API**: AI-Powered Content Extractor API

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-content-extractor
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🔧 Usage

### Extracting Content

1. Enter any public URL in the input field
2. Click "Extract Content" to analyze the webpage
3. The AI will generate a summary and key points
4. Results are automatically saved and displayed in the table view

### Filtering and Search

- **Search**: Use the search bar to find content across all fields
- **Domain Filter**: Filter results by specific domains
- **Date Range**: Filter by extraction date (today, week, month)
- **Sort Options**: Sort by date, domain, or content length
- **Sort Order**: Toggle between ascending and descending order

### Exporting Data

- **Individual Export**: Click the "Export" button on any content card
- **Bulk Export**: Use "Export All" in the header to download all data
- Data is exported in JSON format with full content and metadata

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── URLInput.tsx     # URL input form
│   ├── FilterControls.tsx # Filtering interface
│   ├── ContentCard.tsx  # Individual content display
│   └── EmptyState.tsx   # Empty state component
├── hooks/               # Custom React hooks
│   └── useContentExtraction.ts # Main data management hook
├── services/            # API services
│   └── api.ts          # Content extraction service
├── types/              # TypeScript type definitions
│   └── index.ts        # Core types
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🌐 API Integration

The application uses the AI-Powered Content Extractor API:

**Endpoint**: `https://ai-powered-content-extractor-api.onrender.com/extract`

**Request**:
```json
{
  "url": "https://example.com/article"
}
```

**Response**:
```json
{
  "summary": "AI-generated summary of the content...",
  "keyPoints": [
    "Key insight 1",
    "Key insight 2",
    "..."
  ]
}
```

## ⚡ Performance Features

- **Local Storage**: Content is cached locally for instant access
- **Optimized Rendering**: Efficient component updates and filtering
- **Responsive Images**: Optimized loading and display
- **Lazy Loading**: Components load as needed for better performance

## 🎨 Design System

- **Colors**: Blue primary (#3B82F6), Purple secondary (#8B5CF6), success green (#10B981)
- **Typography**: System fonts with careful hierarchy and spacing
- **Spacing**: Consistent 8px grid system
- **Shadows**: Subtle elevation for depth and focus
- **Animations**: Smooth transitions and micro-interactions

## 🚀 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

