/* eslint-disable @typescript-eslint/no-explicit-any */
type RemoteConfig = {
  url: string;
  scope: string;
  module: string;
};

export async function loadRemoteModule({ url, scope, module }: RemoteConfig) {
  try {
    // Load the remote entry
    await __federation_method_ensure(url);

    // Get the container
    const container = (window as any)[scope] as Container;

    // Initialize the container
    await container.init(__federation_shared);

    // Get the factory and return the module
    const factory = await container.get(module);
    return factory();
  } catch (error) {
    console.error('Error loading remote module:', error);
    throw error;
  }
}
