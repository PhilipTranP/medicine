import { like } from '../lib/database';

// eslint-disable-next-line
export const getUsers = q => ({ fetch }) => fetch(
  'SELECT * FROM users WHERE name LIKE ?', like(q),
);
