import fs from 'fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// Vite configuration for Pushwoosh Web SDK integration
export default defineConfig({
  plugins: [
    react(),
    // This plugin copies the Pushwoosh service worker from node_modules to the output directory root
    // so it is available at /service-worker.js as required by the SDK
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/web-push-notifications/service-worker.js',
          dest: '.'
        }
      ]
    })
  ],
  // Enable HTTPS for local development using self-signed certificates
  // See README for instructions on generating cert/key files
  ...(process.env.NODE_ENV === 'development' ? { // eslint-disable-line no-undef
    server: {
      https: {
        key: fs.readFileSync('./cert/key.pem'),
        cert: fs.readFileSync('./cert/cert.pem'),
      }
    }
  } : {})
})
