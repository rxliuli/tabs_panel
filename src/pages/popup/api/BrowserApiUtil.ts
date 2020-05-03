export enum Env {
  Web = 'web',
  Chrome = 'chrome',
}

export class BrowserApiUtil {
  private static env = Env.Chrome
  static get<R>(map: Record<Env, any>): R {
    switch (this.env) {
      case Env.Web:
        return new map[this.env]()
      case Env.Chrome:
        return new map[this.env]()
    }
  }
}
