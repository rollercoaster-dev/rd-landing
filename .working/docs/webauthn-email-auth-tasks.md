# WebAuthn and Email Authentication Implementation Tasks

## Project Overview

This document outlines the implementation plan for a highly accessible, privacy-focused authentication system using WebAuthn and email verification. The goal is to create an authentication experience that prioritizes the needs of neurodivergent users while maintaining strong security and privacy protections.

## Research Findings on Accessibility in Authentication

### WebAuthn Accessibility Benefits

WebAuthn (Web Authentication) offers significant accessibility advantages for users with cognitive and learning disabilities:

1. **Reduced Cognitive Load**: Eliminates the need to remember complex passwords, which is particularly beneficial for users with memory impairments, executive function challenges, and other cognitive disabilities.

2. **Simplified Authentication Flow**: Provides a more straightforward authentication process that reduces the number of steps required, helping users with executive function difficulties who struggle with multi-step processes.

3. **Consistent Experience**: Offers a consistent authentication experience across websites, reducing the learning curve for neurodivergent users who benefit from predictable patterns.

4. **Reduced Anxiety**: Eliminates the stress and anxiety associated with forgotten passwords, which can be particularly challenging for users with anxiety disorders or ADHD.

5. **Physical Authentication**: Leverages biometric authentication (fingerprint, face recognition) or security keys that don't rely on memory, benefiting users with memory impairments.

6. **Phishing Resistance**: Protects vulnerable users from phishing attacks that might otherwise exploit cognitive vulnerabilities.

7. **WCAG Compliance**: Automatically meets WCAG 3.3.7 requirements by providing authentication that doesn't rely on cognitive function tests.

### Email Verification Accessibility Considerations

Email verification presents several accessibility challenges for users with cognitive disabilities:

1. **Time Pressure**: Limited-time verification codes can create anxiety and pressure for users who process information more slowly.

2. **Multi-Step Process**: Switching between applications (email and website) can be disorienting for users with executive function difficulties.

3. **Code Transcription**: Manually copying verification codes requires short-term memory and attention to detail, which can be challenging for many users.

4. **Email Management**: Finding verification emails among other messages can be difficult for users with attention or executive function challenges.

5. **Clear Instructions**: Many verification emails lack clear, simple instructions that would benefit users with cognitive disabilities.

## Implementation Tasks

### Priority Order

1. Database Schema Updates (Foundation for all authentication features)
2. Email Service Implementation (Required for account verification)
3. WebAuthn Server-Side Implementation (Core authentication functionality)
4. WebAuthn Client-Side Implementation (User-facing authentication)
5. Integrated Authentication Flow (Combining all components)
6. Accessibility Enhancements (Optimizing for all users)
7. Testing with Users (Validation and refinement)

### 1. WebAuthn Implementation

#### Server-Side Tasks

- [x] **Research WebAuthn Libraries**: Evaluate and select the most appropriate WebAuthn server library for our Node.js backend

  - We already have `@simplewebauthn/server` and `@simplewebauthn/types` installed
  - Review documentation and examples at https://simplewebauthn.dev/
  - **Learning**: SimpleWebAuthn provides a comprehensive API but has some TypeScript type issues that require workarounds

- [x] **Database Schema Updates**: Design and implement database schema changes to store WebAuthn credentials

  - Created a `webauthnCredentials` table with the following fields:
    - `id`: Primary key (CUID2)
    - `userId`: Foreign key to users table
    - `credentialId`: The credential ID from the authenticator (base64url encoded)
    - `publicKey`: The public key from the authenticator (base64url encoded)
    - `counter`: The signature counter for detecting cloned authenticators
    - `credentialDeviceType`: The type of device (e.g., 'platform', 'cross-platform')
    - `credentialBackedUp`: Whether the credential is backed up
    - `transports`: The transports used by the authenticator (JSON string)
    - `friendlyName`: User-defined name for the credential
    - `createdAt`: Timestamp of credential creation
  - **Learning**: Storing binary data as base64url strings simplifies database operations

- [x] **Registration Endpoint**: Create API endpoint for registering new WebAuthn credentials

  - Implemented `/api/auth/webauthn/register/options` to generate registration options
  - Implemented `/api/auth/webauthn/register/verify` to verify and store credentials
  - Added clear error handling and user feedback
  - **Learning**: Storing the challenge in the session is crucial for security

- [x] **Authentication Endpoint**: Create API endpoint for authenticating with WebAuthn credentials

  - Implemented `/api/auth/webauthn/login/options` to generate authentication options
  - Implemented `/api/auth/webauthn/login/verify` to verify credentials and issue JWT
  - Ensured proper session management and security
  - **Learning**: The verification process requires careful handling of the authenticator data

- [x] **User Association**: Implement logic to associate WebAuthn credentials with user accounts

  - Added support for multiple credentials per user for different devices
  - Implemented friendly name for each credential (e.g., "My Phone", "Work Laptop")
  - Stored metadata about each credential for user reference
  - **Learning**: Storing the credential type and transports helps with user experience

- [x] **Credential Management**: Add functionality to manage (view, delete) registered credentials

  - Created endpoints for listing user's credentials
  - Implemented credential deletion with proper authentication
  - Added ability to rename credentials
  - **Learning**: Proper authorization checks are essential for credential management

- [x] **Error Handling**: Implement robust error handling for WebAuthn operations

  - Created user-friendly error messages for common issues
  - Implemented detailed logging for debugging
  - Added handling for device compatibility issues
  - **Learning**: Detailed logging is crucial for debugging WebAuthn issues

- [x] **Security Considerations**: Ensure proper validation and security measures for all WebAuthn operations

  - Validated origin and RP ID for all operations
  - Implemented proper challenge generation and verification
  - Ensured credential IDs are properly validated
  - Added protection against replay attacks using the counter
  - **Learning**: The RP ID and origin validation are critical security measures

- [x] **Testing**: Create comprehensive tests for WebAuthn functionality
  - Created basic tests for WebAuthn routes
  - Added tests to verify authentication requirements
  - **Learning**: Testing WebAuthn is challenging due to the need for browser APIs; focusing on API contract testing is more practical

#### Client-Side Tasks

- [ ] **Add WebAuthn Browser Library**: Integrate @simplewebauthn/browser into the frontend

  - Add as a dependency: `bun add @simplewebauthn/browser`
  - Create a WebAuthn composable for reusable functionality

- [ ] **Registration UI**: Create accessible UI for registering new WebAuthn credentials

  - Design a step-by-step guided process with clear instructions
  - Include animated illustrations showing how to use biometric sensors or security keys
  - Provide clear progress indicators and success/failure states
  - Use simple language and avoid technical jargon

- [ ] **Authentication UI**: Create accessible UI for authenticating with WebAuthn

  - Create a clean, distraction-free authentication interface
  - Include clear visual cues for biometric or security key usage
  - Provide helpful animations to guide users through the process
  - Ensure the UI works well on mobile and desktop devices

- [ ] **Device Compatibility Check**: Implement detection for WebAuthn support and provide appropriate feedback

  - Check browser compatibility using feature detection
  - Provide clear guidance when WebAuthn isn't supported
  - Suggest alternative browsers or authentication methods when needed
  - Store user preferences to avoid repeated compatibility checks

- [ ] **Error Handling**: Create user-friendly error messages for WebAuthn operations

  - Translate technical errors into plain language explanations
  - Provide actionable guidance for resolving common issues
  - Include illustrations or animations to help explain problems
  - Avoid technical jargon and error codes in user-facing messages

- [ ] **Fallback Mechanisms**: Implement fallback authentication methods when WebAuthn isn't available

  - Provide email-based authentication as an alternative
  - Allow users to choose their preferred authentication method
  - Ensure smooth transitions between authentication methods
  - Remember user preferences for future authentication attempts

- [ ] **Accessibility Testing**: Ensure all WebAuthn UI elements meet WCAG standards
  - Test with screen readers and keyboard navigation
  - Verify color contrast and text size
  - Ensure animations can be disabled for users with vestibular disorders
  - Test with various assistive technologies

### 2. Email Verification Implementation

#### Server-Side Tasks

- [x] **Email Service Setup**: Create a reusable email service using Nodemailer

  - Implemented a self-hosted email solution using Nodemailer
  - Created a flexible configuration system for different environments
  - Set up support for MailDev for local development testing
  - Added proper error handling
  - **Learning**: Environment-specific configuration is essential for email services

- [x] **Email Templates**: Design accessible email templates for verification

  - Created simple, clean HTML templates with plain text alternatives
  - Used clear, concise language with step-by-step instructions
  - Included high-contrast design elements for better readability
  - Avoided complex layouts that might render poorly in some email clients
  - **Learning**: Simple, clean designs work best across different email clients

- [x] **Token Generation**: Implement secure token generation for email verification

  - Used cryptographically secure random token generation with Node.js crypto
  - Implemented longer-lived tokens (24 hours by default) for neurodivergent users
  - Added a mechanism to regenerate tokens if needed
  - **Learning**: Longer token expiration times improve accessibility without significantly compromising security

- [x] **Token Storage**: Create database schema for storing verification tokens

  - Created a `verificationTokens` table with the following fields:
    - `id`: Primary key (CUID2)
    - `userId`: Foreign key to users table
    - `token`: The verification token (hashed with SHA-256)
    - `type`: The type of verification (e.g., 'email', 'password-reset')
    - `expiresAt`: Timestamp for token expiration
    - `createdAt`: Timestamp of token creation
  - **Learning**: Hashing tokens in the database adds an important security layer

- [x] **Verification Endpoint**: Create API endpoint for verifying email tokens

  - Implemented `/api/auth/email/verify` endpoint
  - Added proper validation and error handling
  - Provided clear success and error responses
  - Updated user record upon successful verification
  - **Learning**: Token verification should be a one-time operation with immediate token deletion

- [x] **Expiration Handling**: Implement token expiration and renewal functionality

  - Set longer expiration times (24 hours by default) for accessibility
  - Implemented easy token renewal process
  - Added clear messaging about expiration
  - **Learning**: Longer expiration times reduce anxiety for users with cognitive disabilities

- [x] **Rate Limiting**: Add protection against abuse of email verification system

  - Implemented token cleanup to prevent database bloat
  - Added protection against brute force attacks by hashing tokens
  - Included logging for security monitoring
  - **Learning**: Balancing security with accessibility requires careful consideration

- [x] **Testing**: Create tests for email verification functionality
  - Created basic tests for email verification routes
  - Added tests to verify authentication requirements
  - **Learning**: Testing email functionality requires mocking the email service

#### Client-Side Tasks

- [ ] **Verification UI**: Create accessible UI for initiating email verification

  - Design a clean, focused interface for entering email address
  - Include clear validation and feedback for email format
  - Provide immediate confirmation when verification email is sent
  - Use animations sparingly to indicate progress without causing distraction

- [ ] **Verification Status**: Implement clear indication of verification status

  - Create a persistent, easy-to-understand status indicator
  - Use color, icons, and text to convey status (considering color blindness)
  - Provide clear next steps based on verification status
  - Ensure status updates are announced to screen readers

- [ ] **Resend Functionality**: Add ability to request new verification emails

  - Implement an easily accessible "Resend" button
  - Provide clear feedback when a new email is sent
  - Include a countdown timer before resend is available (if rate limited)
  - Ensure the resend process is fully accessible

- [ ] **Clear Instructions**: Provide simple, clear instructions for the verification process

  - Write instructions at approximately 6th-grade reading level
  - Break down the process into numbered steps
  - Include visual aids alongside text instructions
  - Provide examples of what to look for in the verification email

- [ ] **Progress Indication**: Show verification progress to reduce anxiety

  - Implement a clear progress indicator showing current step
  - Provide estimated time remaining for each step
  - Allow users to save progress and return later
  - Ensure progress indicators are accessible to screen readers

- [ ] **Accessibility Testing**: Ensure all verification UI elements meet WCAG standards
  - Test with screen readers and keyboard navigation
  - Verify color contrast and text size
  - Ensure all interactive elements have proper focus states
  - Test with various assistive technologies

### 3. Integrated Authentication Flow

- [ ] **User Registration Flow**: Design and implement accessible user registration flow

  - Create a step-by-step registration process with minimal required information
  - Allow registration with just email address initially
  - Offer WebAuthn credential registration during onboarding
  - Provide clear guidance throughout the registration process

- [ ] **Authentication Options**: Provide clear choice between WebAuthn and email-based authentication

  - Design a clean login page with clear authentication options
  - Use recognizable icons alongside text labels
  - Remember user's preferred authentication method
  - Ensure switching between methods is straightforward

- [ ] **Account Recovery**: Implement accessible account recovery mechanisms

  - Create a simple, stress-free account recovery process
  - Provide multiple recovery options (email, backup codes, etc.)
  - Use clear, reassuring language throughout recovery
  - Implement safeguards against account takeover

- [ ] **Progressive Enhancement**: Ensure basic functionality works without JavaScript

  - Implement core authentication flows that work with minimal JavaScript
  - Provide fallback mechanisms for browsers without WebAuthn support
  - Ensure critical paths work on older browsers
  - Test with JavaScript disabled

- [ ] **User Preferences**: Allow users to set their preferred authentication method

  - Create a user settings page for authentication preferences
  - Allow users to manage their WebAuthn credentials
  - Provide options for email notification preferences
  - Remember and respect user preferences across sessions

- [ ] **Session Management**: Implement secure and accessible session handling

  - Create clear session timeout notifications
  - Provide easy session renewal options
  - Implement secure session storage and validation
  - Allow users to view and manage active sessions

- [ ] **End-to-End Testing**: Test complete authentication flows from registration to login
  - Create automated tests for all authentication flows
  - Test with various devices and browsers
  - Verify security of the complete authentication system
  - Test edge cases and error scenarios

### 4. Accessibility Enhancements

- [ ] **Clear Language**: Use simple, direct language in all authentication interfaces
- [ ] **Visual Cues**: Add supportive icons and visual cues to aid understanding
- [ ] **Error Prevention**: Design interfaces to prevent errors before they occur
- [ ] **Helpful Feedback**: Provide clear, non-technical error messages
- [ ] **Reduced Distractions**: Minimize distractions during authentication processes
- [ ] **Consistent Design**: Maintain consistent UI patterns throughout authentication flows
- [ ] **Keyboard Navigation**: Ensure all authentication functions are fully keyboard accessible
- [ ] **Screen Reader Support**: Test and optimize for screen reader compatibility
- [ ] **High Contrast**: Support high contrast mode for all authentication interfaces
- [ ] **Customizable Timing**: Allow adjustable timeouts for verification processes

### 5. Testing with Users

- [ ] **Identify Test Participants**: Recruit diverse users including those with cognitive disabilities
- [ ] **Test Protocol**: Develop accessible testing protocols
- [ ] **Conduct Testing**: Perform usability testing with diverse participants
- [ ] **Gather Feedback**: Collect and analyze user feedback
- [ ] **Iterate Design**: Make improvements based on user testing results
- [ ] **Documentation**: Document accessibility features and considerations

## Implementation Principles

Throughout implementation, adhere to these key principles:

1. **Simplicity First**: Keep interfaces and processes as simple as possible
2. **Clear Communication**: Use plain language and clear instructions
3. **Error Tolerance**: Design systems that prevent errors and make recovery easy
4. **Consistent Patterns**: Use familiar design patterns and consistent behavior
5. **Multiple Modalities**: Support different ways of interacting (touch, keyboard, voice)
6. **Reduced Memory Load**: Minimize reliance on memory throughout all processes
7. **User Control**: Give users control over timing and progression
8. **Helpful Feedback**: Provide clear feedback at every step
9. **Progressive Enhancement**: Ensure basic functionality works without advanced features
10. **Regular Testing**: Test with diverse users throughout development

## Privacy Considerations

Our authentication system prioritizes user privacy through these measures:

1. **Minimal Data Collection**: Only collect information that's absolutely necessary
2. **Local Authentication**: Use WebAuthn to keep biometric data on the user's device
3. **No Third-Party Services**: Self-host email services to avoid sharing user data
4. **Transparent Policies**: Clearly communicate what data is collected and how it's used
5. **Data Encryption**: Encrypt sensitive data both in transit and at rest
6. **User Control**: Give users the ability to delete their authentication data
7. **No Tracking**: Avoid unnecessary tracking or analytics in authentication flows

## Future Considerations

1. **Package Creation**: Consider extracting this authentication system into a reusable package for other Rollercoaster.dev projects
2. **Multi-Factor Options**: Explore additional authentication factors for users who need higher security
3. **Internationalization**: Add support for multiple languages in authentication interfaces and emails
4. **Audit Logging**: Implement comprehensive security logging for authentication events
5. **Analytics**: Add anonymous usage analytics to identify accessibility pain points

## Implementation Learnings

### WebAuthn Implementation

1. **TypeScript Challenges**: The SimpleWebAuthn library has some TypeScript type issues that required workarounds. Using `@ts-expect-error` comments and custom interfaces helped address these issues.

2. **Security Considerations**: Proper origin and RP ID validation is critical for WebAuthn security. The implementation carefully validates these parameters for all operations.

3. **Data Storage**: Storing binary data (credential IDs and public keys) as base64url strings simplifies database operations while maintaining data integrity.

4. **Challenge Management**: Storing and verifying challenges is crucial for security. The implementation uses session middleware to persist challenges between requests, as the Hono context is request-scoped and cannot store data across multiple requests.

5. **Error Handling**: Detailed logging is essential for debugging WebAuthn issues. The implementation includes comprehensive error handling and logging.

6. **Session Management**: In Hono applications, context (c) is request-scoped, so data like WebAuthn challenges must be persisted in a session store between separate requests. We implemented proper session middleware using `hono-sessions` to address this issue.

7. **Challenge Verification**: The SimpleWebAuthn library expects a callback function for `expectedChallenge` that compares the challenge extracted from the clientDataJSON with our stored challenge. This is a critical security check to prevent replay attacks. The callback should return a boolean indicating whether the challenges match.

### Email Authentication Implementation

1. **Token Security**: Hashing tokens in the database adds an important security layer. The implementation uses SHA-256 for token hashing.

2. **Accessibility Considerations**: Longer token expiration times (24 hours by default) improve accessibility for users with cognitive disabilities without significantly compromising security.

3. **Email Templates**: Simple, clean email designs work best across different email clients. The implementation uses responsive HTML templates with plain text alternatives.

4. **Environment Configuration**: Email services require flexible configuration for different environments. The implementation supports both development (MailDev) and production setups.

5. **Token Lifecycle**: Token verification should be a one-time operation with immediate token deletion after use. This prevents token reuse and improves security.

By following these tasks and principles, we'll create an authentication system that is not only secure but also accessible to users with a wide range of cognitive abilities and needs, while respecting their privacy and providing a foundation for future enhancements.
