# Documentation

Welcome to the Zoom Meeting Frontend documentation. This directory contains comprehensive guides for all three implementations of the Zoom Meeting SDK.

## 📚 Implementation Guides

### [CDN Implementation Guide](./cdn-guide.md)
Learn how to integrate Zoom Meeting SDK using CDN-hosted libraries. This is the simplest approach with no build process required.

**Key Features:**
- Direct CDN integration
- No build process
- Lightweight and fast
- Simple deployment

### [Local Implementation Guide](./local-guide.md)
Discover how to use React with Webpack and NPM packages for a traditional client view experience.

**Key Features:**
- NPM package integration
- Webpack bundling
- Hot reloading
- Full client view experience

### [Components Implementation Guide](./components-guide.md)
Explore the modern React with TypeScript and Vite implementation for flexible component-based integration.

**Key Features:**
- TypeScript support
- Component-based architecture
- Vite build system
- Modern development tools

## 🚀 Quick Start

1. **Choose Your Implementation**
   - **CDN**: For simple, quick integration
   - **Local**: For traditional client view
   - **Components**: For modern, flexible development

2. **Set Up Authentication**
   ```bash
   git clone https://github.com/zoom/meetingsdk-auth-endpoint-sample
   cd meetingsdk-auth-endpoint-sample
   cp .env.example .env
   # Edit .env with your credentials
   npm install && npm start
   ```

3. **Run Your Implementation**
   ```bash
   # CDN: Open index.html in browser
   # Local: npm start (runs on port 9999)
   # Components: npm start (runs on port 3000)
   ```

## 🔧 Configuration

### Environment Variables
Each implementation supports different environment variable prefixes:
- **CDN**: `ZOOM_*`
- **Local**: `REACT_APP_ZOOM_*`
- **Components**: `VITE_ZOOM_*`

### Authentication
All implementations require a Zoom Meeting SDK authentication backend. See the individual guides for specific setup instructions.

## 🎨 Customization

### Theming
All implementations support custom theming:
- Dark and light theme support
- CSS custom properties for easy customization
- Responsive design for all screen sizes

### Styling
- Modify CSS files for custom themes
- Use CSS custom properties for consistent theming
- Follow BEM methodology for class naming

## 🏛️ ZFG Support

For Zoom for Government (ZFG) applications, each implementation includes specific configurations:
- ZFG-specific endpoints
- Government-compliant settings
- Special authentication requirements

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/Ansh2099/Zoom-Meeting-Frontend/issues)
- **Documentation**: [Zoom Developer Docs](https://developers.zoom.us/docs/meeting-sdk/web/)
- **Community**: [Zoom Developer Forum](https://devforum.zoom.us)

## 📄 License

This documentation is part of the Zoom Meeting Frontend project and is licensed under the MIT License. 