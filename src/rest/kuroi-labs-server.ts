import cors from 'cors'
import express from 'express'
import http from 'http'
import https from 'https'
import { KuroiLabsAPIRoute } from './kuroi-labs-route'
import { IKuroiLabsServerOptions } from './kuroi-labs-server-options.interface'

/**
 * @description kuroiLabs TypeScript REST API server base class for extension
 */
export abstract class KuroiLabsServer {

  public port: uint16

  public routes: KuroiLabsAPIRoute[]

  public api = express()

  protected httpServer: http.Server

  protected httpsServer: https.Server

  protected root: string

  constructor(routes: KuroiLabsAPIRoute[], options?: IKuroiLabsServerOptions) {
    this.routes = routes || []
    if (options) {
      this.root = options.rootUrl === undefined ? '*/api' : ''
      this.port = options.secure ? 443 : options.port || 6969
    } else {
      this.root = '*/api'
      this.port = options.secure ? 443 : 6969
    }
    this.api.use(express.json())
    this.api.use(cors())
    this.onInit()
  }

  /**
   * @description Sets REST API port number.
   * @param _port port number. limited to uint16.
   */
  public setPort(_port: uint16): void {
    this.port = _port
  }

  /**
   * @description Sets root URL for REST API.
   * @param _root Root URL for rest API. Defaults to '*\/api'
   */
  public setRoot(_root: string): void {
    this.root = _root
  }

  /**
   * @description must be called manually after all modifications made to base class.
   */
  public start(): void {
    this.configureRoutes()
    this.onStart()
  }

  /**
   * @description Closes http/s server and runs any extended cleanup logic
   */
  public stop(): void {
    if (this.httpServer) {
      this.httpServer.close()
    }
    if (this.httpsServer) {
      this.httpsServer.close()
    }
    if (this.onStop) {
      this.onStop()
    }
  }

  private configureRoutes(): void {
    if (this.routes) {
      for (const route of this.routes) {
        this.api.use(`${this.root}/${route.path || ''}`, route.router)
      }
    }
  }

  /**
   * @description Abstract server bootstrap logic. Fires at end of base class constructor, before start.
   */
  abstract onInit(): void

  /**
   * @description Fires at end of server start logic.
   */
  abstract onStart(): void

}

// abstract class/interface merging for optional methods
export interface KuroiLabsServer {
  /**
   * @description Fires before base class stop logic
   */
  onStop?(): void
}