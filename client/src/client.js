var PROTO_PATH = __dirname + '/../../protos/simple.proto';

var parseArgs = require('minimist');
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

  /*
  var client = new hello_proto.Greeter(target, grpc.credentials.createInsecure());
  var user;
  if (argv._.length > 0) {
    user = argv._[0];
  } else {
    user = 'world';
  }
  client.sayHello({name: user}, function(err, response) {
    console.log('Greeting:', response.message);
  });

  const call = client.sayHelloStreamReply({name: user});
  call.on('data', function(response) {
    console.log('Called "' + response.message + '"', response);
  });
  call.on('end', function() {
    console.log('call ended')
    // The server has finished sending
  });
  call.on('error', function(e) {
    console.error(e)
    // An error has occurred and the stream has been closed.
  });
  call.on('status', function(status) {
    console.log('status is ', status)
    // process status
  });

  const callBiDirectional = client.sayHelloBiDirectionalStreamReply();
  callBiDirectional.on('data', function(response) {
    console.log('Called "' + response.message + '"', response);
    //callBiDirectional.cancel();
  });
  callBiDirectional.on('end', function() {
    console.log('call ended')
    // The server has finished sending
  });
  callBiDirectional.on('error', function(e) {
    console.error(e)
    // An error has occurred and the stream has been closed.
  });
  callBiDirectional.on('status', function(status) {
    console.log('status is ', status)
    // process status
  });
  callBiDirectional.write({name: user});
  callBiDirectional.write({name: user});
  callBiDirectional.end();
  */









  let combinedData = '';
  var fileClient = new hello_proto.FileService(target, grpc.credentials.createInsecure());
  const fileCall = fileClient.downloadFile({fileName: 'anything'});
  fileCall.on('data', function(response) {
    console.log('Called ', response.chunk, response.size);
    /*combinedData += response.data;
    if (response.size === 0 && response.chunk === -1) {
      console.log('single image finished', response.name);
      combinedData = '';
    }*/
  });
  fileCall.on('end', function() {
    console.log('call ended')
    // The server has finished sending
  });
  fileCall.on('error', function(e) {
    console.error(e)
    // An error has occurred and the stream has been closed.
  });
  fileCall.on('status', function(status) {
    console.log('status is ', status)
    // process status
  });

}

main();
