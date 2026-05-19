import React, { useEffect, useState } from 'react'
import API_BASE_URL from '../api'

const HERO_IMAGE = 'https://i.postimg.cc/BbzXmb3C/ja-web-cb.jpg'

export default function Home({navigate}){
  const [hero, setHero] = useState({ title:'Moja kníca', subtitle:'', style:{ color:'#E1DED2', fontWeight:'700', fontSize:'52px' } })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [pages, setPages] = useState([])

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

  // Fetch latest pages/posts for carousel
  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/pages`)
        if (response.ok) {
          const data = await response.json()
          setPages(data.slice(0, 6))
        }
      } catch (err) {
        console.log('Failed to fetch pages:', err)
      }
    }
    fetchPages()
  }, [])

  // Auto-rotate carousel
  useEffect(() => {
    if (pages.length === 0) return
    const timer = setInterval(() => {
      setCarouselIndex(prev => (prev + 1) % pages.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [pages.length])

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
  }, [])

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
          <div className="hero-overlay reveal reveal-fast">
            {loading ? (
              <div style={{color:'#E1DED2', fontSize:'24px', fontFamily:"'Radio Canada', sans-serif"}}>Načítavam...</div>
            ) : error ? (
              <div style={{color:'#E1DED2', fontSize:'18px', fontFamily:"'Radio Canada', sans-serif"}}>
                <p>Problém s načítaním. Prosím obnovte stránku.</p>
              </div>
            ) : (
              <>
                <div className="hero-headline reveal reveal-fast" style={{...dynamicStyle}} dangerouslySetInnerHTML={{__html: hero.title || 'Moja kníca'}} />
                {hero.subtitle && <p className="reveal reveal-fast" style={{color:'#E1DED2', fontSize:'18px', marginTop:12, fontFamily:"'Radio Canada', sans-serif"}}>{hero.subtitle}</p>}
              </>
            )}
          </div>
        </div>
      </div>

      <div style={{maxWidth:'1200px', margin:'0 auto', padding:'0 24px'}}>
        {/* Two columns: O mne | Myšlienka - RESPONSIVE */}
        <section className="reveal section-two-col" style={{padding:'40px 0 60px', borderBottom:'1px solid var(--border)'}}>
          {/* Left: O mne */}
          <div className="reveal delay-1 col-left" style={{}}>
            <h2 style={{color:'var(--color-light)'}}>O mne</h2>
            <p style={{color:'var(--text-light)', fontFamily:"'Radio Canada', sans-serif"}}>
              Vitajte na mojej stránke. Tu nájdete moje diela, preklady francúzskych kapucínskych autorov a ďalší obsah, ktorý som pripravil pre duchovné povzbudenie a rast.
            </p>
          </div>

          {/* Right: Myšlienka/Quote */}
          <div className="reveal delay-2 col-right" style={{}}>
            <h2 style={{color:'var(--color-light)'}}>Myšlienka</h2>
            <p style={{color:'var(--color-honey)', fontFamily:"'Radio Canada', sans-serif", fontStyle:'italic', borderLeft:'4px solid var(--color-honey)', paddingLeft:'16px'}}>
              {hero.quote || 'Tu sa objaví inšpiratívna myšlienka alebo citát...'}
            </p>
          </div>
        </section>

        {/* Categories - RESPONSIVE GRID */}
        <section className="reveal delay-3" style={{padding:'40px 0 60px'}}>
          <h2 style={{textAlign:'center', fontFamily:"'Hahmlet', serif", color:'var(--color-light)'}}>Obsahy</h2>
          <div style={{
            display:'grid',
            gridTemplateColumns:'1fr',
            gap:'24px',
            marginBottom:'40px',
          }} className="categories-grid">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className={`reveal delay-${idx + 4}`}
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
                    style={{width:'100%', height:'200px', objectFit:'cover', filter:'brightness(0.88) contrast(1.08) saturate(0.95)', display:'block', marginBottom:'16px'}}
                  />
                )}
                <div>
                  <h3 style={{color:'var(--color-light)', fontWeight:600, fontFamily:"'Hahmlet', serif"}}>
                    {cat.name}
                  </h3>
                  <p style={{color:'var(--text-light)', marginBottom:'12px', fontFamily:"'Radio Canada', sans-serif"}}>
                    Klikni a pozri si obsah tejto kategórie
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* News Carousel - INSPIRED BY CONTEMPLATIVEOUTREACH */}
        {pages.length > 0 && (
          <section className="reveal delay-5 carousel-container" style={{padding:'40px 0 60px', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)'}}>
            <h2 style={{textAlign:'center', fontFamily:"'Hahmlet', serif", color:'var(--color-light)', marginBottom:'32px'}}>Najnovší obsah</h2>
            
            {/* Carousel Track */}
            <div className="carousel-track" style={{transform:`translateX(-${carouselIndex * 100}%)`}}>
              {pages.map((page, idx) => (
                <div key={idx} className="carousel-slide">
                  <div className="carousel-slide-content"
                    onMouseEnter={(e)=>{e.currentTarget.style.background = 'rgba(212, 148, 95, 0.12)', e.currentTarget.style.transform = 'translateY(-4px)'}}
                    onMouseLeave={(e)=>{e.currentTarget.style.background = 'rgba(212, 148, 95, 0.08)', e.currentTarget.style.transform = 'translateY(0)'}}
                  >
                    <h3 style={{marginBottom:'12px', color:'var(--color-light)', fontWeight:600, fontFamily:"'Hahmlet', serif", lineHeight:1.4}}>
                      {page.title}
                    </h3>
                    <p style={{color:'var(--text-light)', lineHeight:1.6, marginBottom:'16px', flex:1, fontFamily:"'Radio Canada', sans-serif", display:'-webkit-box', WebkitLineClamp:3, WebkitBoxOrient:'vertical', overflow:'hidden'}} 
                      dangerouslySetInnerHTML={{__html: page.content ? page.content.substring(0, 120) + '...' : ''}}
                    />
                    <button onClick={() => navigate(`/projects`)} style={{alignSelf:'flex-start', padding:'8px 16px', background:'var(--color-honey)', color:'var(--color-dark)', border:'none', borderRadius:'4px', cursor:'pointer', fontWeight:600, fontSize:'13px', transition:'all 300ms ease', fontFamily:"'Radio Canada', sans-serif"}}
                      onMouseEnter={(e)=>{e.currentTarget.style.background = 'var(--color-red)', e.currentTarget.style.color = 'white'}}
                      onMouseLeave={(e)=>{e.currentTarget.style.background = 'var(--color-honey)', e.currentTarget.style.color = 'var(--color-dark)'}}
                    >
                      Zistiť viac
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Indicators */}
            <div className="carousel-indicators">
              {pages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCarouselIndex(idx)}
                  className={`carousel-dot ${carouselIndex === idx ? 'active' : ''}`}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
