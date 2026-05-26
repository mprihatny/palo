import React, { useEffect, useState } from 'react'
import API_BASE_URL from '../api'

const DEFAULT_HERO_IMAGE = 'https://i.postimg.cc/C59V7gs1/hlavne-foto1.jpg'

export default function Projects({navigate, category}){
  const [pages, setPages] = useState([])
  const [hero, setHero] = useState({})
  const [loading, setLoading] = useState(true)
  const [blur, setBlur] = useState(0)
  const [categoryHeroes, setCategoryHeroes] = useState({})
  const [heroImage, setHeroImage] = useState(DEFAULT_HERO_IMAGE)

  useEffect(()=>{
    console.log('Fetching pages for category:', category)
    fetch(`${API_BASE_URL}/api/pages`)
      .then(r=>r.json())
      .then(data=>{
        console.log('Fetched pages:', data)
        console.log('Filtered by category:', category, data.filter(p => !category || p.category === category))
        setPages(data)
        setLoading(false)
      })
      .catch(err=>{
        console.error('Failed to fetch pages:', err)
        setLoading(false)
      })
  }, [category])

  useEffect(()=>{
    const interval = setInterval(() => {
      fetch(`${API_BASE_URL}/api/pages`)
        .then(r=>r.json())
        .then(data=> setPages(data))
        .catch(err=> console.error('Auto-refresh failed:', err))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(()=>{
    fetch(`${API_BASE_URL}/api/hero`)
      .then(r=>r.json())
      .then(data=>{
        setHero(data)
      })
      .catch(err=>{
        console.error('Failed to fetch hero:', err)
      })
  }, [])

  useEffect(()=>{
    fetch(`${API_BASE_URL}/api/category-heroes`)
      .then(r=>r.json())
      .then(data=>{
        setCategoryHeroes(data)
        // Set hero image based on category
        if (category === 'Autorské texty' && data.autorske?.image) {
          setHeroImage(data.autorske.image)
        } else if (category === 'Preklady' && data.preklady?.image) {
          setHeroImage(data.preklady.image)
        } else if (category === 'Pripravované' && data.pripravovane?.image) {
          setHeroImage(data.pripravovane.image)
        }
      })
      .catch(err=>{
        console.error('Failed to fetch category heroes:', err)
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
  }, [filtered, pages])

  // Parallax blur effect on hero image only
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
    <div style={{minHeight:'100vh', background:'var(--bg)', display:'flex', flexDirection:'column'}}>
      {/* Hero section - "Moja fotka" */}
      {heroImage && (
      <div style={{paddingTop:0, paddingBottom:0}}>
        <div className="hero-container">
          <img 
            className="hero-image"
            src={heroImage} 
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
            zIndex:2,
            opacity:1
          }} className="hero-overlay">
            <div style={{maxWidth:'600px'}}>
              <h1 className="hero-headline" style={{color:'#ffffff', fontSize:'clamp(32px, 8vw, 56px)', fontWeight:700, fontFamily:"'Hahmlet', serif", margin:'0 0 16px 0', textShadow:'0 2px 8px rgba(0,0,0,0.3)', animation:'heroFadeIn 800ms cubic-bezier(0.22, 1, 0.36, 1) forwards'}}>
                {category || 'Všetok obsah'}
              </h1>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Two-column layout - Responsive */}
      <div style={{maxWidth:'1200px', width:'100%', margin:'0 auto', padding:'clamp(60px, 10vw, 120px) clamp(16px, 5vw, 40px) 0', flex:1}}>
        {loading ? (
          <div style={{fontSize:18, color:'var(--text-light)', textAlign:'center', padding:'60px 0', fontFamily:"'Radio Canada', sans-serif"}}>
            Načítavam...
          </div>
        ) : (
          <div style={{display:'grid', gap:'clamp(40px, 8vw, 100px)'}} className="projects-two-col">
            {/* Left column - Books */}
            <div>
              <h2 className="reveal delay-1" style={{fontSize:'clamp(24px, 5vw, 32px)', marginBottom:'clamp(30px, 5vw, 60px)', fontFamily:"'Hahmlet', serif", color:'var(--color-dark)', fontWeight:700}}>Knihy</h2>
              {books.length > 0 ? (
                <div style={{display:'flex', flexDirection:'column', gap:'clamp(30px, 5vw, 60px)'}}>
                  {books.map((p, idx) => (
                    <article key={p._id} className={`reveal delay-${idx % 3 + 1}`}>
                      <h3 style={{fontSize:'clamp(20px, 4vw, 26px)', fontWeight:700, marginBottom:'clamp(12px, 3vw, 20px)', color:'var(--color-dark)', fontFamily:"'Hahmlet', serif", lineHeight:1.3}}>
                        {p.title}
                      </h3>
                      <div style={{fontSize:16, lineHeight:'1.8', color:'var(--text)', fontFamily:"'Radio Canada', sans-serif", letterSpacing:'0.3px'}} dangerouslySetInnerHTML={{__html: p.content}} />
                    </article>
                  ))}
                </div>
              ) : (
                <p className="reveal delay-2" style={{color:'var(--text-light)', fontFamily:"'Radio Canada', sans-serif", fontSize:'clamp(14px, 2.5vw, 16px)', lineHeight:'1.6', letterSpacing:'0.2px'}}>Zatiaľ nie sú žiadne knihy v tejto kategórii.</p>
              )}
            </div>

            {/* Right column - Studies */}
            <div>
              <h2 className="reveal delay-2" style={{fontSize:'clamp(24px, 5vw, 32px)', marginBottom:'clamp(30px, 5vw, 60px)', fontFamily:"'Hahmlet', serif", color:'var(--color-dark)', fontWeight:700}}>Štúdie</h2>
              {studies.length > 0 ? (
                <div style={{display:'flex', flexDirection:'column', gap:'clamp(30px, 5vw, 60px)'}}>
                  {studies.map((p, idx) => (
                    <article key={p._id} className={`reveal delay-${idx % 3 + 2}`}>
                      <h3 style={{fontSize:'clamp(20px, 4vw, 26px)', fontWeight:700, marginBottom:'clamp(12px, 3vw, 20px)', color:'var(--color-dark)', fontFamily:"'Hahmlet', serif", lineHeight:1.3}}>
                        {p.title}
                      </h3>
                      <div style={{fontSize:16, lineHeight:'1.8', color:'var(--text)', fontFamily:"'Radio Canada', sans-serif", letterSpacing:'0.3px'}} dangerouslySetInnerHTML={{__html: p.content}} />
                    </article>
                  ))}
                </div>
              ) : (
                <p className="reveal delay-3" style={{color:'var(--text-light)', fontFamily:"'Radio Canada', sans-serif", fontSize:'clamp(14px, 2.5vw, 16px)', lineHeight:'1.6', letterSpacing:'0.2px'}}>Zatiaľ nie sú žiadne štúdie v tejto kategórii.</p>
              )}
            </div>
          </div>
        )}


      </div>
    </div>
  )
}
