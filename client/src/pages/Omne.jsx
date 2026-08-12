import React, { useEffect, useState } from 'react'
import API_BASE_URL from '../api'

const DEFAULT_HERO_IMAGE = 'https://i.postimg.cc/BbzXmb3C/ja-web-cb.jpg'

export default function Omne(){
  const [hero, setHero] = useState({})
  const [heroImage, setHeroImage] = useState(DEFAULT_HERO_IMAGE)
  const [aboutText, setAboutText] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [blur, setBlur] = useState(0)

  useEffect(() => {
    let isMounted = true
    const loadContent = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/hero`, { signal: AbortSignal.timeout(5000) })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        if (isMounted) {
          setHero(data)
          const resolvedHeroImage = data?.heroImage && data.heroImage.trim() && !data.heroImage.includes('/uploads/')
            ? data.heroImage.trim()
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
      const heroImage = document.querySelector('.omne-hero-image')
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
      {/* Hero Image - NO TEXT OVERLAY */}
      <div style={{paddingTop:0, paddingBottom:0}}>
        <div style={{position:'relative', height:'50vh', minHeight:350, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center'}}>
          <img 
            className="omne-hero-image"
            src={heroImage} 
            alt="O mne"
            style={{
              position:'absolute',
              top:0,
              left:0,
              width:'100%',
              height:'100%',
              objectFit:'cover',
              filter:'brightness(0.92) contrast(1.05) saturate(0.95)',
              transition:'filter 100ms ease-out'
            }}
          />
        </div>
      </div>

      {/* Content Section */}
      <div style={{maxWidth:800, width:'100%', margin:'0 auto', padding:'clamp(60px, 12vw, 100px) 24px', textAlign:'center'}}>
        <h1 style={{
          margin:'0 0 32px 0',
          fontFamily:"'Hahmlet', serif",
          fontSize:'clamp(36px, 8vw, 64px)',
          color:'var(--color-dark)',
          fontWeight:700,
          lineHeight:1.2
        }}>
          O mne
        </h1>
        
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
