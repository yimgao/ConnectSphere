# ConnectSphere

A web/mobile application for students to find study partners, form study groups, and collaborate effectively.

## 🎯 Features

- **Smart Matching Algorithm**: Find study partners based on courses, learning styles, and availability
- **User Profiles**: Detailed profiles with courses, study preferences, and scheduling information
- **Study Groups**: Create and join study groups with organized channels
- **Real-time Chat**: Instant messaging and file sharing capabilities
- **Schedule Coordination**: Find overlapping availability for group study sessions
- **Apple-inspired UI**: Clean, intuitive, and minimal design following Apple's design principles

## 🏗️ Architecture

### Frontend
- **Framework**: Next.js 14+ with TypeScript
- **Styling**: Tailwind CSS with custom components
- **State Management**: Apollo Client for GraphQL
- **Forms**: React Hook Form with validation
- **UI Components**: Custom components following Apple design principles

### Backend
- **Runtime**: Node.js with TypeScript
- **API**: GraphQL with Apollo Server
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with bcryptjs
- **Real-time**: Socket.io for chat functionality

### Database Models
- **Users**: Authentication and basic profile information
- **Profiles**: Study preferences, courses, availability, learning styles
- **Groups**: Study groups with member management
- **Messages**: Real-time messaging with reactions and attachments

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/devming0576/ConnectSphere.git
   cd ConnectSphere
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   npm run build
   npm run dev
   ```

3. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Environment Variables**

   Backend `.env`:
   ```
   PORT=4000
   MONGODB_URI=mongodb://localhost:27017/connectsphere
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:3000
   ```

   Frontend `.env.local`:
   ```
   NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql
   ```

### Running the Application

1. **Start MongoDB** (if running locally)
2. **Start the backend server**:
   ```bash
   cd backend && npm run dev
   ```
3. **Start the frontend development server**:
   ```bash
   cd frontend && npm run dev
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend GraphQL: http://localhost:4000/graphql

## 📚 API Documentation

### GraphQL Schema

#### Authentication
- `register(input: RegisterInput!)`: Create a new user account
- `login(input: LoginInput!)`: Authenticate user and get JWT token
- `me`: Get current user information

#### Profiles
- `createProfile(input: ProfileInput!)`: Create user study profile
- `updateProfile(input: ProfileInput!)`: Update existing profile

#### Study Matching
- `findStudyPartners(course, studyStyle, availability)`: Find compatible study partners

### REST Endpoints
- `GET /health`: Health check endpoint

## 🎨 Design Principles

ConnectSphere follows Apple's Human Interface Guidelines:

- **Clarity**: Clear visual hierarchy with proper typography and spacing
- **Simplicity**: Minimal interface focused on essential features
- **Consistency**: Uniform design patterns and interactions
- **Responsiveness**: Fluid animations and immediate feedback
- **Accessibility**: High contrast, readable fonts, and keyboard navigation

## 🧪 Testing

```bash
# Backend tests
cd backend && npm test

# Frontend tests  
cd frontend && npm test
```

## 🚀 Deployment

### Backend Deployment
The backend can be deployed to platforms like:
- Heroku
- Railway
- Vercel Functions
- AWS Lambda

### Frontend Deployment
The frontend can be deployed to:
- Vercel (recommended)
- Netlify
- GitHub Pages

### Database
For production, use:
- MongoDB Atlas (recommended)
- AWS DocumentDB
- Azure Cosmos DB

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔮 Roadmap

- [ ] Mobile app with React Native
- [ ] Video calling integration
- [ ] Study session scheduling
- [ ] Achievement system
- [ ] University integration
- [ ] Advanced matching algorithms
- [ ] File sharing and collaboration tools
- [ ] Study analytics and insights

## 📧 Contact

For questions or support, please reach out through GitHub issues or contact the development team.

---

Built with ❤️ for students who learn better together.
0.1
