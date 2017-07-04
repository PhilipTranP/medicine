// eslint-disable-next-line
const errorHandler = controller => err => console.error(controller, err);

const reply = response => (data) => {
  response.setHeader('Content-Type', 'application/json');
  response.write(JSON.stringify(data));
  response.end();
};

const dataHandler = (controller, response) => {
  const body = [];

  return (chunk) => {
    if (chunk) {
      body.push(chunk);
    } else {
      controller({ body, reply: reply(response) });
    }
  };
};

export const requestHandler = (method, path, controller) => (request, response) => {
  if (method !== request.method) return;
  if (path !== request.url) return;

  const handler = dataHandler(controller, response);

  request
    .on('error', errorHandler(controller))
    .on('data', handler)
    .on('end', handler);
};

export const route = method => server => path => (controller) => {
  server.on('request', requestHandler(method, path, controller));
};
