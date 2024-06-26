const fs = require('fs');
const bufferImageSize = require('buffer-image-size');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const chunkMaxSize = 10000000;
const PROTO_PATH = __dirname + '/../../protos/simple.proto';
const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
);
const hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

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

//const path = '../../data/flags/';
//const path = '../../data/numbers/';
const path = '../../data/big/';
const extension = '.png';
//const extension = '.jpeg';
//const extension = '.jpg';

function sendBigFile(call, file) {
  let videoDataStream = fs.createReadStream(file);
  videoDataStream
    .on('data', (chunk) => {
      call.write({
        name: file,
        data: chunk,
        width: undefined,
        height: undefined,
        type: undefined,
        size: chunk.length,
        chunk: -1
      });
    })
    .on('end', () => {
      call.end();
    });
}

function sendFile(call, file) {
  const binary = fs.readFileSync(file);
  const metadata = bufferImageSize(binary);

  let chunk = 0;
  let currentChunk = undefined;
  let content = binary;

  do {
    let currentChunk;

    if (chunkMaxSize > content.length) {
      currentChunk = content;
      content = undefined;
    } else {
      currentChunk = content.slice(0, chunkMaxSize);
      content = content.slice(chunkMaxSize, content.length);
    }

    call.write({
      name: file,
      data: currentChunk,
      width: metadata.width,
      height: metadata.height,
      type: metadata.type,
      size: binary.length,
      chunk: content ? chunk++ : -1
    });
  } while (content);
}

const executeOnAllFlags = (path, callback) => {
  fs.readdir(path, function (err, files) {
    if (err) {
      console.error(err)
    }

    callback(files);
  });
};


/// ffmpeg -i park.mp4 -c:v libvpx -crf 10 -b:v 1M -c:a libvorbis output-file.webm
/*
<video controls>
  <source src="devstories.webm" type='video/webm;codecs="vp8, vorbis"'/>
  <source src="devstories.mp4" type='video/mp4;codecs="avc1.42E01E, mp4a.40.2"'/>
</video>
  */

function downloadFile(call) {
  //sendBigFile(call, '../../data/video/output-file.webm');

  executeOnAllFlags(path, (files) => {
    let time = 0;
    for (i = 0; i < 200; ++i) {
    files.forEach(file => {
      if (file.endsWith(extension)) {
        setTimeout(() => {
          console.log('send the next image ' + file)
          sendFile(call, path + file);
        }, time);

        time += /*10 * 41*/1000;
      }
    });
    }

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
