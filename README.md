# common
Common library for all kuroiLabs TypeScript projects

## Utilities
`@kuroi/common` exposes several utility classes used in most kuroiLabs projects. These classes can be imported directly from `@kuroi/common` root.

## kuroiLabs Common Types
`@kuroi/common` commons with global types meant to simulate C# numeric typings. Include these types in your project's `tsconfig.json` under `typeRoots`.

```json
{
  "compilerOptions": {
    ...
    "typeRoots": [
      ...
      "node_modules/@kuroi/common/types"
    ]
  }
}
```

## kuroiLabs Server
`@kuroi/common/rest` includes a base class that provides a TypeScript wrapper around Express.js.

Create your own extension of `KuroiLabsServer` and supply its `onInit` and `onStart` hooks.

```typescript
// my-server.ts
class MyServer extends KuroiLabsServer {

  constructor(routes: KuroiLabAPIRoute[], options?: IKuroiLabsServerOptions) {
    super(routes, options)
  }

  onInit(): void {
    // your bootstrap logic
    this.api.use(/*...*/)
    // ...
  }

  onStart(): void {
    // ...
    this.httpServer = this.api.listen(this.port, () => {
      // ...
    })
    // ...
  }

}
```

Construct your endpoints and routes.

```typescript
// routes.ts or something like that
function myEndpointHandler(req: Request, res: Response) {
  res.send({ message: 'Hello, world!' })
}

const MyEndpoint = new KuroiLabsAPIEndpoint('say-hello', 'get', myEndpointHandler)

const MyRoute = new KuroiLabsAPIRoute('my-route', [ MyEndpoint ])
```

Finally, in your index.ts file, construct a new instance of your extended server and supply your routes to its constructor.

```typescript
// index.ts
const server = new MyServer([ MyRoute ], { port: 80 })
server.start()
```

### API Guards
Guards are wrappers around Express middleware you can supply at the route or endpoint level.

```typescript
// guards.ts or something
export const MyGuard = new KuroiLabsAPIGuard((req: Request, res: Response, next: NextFunction) => {
  // run logic to call next() or not
})
```

`MyGuard` could then be applied in the `routes.ts` example like so:

```typescript
// applied to just the endpoint
const MyEndpoint = new KuroiLabsAPIEndpoint('say-hello', 'get', myEndpointHandler, [ MyGuard ])
// applied to entire route
const MyRoute = new KuroiLabsAPIRoute('my-route', [ MyEndpoint ], [ MyGuard ])
```

## Networking
The `net` package in `@kuroi/common` supplies a `Packet` class for both Node.js **server** and browser **client**.

The client `Packet` class uses `ArrayBuffer` and other standard modern JS classes to read and write bytes. The server `Packet` class uses `ws` and Node's `Buffer` class. As such, the server and client need to import these classes from their respective directory without touching the other, as `Buffer` is not compatible with the browser.

These classes must be imported directly from `@kuroi/common/net/{server|client}`