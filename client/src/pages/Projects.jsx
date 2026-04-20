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
  },[])

  const filtered = category ? pages.filter(p => p.category === category) : pages
  const books = filtered.filter(p => p.type === 'Knihy')
  const studies = filtered.filter(p => p.type === 'Štúdie')

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
            <h1 style={{color:'#E1DED2', fontSize:'52px', fontWeight:700, fontFamily:"'Hahmlet', serif", margin:0}}>
              {category || 'Všetok obsah'}
            </h1>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div style={{maxWidth:'1200px', width:'100%', margin:'0 auto', padding:'60px 24px 80px', flex:1}}>
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
                  {books.map((p) => (
                    <article key={p._id}>
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
                  {studies.map((p) => (
                    <article key={p._id}>
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

      {/* Back button */}
      <div style={{padding:'24px', textAlign:'center', borderTop:'1px solid var(--border)'}}>
        <button 
          onClick={()=>navigate('/')}
          style={{
            background:'var(--color-honey)',
            border:'none',
            fontSize:16,
            fontWeight:600,
            color:'white',
            cursor:'pointer',
            display:'inline-flex',
            alignItems:'center',
            gap:8,
            padding:'12px 24px',
            borderRadius:'4px',
            transition:'all 300ms ease',
            fontFamily:"'Radio Canada', sans-serif"
          }}
          onMouseEnter={(e)=>{e.target.style.background = 'var(--color-red)', e.target.style.transform = 'scale(1.05)'}}
          onMouseLeave={(e)=>{e.target.style.background = 'var(--color-honey)', e.target.style.transform = 'scale(1)'}}
        >
          <svg style={{width:16, height:16}} fill="white" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
          </svg>
          Späť domov
        </button>
      </div>
    </div>
  )
}
            padding:'12px 28px',
            borderRadius:'4px',
            transition:'all 300ms ease',
            fontFamily:"'Radio Canada', sans-serif"
          }}
          onMouseEnter={(e)=>{e.target.style.background='var(--color-red)', e.target.style.transform='scale(1.05)'}}
          onMouseLeave={(e)=>{e.target.style.background='var(--color-honey)', e.target.style.transform='scale(1)'}}
        >
          <svg style={{width:16, height:16}} fill="currentColor" viewBox="0 0 16 16">
            <path d="m3.5 8 4.5-4.5M3.5 8l4.5 4.5"/>
          </svg>
          Späť
        </button>
      </div>
    </div>
  )
}
