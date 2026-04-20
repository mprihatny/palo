import React, { useEffect, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import API_BASE_URL from '../api'

const TINYMCE_API_KEY = 'q76bkheben6immtc4gb0hkd8dudge6dahhc1x3lzrbfjt350'

export default function Admin({navigate}){
  const [hero, setHero] = useState({ title:'Moja kníca', subtitle:'', style:{ color:'#E1DED2', fontWeight:'700', fontSize:'52px' } })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(()=>{
    let retries = 0
    const maxRetries = 3

    const loadHero = async () => {
      try {
        setError(null)
        const response = await fetch(`${API_BASE_URL}/api/hero`, { signal: AbortSignal.timeout(5000) })
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const data = await response.json()
        setHero(prev=>({ ...prev, ...data }))
        setLoading(false)
        retries = 0
      } catch (err) {
        console.error('Load error:', err)
        setError(err.message)
        if (retries < maxRetries) {
          retries++
          setTimeout(loadHero, 2000)
        } else {
          setLoading(false)
        }
      }
    }
    
    loadHero()
  },[])

  const save = async ()=>{
    try {
      const response = await fetch(`${API_BASE_URL}/api/hero`, { 
        method:'PUT', 
        headers:{'Content-Type':'application/json'}, 
        body: JSON.stringify(hero)
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const data = await response.json()
      setHero(data)
      alert('✓ Uložené!')
    } catch (err) {
      console.error('Save error:', err)
      alert(`Chyba: ${err.message}. Skontroluj server`)
    }
  }

  if(loading) return (
    <div style={{padding:'40px 24px', textAlign:'center', fontFamily:"'Radio Canada', sans-serif"}}>
      {error ? (
        <>
          <p>Chyba: {error}</p>
          <p>Skúšam opraviť pripojenie...</p>
        </>
      ) : (
        <p>Načítavam...</p>
      )}
    </div>
  )

  return (
    <div style={{minHeight:'100vh', background:'var(--bg)'}}>
      <div style={{maxWidth:'1200px', margin:'0 auto', padding:'40px 24px'}}>
        <h1 style={{marginTop:0, marginBottom:40, fontFamily:"'Hahmlet', serif"}}>Admin Panel</h1>
        
        <section style={{background:'white', padding:32, borderRadius:8, boxShadow:'var(--shadow-md)', marginBottom:40, border:'1px solid var(--border)'}}>
          <h2 style={{fontSize:24, marginBottom:28, fontFamily:"'Hahmlet', serif", color:'var(--color-dark)'}}>Nastavenia Heru</h2>
          <div style={{display:'grid', gap:24, maxWidth:900}}>
            <div>
              <label style={{display:'block', marginBottom:8, fontWeight:600, fontFamily:"'Radio Canada', sans-serif", fontSize:14, color:'var(--color-dark)'}}>Text v Heru (Rich Editor)</label>
              <Editor
                value={hero.title||''}
                init={{
                  height: 250,
                  menubar: false,
                  plugins: 'link code',
                  toolbar: 'bold italic underline | link code',
                  relative_urls: false,
                  remove_script_host: false,
                  content_css: false
                }}
                onEditorChange={(content) => setHero({...hero, title: content})}
              />
            </div>
            <div>
              <label style={{display:'block', marginBottom:8, fontWeight:600, fontFamily:"'Radio Canada', sans-serif", fontSize:14, color:'var(--color-dark)'}}>Podtitul (voliteľný)</label>
              <input 
                value={hero.subtitle||''} 
                onChange={e=>setHero({...hero, subtitle:e.target.value})} 
                placeholder="Voliteľný podtitul..." 
                style={{width:'100%', padding:'10px 12px', border:'1px solid var(--border)', borderRadius:'4px', fontFamily:"'Radio Canada', sans-serif", fontSize:14}}
              />
            </div>
            <div>
              <label style={{display:'block', marginBottom:8, fontWeight:600, fontFamily:"'Radio Canada', sans-serif", fontSize:14, color:'var(--color-dark)'}}>Farba textu</label>
              <div style={{display:'flex', gap:12, alignItems:'center'}}>
                <input 
                  type="color" 
                  value={hero.style?.color||'#E1DED2'} 
                  onChange={e=>setHero({...hero, style:{...hero.style, color:e.target.value}})} 
                  style={{width:60, height:40, cursor:'pointer', border:'1px solid var(--border)', borderRadius:'4px'}} 
                />
                <input 
                  type="text" 
                  value={hero.style?.color||''} 
                  onChange={e=>setHero({...hero, style:{...hero.style, color:e.target.value}})} 
                  placeholder="#E1DED2" 
                  style={{flex:1, padding:'10px 12px', border:'1px solid var(--border)', borderRadius:'4px', fontFamily:"'Radio Canada', sans-serif", fontSize:14}}
                />
              </div>
            </div>
            <div>
              <label style={{display:'block', marginBottom:8, fontWeight:600, fontFamily:"'Radio Canada', sans-serif", fontSize:14, color:'var(--color-dark)'}}>Váha fontu</label>
              <select 
                value={hero.style?.fontWeight||'700'} 
                onChange={e=>setHero({...hero, style:{...hero.style, fontWeight:e.target.value}})}
                style={{width:'100%', padding:'10px 12px', border:'1px solid var(--border)', borderRadius:'4px', fontFamily:"'Radio Canada', sans-serif", fontSize:14}}
              >
                <option value="400">400 - Regular</option>
                <option value="600">600 - Semi Bold</option>
                <option value="700">700 - Bold</option>
              </select>
            </div>
            <div>
              <label style={{display:'block', marginBottom:8, fontWeight:600, fontFamily:"'Radio Canada', sans-serif", fontSize:14, color:'var(--color-dark)'}}>Veľkosť fontu</label>
              <div style={{display:'flex', alignItems:'center', gap:8}}>
                <input 
                  type="number" 
                  value={parseInt(hero.style?.fontSize)||52} 
                  onChange={e=>setHero({...hero, style:{...hero.style, fontSize:e.target.value + 'px'}})} 
                  placeholder="52" 
                  style={{width:120, padding:'10px 12px', border:'1px solid var(--border)', borderRadius:'4px', fontFamily:"'Radio Canada', sans-serif", fontSize:14}}
                />
                <span style={{fontSize:12, color:'var(--text-light)', fontFamily:"'Radio Canada', sans-serif"}}>pixelov</span>
              </div>
            </div>
            <div style={{display:'flex', gap:12, paddingTop:12}}>
              <button 
                onClick={save} 
                style={{
                  padding:'12px 28px',
                  background:'var(--color-honey)',
                  color:'white',
                  border:'none',
                  borderRadius:'4px',
                  fontSize:14,
                  fontWeight:600,
                  cursor:'pointer',
                  fontFamily:"'Radio Canada', sans-serif",
                  transition:'all 300ms ease',
                  display:'flex',
                  alignItems:'center',
                  gap:6
                }}
                onMouseEnter={(e)=>{e.target.style.background='var(--color-red)', e.target.style.transform='scale(1.05)'}}
                onMouseLeave={(e)=>{e.target.style.background='var(--color-honey)', e.target.style.transform='scale(1)'}}
              >
                <svg style={{width:16, height:16}} fill="white" viewBox="0 0 16 16">
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                  <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                </svg>
                Uložiť
              </button>
              <button 
                onClick={()=>navigate('/')} 
                style={{
                  padding:'12px 28px',
                  background:'var(--border)',
                  color:'var(--color-dark)',
                  border:'1px solid var(--border)',
                  borderRadius:'4px',
                  fontSize:14,
                  fontWeight:600,
                  cursor:'pointer',
                  fontFamily:"'Radio Canada', sans-serif",
                  transition:'all 300ms ease',
                  display:'flex',
                  alignItems:'center',
                  gap:6
                }}
                onMouseEnter={(e)=>{e.target.style.background='var(--color-light)'}}
                onMouseLeave={(e)=>{e.target.style.background='var(--border)'}}
              >
                <svg style={{width:16, height:16}} fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
                </svg>
                Späť
              </button>
            </div>
          </div>
        </section>

        <section style={{background:'white', padding:32, borderRadius:8, boxShadow:'var(--shadow-md)', border:'1px solid var(--border)'}}>
          <h2 style={{fontSize:24, marginBottom:28, fontFamily:"'Hahmlet', serif", color:'var(--color-dark)'}}>Pridať príspěvok</h2>
          <AddPageForm />
        </section>
      </div>
    </div>
  )
}

function AddPageForm(){
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('Autobúsiia liście')
  const [submitting, setSubmitting] = useState(false)

  const submit = async ()=>{
    if (!title.trim() || !content.trim()) {
      alert('Prosím vyplň nadpis a obsah')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch(`${API_BASE_URL}/api/pages`, { 
        method:'POST', 
        headers:{'Content-Type':'application/json'}, 
        body: JSON.stringify({ title, content, category }) 
      })
      if (res.ok) {
        alert('✓ Príspěvok pridaný!')
        setTitle(''); setContent(''); setCategory('Autobúsiia liście')
      } else {
        alert('Chyba pri pridávaní príspěvku')
      }
    } catch (err) {
      alert('Chyba: ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditorChange = (contentValue) => {
    setContent(contentValue)
  }

  const imageUploadHandler = (blobInfo, success, failure) => {
    const form = new FormData()
    form.append('file', blobInfo.blob(), blobInfo.filename())
    fetch(`${API_BASE_URL}/api/upload`, { method: 'POST', body: form })
      .then(r=>r.json())
      .then(data => {
        success(data.url)
      }).catch(err=>failure('Upload failed'))
  }

  return (
    <div style={{display:'grid', gap:24, maxWidth:900}}>
      <div>
        <label style={{display:'block', marginBottom:8, fontWeight:600, fontFamily:"'Radio Canada', sans-serif", fontSize:14, color:'var(--color-dark)'}}>Nadpis príspěvku</label>
        <input 
          placeholder="Nadپis..." 
          value={title} 
          onChange={e=>setTitle(e.target.value)} 
          style={{width:'100%', padding:'10px 12px', border:'1px solid var(--border)', borderRadius:'4px', fontFamily:"'Radio Canada', sans-serif", fontSize:14}}
        />
      </div>
      <div>
        <label style={{display:'block', marginBottom:8, fontWeight:600, fontFamily:"'Radio Canada', sans-serif", fontSize:14, color:'var(--color-dark)'}}>Kategória</label>
        <select 
          value={category} 
          onChange={e=>setCategory(e.target.value)}
          style={{width:'100%', padding:'10px 12px', border:'1px solid var(--border)', borderRadius:'4px', fontFamily:"'Radio Canada', sans-serif", fontSize:14}}
        >
          <option>Autobúsiia liście</option>
          <option>Podobne</option>
          <option>Financovanie</option>
        </select>
      </div>
      <div>
        <label style={{display:'block', marginBottom:8, fontWeight:600, fontFamily:"'Radio Canada', sans-serif", fontSize:14, color:'var(--color-dark)'}}>Obsah (Rich Editor - nahraj obrázky ťahaním)</label>
        <Editor
          value={content}
          init={{
            height: 400,
            menubar: true,
            plugins: 'link image media table code lists',
            toolbar: 'undo redo | bold italic underline strikethrough | alignleft aligncenter alignright | bullist numlist | link image media | code removeformat',
            images_upload_handler: imageUploadHandler,
            relative_urls: false,
            remove_script_host: false,
            content_css: false
          }}
          onEditorChange={handleEditorChange}
        />
      </div>
      <div style={{display:'flex', gap:12, paddingTop:12}}>
        <button 
          onClick={submit} 
          disabled={submitting}
          style={{
            padding:'12px 28px',
            background: submitting ? 'var(--text-light)' : 'var(--color-red)',
            color:'white',
            border:'none',
            borderRadius:'4px',
            fontSize:14,
            fontWeight:600,
            cursor: submitting ? 'not-allowed' : 'pointer',
            fontFamily:"'Radio Canada', sans-serif",
            transition:'all 300ms ease',
            display:'flex',
            alignItems:'center',
            gap:6,
            opacity: submitting ? 0.7 : 1
          }}
          onMouseEnter={(e)=>{if (!submitting) { e.target.style.background='var(--color-dark)', e.target.style.transform='scale(1.05)' }}}
          onMouseLeave={(e)=>{if (!submitting) { e.target.style.background='var(--color-red)', e.target.style.transform='scale(1)' }}}
        >
          <svg style={{width:16, height:16}} fill="white" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="m10.97 4.97-.02.02-3.6 3.85-1.74-1.885a.75.75 0 0 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.077-.07l4.4-4.729a.75.75 0 1 0-1.063-1.072z"/>
          </svg>
          {submitting ? 'Pridávam...' : 'Pridať'}
        </button>
      </div>
    </div>
  )
}


