import { Elysia } from 'elysia'

// Import route modules
import { badgesRoutes } from './badges'

// Create and export the API routes
export const apiRoutes = new Elysia({ prefix: '/api' })
  // Mount badge-related routes
  .use(badgesRoutes)
  // Add a simple root endpoint
  .get('/', () => ({
    name: 'Rollercoaster.dev API',
    version: '0.1.0',
    documentation: '/api/docs'
  }))
  // Add a test endpoint
  .get('/test', () => ({
    status: 'ok',
    message: 'API is working properly',
    timestamp: new Date().toISOString()
  }))
