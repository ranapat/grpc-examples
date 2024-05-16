const messages = require('../protos/simple_pb');
const services = require('../protos/simple_grpc_web_pb');

global.XMLHttpRequest = require('xhr2');

var echoService = new services.GreeterClient('http://localhost:9090');

var request = new messages.HiRequest();
// request.setName('Hello World!');

echoService.sayHi(request, {}, function(err, response) {
  console.error(err)
  console.log(response)
});
