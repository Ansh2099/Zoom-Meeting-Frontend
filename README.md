# Zoom Meeting Frontend

A comprehensive collection of Zoom Meeting SDK implementations for web applications, featuring multiple approaches to integrate Zoom meetings into your web projects.

## 🚀 Features

- **Multiple Implementation Approaches**: CDN, Local, and Component-based implementations
- **Modern UI/UX**: Responsive design with dark/light theme support
- **TypeScript Support**: Full TypeScript implementation in Components
- **Authentication Ready**: Built-in authentication endpoint integration
- **Cross-Platform**: Works across all modern browsers

## 📁 Project Structure

```
├── 📁 cdn/                    # CDN-based implementation
│   ├── index.html             # Main entry point
│   ├── meeting.html           # Meeting interface
│   ├── js/                    # JavaScript files
│   └── package.json           # Dependencies
├── 📁 local/                  # Local NPM implementation
│   ├── index.html             # Main entry point
│   ├── meeting.html           # Meeting interface
│   ├── js/                    # JavaScript files
│   └── package.json           # Dependencies
├── 📁 components/             # React/TypeScript implementation
│   ├── src/                   # Source code
│   ├── public/                # Static assets
│   └── package.json           # Dependencies
└── 📁 docs/                   # Documentation
```

## 🎯 Implementation Types

### 1. CDN Implementation (`/cdn`)
- **Technology**: Vanilla JavaScript + CDN
- **Use Case**: Quick integration, no build process
- **Features**: 
  - Direct CDN integration
  - Simple setup
  - Lightweight

### 2. Local Implementation (`/local`)
- **Technology**: React + Webpack + NPM
- **Use Case**: Traditional client view with npm packages
- **Features**:
  - NPM package integration
  - Webpack bundling
  - Full client view experience

### 3. Components Implementation (`/components`)
- **Technology**: React + TypeScript + Vite
- **Use Case**: Modern, flexible component-based integration
- **Features**:
  - TypeScript support
  - Component-based architecture
  - Modern build tools
  - Customizable UI components

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Zoom Meeting SDK credentials

### 1. Clone the Repository
```bash
git clone https://github.com/Ansh2099/Zoom-Meeting-Frontend.git
cd Zoom-Meeting-Frontend
```

### 2. Choose Your Implementation

#### CDN Implementation
```bash
cd cdn
# No build process needed - open index.html directly
```

#### Local Implementation
```bash
cd local
npm install
npm start
```

#### Components Implementation
```bash
cd components
npm install
npm start
```

### 3. Set Up Authentication

All implementations require a Zoom Meeting SDK authentication backend:

```bash
git clone https://github.com/zoom/meetingsdk-auth-endpoint-sample --depth 1
cd meetingsdk-auth-endpoint-sample
cp .env.example .env
```

Edit `.env` with your credentials:
```env
CLIENT_SECRET=your_client_secret_here
# or
ZOOM_MEETING_SDK_SECRET=your_sdk_secret_here
```

Start the auth backend:
```bash
npm install && npm run start
```

### 4. Access the Application

- **CDN**: Open `cdn/index.html` in your browser
- **Local**: http://localhost:9999
- **Components**: http://localhost:3000

## 🎨 Features

### UI/UX Features
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Theme Support**: Dark and light theme with auto-detection
- **Modern Interface**: Clean, intuitive user interface
- **Accessibility**: WCAG compliant design

### Technical Features
- **Real-time Communication**: Full Zoom meeting functionality
- **Screen Sharing**: Built-in screen sharing capabilities
- **Recording**: Meeting recording support
- **Chat**: In-meeting chat functionality
- **Breakout Rooms**: Support for breakout room features

## 📚 Documentation

### API Reference
- [Zoom Meeting SDK Documentation](https://developers.zoom.us/docs/meeting-sdk/web/)
- [Authentication Guide](https://developers.zoom.us/docs/meeting-sdk/auth/)
- [Gallery View Requirements](https://developers.zoom.us/docs/meeting-sdk/web/gallery-view/)

### Implementation Guides
- [CDN Implementation Guide](./docs/cdn-guide.md)
- [Local Implementation Guide](./docs/local-guide.md)
- [Components Implementation Guide](./docs/components-guide.md)

## 🔧 Configuration

### Environment Variables
```env
# Required for authentication
CLIENT_SECRET=your_client_secret
ZOOM_MEETING_SDK_SECRET=your_sdk_secret

# Optional configurations
ZOOM_WEB_ENDPOINT=www.zoom.us
ZOOM_MEETING_SDK_ENDPOINT=https://api.zoom.us/v2
```

### Customization
Each implementation can be customized:
- **Styling**: Modify CSS files for custom themes
- **Functionality**: Extend JavaScript/TypeScript files
- **Components**: Customize React components in `/components`

## 🏛️ Zoom for Government (ZFG)

For government applications, use ZFG-specific configurations:

### ZFG SDK Version
```json
{
  "dependencies": {
    "@zoom/meetingsdk": "3.11.2-zfg"
  }
}
```

### ZFG Endpoints
```javascript
// Client View
ZoomMtg.setZoomJSLib("https://source.zoomgov.com/{VERSION}/lib", "/av");
ZoomMtg.init({
   webEndpoint: "www.zoomgov.com",
});

// Component View
const client = ZoomMtgEmbedded.createClient();
client.init({
 assetPath: 'https://source.zoomgov.com/{VERSION}/lib/av',
 webEndpoint: "www.zoomgov.com"
});
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure cross-browser compatibility

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- [Developer Support](https://developers.zoom.us/support/) - Technical support
- [Developer Forum](https://devforum.zoom.us) - Community discussions
- [Issues](https://github.com/Ansh2099/Zoom-Meeting-Frontend/issues) - Report bugs or request features

## 🙏 Acknowledgments

- [Zoom Developer Platform](https://developers.zoom.us/) for the Meeting SDK
- [React](https://reactjs.org/) for the component-based architecture
- [Vite](https://vitejs.dev/) for the modern build tooling

---

**Note**: Use of this sample app is subject to Zoom's [Terms of Use](https://explore.zoom.us/en/legal/zoom-api-license-and-tou/).
