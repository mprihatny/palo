import React from 'react'

export default function Footer({navigate}){
  return (
    <div className="footer">
      <div style={{display:'flex', gap:24, alignItems:'center', flexWrap:'wrap'}}>
        <a onClick={()=>navigate('/')} style={{cursor:'pointer', fontWeight:600, fontSize:15, letterSpacing:'0.3px', display:'flex', alignItems:'center', gap:6}}>
          <svg style={{width:18, height:18}} fill="currentColor" viewBox="0 0 16 16">
            <path d="m6.12 3.06 4.5 4.5L6.12 12.06"/>
          </svg>
          Domov
        </a>
        <a onClick={()=>navigate('/admin')} style={{cursor:'pointer', fontSize:14, opacity:0.85, display:'flex', alignItems:'center', gap:6}}>
          <svg style={{width:16, height:16}} fill="currentColor" viewBox="0 0 16 16">
            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
          </svg>
          Admin
        </a>
      </div>
      <div>
        <span 
          className="admin-link" 
          onClick={()=>window.location.href = 'mailto:admin@example.com'}
          style={{fontSize:14, opacity:0.85, letterSpacing:'0.3px', display:'flex', alignItems:'center', gap:6, cursor:'pointer'}}
        >
          <svg style={{width:16, height:16}} fill="currentColor" viewBox="0 0 16 16">
            <path d="M16 4.555v5.555q0 .89-.622 1.513T14 12.685h-2v1.445q0 .89-.622 1.513T9.867 16H6.13q-.89 0-1.513-.623T4 13.865v-1.45H2q-.889 0-1.512-.622T0 10.11V4.554q0-.889.623-1.512T2 2.42h12q.889 0 1.512.622T16 4.554zm-2 0H2v5.555h12V4.554zm-5.867 9.89h3.734v1.445H8.13v-1.445z"/>
          </svg>
          admin@example.com
        </span>
      </div>
    </div>
  )
}
