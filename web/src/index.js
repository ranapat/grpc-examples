import './css/demo.css';

import {
  GreeterClient,
  FileServiceClient
} from 'org.ranapat.grpc.examples/web/protos/simple_grpc_web_pb'
import {
  HelloRequest,
  DownloadFileRequest
} from 'org.ranapat.grpc.examples/web/protos/simple_pb'

const init = () => {
  greeter();
  fileService();
};

const greeter = () => {
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

const fileService = () => {
  const greeterService = new FileServiceClient('http://localhost:9090');

  const request = new DownloadFileRequest();
  request.setFilename('anything');

  let combinedData = '';
  const fileCall = greeterService.downloadFile(request, {});
  fileCall.on('data', function(response) {
    if (response.getSize() === 0 && response.getChunk() === -1) {
      console.log('...', response.getName());
      const image = document.getElementById('image');
      image.src = 'data:image/png;base64,' + combinedData;

      combinedData = '';
    } else {
      combinedData += response.getData();
    }
  });
  fileCall.on('end', function() {
    //
  });
  fileCall.on('error', function(e) {
    console.error(e)
    // An error has occurred and the stream has been closed.
  });
  fileCall.on('status', function(status) {
    console.log('status is ', status)
    // process status
  });
};

init();
