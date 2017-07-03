import { createServer } from 'http';

import { route } from './lib/router';
import homepage from './controllers/homepage';

export const httpServer = createServer();
export const get = route('GET')(httpServer);

get('/')(homepage);

httpServer.listen(1337);
