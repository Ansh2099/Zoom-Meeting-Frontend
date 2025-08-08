# Zoom Web Meeting SDK - Hardcoded Meeting Integration

This is a modified version of the Zoom Web Meeting SDK sample that includes hardcoded meeting details and enhanced functionality for quick meeting access.

## Features

### 🎯 Hardcoded Meeting Details
- **Meeting Number**: 8061256218
- **Display Name**: Prompted from user (default: "Ansh")
- **Email**: anshpreetwork1009@gmail.com
- **Password**: [INSERT_YOUR_MEETING_PASSWORD] (replace with actual password)

### 🚀 New Buttons & Functionality

#### 1. "Join Now" Button (Green)
- **Function**: Prompts for display name, auto-fills the form with hardcoded values and immediately joins the meeting
- **Behavior**: 
  - Prompts user for display name (with default "Ansh")
  - Automatically fills all other meeting details
  - Gets signature from server
  - Opens meeting in new tab
  - Shows toast notifications for status updates

#### 2. "Copy Join Link" Button (Blue)
- **Function**: Prompts for display name, generates and copies the direct join link to clipboard
- **Behavior**:
  - Prompts user for display name (with default "Ansh")
  - Auto-fills form with hardcoded values
  - Generates complete join URL with signature
  - Copies to clipboard using modern API (with fallback)
  - Shows "Link copied!" toast notification

#### 3. Enhanced User Experience
- **Toast Notifications**: Modern toast system for user feedback
- **Auto-fill on Demand**: Form populated with hardcoded values when buttons are clicked
- **Persistence**: Values saved to cookies for consistency
- **Error Handling**: Improved error messages and user feedback

## Setup Instructions

### 1. Update Meeting Password
In `js/index.js`, find the `HARDCODED_MEETING_DETAILS` object and replace the password:

```javascript
const HARDCODED_MEETING_DETAILS = {
  meetingNumber: "8061256218",
  password: "YOUR_ACTUAL_PASSWORD_HERE", // Replace this
  displayName: "Ansh",
  email: "anshpreetwork1009@gmail.com"
};
```

### 2. Start the Auth Server
You need to run the signature generation server on `http://127.0.0.1:4000`. This is required for the Zoom SDK to work.

### 3. Open the Application
Open `index.html` in your browser. The form fields will appear empty by default, but the hardcoded values are available when you use the buttons.

## Usage

### Quick Join
1. Click the **"Join Now"** button (green)
2. The meeting will automatically open in a new tab
3. No manual form filling required

### Copy Join Link
1. Click the **"Copy Join Link"** button (blue)
2. The complete join link is copied to your clipboard
3. Share this link with others to join the same meeting

### Manual Join
1. Use the **"Join"** button (blue) for manual form submission
2. Modify any fields if needed before joining

## File Structure

```
CDN/
├── index.html          # Main interface with hardcoded values
├── js/
│   ├── index.js        # Enhanced JavaScript with new functionality
│   ├── tool.js         # Helper functions (unchanged)
│   └── vconsole.min.js # Mobile debugging (unchanged)
├── meeting.html        # Meeting interface (unchanged)
└── README.md          # This file
```

## Customization

### Changing Meeting Details
To modify the hardcoded meeting details, edit the `HARDCODED_MEETING_DETAILS` object in `js/index.js`:

```javascript
const HARDCODED_MEETING_DETAILS = {
  meetingNumber: "YOUR_MEETING_NUMBER",
  password: "YOUR_MEETING_PASSWORD",
  email: "YOUR_EMAIL@example.com"
};
```

**Note**: Display name is now prompted from the user with a default value. To change the default name, modify the `defaultName` variable in the `promptForDisplayName()` function.

### Styling
The interface uses Bootstrap 5 with custom CSS. You can modify the styles in the `<style>` section of `index.html`.

## Technical Notes

- **Zoom SDK Version**: 4.0.0 (loaded via CDN)
- **Authentication**: Requires signature generation server
- **Browser Support**: Modern browsers with clipboard API support
- **Fallbacks**: Includes fallback methods for older browsers

## Troubleshooting

### Common Issues

1. **"Failed to get signature" error**
   - Ensure your auth server is running on `http://127.0.0.1:4000`
   - Check server logs for authentication errors

2. **Clipboard not working**
   - The app uses modern clipboard API with fallback
   - Ensure you're on HTTPS or localhost for clipboard functionality

3. **Meeting not joining**
   - Verify meeting number and password are correct
   - Check if the meeting is currently active
   - Ensure you have proper Zoom permissions

### Debug Mode
For mobile devices, the app automatically enables vConsole for debugging. Check the browser console for detailed logs.

## Security Notes

- Meeting passwords are stored in plain text in the code
- This is for development/testing purposes only
- For production use, implement proper security measures
- Never commit actual meeting passwords to version control

---

**Note**: This is a development sample. For production use, implement proper security, error handling, and user authentication. 