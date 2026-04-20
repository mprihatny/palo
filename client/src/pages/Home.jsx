import React, { useEffect, useState } from 'react'
import API_BASE_URL from '../api'

const HERO_IMAGE = 'https://i.postimg.cc/C59V7gs1/hlavne-foto1.jpg'

export default function Home({navigate}){
  const [hero, setHero] = useState({ title:'Moja kníca', subtitle:'', style:{ color:'#E1DED2', fontWeight:'700', fontSize:'52px' } })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(()=>{
    let isMounted = true
    let retries = 0
    const maxRetries = 3

    const loadHero = async () => {
      try {
        setError(null)
        const response = await fetch(`${API_BASE_URL}/api/hero`, { signal: AbortSignal.timeout(5000) })
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const data = await response.json()
        if (isMounted) {
          if (data && Object.keys(data).length) {
            setHero(prev => ({ ...prev, ...data }))
            retries = 0
          }
          setLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          console.log('Failed to fetch hero:', err.message)
          setError(err.message)
          if (retries < maxRetries) {
            retries++
            setTimeout(loadHero, 2000)
          } else {
            setLoading(false)
          }
        }
      }
    }
    
    loadHero()
    
    return () => {
      isMounted = false
    }
  },[])

  const dynamicStyle = {
    color: hero?.style?.color || '#E1DED2',
    fontWeight: hero?.style?.fontWeight || '700',
    fontSize: hero?.style?.fontSize || '52px',
    lineHeight: 1.2,
    transition: 'opacity 300ms ease',
    fontFamily: "'Hahmlet', 'Times New Roman', serif"
  }

  const categories = [
    { name: 'Autorské texty', icon: '✍️', color: '#D4945F', image: 'https://i.postimg.cc/Yqn9N50J/publikovane1.jpg' },
    { name: 'Preklady', icon: '📖', color: '#931413', image: 'https://i.postimg.cc/BQY65rts/preklady1.jpg' },
    { name: 'Pripravované', icon: '🙏', color: '#6D5450', image: 'https://i.postimg.cc/MKPT0CXw/pripravovane1.jpg' }
  ]

  return (
    <div style={{minHeight:'100vh', background:'var(--bg)'}}>
      {/* Hero Image */}
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
            padding:'48px 24px',
            zIndex:2
          }}>
            {loading ? (
              <div style={{color:'#E1DED2', fontSize:'24px', fontFamily:"'Radio Canada', sans-serif"}}>Načítavam...</div>
            ) : error ? (
              <div style={{color:'#E1DED2', fontSize:'18px', fontFamily:"'Radio Canada', sans-serif"}}>
                <p>Problém s načítaním. Prosím obnovte stránku.</p>
              </div>
            ) : (
              <>
                <div style={{...dynamicStyle}} dangerouslySetInnerHTML={{__html: hero.title || 'Moja kníca'}} />
                {hero.subtitle && <p style={{color:'#E1DED2', fontSize:'18px', marginTop:12, fontFamily:"'Radio Canada', sans-serif"}}>{hero.subtitle}</p>}
              </>
            )}
          </div>
        </div>
      </div>

      <div style={{maxWidth:'1200px', margin:'0 auto', padding:'0 24px'}}>
        {/* About section - "O mne" */}
        <section style={{padding:'60px 0 48px', borderBottom:'1px solid var(--border)'}}>
          <h2 style={{textAlign:'center', marginBottom:'40px'}}>O mne</h2>
          <p style={{fontSize:'17px', color:'var(--text-light)', maxWidth:'720px', margin:'0 auto', lineHeight:1.85, textAlign:'center', fontFamily:"'Radio Canada', sans-serif"}}>
            Vitajte na mojej stránke. Tu nájdete moje diela, preklady francúzskych kapucínskych autorov a ďalší obsah, ktorý som pripravil pre duchovné povzbudenie a rast. Môj obsah slúži ako most medzi duchovným dedičstvom a moderným svetom.
          </p>
        </section>

        {/* Categories grid - tri kolóny */}
        <section style={{padding:'60px 0'}}>
          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))',
            gap:'40px',
            marginBottom:'60px'
          }}>
            {categories.map((cat, idx) => (
              <div
                key={idx}
                onClick={()=>navigate(`/projects?cat=${encodeURIComponent(cat.name)}`)}
                style={{
                  cursor:'pointer',
                  overflow:'hidden',
                  transition:'all 300ms ease',
                  borderBottom: '3px solid var(--color-honey)',
                }}
                onMouseEnter={(e)=>{
                  e.currentTarget.style.borderBottomColor = 'var(--color-red)'
                  e.currentTarget.style.transform = 'translateY(-8px)'
                }}
                onMouseLeave={(e)=>{
                  e.currentTarget.style.borderBottomColor = 'var(--color-honey)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {cat.image && (
                  <img 
                    src={cat.image} 
                    alt={cat.name}
                    style={{width:'100%', height:'240px', objectFit:'cover', filter:'brightness(0.88) contrast(1.08) saturate(0.95)', display:'block', marginBottom:'24px'}}
                  />
                )}
                <div>
                  <h3 style={{fontSize:'24px', marginBottom:'12px', color:'var(--color-dark)', fontWeight:600, fontFamily:"'Hahmlet', serif"}}>
                    {cat.name}
                  </h3>
                  <p style={{fontSize:'16px', color:'var(--text-light)', marginBottom:'16px', fontFamily:"'Radio Canada', sans-serif"}}>
                    Zájmi tu nájdeš zoznam s mojimi prácami v tejto kategórii.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* YouTube section */}
        <section style={{padding:'60px 0', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)'}}>
          <div style={{textAlign:'center', maxWidth:'800px', margin:'0 auto'}}>
            <h2 style={{marginBottom:'32px'}}>Komerčné príspěvky na YouTube</h2>
            <p style={{fontSize:'17px', color:'var(--text-light)', lineHeight:1.85, marginBottom:'40px', fontFamily:"'Radio Canada', sans-serif"}}>
              Komentáre (priestor na obrázok a odkaz na youtube)
            </p>
            <a href="#" style={{
              display:'inline-block',
              padding:'12px 32px',
              background:'var(--color-red)',
              color:'white',
              textDecoration:'none',
              borderRadius:'4px',
              fontWeight:600,
              fontSize:'16px',
              transition:'all 300ms ease',
              fontFamily:"'Radio Canada', sans-serif"
            }}
            onMouseEnter={(e)=>{e.target.style.background = 'var(--color-dark)', e.target.style.transform = 'scale(1.05)'}}
            onMouseLeave={(e)=>{e.target.style.background = 'var(--color-red)', e.target.style.transform = 'scale(1)'}}
            >
              Videa
            </a>
          </div>
        </section>

        {/* Preview text section */}
        <section style={{padding:'60px 0'}}>
          <div style={{textAlign:'center', maxWidth:'800px', margin:'0 auto', padding:'40px', background:'rgba(212, 148, 95, 0.08)', borderRadius:'8px', borderLeft:'4px solid var(--color-honey)'}}>
            <h3 style={{fontSize:'20px', marginBottom:'16px', color:'var(--color-red)'}}>Texty/Citáty</h3>
            <p style={{fontSize:'16px', color:'var(--text-light)', lineHeight:1.85, margin:0, fontFamily:"'Radio Canada', sans-serif"}}>
              Priestor na krátky text/citáciu
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
