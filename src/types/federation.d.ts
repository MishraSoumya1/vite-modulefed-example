declare const __federation_method_ensure: (remoteUrl: string) => Promise<void>
declare const __federation_shared: Record<string, any>

interface Container {
  init: (shared: Record<string, any>) => Promise<void>
  get: (module: string) => Promise<() => any>
}