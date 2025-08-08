# CDN Implementation Guide

The CDN implementation provides the simplest way to integrate Zoom Meeting SDK into your web application using CDN-hosted libraries.

## 🚀 Quick Start

### 1. Include Required Scripts

Add the following scripts to your HTML file:

```html
<!-- React and Redux (required for Zoom Meeting SDK) -->
<script src="https://source.zoom.us/4.0.0/lib/vendor/react.min.js"></script>
<script src="https://source.zoom.us/4.0.0/lib/vendor/react-dom.min.js"></script>
<script src="https://source.zoom.us/4.0.0/lib/vendor/redux.min.js"></script>
<script src="https://source.zoom.us/4.0.0/lib/vendor/redux-thunk.min.js"></script>

<!-- Zoom Meeting SDK -->
<script src="https://source.zoom.us/4.0.0/zoom-meeting-4.0.0.min.js"></script>
```

### 2. Initialize the SDK

```javascript
// Initialize Zoom Meeting SDK
ZoomMtg.setZoomJSLib('https://source.zoom.us/4.0.0/lib', '/av');
ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

// Set language
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');
```

### 3. Create Join Function

```javascript
function joinMeeting(meetingNumber, password, role, signature) {
    ZoomMtg.init({
        leaveUrl: 'https://your-domain.com/leave',
        success: function() {
            ZoomMtg.join({
                signature: signature,
                meetingNumber: meetingNumber,
                userName: 'Your Name',
                password: password,
                success: function(data) {
                    console.log('Meeting joined successfully');
                },
                error: function(error) {
                    console.error('Failed to join meeting:', error);
                }
            });
        }
    });
}
```

## 📁 File Structure

```
cdn/
├── index.html              # Main entry point with form
├── meeting.html            # Meeting interface
├── js/
│   ├── index.js           # Main JavaScript logic
│   ├── meeting.js         # Meeting-specific functions
│   └── tool.js            # Utility functions
└── package.json           # Dependencies (if any)
```

## 🎨 Features

### UI Features
- **Responsive Design**: Works on all device sizes
- **Theme Support**: Dark and light theme with auto-detection
- **Modern Interface**: Clean, intuitive design
- **Form Validation**: Built-in input validation

### Technical Features
- **CDN Integration**: No build process required
- **Real-time Communication**: Full Zoom meeting functionality
- **Screen Sharing**: Built-in screen sharing
- **Chat**: In-meeting chat functionality

## 🔧 Configuration

### Environment Setup
```javascript
// Configure Zoom endpoints
ZoomMtg.setZoomJSLib('https://source.zoom.us/4.0.0/lib', '/av');

// Set web endpoint
ZoomMtg.init({
    webEndpoint: 'www.zoom.us', // or 'www.zoomgov.com' for ZFG
    success: function() {
        console.log('SDK initialized successfully');
    }
});
```

### Authentication
```javascript
// Get signature from your backend
async function getSignature(meetingNumber, role) {
    const response = await fetch('/api/signature', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            meetingNumber: meetingNumber,
            role: role
        })
    });
    return response.json();
}
```

## 🎯 Usage Examples

### Basic Meeting Join
```javascript
// Join as attendee
joinMeeting('123456789', 'password123', 0, signature);

// Join as host
joinMeeting('123456789', 'password123', 1, signature);
```

### Custom Meeting Interface
```javascript
// Customize meeting options
ZoomMtg.join({
    signature: signature,
    meetingNumber: meetingNumber,
    userName: 'Your Name',
    password: password,
    success: function(data) {
        console.log('Meeting joined');
    },
    error: function(error) {
        console.error('Join failed:', error);
    },
    // Custom options
    webEndpoint: 'www.zoom.us',
    role: 0, // 0 for attendee, 1 for host
    lang: 'en-US'
});
```

## 🛠️ Customization

### Styling
```css
/* Custom theme colors */
:root {
    --primary-color: #007AFF;
    --secondary-color: #28a745;
    --background-color: #ffffff;
    --text-color: #000000;
}

/* Dark theme */
body.bg-dark {
    --background-color: #1a1a1a;
    --text-color: #ffffff;
}
```

### Functionality
```javascript
// Add custom event handlers
ZoomMtg.inMeetingServiceListener('onMeetingStatus', function(data) {
    console.log('Meeting status:', data);
});

// Custom error handling
ZoomMtg.inMeetingServiceListener('onError', function(error) {
    console.error('Meeting error:', error);
    // Handle error appropriately
});
```

## 🔍 Troubleshooting

### Common Issues

1. **SDK not loading**
   - Check CDN URLs are accessible
   - Verify internet connection
   - Check browser console for errors

2. **Authentication failed**
   - Verify signature is valid
   - Check meeting number and password
   - Ensure backend is running

3. **Meeting not joining**
   - Check meeting number format
   - Verify meeting exists and is active
   - Check role permissions

### Debug Mode
```javascript
// Enable debug logging
ZoomMtg.setLogLevel('debug');

// Check SDK version
console.log('SDK Version:', ZoomMtg.getSDKVersion());
```

## 📚 Additional Resources

- [Zoom Meeting SDK Documentation](https://developers.zoom.us/docs/meeting-sdk/web/)
- [CDN Implementation Examples](https://github.com/zoom/meetingsdk-web-sample)
- [Authentication Guide](https://developers.zoom.us/docs/meeting-sdk/auth/)

## 🏛️ ZFG Configuration

For Zoom for Government (ZFG) applications:

```javascript
// Use ZFG-specific endpoints
ZoomMtg.setZoomJSLib('https://source.zoomgov.com/4.0.0/lib', '/av');
ZoomMtg.init({
    webEndpoint: 'www.zoomgov.com'
});
```

## 📄 License

This implementation is subject to Zoom's [Terms of Use](https://explore.zoom.us/en/legal/zoom-api-license-and-tou/). 