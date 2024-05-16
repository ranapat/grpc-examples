import './css/demo.css';

// import initialise from 'org.ranapat.grpc.examples';

const init = () => {
  const messages = require('../protos/simple_pb');
  const services = require('../protos/simple_grpc_web_pb');

  var echoService = new services.GreeterClient('http://localhost:9090');

  var request = new messages.HelloRequest();
  request.setName('Chrome browser');

  echoService.sayHello(request, {}, function(err, response) {
    console.error(err)
    console.log(response)
    console.log(response.getMessage())
  });
};
init();
