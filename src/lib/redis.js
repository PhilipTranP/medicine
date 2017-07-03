import { flow } from 'lodash-fp';

export const set = data => data;

export const withCache = controller => ({ reply, ...args }) => controller({
  reply: flow(set, reply),
  ...args,
});
