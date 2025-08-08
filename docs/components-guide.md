# Components Implementation Guide

The Components implementation uses React with TypeScript and Vite to provide a modern, flexible component-based integration of Zoom Meeting SDK.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd components
npm install
```

### 2. Start Development Server

```bash
npm start
```

Access the application at `http://localhost:3000`

### 3. Build for Production

```bash
npm run build
```

## 📁 File Structure

```
components/
├── src/
│   ├── index.tsx              # Main React entry point
│   ├── utils/
│   │   └── platform.ts        # Platform utilities
│   └── vite-env.d.ts          # Vite environment types
├── public/
│   ├── cdn.html               # CDN implementation reference
│   ├── nav.html               # Navigation component
│   ├── image/                 # Static images
│   └── tools/                 # Utility scripts
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite configuration
└── README.md                  # Component-specific documentation
```

## 🎨 Features

### UI Features
- **Component-Based Architecture**: Modular, reusable components
- **TypeScript Support**: Full type safety and IntelliSense
- **Modern Build System**: Fast development with Vite
- **Responsive Design**: Mobile-first approach

### Technical Features
- **React 18**: Latest React features and hooks
- **TypeScript**: Type-safe development
- **Vite**: Lightning-fast build tool
- **ESLint + Prettier**: Code quality and formatting
- **Husky**: Git hooks for quality assurance

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
    "redux-thunk": "2.4.2",
    "lodash": "^4.17.21"
  },
  "devDependencies": {
    "@types/react": "^18.2.34",
    "@types/react-dom": "^18.2.14",
    "@typescript-eslint/eslint-plugin": "^6.9.1",
    "@typescript-eslint/parser": "^6.9.1",
    "@vitejs/plugin-react-swc": "^3.10.2",
    "eslint": "^8.52.0",
    "eslint-config-airbnb": "^19.0.4",
    "eslint-config-airbnb-typescript": "^17.1.0",
    "prettier": "^3.6.2",
    "typescript": "^5.8.3",
    "vite": "^7.0.4"
  }
}
```

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### Vite Configuration

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});
```

## 🎯 Implementation Details

### SDK Initialization

```typescript
import ZoomMtgEmbedded from '@zoom/meetingsdk/embedded';

interface ZoomConfig {
  debug: boolean;
  zoomAppRoot: HTMLElement;
  language: string;
  patchJsMedia: boolean;
}

const initializeZoomSDK = (config: ZoomConfig) => {
  const client = ZoomMtgEmbedded.createClient();
  
  client.init({
    debug: config.debug,
    zoomAppRoot: config.zoomAppRoot,
    language: config.language,
    patchJsMedia: config.patchJsMedia
  });
  
  return client;
};
```

### Meeting Component

```typescript
import React, { useEffect, useRef } from 'react';

interface MeetingProps {
  meetingNumber: string;
  password: string;
  role: number;
  signature: string;
  userName: string;
}

const MeetingComponent: React.FC<MeetingProps> = ({
  meetingNumber,
  password,
  role,
  signature,
  userName
}) => {
  const meetingRef = useRef<HTMLDivElement>(null);
  const clientRef = useRef<any>(null);

  useEffect(() => {
    if (meetingRef.current) {
      const client = ZoomMtgEmbedded.createClient();
      
      client.init({
        debug: true,
        zoomAppRoot: meetingRef.current,
        language: 'en-US',
        patchJsMedia: true
      });

      clientRef.current = client;

      // Join meeting
      client.join({
        sdkKey: process.env.REACT_APP_ZOOM_SDK_KEY,
        signature,
        meetingNumber,
        password,
        userName,
        role
      });

      // Event listeners
      client.on('meeting:started', () => {
        console.log('Meeting started');
      });

      client.on('meeting:ended', () => {
        console.log('Meeting ended');
      });

      return () => {
        client.leaveMeeting();
      };
    }
  }, [meetingNumber, password, role, signature, userName]);

  return <div ref={meetingRef} style={{ width: '100%', height: '100vh' }} />;
};

export default MeetingComponent;
```

### Form Component

```typescript
import React, { useState } from 'react';

interface MeetingFormProps {
  onJoinMeeting: (data: MeetingData) => void;
}

interface MeetingData {
  meetingNumber: string;
  password: string;
  role: number;
  userName: string;
}

const MeetingForm: React.FC<MeetingFormProps> = ({ onJoinMeeting }) => {
  const [formData, setFormData] = useState<MeetingData>({
    meetingNumber: '',
    password: '',
    role: 0,
    userName: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onJoinMeeting(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'role' ? parseInt(value) : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="meeting-form">
      <div className="form-group">
        <label htmlFor="userName">Name</label>
        <input
          type="text"
          id="userName"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="meetingNumber">Meeting Number</label>
        <input
          type="text"
          id="meetingNumber"
          name="meetingNumber"
          value={formData.meetingNumber}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="role">Role</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="form-control"
        >
          <option value={0}>Attendee</option>
          <option value={1}>Host</option>
        </select>
      </div>
      
      <button type="submit" className="btn btn-primary">
        Join Meeting
      </button>
    </form>
  );
};

export default MeetingForm;
```

## 🛠️ Customization

### Styling with CSS Modules

```typescript
// MeetingForm.module.css
.form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.formGroup {
  margin-bottom: 15px;
}

.formControl {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.button {
  background-color: #007AFF;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.button:hover {
  background-color: #0063CC;
}
```

### Custom Hooks

```typescript
// hooks/useZoomMeeting.ts
import { useState, useEffect } from 'react';
import ZoomMtgEmbedded from '@zoom/meetingsdk/embedded';

interface UseZoomMeetingProps {
  meetingNumber: string;
  password: string;
  role: number;
  signature: string;
  userName: string;
}

export const useZoomMeeting = ({
  meetingNumber,
  password,
  role,
  signature,
  userName
}: UseZoomMeetingProps) => {
  const [client, setClient] = useState<any>(null);
  const [isJoined, setIsJoined] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const zoomClient = ZoomMtgEmbedded.createClient();
    
    zoomClient.init({
      debug: true,
      language: 'en-US',
      patchJsMedia: true
    });

    setClient(zoomClient);

    return () => {
      if (zoomClient) {
        zoomClient.leaveMeeting();
      }
    };
  }, []);

  const joinMeeting = async () => {
    if (!client) return;

    try {
      await client.join({
        sdkKey: process.env.REACT_APP_ZOOM_SDK_KEY,
        signature,
        meetingNumber,
        password,
        userName,
        role
      });
      
      setIsJoined(true);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to join meeting');
    }
  };

  const leaveMeeting = () => {
    if (client) {
      client.leaveMeeting();
      setIsJoined(false);
    }
  };

  return {
    client,
    isJoined,
    error,
    joinMeeting,
    leaveMeeting
  };
};
```

## 🔍 Troubleshooting

### Common Issues

1. **TypeScript Errors**
   ```bash
   # Check TypeScript configuration
   npx tsc --noEmit
   
   # Fix linting issues
   npm run lint:fix
   ```

2. **Build Errors**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

3. **SDK Integration Issues**
   ```typescript
   // Check SDK version
   console.log('SDK Version:', client.getSDKVersion());
   
   // Enable debug mode
   client.init({
     debug: true,
     logLevel: 'debug'
   });
   ```

### Development Tools

```typescript
// Development utilities
const devUtils = {
  logSDKVersion: (client: any) => {
    console.log('SDK Version:', client.getSDKVersion());
  },
  
  enableDebugMode: (client: any) => {
    client.init({
      debug: true,
      logLevel: 'debug'
    });
  },
  
  monitorEvents: (client: any) => {
    client.on('*', (event: string, data: any) => {
      console.log('Event:', event, 'Data:', data);
    });
  }
};
```

## 📚 Additional Resources

- [React Documentation](https://reactjs.org/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/guide/)
- [Zoom Meeting SDK Documentation](https://developers.zoom.us/docs/meeting-sdk/web/)

## 🏛️ ZFG Configuration

For Zoom for Government applications:

```typescript
// ZFG-specific configuration
const client = ZoomMtgEmbedded.createClient();

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