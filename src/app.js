import { createServer } from 'http';

import { route } from './lib/router';
import users from './routes/users';
import saveUsers from './routes/saveUsers';

export const httpServer = createServer();
export const get = route('GET')(httpServer);
export const post = route('POST')(httpServer);

get('/')(saveUsers);
post('/')(users);

httpServer.listen(1337);
