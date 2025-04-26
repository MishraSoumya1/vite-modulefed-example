/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, lazy, Suspense, useEffect } from 'react';
import { loadRemote, init } from '@module-federation/runtime';

init({
  remotes: [
    {
      name: 'mfeRemote',
      alias: 'mfeRemote',
      entry: 'http://localhost:3002/remoteEntry.js',
    },
  ],
  // plugins: [
  //   {
  //     name: 'custom-plugin',
  //     beforeInit(args) {
  //       return args;
  //     },
  //     init(args) {
  //       console.log('init: ', args);
  //       return args;
  //     },
  //     beforeLoadShare(args) {
  //       console.log('beforeLoadShare: ', args);
  //       return args;
  //     },
  //   },
  // ],
  // shared: {
  //   react: {
  //     version: '16.0.0',
  //     scope: 'default',
  //     lib: () => React,
  //     shareConfig: {
  //       singleton: true,
  //       requiredVersion: '^16.0.0',
  //     },
  //   },
  //   'react-dom': {
  //     version: '16.0.0',
  //     scope: 'default',
  //     lib: () => ReactDOM,
  //     shareConfig: {
  //       singleton: true,
  //       requiredVersion: '^16.0.0',
  //     },
  //   },
  // },
  name: ''
});

const System = async({ request }: any) => {
  if (!request) {
    return <h2>No system specified</h2>;
  }

  // @ts-ignore
  const Component = lazy(() => loadRemote(request));

  console.log("data coming here", Component,);

  //@ts-ignore
  const result = await Component?._payload?._result();

  console.log("Result coming here", result)

  await result.mount();
  await result.mountExt();
  await result.mountStandalone({myvari: "initial value"});

  // return (
  //   <Suspense fallback="Loading System">
  //     {/* <Component /> */}
  //     <>Loaded</>
  //   </Suspense>
  // );
};

const RemoteNewApp = () => {
  const [system, setSystem] = useState<any>(null);

  const setApp2 = () => setSystem('mfeRemote/AppModule');
  // const setApp3 = () => setSystem('app3/Widget');

  useEffect(()=> {
    System({request: system})
  }, [system])

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      }}
    >
      <h1>Dynamic System Host</h1>
      <h2>App 1</h2>
      <p>
        The Dynamic System will take advantage of Module Federation <strong>remotes</strong> and{' '}
        <strong>exposes</strong>. It will not load any components or modules that have been loaded
        already.
      </p>
      <button onClick={setApp2}>Load App 2 Widget</button>
      {/* <button onClick={setApp3}>Load App 3 Widget</button> */}
      <div style={{ marginTop: '2em' }}>
        <div className="remote-module">
          <app-root> </app-root>
          <app-dashboard></app-dashboard>
          <app-standalone></app-standalone>
        </div>
      </div>
    </div>
  );
};

export default RemoteNewApp;