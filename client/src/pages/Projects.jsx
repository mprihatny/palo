import React, { useEffect, useState } from 'react'
import API_BASE_URL from '../api'

export default function Projects({navigate, category}){
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    fetch(`${API_BASE_URL}/api/pages`)
      .then(r=>r.json())
      .then(data=>{
        setPages(data)
        setLoading(false)
      })
      .catch(err=>{
        console.error('Failed to fetch pages:', err)
        setLoading(false)
      })
  },[])

  const filtered = category ? pages.filter(p => p.category === category) : pages

  return (
    <div style={{minHeight:'100vh', background:'var(--bg)', display:'flex', flexDirection:'column'}}>
      {/* Header */}
      <div style={{maxWidth:'1200px', width:'100%', margin:'0 auto', padding:'48px 24px 40px', borderBottom:'1px solid var(--border)'}}>
        <h1 style={{fontSize:'40px', marginBottom:'12px', fontFamily:"'Hahmlet', serif"}}>
          {category || 'Všetok obsah'}
        </h1>
        <p style={{fontSize:'16px', color:'var(--text-light)', fontFamily:"'Radio Canada', sans-serif", margin:0}}>
          {category ? `Pozri si všetok obsah v kategórii ${category}` : 'Všetok obsah na jednom mieste'}
        </p>
      </div>

      {/* Content */}
      <div style={{flex:1, maxWidth:'900px', width:'100%', margin:'0 auto', padding:'48px 24px 80px'}}>
        {loading ? (
          <div style={{fontSize:18, color:'var(--text-light)', textAlign:'center', padding:'60px 0', fontFamily:"'Radio Canada', sans-serif"}}>
            Načítavam...
          </div>
        ) : filtered.length > 0 ? (
          <div>
            {filtered.map((p, idx) => (
              <article key={p._id} style={{marginBottom:idx === filtered.length - 1 ? 0 : 60, paddingBottom:idx === filtered.length - 1 ? 0 : 60, borderBottom:idx === filtered.length - 1 ? 'none' : '1px solid var(--border)'}}>
                <h2 style={{fontSize:32, fontWeight:600, marginBottom:20, color:'var(--color-dark)', fontFamily:"'Hahmlet', serif", lineHeight:1.3}}>
                  {p.title}
                </h2>
                <p style={{fontSize:13, color:'var(--text-light)', marginBottom:24, fontFamily:"'Radio Canada', sans-serif", fontStyle:'italic'}}>
                  Kategória: <strong>{p.category || 'Bez kategórie'}</strong>
                </p>
                <div style={{fontSize:16, lineHeight:'1.85', color:'var(--text)', fontFamily:"'Radio Canada', sans-serif"}} dangerouslySetInnerHTML={{__html: p.content}} />
              </article>
            ))}
          </div>
        ) : (
          <div style={{textAlign:'center', padding:'80px 40px'}}>
            <h2 style={{fontSize:28, color:'var(--color-dark)', marginBottom:16, fontFamily:"'Hahmlet', serif"}}>
              Žiadny obsah
            </h2>
            <p style={{fontSize:16, color:'var(--text-light)', marginBottom:40, fontFamily:"'Radio Canada', sans-serif"}}>
              Zatiaľ nie sú žiadne príspěvky v tejto kategórii. Prosím, skúsiť neskôr.
            </p>
          </div>
        )}
      </div>

      {/* Back button */}
      <div style={{padding:'24px', textAlign:'center', borderTop:'1px solid var(--border)'}}>
        <button 
          onClick={()=>navigate('/')}
          style={{
            background:'var(--color-honey)',
            border:'none',
            fontSize:16,
            fontWeight:600,
            color:'white',
            cursor:'pointer',
            display:'inline-flex',
            alignItems:'center',
            gap:8,
            padding:'12px 28px',
            borderRadius:'4px',
            transition:'all 300ms ease',
            fontFamily:"'Radio Canada', sans-serif"
          }}
          onMouseEnter={(e)=>{e.target.style.background='var(--color-red)', e.target.style.transform='scale(1.05)'}}
          onMouseLeave={(e)=>{e.target.style.background='var(--color-honey)', e.target.style.transform='scale(1)'}}
        >
          <svg style={{width:16, height:16}} fill="currentColor" viewBox="0 0 16 16">
            <path d="m3.5 8 4.5-4.5M3.5 8l4.5 4.5"/>
          </svg>
          Späť
        </button>
      </div>
    </div>
  )
}
