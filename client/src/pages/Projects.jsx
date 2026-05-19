import React, { useEffect, useState } from 'react'
import API_BASE_URL from '../api'

const HERO_IMAGE = 'https://i.postimg.cc/C59V7gs1/hlavne-foto1.jpg'

export default function Projects({navigate, category}){
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    fetch(`${API_BASE_URL}/api/pages`)
      .then(r=>r.json())
      .then(data=>{
        setPages(data)
        setLoading(false)
      })
      .catch(err=>{
        console.error('Failed to fetch pages:', err)
        setLoading(false)
      })
  }, [category])

  const filtered = category ? pages.filter(p => p.category === category) : pages
  const books = filtered.filter(p => p.type === 'Knihy')
  const studies = filtered.filter(p => p.type === 'Štúdie')

  useEffect(() => {
    const revealed = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    revealed.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [filtered])

  return (
    <div style={{minHeight:'100vh', background:'var(--bg)', display:'flex', flexDirection:'column'}}>
      {/* Hero section - "Moja fotka" */}
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
            textAlign:'center',
            padding:'48px 24px',
            zIndex:2
          }}>
            <h1 style={{color:'#ffffff', fontSize:'52px', fontWeight:700, fontFamily:"'Hahmlet', serif", margin:0, textShadow:'0 2px 8px rgba(0,0,0,0.3)'}}>
              {category || 'Všetok obsah'}
            </h1>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div style={{maxWidth:'1200px', width:'100%', margin:'0 auto', padding:'80px 24px 80px', flex:1}}>
        {loading ? (
          <div style={{fontSize:18, color:'var(--text-light)', textAlign:'center', padding:'60px 0', fontFamily:"'Radio Canada', sans-serif"}}>
            Načítavam...
          </div>
        ) : (
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'60px'}}>
            {/* Left column - Books */}
            <div>
              <h2 style={{fontSize:28, marginBottom:40, fontFamily:"'Hahmlet', serif", color:'var(--color-dark)'}}>Knihy</h2>
              {books.length > 0 ? (
                <div style={{display:'flex', flexDirection:'column', gap:40}}>
                  {books.map((p, idx) => (
                    <article key={p._id} className={`reveal delay-${idx % 3 + 1}`}>
                      <h3 style={{fontSize:24, fontWeight:600, marginBottom:16, color:'var(--color-dark)', fontFamily:"'Hahmlet', serif", lineHeight:1.3}}>
                        {p.title}
                      </h3>
                      <div style={{fontSize:16, lineHeight:'1.85', color:'var(--text)', fontFamily:"'Radio Canada', sans-serif"}} dangerouslySetInnerHTML={{__html: p.content}} />
                    </article>
                  ))}
                </div>
              ) : (
                <p style={{color:'var(--text-light)', fontFamily:"'Radio Canada', sans-serif", fontSize:16}}>Zatiaľ nie sú žiadne knihy v tejto kategórii.</p>
              )}
            </div>

            {/* Right column - Studies */}
            <div>
              <h2 style={{fontSize:28, marginBottom:40, fontFamily:"'Hahmlet', serif", color:'var(--color-dark)'}}>Štúdie</h2>
              {studies.length > 0 ? (
                <div style={{display:'flex', flexDirection:'column', gap:40}}>
                  {studies.map((p, idx) => (
                    <article key={p._id} className={`reveal delay-${idx % 3 + 2}`}>
                      <h3 style={{fontSize:24, fontWeight:600, marginBottom:16, color:'var(--color-dark)', fontFamily:"'Hahmlet', serif", lineHeight:1.3}}>
                        {p.title}
                      </h3>
                      <div style={{fontSize:16, lineHeight:'1.85', color:'var(--text)', fontFamily:"'Radio Canada', sans-serif"}} dangerouslySetInnerHTML={{__html: p.content}} />
                    </article>
                  ))}
                </div>
              ) : (
                <p style={{color:'var(--text-light)', fontFamily:"'Radio Canada', sans-serif", fontSize:16}}>Zatiaľ nie sú žiadne štúdie v tejto kategórii.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
