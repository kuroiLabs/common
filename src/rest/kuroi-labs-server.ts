import cors from 'cors'
import express from 'express'
import http from 'http'
import { KuroiLabsAPIRoute } from './kuroi-labs-route'

export class KuroiLabsServer {

  public static PORT: uint32 = 6969

  public routes: KuroiLabsAPIRoute[]

  public api = express()

  protected httpServer: http.Server

  protected root: string

  constructor(routes: KuroiLabsAPIRoute[], root?: string) {
    this.routes = routes || []
    this.root = root === undefined ? '*/api' : ''
    this.api.use(express.json())
    this.api.use(cors())
    this.configureRoutes()
  }

  public static setPort(_port: uint32): void {
    KuroiLabsServer.PORT = _port
  }

  private configureRoutes(): void {
    if (this.routes) {
      for (const route of this.routes) {
        this.api.use(`${this.root}/${route.path || ''}`, route.router)
      }
    }
  }

  public start(): void {
    this.httpServer = this.api.listen(KuroiLabsServer.PORT, () => {
      console.log('KuroiLabs Server up and running on port ' + KuroiLabsServer.PORT)
    })
  }

}