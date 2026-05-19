import React from 'react'

export default function Navbar({navigate, currentRoute}){
  const navItems = [
    { label: 'Domov', path: '/' },
    { label: 'Aktuality', path: '/news' },
    { label: 'Autorské texty', path: '/projects?cat=Autorské texty' },
    { label: 'Preklady', path: '/projects?cat=Preklady' },
    { label: 'Pripravované', path: '/projects?cat=Pripravované' }
  ]

  return (
    <nav style={{
      background: 'var(--color-dark)',
      padding: '16px 24px',
      borderBottom: '2px solid var(--color-honey)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{maxWidth:'1200px', margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        {/* Logo */}
        <div 
          onClick={()=>navigate('/')}
          style={{cursor:'pointer', display:'flex', alignItems:'center'}}
        >
          <img 
            src="https://i.postimg.cc/43cbVCzM/logop-removebg-preview.png" 
            alt="Logo"
            style={{height:'40px', width:'auto'}}
          />
        </div>

        {/* Navigation items */}
        <div style={{display:'flex', gap:'32px', alignItems:'center'}}>
          {navItems.map((item, idx) => (
            <a
              key={idx}
              onClick={()=>navigate(item.path)}
              style={{
                cursor:'pointer',
                fontSize:'14px',
                fontWeight:600,
                color: currentRoute === item.path ? 'var(--color-honey)' : 'var(--color-light)',
                textDecoration:'none',
                fontFamily:"'Radio Canada', sans-serif",
                transition:'color 200ms ease',
                borderBottom: currentRoute === item.path ? '2px solid var(--color-honey)' : 'none',
                paddingBottom:'4px'
              }}
              onMouseEnter={(e)=>{e.currentTarget.style.color = 'var(--color-honey)'}}
              onMouseLeave={(e)=>{
                if(currentRoute !== item.path) {
                  e.currentTarget.style.color = 'var(--color-light)'
                }
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
