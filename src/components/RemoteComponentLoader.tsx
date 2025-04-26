/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import { loadRemoteModule } from '../utils/loadRemote'

type RemoteComponentLoaderProps = {
  url: string
  scope: string
  module: string
}

export function RemoteComponentLoader({ url, scope, module }: RemoteComponentLoaderProps) {
  const [Component, setComponent] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadComponent = async () => {
      try {
        const component = await loadRemoteModule({ url, scope, module })
        setComponent(() => component.default || component)
      } catch (err) {
        setError('Failed to load remote component')
        console.error(err)
      }
    }

    loadComponent()
  }, [url, scope, module])

  if (error) {
    return <div className="error">{error}</div>
  }

  if (!Component) {
    return <div>Loading remote component...</div>
  }

  return <Component />
}