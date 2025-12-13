import React, { useEffect, useState } from 'react'
import API_BASE_URL from '../api'

const HERO_IMAGE = 'https://i.postimg.cc/C59V7gs1/hlavne-foto1.jpg'

export default function Home({navigate}){
  const [hero, setHero] = useState({ title:'', subtitle:'', style:{ color:'#ffffff', fontWeight:'600', fontSize:'48px' } })

  useEffect(()=>{
    const loadHero = ()=>{
      fetch(`${API_BASE_URL}/api/hero`).then(r=>r.json()).then(data=>{
        if (data && Object.keys(data).length) setHero(prev=>({ ...prev, ...data }))
      }).catch(err=> console.log('Failed to fetch hero:', err.message))
    }
    
    loadHero()
    const interval = setInterval(loadHero, 2000)
    return ()=> clearInterval(interval)
  },[])

  const dynamicStyle = {
    color: hero?.style?.color || '#ffffff',
    fontWeight: hero?.style?.fontWeight || '600',
    fontSize: hero?.style?.fontSize || '48px',
    lineHeight: 1.3,
    transition: 'opacity 300ms ease'
  }

  const categories = [
    { name: 'Vlastna tvorba', icon: '✨', color: '#D4945F', image: 'https://i.postimg.cc/Yqn9N50J/publikovane1.jpg' },
    { name: 'Preklad', icon: '📖', color: '#931413', image: 'https://i.postimg.cc/BQY65rts/preklady1.jpg' },
    { name: 'Pripravovane', icon: '🚀', color: '#6D5450', image: 'https://i.postimg.cc/MKPT0CXw/pripravovane1.jpg' },
    { name: 'Publikovane', icon: '📚', color: '#40332D', image: 'https://i.postimg.cc/Yqn9N50J/publikovane1.jpg' }
  ]

  return (
    <div style={{minHeight:'100vh', background:'var(--bg)'}}>
      {/* Hero Image - elegantný kapucínsky štýl */}
      <div style={{paddingTop:0, paddingBottom:0}}>
        <div className="hero-container">
          <img 
            className="hero-image"
            src={HERO_IMAGE} 
            alt="hero"
          />
          <div style={{
            position:'absolute',
            inset:0,
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            flexDirection:'column',
            textAlign:'center',
            padding:'48px',
            zIndex:2
          }}>
            <div style={{...dynamicStyle}} dangerouslySetInnerHTML={{__html: hero.title || ''}} />
            {hero.subtitle && <p className="hero-subtitle">{hero.subtitle}</p>}
          </div>
        </div>
      </div>

      <div className="container">
        {/* About section */}
        <section className="about">
          <h2>O mne</h2>
          <p style={{fontSize:'19px', color:'var(--text-light)', maxWidth:'720px', margin:'0 auto', lineHeight:1.8}}>
            Vitajte na mojej stránke. Tu nájdete moje diela, preklady francúzskych kapucínskych autorov a ďalší obsah, ktorý som pripravil pre duchovné povzbudenie a rast.
          </p>
        </section>

        {/* Icon cards section - kapucínsky dizajn */}
        <section style={{padding:'48px 24px 80px', marginBottom:'0'}}>
          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))',
            gap:'32px',
            maxWidth:'1100px',
            margin:'0 auto'
          }}>
            {categories.map((cat, idx) => (
              <div
                key={idx}
                onClick={()=>navigate(`/projects?cat=${encodeURIComponent(cat.name)}`)}
                style={{
                  cursor:'pointer',
                  padding: cat.image ? '0' : '40px 28px',
                  background:'var(--bg)',
                  borderRadius:'2px',
                  boxShadow:'none',
                  textAlign:'center',
                  transition:'all 280ms ease',
                  border:'none',
                  borderTop: '3px solid var(--kapucin-gold)',
                  overflow:'hidden',
                  display:'flex',
                  flexDirection:'column'
                }}
                onMouseEnter={(e)=>{
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.borderTopColor = 'var(--kapucin-brown)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={(e)=>{
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.borderTopColor = 'var(--kapucin-gold)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {cat.image ? (
                  <>
                    <img 
                      src={cat.image} 
                      alt={cat.name}
                      style={{width:'100%', height:'200px', objectFit:'cover', filter:'brightness(0.9) contrast(1.05)'}}
                    />
                    <div style={{padding:'24px 20px'}}>
                      <h3 style={{fontSize:'22px', marginBottom:'0', color:'var(--kapucin-brown)', fontWeight:600}}>
                        {cat.name}
                      </h3>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{fontSize:'56px', marginBottom:'20px', filter:'grayscale(0.3)'}}>📁</div>
                    <h3 style={{fontSize:'22px', marginBottom:'0', color:'var(--kapucin-brown)', fontWeight:600}}>
                      {cat.name}
                    </h3>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
