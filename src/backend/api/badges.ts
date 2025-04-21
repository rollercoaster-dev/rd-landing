import { Elysia, t } from 'elysia';

// Define badge schema
const BadgeSchema = t.Object({
  id: t.String(),
  name: t.String(),
  description: t.String(),
  image: t.String(),
  criteria: t.String(),
  issuer: t.String(),
  tags: t.Array(t.String()),
  createdAt: t.String(),
});

// Create and export the badges routes
export const badgesRoutes = new Elysia({ prefix: '/badges' })
  // Get all badges
  .get('/', () => {
    // This would normally fetch from a database
    return [
      {
        id: '1',
        name: 'JavaScript Basics',
        description: 'Completed the JavaScript Basics course',
        image: 'https://example.com/badges/js-basics.png',
        criteria: 'Complete all lessons in the JavaScript Basics course',
        issuer: 'Rollercoaster.dev',
        tags: ['javascript', 'web development', 'programming'],
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'TypeScript Master',
        description: 'Demonstrated advanced TypeScript skills',
        image: 'https://example.com/badges/ts-master.png',
        criteria: 'Complete the TypeScript advanced course and pass the final exam',
        issuer: 'Rollercoaster.dev',
        tags: ['typescript', 'web development', 'programming'],
        createdAt: new Date().toISOString(),
      },
    ];
  })

  // Get a specific badge by ID
  .get('/:id', ({ params }) => {
    // This would normally fetch from a database
    return {
      id: params.id,
      name: 'JavaScript Basics',
      description: 'Completed the JavaScript Basics course',
      image: 'https://example.com/badges/js-basics.png',
      criteria: 'Complete all lessons in the JavaScript Basics course',
      issuer: 'Rollercoaster.dev',
      tags: ['javascript', 'web development', 'programming'],
      createdAt: new Date().toISOString(),
    };
  })

  // Create a new badge
  .post(
    '/',
    ({ body }) => {
      // This would normally save to a database
      return {
        ...body,
        id: Math.random().toString(36).substring(2, 9),
        createdAt: new Date().toISOString(),
      };
    },
    {
      // Use BadgeSchema without id and createdAt fields for validation
      body: t.Omit(BadgeSchema, ['id', 'createdAt']),
    }
  );
