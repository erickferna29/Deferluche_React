import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vite.dev/config/
export default defineConfig({
server: {
    host: true, 
    allowedHosts: true, // Esto ya lo pusiste para que jalara Serveo
    proxy: {
      // OJO AQUÍ: Esto le dice a Vite "todo lo que empiece con /api, mándalo a mi PHP"
      '/backend': {
        target: 'http://localhost/', // O el puerto donde corra tu XAMPP/PHP
        changeOrigin: true,
        secure: false,
      }
    }
  },
  plugins: [react()],
})
