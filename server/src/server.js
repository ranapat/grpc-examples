var PROTO_PATH = __dirname + '/../../protos/simple.proto';

const fs = require('fs');
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
);
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

/**
 * Implements the SayHello RPC method.
 */

function sayHi(call, callback) {
  console.log('so far ok?', call, callback);

  callback(null, {
    message: 'Hi back'
  });
}

function sayHello(call, callback) {
  callback(null, {
    message: 'Hello ' + call.request.name
  });
}

function sayHelloStreamReply(call) {
  console.log('we enter here inside the stream reply')
  // call.emit('error', {code: grpc.status.INVALID_ARGUMENT, details: 'request missing required field: name'});
  call.write({
    message: 'Hello (1) ' + call.request.name
  });
  call.write({
    message: 'Hello (2) ' + call.request.name
  });
  call.end();
  console.log('we reach here inside the stream reply')
}

function sayHelloBiDirectionalStreamReply(call) {
  console.log('we enter here inside the bi directional stream reply')
  call.on('data', function(request) {
    console.log('Called "' + request.name + '"', request);
    call.write({
      message: 'Hello (0) ' + request.name
    });

  });
  call.on('end', function() {
    console.log('call ended?')
    call.end();
    // The server has finished sending
  });
  call.on('cancelled', function() {
    console.log('cancelled')
    // An error has occurred and the stream has been cancelled.
  });
  call.on('error', function(e) {
    console.error(e)
    // An error has occurred and the stream has been closed.
  });
  call.on('status', function(status) {
    console.log('status is ', status)
    // process status
  });
  // call.end();
  console.log('we reach here inside the bi directional stream reply')
}

function sendFile(call, file) {
  const _contents = fs.readFileSync(file, 'base64');
  let contents = _contents;

  let chunk = 0;
  const chunkSize = 100000;

  do {
    let currentChunk;

    if (chunkSize > contents.length) {
      currentChunk = contents;
      contents = '';
    } else {
      currentChunk = contents.slice(0, chunkSize);
      contents = contents.slice(chunkSize, contents.length);
    }

    console.log('...', file, chunk, currentChunk.length);
    call.write({
      name: file,
      data: currentChunk,
      size: currentChunk.length,
      chunk: chunk++
    });
  } while (contents);

  call.write({
    name: file,
    data: undefined,
    size: 0,
    chunk: -1
  })
}

const executeOnAllFlags = (path, callback) => {
  fs.readdir(path, function (err, files) {
    if (err) {
      console.error(err)
    }

    callback(files);
  });
};

function downloadFile(call) {
  executeOnAllFlags('../../data/flags/', (files) => {
    let time = 0;
    files.forEach(file => {
      if (file.endsWith('.png')) {
        setTimeout(() => {
          console.log('send the next image ' + file)
          sendFile(call, '../../data/flags/' + file);
        }, time);

        time += 250;
      }
    });

    setTimeout(() => {
      console.log('end of call')
      call.end();
    }, time + 2050);

  });
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
  server.addService(hello_proto.FileService.service, {
    downloadFile
  });
  server.addService(hello_proto.Greeter.service, {
    sayHi,
    sayHello,
    sayHelloStreamReply,
    sayHelloBiDirectionalStreamReply,
  });
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err != null) {
      return console.error(err);
    }
    console.log(`gRPC listening on ${port}`)
  });
}

main();
