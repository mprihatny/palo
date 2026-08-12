import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Omne from './pages/Omne'
import Admin from './pages/Admin'
import Footer from './components/Footer'

function App(){
  const normalizeRoute = (raw) => {
    if (!raw) return '/'
    const clean = raw.startsWith('#') ? raw.slice(1) : raw
    const normalized = clean === '' ? '/' : clean
    return normalized.endsWith('/') && normalized !== '/' ? normalized.slice(0, -1) : normalized
  }

  const getCurrentRoute = () => {
    const hash = window.location.hash
    if (hash) return normalizeRoute(hash)
    return normalizeRoute(window.location.pathname)
  }

  const [route, setRoute] = useState(getCurrentRoute());

  useEffect(()=>{
    if (!window.location.hash && window.location.pathname !== '/') {
      const newHash = `#${window.location.pathname}${window.location.search}`
      window.location.replace(newHash)
      setRoute(normalizeRoute(newHash))
      return
    }

    const onHashChange = () => setRoute(getCurrentRoute())
    window.addEventListener('hashchange', onHashChange)
    return ()=> window.removeEventListener('hashchange', onHashChange)
  },[])

  const navigate = (path) => {
    const targetHash = path.startsWith('#') ? path : `#${path}`
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash
    }
    setRoute(normalizeRoute(targetHash))
    window.scrollTo(0, 0)
  }

  const getCategoryFromRoute = (r) => {
    const match = r.match(/\?cat=(.+?)(?:&|$)/)
    return match ? decodeURIComponent(match[1]) : null
  }

  return (
    <div className="app">
      <Navbar navigate={navigate} currentRoute={route} />
      {route === '/' && <Home navigate={navigate} />}
      {route === '/omne' && <Omne />}
      {route.startsWith('/projects') && <Projects navigate={navigate} category={getCategoryFromRoute(route)} />}
      {route === '/padmin' && <Admin navigate={navigate} />}
      <Footer navigate={navigate} />
    </div>
  )
}

export default App
