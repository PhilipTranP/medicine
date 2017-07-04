import { connect } from '../lib/database';

export const getUser = id => ({ find }) => find('users', id);

export const saveUser = ({ save }) => user => save(user);

export const route = async ({ reply, user, save }) => reply(await save(user));

const mapEntitiesToProps = ({ params }) => ({
  user: getUser(params ? params.id : 1),
});

const mapDatabaseToProps = () => ({
  save: saveUser,
});

export default connect(mapEntitiesToProps, mapDatabaseToProps)(route);
