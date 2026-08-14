import React, { useEffect, useState } from 'react'
import API_BASE_URL from '../api'

const DEFAULT_HERO_IMAGE = 'https://i.postimg.cc/BbzXmb3C/ja-web-cb.jpg'

export default function Omne(){
  // v2 - force redeploy
  const [hero, setHero] = useState({})
  const [heroImage, setHeroImage] = useState(DEFAULT_HERO_IMAGE)
  const [aboutText, setAboutText] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [blur, setBlur] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    let isMounted = true
    const loadContent = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/heroes`, { signal: AbortSignal.timeout(5000) })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        const data = json.value?.[0] || json  // Handle array response or direct object
        if (isMounted) {
          setHero(data)
          const resolvedHeroImage = data?.heroImage && data.heroImage.trim() && !data.heroImage.includes('/uploads/')
            ? data.heroImage.trim()
            : data?.youtubeAdsImage && data.youtubeAdsImage.trim()
              ? data.youtubeAdsImage.trim()
              : DEFAULT_HERO_IMAGE
          setHeroImage(resolvedHeroImage)
          setAboutText(data?.omneText || data?.aboutText || 'O mne obsah ešte nie je nastavený. Použi admin panel na úpravu.')
          setLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          setError('Obsah sa nenačítal. Skús obnoviť stránku.')
          setAboutText('O mne obsah ešte nie je nastavený. Použi admin panel na úpravu.')
          setHeroImage(DEFAULT_HERO_IMAGE)
          setLoading(false)
        }
      }
    }
    loadContent()
    return () => { isMounted = false }
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

  useEffect(() => {
    const revealed = document.querySelectorAll('.reveal')
    setTimeout(() => {
      revealed.forEach(el => {
        el.classList.add('visible')
      })
    }, 50)
  }, [])

  return (
    <div style={{minHeight:'100vh', background:'var(--bg)'}}>
      {/* Hero section with text overlay - like category pages */}
      {heroImage && (
      <div style={{paddingTop:0, paddingBottom:0}}>
        <div className="hero-container">
          <img 
            className="hero-image"
            src={heroImage} 
            alt="O mne"
          />
          <div style={{
            position:'absolute',
            inset:20,
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            textAlign:'center',
            padding:'48px 24px',
            zIndex:2,
            opacity:1
          }} className="hero-overlay">
            <div style={{maxWidth:'600px'}}>
              <h1 className="hero-headline" style={{color:'#ffffff', fontSize:'clamp(32px, 8vw, 56px)', fontWeight:700, fontFamily:"'Lora', serif", margin:'0', textShadow:'0 2px 8px rgba(0,0,0,0.3)', animation:'heroFadeIn 800ms cubic-bezier(0.22, 1, 0.36, 1) forwards'}}>
                O mne
              </h1>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Content Section */}
      <div style={{maxWidth:900, width:'100%', margin:'0 auto', padding:'clamp(60px, 12vw, 100px) 24px clamp(80px, 15vw, 120px)', textAlign:'center'}}>
        <div style={{
          fontFamily:"'Radio Canada', sans-serif",
          fontSize:'clamp(16px, 2.2vw, 18px)',
          color:'var(--text-light)',
          lineHeight:1.9,
          margin:'0 auto'
        }}>
          {error ? (
            <p style={{color:'var(--color-red)'}}>{error}</p>
          ) : (
            !loading && <div dangerouslySetInnerHTML={{ __html: aboutText }} />
          )}
        </div>
      </div>
    </div>
  )
}
