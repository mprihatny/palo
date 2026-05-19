import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Admin from './pages/Admin'
import Footer from './components/Footer'

function App(){
  const [route, setRoute] = useState(window.location.pathname);

  useEffect(()=>{
    const onPop = ()=> setRoute(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return ()=> window.removeEventListener('popstate', onPop);
  },[])

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setRoute(path);
    window.scrollTo(0, 0);
  }

  const getCategoryFromRoute = (r) => {
    const match = r.match(/\?cat=(.+?)(?:&|$)/)
    return match ? decodeURIComponent(match[1]) : null
  }

  return (
    <div className="app">
      <Navbar navigate={navigate} currentRoute={route} />
      {route === '/' && <Home navigate={navigate} />}
      {route.startsWith('/projects') && <Projects navigate={navigate} category={getCategoryFromRoute(route)} />}
      {route === '/admin' && <Admin navigate={navigate} />}
      <Footer navigate={navigate} />
    </div>
  )
}

export default App
