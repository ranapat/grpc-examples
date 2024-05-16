/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

var PROTO_PATH = __dirname + '/../../protos/simple.proto';

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
  callback(null, {
    message: 'Hi back'
  });
}

function sayHello(call, callback) {
  callback(null, {
    message: 'Hello ' + call.request.name
  });
}

function sayHelloStreamReply(call, callback) {
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

function sayHelloBiDirectionalStreamReply(call, callback) {
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

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
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
