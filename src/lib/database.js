import { flow, values, zipObject, map, keys } from 'lodash-fp';

export const getConnection = () => ({
  find: () => Promise.resolve({ id: 1, name: 'New' }),
  fetch: () => new Promise(resolve => setTimeout(() => resolve([
    { id: 1, name: 'Test' },
    { id: 2, name: 'Test' },
    { id: 3, name: 'Test' },
    { id: 4, name: 'Test' },
    { id: 5, name: 'Test' },
    { id: 6, name: 'Test' },
    { id: 7, name: 'Test' },
    { id: 8, name: 'Test' },
  ]), 100)),
  save: entity => Promise.resolve({
    ...entity,
    name: 'Updated',
  }),
});

export const like = val => `'%${val}%'`;

const resolve = async resolver => resolver(getConnection());

const zipProps = resolveProps => zipObject(keys(resolveProps));

export const connect = (keysToPropsFunc, servicesToPropsFunc) =>
  controller => async (props) => {
    let resolvedProps = {};
    if (keysToPropsFunc) {
      const resolveProps = keysToPropsFunc(props);
      const resolvers = values(resolveProps);
      const resolved = await Promise.all(map(resolve)(resolvers));
      resolvedProps = zipProps(resolveProps)(resolved);
    }

    let resolvedServiceProps = {};
    if (servicesToPropsFunc) {
      const serviceProps = servicesToPropsFunc(props);
      resolvedServiceProps = flow(
        map(resolver => resolver(getConnection())),
        zipProps(serviceProps),
      )(serviceProps);
    }

    controller({
      ...props,
      ...resolvedProps,
      ...resolvedServiceProps,
    });
  };
