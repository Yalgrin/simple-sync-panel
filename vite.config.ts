import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api/panel': {
                target: 'http://localhost:46232',
                changeOrigin: true,
            },
        },
    },
})
