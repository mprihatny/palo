import React, { useEffect, useState } from 'react'
import API_BASE_URL from '../api'

export default function Omne(){
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
          setAboutText(data?.aboutText || 'O mne obsah ešte nie je nastavený. Použi admin panel na úpravu.')
          setLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          setError('Obsah sa nenačítal. Skús obnoviť stránku.')
          setAboutText('O mne obsah ešte nie je nastavený. Použi admin panel na úpravu.')
          setLoading(false)
        }
      }
    }
    loadContent()
    return () => { isMounted = false }
  }, [])

  return (
    <div style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'80px 24px', background:'var(--bg)'}}>
      <div style={{maxWidth:860, width:'100%', textAlign:'center', padding:'60px 32px', borderRadius:28, background:'rgba(255,255,255,0.96)', border:'1px solid rgba(212, 148, 95, 0.2)', boxShadow:'0 20px 40px rgba(0,0,0,0.06)'}}>
        <h1 style={{margin:'0 0 20px 0', fontFamily:"'Hahmlet', serif", fontSize:'clamp(36px, 5vw, 48px)', color:'var(--color-dark)'}}>O mne</h1>
        <div style={{fontFamily:"'Radio Canada', sans-serif", fontSize:'clamp(16px, 2.2vw, 18px)', color:'var(--text-light)', lineHeight:1.9, textAlign:'left'}}>
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
