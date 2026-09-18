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

  // --- STATI DEL FORM NUOVO CLIENTE ---
  const [newClientName, setNewClientName] = useState('');
  const [newClientGoal, setNewClientGoal] = useState('');
  const [newClientLevel, setNewClientLevel] = useState('');

  // --- STATI PER LA CREAZIONE SCHEDA ---
  const [selectedClientForWorkout, setSelectedClientForWorkout] = useState('');
  const [currentWorkout, setCurrentWorkout] = useState([]);
  
  // --- STATI PER RICERCA E TENDINE (ACCORDION) ESERCIZI ---
  const [exerciseSearchQuery, setExerciseSearchQuery] = useState('');
  // Oggetto per tracciare quali categorie muscolari sono aperte (es. { Petto: true, Gambe: false })
  const [openCategories, setOpenCategories] = useState({});

  // --- FUNZIONE: SALVA NUOVO CLIENTE ---
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

  // --- FUNZIONI: GESTIONE SCHEDA ALLENAMENTO ---
  const handleAddExerciseToWorkout = (exercise) => {
    setCurrentWorkout([...currentWorkout, { ...exercise, sets: 3, reps: '10' }]);
  };

  const removeExerciseFromWorkout = (indexToRemove) => {
    setCurrentWorkout(currentWorkout.filter((_, index) => index !== indexToRemove));
  };

  const updateWorkoutItem = (index, field, value) => {
    const updatedWorkout = [...currentWorkout];
    updatedWorkout[index][field] = value;
    setCurrentWorkout(updatedWorkout);
  };

  const saveWorkout = () => {
    const client = clients.find(c => c.id.toString() === selectedClientForWorkout);
    alert(`Scheda salvata con successo per ${client.name}! \n(Totale esercizi: ${currentWorkout.length})`);
    setCurrentWorkout([]);
    setSelectedClientForWorkout('');
    setExerciseSearchQuery('');
  };

  // Funzione per aprire/chiudere la tendina di un gruppo muscolare
  const toggleCategory = (category) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // --- RENDERIZZAZIONE DEL CONTENUTO CENTRALE ---
  const renderMainContent = () => {
    switch (currentView) {
      
      // ------ VISTA: PANORAMICA ------
      case 'panoramica': {
        const activeClientsCount = clients.filter(c => c.status === 'Attivo').length;
        const totalClients = clients.length;
        const totalExercises = mockExercises.length;

        const ipertrofia = clients.filter(c => c.goal.toLowerCase().includes('ipertrofia')).length;
        const forza = clients.filter(c => c.goal.toLowerCase().includes('forza')).length;
        const dimagrimento = clients.filter(c => c.goal.toLowerCase().includes('dimagrimento')).length;
        const ricondizionamento = clients.filter(c => c.goal.toLowerCase().includes('ricondizionamento')).length;

        const totalGoals = ipertrofia + forza + dimagrimento + ricondizionamento || 1; 
        
        const percIper = Math.round((ipertrofia / totalGoals) * 100) || 0;
        const percForza = Math.round((forza / totalGoals) * 100) || 0;
        const percDim = Math.round((dimagrimento / totalGoals) * 100) || 0;
        const percRic = Math.round((ricondizionamento / totalGoals) * 100) || 0;

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
      
      // ------ VISTA: CLIENTI ------
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
                    <button 
                      className="btn-secondary"
                      onClick={() => {
                        setSelectedClientForWorkout(client.id.toString());
                        setCurrentView('schede');
                      }}
                    >
                      Assegna Scheda
                    </button>
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

      // ------ VISTA: SCHEDE ALLENAMENTO ------
      case 'schede': {
        // 1. Filtriamo gli esercizi in base alla barra di ricerca
        const searchedExercises = mockExercises.filter(ex => 
          ex.name.toLowerCase().includes(exerciseSearchQuery.toLowerCase())
        );

        // 2. Raggruppiamo gli esercizi per categoria
        const groupedExercises = searchedExercises.reduce((acc, curr) => {
          if (!acc[curr.muscle]) acc[curr.muscle] = [];
          acc[curr.muscle].push(curr);
          return acc;
        }, {});

        return (
          <div className="dashboard-view">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h1 style={{ color: '#1a1a2e' }}>Creazione Scheda</h1>
              
              <select 
                value={selectedClientForWorkout} 
                onChange={(e) => setSelectedClientForWorkout(e.target.value)}
                className="client-select"
              >
                <option value="">-- Seleziona un Cliente --</option>
                {clients.filter(c => c.status === 'Attivo').map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="workout-builder">
              {/* PARTE SINISTRA: Catalogo a Tendina */}
              <div className="builder-section">
                <h3 style={{ marginBottom: '15px' }}>Catalogo Esercizi</h3>
                
                <div className="exercise-filters">
                  <input 
                    type="text" 
                    placeholder="Cerca esercizio..." 
                    value={exerciseSearchQuery}
                    onChange={(e) => setExerciseSearchQuery(e.target.value)}
                    className="filter-input full-width"
                  />
                </div>

                <div className="exercise-catalog">
                  {Object.keys(groupedExercises).length > 0 ? (
                    Object.keys(groupedExercises).sort().map(muscleGroup => {
                      // Se l'utente sta cercando, teniamo aperta la tendina per mostrare i risultati, 
                      // altrimenti usiamo lo stato dei click.
                      const isOpen = exerciseSearchQuery.trim() !== '' || openCategories[muscleGroup];

                      return (
                        <div key={muscleGroup} className="muscle-accordion">
                          
                          {/* Intestazione della Tendina Cliccabile */}
                          <div 
                            className={`accordion-header ${isOpen ? 'open' : ''}`} 
                            onClick={() => toggleCategory(muscleGroup)}
                          >
                            <h4>{muscleGroup.toUpperCase()}</h4>
                            <span className="accordion-icon">{isOpen ? '▲' : '▼'}</span>
                          </div>
                          
                          {/* Contenuto della tendina (renderizzato solo se isOpen è true) */}
                          {isOpen && (
                            <div className="accordion-content">
                              {groupedExercises[muscleGroup].map(ex => (
                                <div key={ex.id} className="exercise-item">
                                  <div>
                                    <strong>{ex.name}</strong>
                                    <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '4px' }}>
                                      {ex.type} • {ex.equipment}
                                    </p>
                                  </div>
                                  <button 
                                    className="btn-secondary add-btn" 
                                    onClick={() => handleAddExerciseToWorkout(ex)}
                                    disabled={!selectedClientForWorkout}
                                    title={!selectedClientForWorkout ? "Seleziona un cliente prima" : "Aggiungi alla scheda"}
                                  >
                                    +
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    })
                  ) : (
                    <p style={{ color: '#666', textAlign: 'center', marginTop: '20px' }}>Nessun esercizio trovato.</p>
                  )}
                </div>
              </div>

              {/* PARTE DESTRA: Scheda Attuale */}
              <div className="builder-section">
                <h3 style={{ marginBottom: '15px', paddingBottom: '10px', borderBottom: '2px solid #f7f9fc' }}>Scheda in Costruzione</h3>
                
                {!selectedClientForWorkout ? (
                  <div className="empty-state">
                    <p>Seleziona un cliente in alto a destra per iniziare a costruire la scheda.</p>
                  </div>
                ) : currentWorkout.length === 0 ? (
                  <div className="empty-state">
                    <p>La scheda è vuota. Apri le categorie a sinistra e seleziona gli esercizi.</p>
                  </div>
                ) : (
                  <>
                    <div className="current-workout-list">
                      {currentWorkout.map((item, index) => (
                        <div key={index} className="workout-item">
                          <strong style={{ flex: 1 }}>{item.name}</strong>
                          
                          <div className="workout-inputs">
                            <div className="input-group">
                              <label>Serie</label>
                              <input 
                                type="number" 
                                min="1" 
                                value={item.sets} 
                                onChange={(e) => updateWorkoutItem(index, 'sets', e.target.value)} 
                              />
                            </div>
                            <span style={{ marginTop: '15px', color: '#666' }}>x</span>
                            <div className="input-group">
                              <label>Rip</label>
                              <input 
                                type="text" 
                                value={item.reps} 
                                onChange={(e) => updateWorkoutItem(index, 'reps', e.target.value)} 
                              />
                            </div>
                            <button className="btn-danger" onClick={() => removeExerciseFromWorkout(index)}>✕</button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <button className="btn-primary" style={{width: '100%', marginTop: '30px', padding: '15px'}} onClick={saveWorkout}>
                      Salva Scheda ({currentWorkout.length} esercizi)
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      }

      default:
        return <h1>404 - Vista non trovata</h1>;
    }
  };

  return (
    <div className="dashboard-layout">
      
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