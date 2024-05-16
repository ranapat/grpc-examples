// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright 2015 gRPC authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
'use strict';
var grpc = require('@grpc/grpc-js');
var simple_pb = require('./simple_pb.js');

function serialize_helloworld_HelloReply(arg) {
  if (!(arg instanceof simple_pb.HelloReply)) {
    throw new Error('Expected argument of type helloworld.HelloReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_helloworld_HelloReply(buffer_arg) {
  return simple_pb.HelloReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_helloworld_HelloRequest(arg) {
  if (!(arg instanceof simple_pb.HelloRequest)) {
    throw new Error('Expected argument of type helloworld.HelloRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_helloworld_HelloRequest(buffer_arg) {
  return simple_pb.HelloRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_helloworld_HiReply(arg) {
  if (!(arg instanceof simple_pb.HiReply)) {
    throw new Error('Expected argument of type helloworld.HiReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_helloworld_HiReply(buffer_arg) {
  return simple_pb.HiReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_helloworld_HiRequest(arg) {
  if (!(arg instanceof simple_pb.HiRequest)) {
    throw new Error('Expected argument of type helloworld.HiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_helloworld_HiRequest(buffer_arg) {
  return simple_pb.HiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// The greeting service definition.
var GreeterService = exports.GreeterService = {
  // Sends a greeting
sayHi: {
    path: '/helloworld.Greeter/SayHi',
    requestStream: false,
    responseStream: false,
    requestType: simple_pb.HiRequest,
    responseType: simple_pb.HiReply,
    requestSerialize: serialize_helloworld_HiRequest,
    requestDeserialize: deserialize_helloworld_HiRequest,
    responseSerialize: serialize_helloworld_HiReply,
    responseDeserialize: deserialize_helloworld_HiReply,
  },
  sayHello: {
    path: '/helloworld.Greeter/SayHello',
    requestStream: false,
    responseStream: false,
    requestType: simple_pb.HelloRequest,
    responseType: simple_pb.HelloReply,
    requestSerialize: serialize_helloworld_HelloRequest,
    requestDeserialize: deserialize_helloworld_HelloRequest,
    responseSerialize: serialize_helloworld_HelloReply,
    responseDeserialize: deserialize_helloworld_HelloReply,
  },
  sayHelloStreamReply: {
    path: '/helloworld.Greeter/SayHelloStreamReply',
    requestStream: false,
    responseStream: true,
    requestType: simple_pb.HelloRequest,
    responseType: simple_pb.HelloReply,
    requestSerialize: serialize_helloworld_HelloRequest,
    requestDeserialize: deserialize_helloworld_HelloRequest,
    responseSerialize: serialize_helloworld_HelloReply,
    responseDeserialize: deserialize_helloworld_HelloReply,
  },
  sayHelloBiDirectionalStreamReply: {
    path: '/helloworld.Greeter/SayHelloBiDirectionalStreamReply',
    requestStream: true,
    responseStream: true,
    requestType: simple_pb.HelloRequest,
    responseType: simple_pb.HelloReply,
    requestSerialize: serialize_helloworld_HelloRequest,
    requestDeserialize: deserialize_helloworld_HelloRequest,
    responseSerialize: serialize_helloworld_HelloReply,
    responseDeserialize: deserialize_helloworld_HelloReply,
  },
};

exports.GreeterClient = grpc.makeGenericClientConstructor(GreeterService);
