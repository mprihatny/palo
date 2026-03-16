import React, { useEffect, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import API_BASE_URL from '../api'

const TINYMCE_API_KEY = 'q76bkheben6immtc4gb0hkd8dudge6dahhc1x3lzrbfjt350'

export default function Admin({navigate}){
  const [hero, setHero] = useState({ title:'', subtitle:'', style:{ color:'#ffffff', fontWeight:'600', fontSize:'48px' } })
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    fetch(`${API_BASE_URL}/api/hero`).then(r=>r.json()).then(data=>{
      setHero(prev=>({ ...prev, ...data }))
    }).catch(()=>{}).finally(()=>setLoading(false))
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

  if(loading) return <div className="container" style={{padding:'40px 24px', textAlign:'center'}}>Loading...</div>

  return (
    <div style={{minHeight:'100vh', background:'var(--bg)'}}>
      <div className="container">
        <h1 style={{marginTop:24}}>Admin Panel</h1>
        
        <section style={{background:'#fff', padding:28, borderRadius:12, boxShadow:'var(--shadow-sm)', marginBottom:32}}>
          <h2 style={{fontSize:22}}>Hero Settings</h2>
          <div style={{display:'grid', gap:16, maxWidth:900}}>
            <div>
              <label>Hero Quote / Main Text (Rich Editor)</label>
              <Editor
                // apiKey={TINYMCE_API_KEY}
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
              <label>Subtitle</label>
              <input value={hero.subtitle||''} onChange={e=>setHero({...hero, subtitle:e.target.value})} placeholder="Optional subtitle..." />
            </div>
            <div>
              <label>Text Color</label>
              <div style={{display:'flex', gap:12, alignItems:'center'}}>
                <input type="color" value={hero.style?.color||'#ffffff'} onChange={e=>setHero({...hero, style:{...hero.style, color:e.target.value}})} style={{width:60, height:40, cursor:'pointer'}} />
                <input type="text" value={hero.style?.color||''} onChange={e=>setHero({...hero, style:{...hero.style, color:e.target.value}})} placeholder="#ffffff" style={{flex:1}} />
              </div>
            </div>
            <div>
              <label>Font Weight</label>
              <select value={hero.style?.fontWeight||'600'} onChange={e=>setHero({...hero, style:{...hero.style, fontWeight:e.target.value}})}>
                <option value="400">400 - Regular</option>
                <option value="600">600 - Semi Bold</option>
                <option value="700">700 - Bold</option>
              </select>
            </div>
            <div>
              <label>Font Size</label>
              <input type="number" value={parseInt(hero.style?.fontSize)||48} onChange={e=>setHero({...hero, style:{...hero.style, fontSize:e.target.value + 'px'}})} placeholder="48" style={{maxWidth:120}} />
              <span style={{fontSize:12, color:'var(--text-light)'}}>in pixels</span>
            </div>
            <div style={{display:'flex', gap:12}}>
              <button className="btn" onClick={save} style={{display:'flex', alignItems:'center'}}>
                <svg style={{width:16, height:16, marginRight:6}} fill="currentColor" viewBox="0 0 16 16">
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                  <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                </svg>
                Save Hero
              </button>
              <button className="btn secondary" onClick={()=>navigate('/')} style={{display:'flex', alignItems:'center'}}>
                <svg style={{width:16, height:16, marginRight:6}} fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
                </svg>
                Back
              </button>
            </div>
          </div>
        </section>

        <section style={{background:'#fff', padding:28, borderRadius:12, boxShadow:'var(--shadow-sm)'}}>
          <h2 style={{fontSize:22}}>Add Project / Page</h2>
          <AddPageForm />
        </section>
      </div>
    </div>
  )
}

function AddPageForm(){
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('Vlastna tvorba')
  const [submitting, setSubmitting] = useState(false)

  const submit = async ()=>{
    if (!title.trim() || !content.trim()) {
      alert('Prosím vyplň nadpis a obsah')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('http://localhost:5000/api/pages', { 
        method:'POST', 
        headers:{'Content-Type':'application/json'}, 
        body: JSON.stringify({ title, content, category }) 
      })
      if (res.ok) {
        alert('✓ Projekt pridaný!')
        setTitle(''); setContent(''); setCategory('Vlastna tvorba')
      } else {
        alert('Chyba pri pridávaní projektu')
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
    fetch('http://localhost:5000/api/upload', { method: 'POST', body: form })
      .then(r=>r.json())
      .then(data => {
        success(data.url)
      }).catch(err=>failure('Upload failed'))
  }

  return (
    <div style={{display:'grid', gap:16, maxWidth:900}}>
      <div>
        <label>Project Title</label>
        <input placeholder="Nadpis projektu..." value={title} onChange={e=>setTitle(e.target.value)} />
      </div>
      <div>
        <label>Category</label>
        <select value={category} onChange={e=>setCategory(e.target.value)}>
          <option>Vlastna tvorba</option>
          <option>Preklad</option>
          <option>Pripravovane</option>
          <option>Komentare</option>
        </select>
      </div>
      <div>
        <label>Content (Rich Editor - upload images by drag/click in editor)</label>
        <Editor
          apiKey={TINYMCE_API_KEY}
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
      <div style={{display:'flex', gap:12}}>
        <button className="btn" onClick={submit} disabled={submitting} style={{display:'flex', alignItems:'center'}}>
          <svg style={{width:16, height:16, marginRight:6}} fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="m10.97 4.97-.02.02-3.6 3.85-1.74-1.885a.75.75 0 0 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.077-.07l4.4-4.729a.75.75 0 1 0-1.063-1.072z"/>
          </svg>
          {submitting ? 'Adding...' : 'Add Project'}
        </button>
      </div>
    </div>
  )
}
