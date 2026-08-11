import React, { useEffect, useState } from 'react'
import API_BASE_URL from '../api'

const DEFAULT_HERO_IMAGE = 'https://i.postimg.cc/BbzXmb3C/ja-web-cb.jpg' // Home page hero image

export default function Home({navigate}){
  const [hero, setHero] = useState({ title:'Moja kníca', subtitle:'', style:{ color:'#E1DED2', fontWeight:'700', fontSize:'52px' } })
  const [heroImage, setHeroImage] = useState(DEFAULT_HERO_IMAGE)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [blur, setBlur] = useState(0)

  useEffect(()=>{
    // Clean up old upload-based images from database
    fetch(`${API_BASE_URL}/api/cleanup-hero-images`, { method: 'POST' })
      .catch(err => console.log('Cleanup check skipped:', err.message))
  }, [])

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
            // Only use heroImage if it's a valid external URL (not from uploads folder)
            if (data.heroImage && !data.heroImage.includes('/uploads/')) {
              setHeroImage(data.heroImage)
            }
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
    { name: 'Pripravované', icon: 'https://i.postimg.cc/85GqLhnt/pripravovane-removebg-preview.png', image: 'https://i.postimg.cc/MKPT0fCXw/pripravovane1.jpg' }
  ]

  const youtubeHeading = hero.youtubeHeading !== undefined ? hero.youtubeHeading : 'Sleduj nás na YouTube'
  const youtubeText = hero.youtubeText !== undefined ? hero.youtubeText : 'Nové videá, autorské texty a preklady sú pravidelne zdieľané na kanáli thepavolp. Klikni na link nižšie a pozri si posledné príspevky.'
  const youtubeButtonText = hero.youtubeButtonText !== undefined ? hero.youtubeButtonText : 'Pozrieť YouTube kanál'
  const youtubeButtonUrl = hero.youtubeButtonUrl !== undefined ? hero.youtubeButtonUrl : 'https://www.youtube.com/@thepavolp'
  const youtubeBackground = hero.youtubeImage && hero.youtubeImage.trim() ? hero.youtubeImage : 'https://i.postimg.cc/xC28bWn1/thumbnail-ja-web.png'
  const quoteHeading = hero.quoteHeading !== undefined ? hero.quoteHeading : 'Myšlienka'
  const quoteStyle = hero.quoteStyle || 'italic'

  useEffect(() => {
    const revealed = document.querySelectorAll('.reveal')
    // Show all reveal elements immediately on page load with small delay to trigger animation
    setTimeout(() => {
      revealed.forEach(el => {
        el.classList.add('visible')
      })
    }, 50)
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
          {heroImage && (
          <img 
            className="hero-image"
            src={heroImage} 
            alt="hero"
          />
          )}
          <div className="hero-overlay">
            {loading ? (
              <div style={{color:'#ffffff', fontSize:'24px', fontFamily:"'Radio Canada', sans-serif"}}>Načítavam...</div>
            ) : (
              <>
                <div className="hero-headline" style={{...dynamicStyle, color:'#ffffff', textShadow:'0 2px 8px rgba(0,0,0,0.3)', animation:'heroFadeIn 800ms cubic-bezier(0.22, 1, 0.36, 1) forwards'}} dangerouslySetInnerHTML={{__html: hero.title || 'Moja kníca'}} />
                {hero.subtitle && <p style={{color:'#ffffff', fontSize:'18px', marginTop:12, fontFamily:"'Radio Canada', sans-serif", opacity: 1}}>{hero.subtitle}</p>}
                {error && (
                  <div style={{marginTop:16, color:'#ffd9c2', fontSize:'14px', fontFamily:"'Radio Canada', sans-serif", opacity:0.95}}>
                    Problém s načítaním obsahu. Skontroluj, či je backend dostupný a MongoDB pripojenie nastavené.
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div style={{maxWidth:'1200px', margin:'0 auto', padding:'0 24px'}}>
        {/* Two columns: O mne | Myšlienka - RESPONSIVE */}
        <section className="reveal section-two-col" style={{display:'flex', alignItems:'stretch', justifyContent:'center', gap:'0', padding:'clamp(20px, 4vw, 40px) 0 clamp(40px, 8vw, 80px)'}}>
          {/* Left: O mne */}
          <div className="reveal delay-1 col-left" style={{flex:1, paddingRight:'clamp(20px, 8vw, 60px)'}}>
            <h2 style={{color:'var(--color-dark)', fontSize:'clamp(24px, 6vw, 36px)'}}>O mne</h2>
            <div style={{color:'var(--text-light)', fontFamily:"'Radio Canada', sans-serif", fontSize:'clamp(14px, 2.5vw, 16px)', lineHeight:1.8}} dangerouslySetInnerHTML={{__html: hero.aboutText || 'Vitajte na mojej stránke. Tu nájdete moje diela, preklady francúzskych kapucínskych autorov a ďalší obsah, ktorý som pripravil pre duchovné povzbudenie a rast.'}} />
          </div>

          <div className="column-divider" />

          {/* Right: Myšlienka/Quote */}
          <div className="reveal delay-2 col-right" style={{flex:1, paddingLeft:'clamp(20px, 8vw, 60px)'}}>
            <h2 style={{color:'var(--color-dark)', fontSize:'clamp(24px, 6vw, 36px)'}}>{quoteHeading}</h2>
            <p style={{color: hero.quoteColor || 'var(--color-red)', fontFamily:"'Radio Canada', sans-serif", fontWeight: hero.quoteWeight || '400', fontSize:'clamp(14px, 2.5vw, 16px)'}} dangerouslySetInnerHTML={{__html: hero.quote || 'Tu sa objaví inšpiratívna myšlienka alebo citát...'}} />
          </div>
        </section>

        {/* Categories - 3 SQUARES SIDE BY SIDE - RESPONSIVE */}
        <section className="reveal delay-3" style={{padding:'0 0 0', marginTop:'clamp(60px, 10vw, 120px)'}}>
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

        <section className="reveal delay-8 youtube-card-section">
          <div className="youtube-card" style={{backgroundImage: `linear-gradient(rgba(255,255,255,0.84), rgba(255,255,255,0.84)), url(${youtubeBackground})`, backgroundSize:'cover', backgroundPosition:'center', minHeight:'360px'}}>
            <div className="youtube-card-inner">
              <div className="youtube-card-text">
                <h3>{youtubeHeading}</h3>
                <p>{youtubeText}</p>
              </div>
              {youtubeButtonUrl && (
                <a href={youtubeButtonUrl} target="_blank" rel="noopener noreferrer" className="youtube-card-button">
                  {youtubeButtonText}
                </a>
              )}
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
