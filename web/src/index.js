import './css/demo.css';

import * as THREE from 'three';

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
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  /*const image = new Image();
  image.onload = function() {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  };*/


  console.warn = function(){};

  //
      var width = window.innerWidth;
      var height = window.innerHeight;
      var renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(width, height);
      document.body.appendChild(renderer.domElement);
      var scene = new THREE.Scene();
      let image = new Image();
      // image.src = uri;
      let texture = new THREE.Texture();
      texture.image = image;
      image.onload = function () {
        texture.needsUpdate = true;
      };
      texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
      let material = new THREE.MeshLambertMaterial({map: texture});
      let cubeSize = 150;
      let planeMesh = new THREE.PlaneGeometry(cubeSize, cubeSize);
      var cube = new THREE.Mesh(planeMesh, material);
      scene.add(cube);
      var camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 10000);
      camera.position.x = 0;
      camera.position.y = 0;
      camera.position.z = 200;
      camera.lookAt(cube.position);
      scene.add(camera);
      //Add ambient light to make the scene more light
      let ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambientLight);
  var clock = new THREE.Clock();
      function render() {
        requestAnimationFrame(render);
        //cube.rotation.y -= 0.005;
        //cube.rotation.z += 0.005;
        renderer.render(scene, camera);
      }
      render();

  //





  const greeterService = new FileServiceClient('http://localhost:9090');

  const request = new DownloadFileRequest();
  request.setFilename('anything');

  let combinedData = new Uint8Array();
  const fileCall = greeterService.downloadFile(request, {});
  fileCall.on('data', (response) => {
    const blob = response.getData();
    combinedData = new Uint8Array([ ...combinedData, ...blob]);

    if (response.getChunk() === -1) {
      console.log('...', response.getName(), response.getWidth(), response.getHeight(), response.getSize());




      const base64 = btoa(combinedData.reduce(function (data, byte) {
        return data + String.fromCharCode(byte);
      }, ''));

      var uri = 'data:image/jpeg;base64,' + base64;




      image.src = uri;












      //const loader = new THREE.ImageLoader();


      /*
      image.src = uri;

      canvas.width = response.getWidth();
      canvas.height = response.getHeight();*/

      combinedData = new Uint8Array();
    } else {
      console.log('...', response.getName(), response.getWidth(), response.getHeight(), response.getSize(), response.getChunk());
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
