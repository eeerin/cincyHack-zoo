// import the hapi library into the file
const Hapi = require('hapi');
const alignJson = require('hapi-align-json');

const server = Hapi.server({
  host: 'localhost',
  port: 3000 // any number between 1024–49151, (really any unsigned 16-bit integer) common ones include 3000, 8080, 8888
});
// async in front of a function means it will always return a promise
// this should only be used if you are using the keyword await inside of your function
const init = async () => {

  await server.register([
    { plugin: alignJson } // equivalent to { plugin: require('hapi-align-json') }
  ]) //this is where you would register plugins, like authentication plugins, inert, vision etc.
  server.route({
    method: 'GET',
    path: '/',
    handler: () => { return 'Hello World!'; }
  });
  require('./routes')(server);
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};
// how to catch errors that are in your app
// log them out 
// exit your process with a 1
// 0 means successful exit
// 1 - 255 is unsuccessful
// 1 is a general unsuccessful code others have a more specific meaning e.g. exit code 2 is a misuse of shell builtins
process.on('unhandledRejection', (err) => {
  console.log(err); // eslint-disable-line no-console
  process.exit(1);
});

init();
