# AI Content Idea Generator

A web application that leverages artificial intelligence to generate creative and relevant content ideas for blog posts, videos, and social media content.

## Project Overview

The AI Content Idea Generator helps content creators, marketers, and social media managers overcome creative blocks by suggesting tailored content ideas based on their niche, audience, and goals. Using advanced AI algorithms, the platform analyzes trends, researches keywords, and generates engaging content ideas that resonate with target audiences.

## Key Features

- **Multi-platform Content Ideation**: Generate ideas for blogs, videos, social media posts, and more
- **Trend Analysis**: Discover trending topics in your niche to stay relevant
- **Keyword Optimization**: Get content ideas with built-in SEO potential
- **Content Calendar Planning**: Organize and schedule your content strategy
- **Personalized Suggestions**: Receive ideas tailored to your brand voice and audience
- **Idea Management**: Save, categorize, and export your favorite ideas

## Technology Stack

- **Frontend**: React.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB
- **AI Integration**: OpenAI API
- **Authentication**: JWT with OAuth options
- **Deployment**: Vercel (Frontend), Heroku (Backend)

## Getting Started

### Prerequisites
- Node.js 16+
- MongoDB
- OpenAI API key

### Installation
1. Clone the repository
```bash
git clone https://github.com/dxaginfo/ai-content-idea-generator-platform.git
cd ai-content-idea-generator-platform
```

2. Install dependencies
```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

3. Set up environment variables
```bash
# In the server directory, create a .env file with:
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```

4. Run the application
```bash
# Start backend server
cd server
npm run dev

# Start frontend in a new terminal
cd client
npm start
```

## Project Roadmap

- **Phase 1**: Core idea generation for blogs and social media
- **Phase 2**: Add trend analysis and keyword optimization
- **Phase 3**: Implement content calendar and scheduling
- **Phase 4**: Launch advanced analytics and team collaboration features

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or feedback, please open an issue in this repository.