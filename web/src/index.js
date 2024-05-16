import './css/demo.css';

import { GreeterClient } from 'org.ranapat.grpc.examples/web/protos/simple_grpc_web_pb'
import { HelloRequest } from 'org.ranapat.grpc.examples/web/protos/simple_pb'

const init = () => {
  const greeterService = new GreeterClient('http://localhost:9090');

  const request = new HelloRequest();
  request.setName('Chrome browser');

  greeterService.sayHello(request, {}, (err, response) => {
    if (err) {
      console.error(err)
    } else {
      console.log('response message', response.getMessage())
    }
  });

  const call = greeterService.sayHelloStreamReply(request, {});
  call.on('data', (response) => {
    console.log('Received "' + response.getMessage() + '"');
  });
  call.on('end', () => {
    console.log('call ended')
    // The server has finished sending
  });
  call.on('error', (e) => {
    console.error(e)
    // An error has occurred and the stream has been closed.
  });
  call.on('status', (status) => {
    console.log('status is ', status)
    // process status
  });
};

init();
