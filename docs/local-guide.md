# Local Implementation Guide

The Local implementation uses React with Webpack and NPM packages to provide a traditional client view experience with full Zoom meeting functionality.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd local
npm install
```

### 2. Configure Webpack

The project uses a custom webpack configuration for development:

```javascript
// webpack.config.dev.js
module.exports = {
    mode: 'development',
    entry: './js/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    },
    devServer: {
        static: './',
        port: 9999,
        hot: true
    }
};
```

### 3. Start Development Server

```bash
npm start
```

Access the application at `http://localhost:9999`

## 📁 File Structure

```
local/
├── index.html              # Main entry point
├── meeting.html            # Meeting interface
├── js/
│   ├── index.js           # Main application logic
│   ├── meeting.js         # Meeting-specific functions
│   └── tool.js            # Utility functions
├── webpack.config.dev.js   # Webpack configuration
├── package.json           # Dependencies
└── .babelrc              # Babel configuration
```

## 🎨 Features

### UI Features
- **Responsive Design**: Optimized for all screen sizes
- **Modern Interface**: Clean, professional design
- **Form Validation**: Comprehensive input validation
- **Error Handling**: User-friendly error messages

### Technical Features
- **NPM Integration**: Uses official Zoom Meeting SDK package
- **Webpack Bundling**: Optimized build process
- **Hot Reloading**: Development with live updates
- **Full Client View**: Complete Zoom meeting experience

## 🔧 Configuration

### Package Dependencies

```json
{
  "dependencies": {
    "@zoom/meetingsdk": "4.0.0",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-redux": "8.1.2",
    "redux": "4.2.1",
    "redux-thunk": "2.4.2"
  },
  "devDependencies": {
    "@babel/core": "^7.22.0",
    "@babel/preset-env": "^7.22.0",
    "@babel/preset-react": "^7.22.0",
    "babel-loader": "^9.1.0",
    "webpack": "^5.88.0",
    "webpack-cli": "^5.1.0",
    "webpack-dev-server": "^4.15.0"
  }
}
```

### Babel Configuration

```json
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ]
}
```

## 🎯 Implementation Details

### SDK Initialization

```javascript
// Initialize Zoom Meeting SDK
import ZoomMtgEmbedded from '@zoom/meetingsdk/embedded';

const client = ZoomMtgEmbedded.createClient();

client.init({
    debug: true,
    zoomAppRoot: document.getElementById('meetingSDKElement'),
    language: 'en-US',
    patchJsMedia: true
});
```

### Meeting Join Function

```javascript
async function joinMeeting(meetingNumber, password, role, signature) {
    try {
        const joinParams = {
            sdkKey: 'your_sdk_key',
            signature: signature,
            meetingNumber: meetingNumber,
            password: password,
            userName: 'Your Name',
            role: role
        };

        const result = await client.join(joinParams);
        console.log('Meeting joined successfully:', result);
    } catch (error) {
        console.error('Failed to join meeting:', error);
    }
}
```

### Event Listeners

```javascript
// Meeting status events
client.on('meeting:started', () => {
    console.log('Meeting started');
});

client.on('meeting:ended', () => {
    console.log('Meeting ended');
});

client.on('meeting:failed', (error) => {
    console.error('Meeting failed:', error);
});

// Participant events
client.on('participant:joined', (participant) => {
    console.log('Participant joined:', participant);
});

client.on('participant:left', (participant) => {
    console.log('Participant left:', participant);
});
```

## 🛠️ Customization

### Styling Customization

```css
/* Custom meeting container styles */
#meetingSDKElement {
    width: 100%;
    height: 100vh;
    background: #f5f5f5;
}

/* Custom form styles */
.meeting-form {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

.form-group {
    margin-bottom: 15px;
}

.form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}
```

### Functionality Extension

```javascript
// Custom meeting controls
function addCustomControls() {
    const controls = {
        mute: () => client.inMeetingServiceListener('onAudioChange', { muted: true }),
        unmute: () => client.inMeetingServiceListener('onAudioChange', { muted: false }),
        startVideo: () => client.inMeetingServiceListener('onVideoChange', { muted: false }),
        stopVideo: () => client.inMeetingServiceListener('onVideoChange', { muted: true })
    };
    
    return controls;
}

// Custom error handling
function handleMeetingError(error) {
    const errorMessages = {
        'MEETING_NOT_FOUND': 'Meeting not found. Please check the meeting number.',
        'INVALID_PASSWORD': 'Invalid password. Please try again.',
        'MEETING_ENDED': 'This meeting has ended.',
        'NETWORK_ERROR': 'Network error. Please check your connection.'
    };
    
    const message = errorMessages[error.code] || 'An error occurred. Please try again.';
    showErrorMessage(message);
}
```

## 🔍 Troubleshooting

### Common Issues

1. **Build Errors**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **SDK Loading Issues**
   ```javascript
   // Check SDK version
   console.log('SDK Version:', client.getSDKVersion());
   
   // Enable debug mode
   client.init({
       debug: true,
       // ... other options
   });
   ```

3. **Authentication Problems**
   - Verify SDK key and secret
   - Check signature generation
   - Ensure backend is running

### Debug Mode

```javascript
// Enable comprehensive logging
client.init({
    debug: true,
    logLevel: 'debug',
    // ... other options
});

// Monitor all events
client.on('*', (event, data) => {
    console.log('Event:', event, 'Data:', data);
});
```

## 📚 Additional Resources

- [Zoom Meeting SDK Documentation](https://developers.zoom.us/docs/meeting-sdk/web/)
- [NPM Package Documentation](https://www.npmjs.com/package/@zoom/meetingsdk)
- [Webpack Configuration Guide](https://webpack.js.org/configuration/)

## 🏛️ ZFG Configuration

For Zoom for Government applications:

```javascript
// Use ZFG-specific configuration
client.init({
    debug: true,
    zoomAppRoot: document.getElementById('meetingSDKElement'),
    language: 'en-US',
    patchJsMedia: true,
    webEndpoint: 'www.zoomgov.com',
    assetPath: 'https://source.zoomgov.com/4.0.0/lib/av'
});
```

## 📄 License

This implementation is subject to Zoom's [Terms of Use](https://explore.zoom.us/en/legal/zoom-api-license-and-tou/). 