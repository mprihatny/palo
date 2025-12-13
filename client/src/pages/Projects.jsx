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
    <div style={{minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'40px 20px'}}>
      <div style={{maxWidth:'700px', width:'100%', textAlign:'center'}}>
        {loading ? (
          <div style={{fontSize:16, color:'var(--muted)'}}>Načítavam...</div>
        ) : filtered.length > 0 ? (
          <div>
            {filtered.map(p=> (
              <div key={p._id} style={{marginBottom:40, paddingBottom:40, borderBottom:'1px solid var(--accent)'}}>
                <h2 style={{fontSize:24, fontWeight:600, marginBottom:12}}>{p.title}</h2>
                <div style={{fontSize:16, lineHeight:'1.6', color:'var(--text)', opacity:0.9}} dangerouslySetInnerHTML={{__html: p.content}} />
              </div>
            ))}
          </div>
        ) : (
          <div style={{fontSize:16, color:'var(--muted)', marginBottom:40}}>
            Zatiaľ nie sú žiadne projekty v tejto kategórii.
          </div>
        )}
        
        <button 
          onClick={()=>navigate('/')}
          style={{
            background:'none',
            border:'none',
            fontSize:16,
            fontWeight:600,
            color:'var(--accent)',
            cursor:'pointer',
            display:'flex',
            alignItems:'center',
            gap:8,
            margin:'0 auto'
          }}
        >
          <svg style={{width:20, height:20}} fill="currentColor" viewBox="0 0 16 16">
            <path d="m3.5 8 4.5-4.5M3.5 8l4.5 4.5"/>
          </svg>
          Späť na hlavnú stranku
        </button>
      </div>
    </div>
  )
}
