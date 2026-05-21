import React, { useEffect, useState } from 'react'
import API_BASE_URL from '../api'

const HERO_IMAGE = 'https://i.postimg.cc/BbzXmb3C/ja-web-cb.jpg'

export default function Home({navigate}){
  const [hero, setHero] = useState({ title:'Moja kníca', subtitle:'', style:{ color:'#E1DED2', fontWeight:'700', fontSize:'52px' } })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [pages, setPages] = useState([])
  const [blur, setBlur] = useState(0)

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
    color: hero?.style?.color || '#2C2520',
    fontWeight: hero?.style?.fontWeight || '700',
    fontSize: hero?.style?.fontSize || '52px',
    lineHeight: 1.2,
    transition: 'opacity 300ms ease',
    fontFamily: "'Hahmlet', 'Times New Roman', serif"
  }

  const categories = [
    { name: 'Autorské texty', icon: 'https://i.postimg.cc/50JZ8wkk/autorske-texty-removebg-preview.png', image: 'https://i.postimg.cc/Yqn9N50J/publikovane1.jpg' },
    { name: 'Preklady', icon: 'https://i.postimg.cc/Jn89jbdp/preklady-removebg-preview.png', image: 'https://i.postimg.cc/BQY65rts/preklady1.jpg' },
    { name: 'Pripravované', icon: 'https://i.postimg.cc/85GqLhnt/pripravovane-removebg-preview.png', image: 'https://i.postimg.cc/MKPT0CXw/pripravovane1.jpg' }
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



  // Parallax blur effect on hero image
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const heroImage = document.querySelector('.hero-image')
      if (heroImage) {
        const blurAmount = Math.min(scrollY / 30, 8)
        setBlur(blurAmount)
        heroImage.style.filter = `brightness(0.92) contrast(1.05) saturate(0.95) blur(${blurAmount}px)`
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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
          <div className="hero-overlay">
            {loading ? (
              <div style={{color:'#ffffff', fontSize:'24px', fontFamily:"'Radio Canada', sans-serif"}}>Načítavam...</div>
            ) : error ? (
              <div style={{color:'#ffffff', fontSize:'18px', fontFamily:"'Radio Canada', sans-serif"}}>
                <p>Problém s načítaním. Prosím obnovte stránku.</p>
              </div>
            ) : (
              <>
                <div className="hero-headline" style={{...dynamicStyle, color:'#ffffff', textShadow:'0 2px 8px rgba(0,0,0,0.3)', animation:'heroFadeIn 800ms cubic-bezier(0.22, 1, 0.36, 1) forwards'}} dangerouslySetInnerHTML={{__html: hero.title || 'Moja kníca'}} />
                {hero.subtitle && <p style={{color:'#ffffff', fontSize:'18px', marginTop:12, fontFamily:"'Radio Canada', sans-serif", opacity: 1}}>{hero.subtitle}</p>}
              </>
            )}
          </div>
        </div>
      </div>

      <div style={{maxWidth:'1200px', margin:'0 auto', padding:'0 24px'}}>
        {/* Two columns: O mne | Myšlienka - RESPONSIVE */}
        <section className="reveal section-two-col" style={{padding:'clamp(60px, 12vw, 160px) 0 clamp(40px, 8vw, 80px)', borderBottom:'1px solid var(--border)'}}>
          {/* Left: O mne */}
          <div className="reveal delay-1 col-left" style={{paddingRight:'clamp(0px, 5vw, 30px)', borderRight:'1px solid rgba(212, 148, 95, 0.3)'}}>
            <h2 style={{color:'var(--color-dark)', fontSize:'clamp(24px, 6vw, 36px)'}}>O mne</h2>
            <p style={{color:'var(--text-light)', fontFamily:"'Radio Canada', sans-serif", fontSize:'clamp(14px, 2.5vw, 16px)'}}>
              {hero.aboutText || 'Vitajte na mojej stránke. Tu nájdete moje diela, preklady francúzskych kapucínskych autorov a ďalší obsah, ktorý som pripravil pre duchovné povzbudenie a rast.'}
            </p>
          </div>

          {/* Right: Myšlienka/Quote */}
          <div className="reveal delay-2 col-right" style={{paddingLeft:'clamp(0px, 5vw, 30px)'}}>
            <h2 style={{color:'var(--color-dark)', fontSize:'clamp(24px, 6vw, 36px)'}}>Myšlienka</h2>
            <p style={{color: hero.quoteColor || 'var(--color-red)', fontFamily:"'Radio Canada', sans-serif", fontStyle: 'italic', fontWeight: hero.quoteWeight || '400', ...(hero.quoteBorder ? {borderLeft: `4px solid ${hero.quoteBorderColor || 'var(--color-honey)'}`, paddingLeft:'16px'} : {}), fontSize:'clamp(14px, 2.5vw, 16px)'}}>
              {hero.quote || 'Tu sa objaví inšpiratívna myšlienka alebo citát...'}
            </p>
          </div>
        </section>

        {/* Categories - 3 SQUARES SIDE BY SIDE - RESPONSIVE */}
        <section className="reveal delay-3" style={{padding:'0 0 0'}}>
          <div style={{
            display:'grid',
            gridTemplateColumns:'1fr',
            gap:'clamp(16px, 4vw, 32px)',
            marginBottom:'clamp(12px, 2vw, 24px)'
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
                  background:'rgba(212, 148, 95, 0.08)',
                  border:'1px solid var(--border)',
                  borderRadius:'12px',
                  padding:'clamp(16px, 4vw, 32px)',
                  display:'flex',
                  flexDirection:'column',
                  alignItems:'center',
                  justifyContent:'center',
                  gap:'clamp(12px, 3vw, 24px)',
                  aspectRatio:'1/1'
                }}
                onMouseEnter={(e)=>{
                  e.currentTarget.style.background = 'rgba(212, 148, 95, 0.12)'
                  e.currentTarget.style.transform = 'scale(1.02)'
                }}
                onMouseLeave={(e)=>{
                  e.currentTarget.style.background = 'rgba(212, 148, 95, 0.08)'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                {/* Icon at top */}
                <img 
                  src={cat.icon} 
                  alt={cat.name}
                  style={{width:'clamp(50px, 12vw, 80px)', height:'clamp(50px, 12vw, 80px)', objectFit:'contain'}}
                />
                
                {/* Title */}
                <h3 style={{color:'var(--color-dark)', fontWeight:600, fontFamily:"'Hahmlet', serif", margin:'0', fontSize:'clamp(16px, 4vw, 22px)', textAlign:'center'}}>
                  {cat.name}
                </h3>
                
                {/* Button - Oval with border only */}
                <button style={{padding:'clamp(6px, 1.5vw, 8px) clamp(16px, 4vw, 24px)', background:'transparent', color:'var(--color-honey)', border:'2px solid var(--color-honey)', borderRadius:'24px', cursor:'pointer', fontWeight:600, fontSize:'clamp(11px, 2vw, 13px)', transition:'all 300ms ease', fontFamily:"'Radio Canada', sans-serif"}}
                  onMouseEnter={(e)=>{
                    e.currentTarget.style.color = 'white'
                    e.currentTarget.style.background = 'var(--color-honey)'
                  }}
                  onMouseLeave={(e)=>{
                    e.currentTarget.style.color = 'var(--color-honey)'
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  Pozrieť
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* News Carousel - INSPIRED BY CONTEMPLATIVEOUTREACH */}
        {pages.length > 0 && !loading && (
          <section className="reveal delay-5 carousel-container" style={{padding:'clamp(16px, 2vw, 24px) 0', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)', marginTop:'0'}}>
            <h2 style={{textAlign:'center', fontFamily:"'Hahmlet', serif", color:'var(--color-dark)', marginBottom:'32px', fontSize:'clamp(20px, 4vw, 28px)'}}>Najnovší obsah</h2>
            
            {/* Carousel Track */}
            <div className="carousel-track" style={{transform:`translateX(-${carouselIndex * 100}%)`}}>
              {pages.map((page, idx) => (
                <div key={idx} className="carousel-slide">
                  <div className="carousel-slide-content"
                    onMouseEnter={(e)=>{e.currentTarget.style.background = 'rgba(212, 148, 95, 0.12)', e.currentTarget.style.transform = 'translateY(-4px)'}}
                    onMouseLeave={(e)=>{e.currentTarget.style.background = 'rgba(212, 148, 95, 0.08)', e.currentTarget.style.transform = 'translateY(0)'}}
                  >
                    <h3 style={{marginBottom:'12px', color:'var(--color-dark)', fontWeight:600, fontFamily:"'Hahmlet', serif", lineHeight:1.4}}>
                      {page.title}
                    </h3>
                    <p style={{color:'var(--text-light)', lineHeight:1.6, marginBottom:'16px', flex:1, fontFamily:"'Radio Canada', sans-serif", display:'-webkit-box', WebkitLineClamp:3, WebkitBoxOrient:'vertical', overflow:'hidden'}} 
                      dangerouslySetInnerHTML={{__html: page.content ? page.content.substring(0, 120) + '...' : ''}}
                    />
                    <button onClick={() => navigate(`/projects`)} style={{alignSelf:'flex-start', padding:'8px 16px', background:'var(--color-honey)', color:'white', border:'none', borderRadius:'4px', cursor:'pointer', fontWeight:600, fontSize:'13px', transition:'all 300ms ease', fontFamily:"'Radio Canada', sans-serif"}}
                      onMouseEnter={(e)=>{e.currentTarget.style.background = 'var(--color-red)'}}
                      onMouseLeave={(e)=>{e.currentTarget.style.background = 'var(--color-honey)'}}
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
