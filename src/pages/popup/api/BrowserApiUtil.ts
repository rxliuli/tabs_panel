export enum Env {
  Web = 'web',
  Chrome = 'chrome',
  Firefox = 'firefox',
}

export class BrowserApiUtil {
  private static env = Env.Firefox
  static get<R>(map: Record<Env, any>): R {
    return new map[this.env]()
  }
}
