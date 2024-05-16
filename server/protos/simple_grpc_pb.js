// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var simple_pb = require('./simple_pb.js');

function serialize_helloworld_DataChunk(arg) {
  if (!(arg instanceof simple_pb.DataChunk)) {
    throw new Error('Expected argument of type helloworld.DataChunk');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_helloworld_DataChunk(buffer_arg) {
  return simple_pb.DataChunk.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_helloworld_DownloadFileRequest(arg) {
  if (!(arg instanceof simple_pb.DownloadFileRequest)) {
    throw new Error('Expected argument of type helloworld.DownloadFileRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_helloworld_DownloadFileRequest(buffer_arg) {
  return simple_pb.DownloadFileRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

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


var FileServiceService = exports.FileServiceService = {
  downloadFile: {
    path: '/helloworld.FileService/DownloadFile',
    requestStream: false,
    responseStream: true,
    requestType: simple_pb.DownloadFileRequest,
    responseType: simple_pb.DataChunk,
    requestSerialize: serialize_helloworld_DownloadFileRequest,
    requestDeserialize: deserialize_helloworld_DownloadFileRequest,
    responseSerialize: serialize_helloworld_DataChunk,
    responseDeserialize: deserialize_helloworld_DataChunk,
  },
};

exports.FileServiceClient = grpc.makeGenericClientConstructor(FileServiceService);
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
