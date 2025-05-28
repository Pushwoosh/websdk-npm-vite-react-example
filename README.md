# Pushwoosh Web Push Notifications Vite + React Example

This project demonstrates how to integrate the [Pushwoosh Web SDK](https://github.com/Pushwoosh/web-push-notifications) (`web-push-notifications` npm package) into a React application built with Vite.

## Features

- React + Vite setup
- Pushwoosh Web SDK integration
- Example of using the subscription button widget
- Local HTTPS development with self-signed certificates

---

## Getting Started

### 1. Clone and Install

```sh
git clone https://github.com/your-repo/websdk-npm-vite-react-example.git
cd websdk-npm-vite-react-example
npm install
```

### 2. Configure Pushwoosh

Create a `.env` file in the project root and add your Pushwoosh Application Code:

```
VITE_PUSHWOOSH_APPLICATION_CODE=XXXXX-XXXXX
```

Replace `XXXXX-XXXXX` with your actual Pushwoosh Application Code.

### 3. Set Up HTTPS for Local Development

Web push notifications require HTTPS. For local development, generate a self-signed certificate:

```sh
openssl req -x509 -newkey rsa:2048 -nodes -keyout cert/key.pem -out cert/cert.pem -days 365 -subj "/CN=localhost"
```

This will create `cert/key.pem` and `cert/cert.pem`.

### 4. Copy the Service Worker

**Important:**  
The Pushwoosh SDK requires a service worker file (`service-worker.js`) to be available at the root of your site.  
**You must ensure the service worker file is available at the root of your site** (e.g., `/service-worker.js`).

This project uses [`vite-plugin-static-copy`](https://github.com/sapphi-red/vite-plugin-static-copy) to automate this step (see `vite.config.js`).

This ensures the service worker is served from `/service-worker.js`, as required by the SDK.

### 5. Run the App

```sh
npm run dev
```

Open [https://localhost:5173](https://localhost:5173) in your browser.

---

## How It Works

- The SDK is initialized in `src/usePushwoosh.js` with your Application Code and the service worker URL.
- The subscription button widget is enabled and rendered automatically.
- The React app uses a custom hook (`usePushwoosh`) to access the Pushwoosh instance and listen for events.

---

## Why Copy the Service Worker?

Browsers require service workers to be served from the root (`/service-worker.js`) to control the entire origin.  
Vite (and most build tools) do not automatically copy files from `node_modules` to the root of the site.  

---

## Useful Links

- [Pushwoosh Web SDK Documentation](https://docs.pushwoosh.com/developer/pushwoosh-sdk/web-push-notifications/web-push-sdk-30/)
- [Pushwoosh Web SDK NPM](https://www.npmjs.com/package/web-push-notifications)
- [Vite Documentation](https://vitejs.dev/)

---

## License

MIT

---

If you have any questions, please refer to the official Pushwoosh documentation or open an issue in this repository.

