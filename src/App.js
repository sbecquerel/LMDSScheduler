import React from 'react'
import './App.css'
import Controller from './components/Controller'
import { useAuth0 } from "./auth/auth0Wrapper";

const App = () => {  
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0()

  if (loading) {
    return <div className="alert alert-primary" role="alert">Chargement...</div>
  }

  if (!isAuthenticated) {
    const fn = async () => {
      await loginWithRedirect({
        appState: { targetUrl: '/' }
      })
    }
    fn()
    return <div className="alert alert-primary" role="alert">Redirection pour authentification</div>
  }

  return <Controller />
}

export default App
