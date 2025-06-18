🚊 Training Tracks
An interactive learning journey visualization system for technical training programs. Built with the subway metaphor in mind - each program has its own track with stations representing learning milestones.

Features
Visual Train Track Metaphor: Each track appears as a colored railway line with stations
Intuitive Editing: Click to edit track names, hover to reveal station controls
Flexible Station Management: Add, edit, delete, and reorder learning stations
Responsive Design: Works seamlessly on desktop, tablet, and mobile
Future-Ready: Designed to support interconnected subway system of learning tracks
Quick Start
Prerequisites
Node.js (v14 or higher)
npm or yarn
Installation
Clone the repository:
bash
git clone https://github.com/yourusername/training-tracks.git
cd training-tracks
Install dependencies:
bash
npm install
Start the development server:
bash
npm start
Open http://localhost:3000 to view it in your browser.
Usage
Creating a Track
Enter a track name (e.g., "Confidential Computing", "Virtualization")
Click "Create Track"
Your track starts with a beginning and destination station
Managing Stations
Edit Station: Click the edit icon when hovering over a station
Add Station: Click "Add Station" buttons between existing stations
Delete Station: Click the trash icon (minimum 2 stations required)
Edit Track Name: Click on the track title to rename
Station Information
Each station contains:

Name: Clear, descriptive title
Description: Brief explanation of what learners will gain
Link: Direct access to learning materials (videos, docs, websites, books)
Deployment
Deploy to Vercel (Recommended)
Push your code to GitHub
Connect your GitHub repo to Vercel
Vercel will automatically build and deploy your app
Deploy to Netlify
Build the project: npm run build
Drag the build folder to Netlify
Or connect your GitHub repo for automatic deployments
Deploy to GitHub Pages
Install gh-pages: npm install --save-dev gh-pages
Add to package.json scripts: "deploy": "gh-pages -d build"
Run: npm run build && npm run deploy
Project Structure
training-tracks/
├── public/
│   └── index.html
├── src/
│   ├── App.js          # Main component
│   ├── App.css         # Styles with Tailwind
│   ├── index.js        # React entry point
│   └── index.css       # Global styles
├── package.json
└── README.md
Future Enhancements
Subway System: Interconnected tracks with shared learning stations
Progress Tracking: Mark completed stations and track learner progress
User Authentication: Role-based access for program owners and learners
Analytics: Track learning engagement and completion rates
Export/Import: Share track configurations between organizations
Technologies Used
React 18: Modern React with hooks
Tailwind CSS: Utility-first CSS framework
Lucide React: Beautiful, customizable icons
Create React App: Zero-configuration build setup
Contributing
Fork the repository
Create a feature branch: git checkout -b feature-name
Commit your changes: git commit -am 'Add feature'
Push to the branch: git push origin feature-name
Submit a pull request
License
This project is licensed under the MIT License - see the LICENSE file for details.

Support
For questions or support, please open an issue on GitHub or contact the development team.

Built with ❤️ for effective technical training and learning journeys.

