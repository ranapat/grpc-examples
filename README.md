# gRPC Examples with envoy

gRPC examples with envoy proxy

## prepare environment

### node

install depending on the system

### envoy

install depending on the system

### grpc cli tools

```
npm install -g grpc-tools
brew install protoc-gen-grpc-web
```

### prepare proto files

```
cd protos
./generate
```

## run the example

### start server

```
cd server/src
node server
# or
node server-static
```

### start raw / direct client

```
cd client/src
node client
# or
node client-static
```

### start web client

#### first start envoy

```
envoy -c envoy.yaml
```

#### from browser
```
npm run build-web # and observe dist/ folder
# or
npm run serve-web # and open http://localhost:8080
```

#### from cli
```
cd web/src
node client-rest
```
