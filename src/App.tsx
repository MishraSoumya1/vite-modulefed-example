import { lazy, Suspense } from 'react'
import './App.css'

const DynamicLoader = lazy(() => import("./components/DynamicRemoteLoader"))

function App() {
  return (
    <div className="app">
      <h1>Host Application</h1>
      
      <div className="remote-component">
        <h2>Remote Component:</h2>
        <Suspense fallback={<div>Loading remote component...</div>}>
          {/* <RemoteComponentLoader
            url="http://localhost:3002/remoteEntry.js"
            scope="mfeRemote"
            module="./AppModule"
          /> */}
          {/* <ImportedRemoteApp /> */}
          <DynamicLoader />
        </Suspense>
      </div>

      <div className="instructions">
        <h3>How to use:</h3>
        <ol>
          <li>Start your remote application (Angular/React)</li>
          <li>Update the remote URL in App.tsx</li>
          <li>Ensure the remote app exposes the components correctly</li>
        </ol>
      </div>
    </div>
  )
}

export default App