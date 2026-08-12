import React, { useEffect, useState } from 'react'
import API_BASE_URL from '../api'

const DEFAULT_HERO_IMAGE = 'https://i.postimg.cc/BbzXmb3C/ja-web-cb.jpg'

export default function Omne(){
  const [hero, setHero] = useState({})
  const [heroImage, setHeroImage] = useState(DEFAULT_HERO_IMAGE)
  const [aboutText, setAboutText] = useState('Načítavam obsah...')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  return (
    <div style={{background:'var(--bg)'}}>
      <div style={{paddingTop:0, paddingBottom:0}}>
        <div className="hero-container" style={{marginBottom:0}}>
          <img 
            className="hero-image"
            src={heroImage} 
            alt="hero"
          />
        </div>
      </div>

      <div style={{maxWidth:760, width:'100%', margin:'0 auto', padding:'44px 24px 72px', textAlign:'center'}}>
        <h1 style={{margin:'0 0 26px 0', fontFamily:"'Hahmlet', serif", fontSize:'clamp(36px, 6vw, 64px)', color:'var(--color-dark)', lineHeight:1.05}}>
          O mne
        </h1>
        <div style={{fontFamily:"'Radio Canada', sans-serif", fontSize:'clamp(16px, 2.2vw, 18px)', color:'var(--text-light)', lineHeight:1.9, margin:'0 auto', textAlign:'center'}}>
          {error ? (
            <p style={{color:'var(--color-red)'}}>{error}</p>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: loading ? '<p>Načítavam obsah...</p>' : aboutText }} />
          )}
        </div>
      </div>
    </div>
  )
}
