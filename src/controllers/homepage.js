import { flow, filter, uniqBy, pick, map } from 'lodash-fp';

import { withCache } from '../lib/redis';
import { getConnection } from '../lib/database';
import { connect } from '../lib/router';
import { getUsers } from '../models/users';

const serialize = flow(
  filter(user => user.id % 2),
  uniqBy('id'),
  map(pick('id')),
);

const homepage = async ({ body, reply, db }) => {
  const users = await getUsers(body.id)(db);
  reply(serialize(users));
};

const mapServicesToProps = {
  db: getConnection(),
};

const enhance = flow(
  connect(mapServicesToProps),
  withCache,
);

export default enhance(homepage);
