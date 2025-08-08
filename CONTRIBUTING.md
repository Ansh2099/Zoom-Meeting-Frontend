
# Contributing to Zoom Meeting Frontend

Thank you for your interest in contributing to the Zoom Meeting Frontend project! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### 1. Fork and Clone

1. Fork the repository to your GitHub account
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Zoom-Meeting-Frontend.git
   cd Zoom-Meeting-Frontend
   ```

### 2. Set Up Development Environment

#### Prerequisites
- Node.js 16+ 
- npm or yarn
- Git

#### Installation
```bash
# Install dependencies for all implementations
cd cdn && npm install
cd ../local && npm install  
cd ../components && npm install
```

### 3. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 4. Make Your Changes

Follow the coding standards and guidelines below.

### 5. Test Your Changes

```bash
# Test CDN implementation
cd cdn
# Open index.html in browser

# Test Local implementation
cd ../local
npm start

# Test Components implementation
cd ../components
npm start
```

### 6. Commit Your Changes

Use conventional commit messages:

```bash
git commit -m "feat: add new meeting controls"
git commit -m "fix: resolve authentication issue"
git commit -m "docs: update README with new features"
```

### 7. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## 📋 Development Guidelines

### Code Style

#### JavaScript/TypeScript
- Use ES6+ features
- Follow Airbnb JavaScript Style Guide
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

```javascript
/**
 * Joins a Zoom meeting with the provided parameters
 * @param {string} meetingNumber - The meeting number
 * @param {string} password - The meeting password
 * @param {number} role - The user role (0 for attendee, 1 for host)
 * @param {string} signature - The authentication signature
 * @returns {Promise<void>}
 */
async function joinMeeting(meetingNumber, password, role, signature) {
  // Implementation
}
```

#### CSS/SCSS
- Use BEM methodology for class naming
- Follow mobile-first responsive design
- Use CSS custom properties for theming

```css
.meeting-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.meeting-form__input {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
}

.meeting-form__button {
  background-color: var(--primary-color);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
```

#### React Components
- Use functional components with hooks
- Follow TypeScript best practices
- Implement proper prop validation

```typescript
interface MeetingFormProps {
  onSubmit: (data: MeetingData) => void;
  loading?: boolean;
}

const MeetingForm: React.FC<MeetingFormProps> = ({ onSubmit, loading = false }) => {
  // Component implementation
};
```

### File Organization

```
project/
├── cdn/                    # CDN implementation
│   ├── index.html
│   ├── js/
│   └── package.json
├── local/                  # Local implementation
│   ├── index.html
│   ├── js/
│   └── package.json
├── components/             # React/TypeScript implementation
│   ├── src/
│   ├── public/
│   └── package.json
└── docs/                   # Documentation
    ├── cdn-guide.md
    ├── local-guide.md
    └── components-guide.md
```

### Testing

#### Manual Testing
- Test on different browsers (Chrome, Firefox, Safari, Edge)
- Test on mobile devices
- Test with different Zoom meeting scenarios

#### Automated Testing
```bash
# Run linting
npm run lint

# Run TypeScript checks
npm run type-check

# Run build tests
npm run build
```

### Documentation

- Update README.md for new features
- Add JSDoc comments for new functions
- Update relevant guide files in `/docs`
- Include screenshots for UI changes

## 🐛 Bug Reports

### Before Submitting a Bug Report

1. Check existing issues
2. Test on different browsers
3. Verify with latest version
4. Check browser console for errors

### Bug Report Template

```markdown
**Bug Description**
Brief description of the issue

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Environment**
- Browser: [e.g. Chrome 120]
- OS: [e.g. Windows 11]
- Implementation: [CDN/Local/Components]

**Additional Information**
Screenshots, console logs, etc.
```

## 💡 Feature Requests

### Feature Request Template

```markdown
**Feature Description**
Brief description of the feature

**Use Case**
Why this feature is needed

**Proposed Implementation**
How you suggest implementing it

**Additional Information**
Mockups, examples, etc.
```

## 🔧 Development Setup

### Environment Variables

Create `.env` files for each implementation:

```bash
# cdn/.env
ZOOM_SDK_KEY=your_sdk_key
ZOOM_SDK_SECRET=your_sdk_secret

# local/.env
REACT_APP_ZOOM_SDK_KEY=your_sdk_key
REACT_APP_ZOOM_SDK_SECRET=your_sdk_secret

# components/.env
VITE_ZOOM_SDK_KEY=your_sdk_key
VITE_ZOOM_SDK_SECRET=your_sdk_secret
```

### Authentication Backend

Set up the authentication backend:

```bash
git clone https://github.com/zoom/meetingsdk-auth-endpoint-sample
cd meetingsdk-auth-endpoint-sample
cp .env.example .env
# Edit .env with your credentials
npm install && npm start
```

## 📝 Commit Message Guidelines

Use conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test changes
- `chore`: Build/tool changes

### Examples
```bash
git commit -m "feat(cdn): add dark theme support"
git commit -m "fix(components): resolve TypeScript compilation error"
git commit -m "docs: update installation instructions"
```

## 🚀 Release Process

### Pre-release Checklist
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] Version numbers are updated
- [ ] Changelog is updated
- [ ] Builds are successful

### Release Steps
1. Update version in package.json files
2. Update CHANGELOG.md
3. Create release tag
4. Push to main branch
5. Create GitHub release

## 🤝 Code Review Process

### Review Checklist
- [ ] Code follows style guidelines
- [ ] Tests are included
- [ ] Documentation is updated
- [ ] No breaking changes (or properly documented)
- [ ] Security considerations addressed

### Review Guidelines
- Be constructive and respectful
- Focus on code quality and functionality
- Suggest improvements when possible
- Test the changes locally

## 📞 Getting Help

- **Issues**: Use GitHub Issues for bugs and feature requests
- **Discussions**: Use GitHub Discussions for questions
- **Documentation**: Check `/docs` folder for implementation guides

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Zoom Meeting Frontend! 🎉
