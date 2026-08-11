import React from 'react'

export default function Omne(){
  return (
    <div style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'80px 24px', background:'var(--bg)'}}>
      <div style={{maxWidth:860, width:'100%', textAlign:'center', padding:'60px 32px', borderRadius:28, background:'rgba(255,255,255,0.92)', border:'1px solid rgba(212, 148, 95, 0.2)', boxShadow:'0 20px 40px rgba(0,0,0,0.06)'}}>
        <h1 style={{margin:'0 0 20px 0', fontFamily:"'Hahmlet', serif", fontSize:'clamp(36px, 5vw, 48px)', color:'var(--color-dark)'}}>O mne</h1>
        <div style={{fontFamily:"'Radio Canada', sans-serif", fontSize:'clamp(16px, 2.2vw, 18px)', color:'var(--text-light)', lineHeight:1.9, textAlign:'center'}}>
          {/* This text should be replaced by the admin-managed aboutText content */}
          Tu bude dôležitý text o autorovi, ktorý bude možné upravovať v administrácii. Túto stránku nájdeš iba cez /omne.
        </div>
      </div>
    </div>
  )
}
