import { useState } from 'react';
import { mockClients, mockExercises } from './data.js';
import './App.css';

function App() {
  // --- STATI DI NAVIGAZIONE E UI ---
  const [currentView, setCurrentView] = useState('panoramica');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- STATO DEI DATI ---
  const [clients, setClients] = useState(mockClients);

  // --- STATI DEL FORM ---
  const [newClientName, setNewClientName] = useState('');
  const [newClientGoal, setNewClientGoal] = useState('');
  const [newClientLevel, setNewClientLevel] = useState('');

  // --- FUNZIONE DI SALVATAGGIO CLIENTE ---
  const handleAddClient = (e) => {
    e.preventDefault(); 
    const newClient = {
      id: Date.now(), 
      name: newClientName,
      goal: newClientGoal,
      level: newClientLevel,
      status: 'Attivo'
    };

    setClients([...clients, newClient]);

    setNewClientName('');
    setNewClientGoal('');
    setNewClientLevel('');
    setIsModalOpen(false);
  };

  // --- RENDERIZZAZIONE DEL CONTENUTO CENTRALE ---
  const renderMainContent = () => {
    switch (currentView) {
      case 'panoramica': {
        // Calcoli per la vista Panoramica
        const activeClientsCount = clients.filter(c => c.status === 'Attivo').length;
        const totalClients = clients.length;
        const totalExercises = mockExercises.length;

        // Calcoli per il Grafico Dinamico (insensibile alle maiuscole)
        const ipertrofia = clients.filter(c => c.goal.toLowerCase().includes('ipertrofia')).length;
        const forza = clients.filter(c => c.goal.toLowerCase().includes('forza')).length;
        const dimagrimento = clients.filter(c => c.goal.toLowerCase().includes('dimagrimento')).length;
        const ricondizionamento = clients.filter(c => c.goal.toLowerCase().includes('ricondizionamento')).length;

        const totalGoals = ipertrofia + forza + dimagrimento + ricondizionamento || 1; 
        
        const percIper = Math.round((ipertrofia / totalGoals) * 100) || 0;
        const percForza = Math.round((forza / totalGoals) * 100) || 0;
        const percDim = Math.round((dimagrimento / totalGoals) * 100) || 0;
        const percRic = Math.round((ricondizionamento / totalGoals) * 100) || 0;

        // "Stop" per il conic-gradient CSS
        const stop1 = percIper;
        const stop2 = stop1 + percForza;
        const stop3 = stop2 + percDim;

        const dynamicGradient = {
          background: `conic-gradient(
            #3b82f6 0% ${stop1}%, 
            #10b981 ${stop1}% ${stop2}%, 
            #f59e0b ${stop2}% ${stop3}%,
            #8b5cf6 ${stop3}% 100%
          )`
        };

        return (
          <div className="dashboard-view">
            <h1 style={{ marginBottom: '30px', color: '#1a1a2e' }}>Panoramica</h1>
            
            <div className="kpi-row">
              <div className="kpi-card">
                <h3>Clienti Attivi</h3>
                <p>{activeClientsCount}</p>
              </div>
              <div className="kpi-card">
                <h3>Totale Clienti</h3>
                <p>{totalClients}</p>
              </div>
              <div className="kpi-card">
                <h3>Esercizi a Catalogo</h3>
                <p>{totalExercises}</p>
              </div>
            </div>

            <div className="chart-container">
              <h3 style={{ marginBottom: '20px', color: '#1a1a2e' }}>Distribuzione Obiettivi</h3>
              <div className="chart-layout">
                <div className="mock-pie-chart" style={dynamicGradient}></div>
                
                <div className="chart-legend">
                  <ul>
                    <li><span className="legend-dot" style={{backgroundColor: '#3b82f6'}}></span> Ipertrofia ({percIper}%)</li>
                    <li><span className="legend-dot" style={{backgroundColor: '#10b981'}}></span> Forza ({percForza}%)</li>
                    <li><span className="legend-dot" style={{backgroundColor: '#f59e0b'}}></span> Dimagrimento ({percDim}%)</li>
                    <li><span className="legend-dot" style={{backgroundColor: '#8b5cf6'}}></span> Ricondizionamento ({percRic}%)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      }
      
      case 'clienti': {
        const filteredClients = clients.filter(client => 
          client.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h1 style={{ color: '#1a1a2e' }}>Gestione Clienti</h1>
              <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
                + Nuovo Cliente
              </button>
            </div>
            
            <div className="clients-grid">
              {filteredClients.map(client => (
                <div key={client.id} className="client-card">
                  <div className="card-header">
                    <h3>{client.name}</h3>
                    <span className={`badge ${client.status === 'Attivo' ? 'badge-active' : 'badge-paused'}`}>
                      {client.status}
                    </span>
                  </div>
                  <div className="card-body">
                    <p><strong>Obiettivo:</strong> {client.goal}</p>
                    <p><strong>Livello:</strong> {client.level}</p>
                  </div>
                  <div className="card-actions">
                    <button className="btn-secondary">Vedi Scheda</button>
                  </div>
                </div>
              ))}
              
              {filteredClients.length === 0 && (
                <p style={{ gridColumn: '1 / -1', color: '#666' }}>Nessun cliente trovato.</p>
              )}
            </div>
          </div>
        );
      }

      case 'schede':
        return <h1 style={{ color: '#1a1a2e' }}>Gestione Schede Allenamento</h1>;

      default:
        return <h1>404 - Vista non trovata</h1>;
    }
  };

  return (
    <div className="dashboard-layout">
      
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo">
          <h2>PT Dashboard</h2>
        </div>
        <nav>
          <ul className="nav-list">
            <li 
              className={currentView === 'panoramica' ? 'active' : ''} 
              onClick={() => setCurrentView('panoramica')}
            >
              <span className="icon">📊</span> Panoramica
            </li>
            <li 
              className={currentView === 'clienti' ? 'active' : ''} 
              onClick={() => setCurrentView('clienti')}
            >
              <span className="icon">👥</span> Clienti
            </li>
            <li 
              className={currentView === 'schede' ? 'active' : ''} 
              onClick={() => setCurrentView('schede')}
            >
              <span className="icon">📋</span> Schede Allenamento
            </li>
          </ul>
        </nav>
      </aside>

      {/* HEADER */}
      <header className="top-header">
        <div className="search-bar">
          <span className="icon">🔍</span>
          <input 
            type="text" 
            placeholder="Cerca cliente..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="user-profile">
          <span className="icon">👤</span>
          <strong>Gennaro - Head Coach</strong>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="main-content">
        {renderMainContent()}
      </main>

      {/* MODALE NUOVO CLIENTE */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Aggiungi Nuovo Cliente</h2>
            <form onSubmit={handleAddClient}>
              <input 
                type="text" 
                placeholder="Nome e Cognome" 
                required 
                value={newClientName}
                onChange={(e) => setNewClientName(e.target.value)}
              />
              <input 
                type="text" 
                placeholder="Obiettivo (es. Ipertrofia, Forza...)" 
                required 
                value={newClientGoal}
                onChange={(e) => setNewClientGoal(e.target.value)}
              />
              <select 
                required 
                value={newClientLevel}
                onChange={(e) => setNewClientLevel(e.target.value)}
              >
                <option value="">Seleziona Livello</option>
                <option value="Principiante">Principiante</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzato">Avanzato</option>
              </select>
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" className="btn-primary" style={{ flex: 1 }}>Salva</button>
                <button 
                  type="button" 
                  className="btn-secondary" 
                  style={{ flex: 1 }} 
                  onClick={() => setIsModalOpen(false)}
                >
                  Annulla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;