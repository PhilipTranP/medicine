export const getConnection = () => ({
  fetch: () => [
    { id: 1, name: 'Test' },
    { id: 2, name: 'Test' },
    { id: 3, name: 'Test' },
    { id: 4, name: 'Test' },
    { id: 5, name: 'Test' },
    { id: 6, name: 'Test' },
    { id: 7, name: 'Test' },
    { id: 8, name: 'Test' },
  ],
});

export const like = val => `'%${val}%'`;
