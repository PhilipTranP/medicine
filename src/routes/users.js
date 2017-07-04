import { flow, filter, uniqBy, pick, map } from 'lodash-fp';

import { withCache } from '../lib/redis';
import { connect, like } from '../lib/database';

export const getUsers = query => ({ fetch }) => fetch('users', {
  name: like(query),
});

export const serialize = flow(
  filter(user => user.id % 2),
  uniqBy('id'),
  map(pick('id')),
);

const route = ({ reply, users }) => reply(serialize(users));

const mapEntitiesToProps = ({ body }) => ({
  users: getUsers(body.query),
});

const enhance = flow(
  connect(mapEntitiesToProps, null),
  withCache,
);

export default enhance(route);
