# Talrik Website & OAuth

This repository hosts the marketing website and OAuth callback pages for [Talrik](https://github.com/jgibson/talrik), a native iOS/macOS app for cross-posting to multiple social media platforms.

## Contents

- **Marketing Website** - Landing page at the root (`index.html`)
- **OAuth Callbacks** - Redirect pages for OAuth flows (`/oauth/`)

## Website

The marketing website showcases Talrik's features and provides App Store download links.

- Clean, modern design with dark mode support
- Responsive layout for mobile, tablet, and desktop
- Smooth scroll animations

## OAuth Callbacks

OAuth callback pages handle redirects from social platform authentication:

- `/oauth/threads/callback.html` - Threads OAuth callback
- `/oauth/linkedin/callback.html` - LinkedIn OAuth callback

These pages receive the authorization code from the OAuth provider and redirect to the Talrik app via custom URL scheme (`talrik://`).

## Hosting

This site is hosted via GitHub Pages at: https://jgibson.github.io/talrik-app/

## Related

- [Talrik iOS/macOS App](https://github.com/jgibson/talrik) - The main application repository

---

**Built with Claude Code**
