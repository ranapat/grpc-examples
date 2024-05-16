var parseArgs = require('minimist');
var messages = require('../protos/simple_pb');
var services = require('../protos/simple_grpc_pb');

var grpc = require('@grpc/grpc-js');

function main() {
  var argv = parseArgs(process.argv.slice(2), {
    string: 'target'
  });
  var target;
  if (argv.target) {
    target = argv.target;
  } else {
    target = 'localhost:50051';
  }
  var client = new services.GreeterClient(target, grpc.credentials.createInsecure());
  var request = new messages.HelloRequest();
  var user;
  if (argv._.length > 0) {
    user = argv._[0];
  } else {
    user = 'world';
  }
  request.setName(user);
  client.sayHello(request, function(err, response) {
    console.error(err);
    console.log('Greeting:', response.getMessage());
  });
}

main();
