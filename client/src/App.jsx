import React, { useEffect, useState } from 'react'
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
    try{
      const url = new URL(r, 'http://localhost')
      return url.searchParams.get('cat')
    }catch(e){
      return null
    }
  }

  return (
    <div className="app">
      {route === '/' && <Home navigate={navigate} />}
      {route.startsWith('/projects') && <Projects navigate={navigate} category={getCategoryFromRoute(route)} />}
      {route === '/admin' && <Admin navigate={navigate} />}
      <Footer navigate={navigate} />
    </div>
  )
}

export default App
