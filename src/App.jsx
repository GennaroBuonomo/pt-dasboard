import './App.css'

function App() {

  return (
    <div className="dasboard-loyout">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>PT Dasboard</h2>
        <nav>
          <ul style={{listStyle: 'none', marginTop: '30px', lineHeight: '2.5'}}>
            <li style={{ cursor: 'pointer' }}>Panoramica</li>
            <li style={{ cursor: 'pointer' }}>Clienti</li>
            <li style={{ cursor: 'pointer' }}>Schede Allenamento</li>
          </ul>
        </nav>
      </aside>

      {/* HEADER */}
      <header className="top-header">
        <div className="search-bar">
          <input 
          type="text" 
          placeholder="Cerca il cliente..."
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div className="user-profile">
          <strong>Gennaro - Head Coach</strong>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="main-contant">
        <h1>Benvenuto nella tua area di lavoro</h1>
        <p style={{ marginTop: '10px', color: '#666' }}>
          Seleziona una voce dalla sidebar per iniziare
        </p>
      </main>
    </div>
  )
}

export default App
