// --- DATI CLIENTI ---
export const mockClients = [
  { id: 1, name: 'Marco Rossi', goal: 'Ipertrofia', status: 'Attivo', level: 'Intermedio' },
  { id: 2, name: 'Laura Bianchi', goal: 'Ricondizionamento', status: 'Attivo', level: 'Principiante' },
  { id: 3, name: 'Antonio Esposito', goal: 'Forza (Powerlifting)', status: 'In pausa', level: 'Avanzato' },
  { id: 4, name: 'Giulia Verdi', goal: 'Dimagrimento', status: 'Attivo', level: 'Principiante' },
  { id: 5, name: 'Luca Romano', goal: 'Ipertrofia', status: 'Attivo', level: 'Avanzato' },
  { id: 6, name: 'Sara Neri', goal: 'Forza', status: 'Attivo', level: 'Intermedio' }
];

// --- DATABASE ESERCIZI ---
export const mockExercises = [
  // PETTO
  { id: 1, name: 'Panca Piana con Bilanciere', muscle: 'Petto', type: 'Multiarticolare', equipment: 'Bilanciere' },
  { id: 2, name: 'Spinte con Manubri su Panca Inclinata', muscle: 'Petto', type: 'Multiarticolare', equipment: 'Manubri' },
  { id: 3, name: 'Croci ai Cavi', muscle: 'Petto', type: 'Isolamento', equipment: 'Cavi' },
  { id: 4, name: 'Chest Press', muscle: 'Petto', type: 'Multiarticolare', equipment: 'Macchinario' },
  { id: 5, name: 'Push Up (Piegamenti)', muscle: 'Petto', type: 'Multiarticolare', equipment: 'Corpo Libero' },

  // DORSO
  { id: 6, name: 'Lat Machine avanti', muscle: 'Dorso', type: 'Multiarticolare', equipment: 'Macchinario' },
  { id: 7, name: 'Rematore con Bilanciere', muscle: 'Dorso', type: 'Multiarticolare', equipment: 'Bilanciere' },
  { id: 8, name: 'Pull Up (Trazioni alla sbarra)', muscle: 'Dorso', type: 'Multiarticolare', equipment: 'Corpo Libero' },
  { id: 9, name: 'Pulley Basso', muscle: 'Dorso', type: 'Multiarticolare', equipment: 'Cavi' },
  { id: 10, name: 'Pull Down a braccia tese', muscle: 'Dorso', type: 'Isolamento', equipment: 'Cavi' },

  // GAMBE
  { id: 11, name: 'Squat con Bilanciere', muscle: 'Gambe', type: 'Multiarticolare', equipment: 'Bilanciere' },
  { id: 12, name: 'Leg Press 45°', muscle: 'Gambe', type: 'Multiarticolare', equipment: 'Macchinario' },
  { id: 13, name: 'Affondi con Manubri', muscle: 'Gambe', type: 'Multiarticolare', equipment: 'Manubri' },
  { id: 14, name: 'Leg Extension', muscle: 'Gambe', type: 'Isolamento', equipment: 'Macchinario' },
  { id: 15, name: 'Leg Curl (Sdraiato o Seduto)', muscle: 'Gambe', type: 'Isolamento', equipment: 'Macchinario' },
  { id: 16, name: 'Calf Raise in piedi', muscle: 'Polpacci', type: 'Isolamento', equipment: 'Macchinario' },

  // SPALLE
  { id: 17, name: 'Military Press', muscle: 'Spalle', type: 'Multiarticolare', equipment: 'Bilanciere' },
  { id: 18, name: 'Alzate Laterali con Manubri', muscle: 'Spalle', type: 'Isolamento', equipment: 'Manubri' },
  { id: 19, name: 'Alzate a 90° (Posteriori)', muscle: 'Spalle', type: 'Isolamento', equipment: 'Manubri' },
  { id: 20, name: 'Shoulder Press', muscle: 'Spalle', type: 'Multiarticolare', equipment: 'Macchinario' },

  // BRACCIA
  { id: 21, name: 'Curl con Bilanciere', muscle: 'Bicipiti', type: 'Isolamento', equipment: 'Bilanciere' },
  { id: 22, name: 'Curl a Martello con Manubri', muscle: 'Bicipiti', type: 'Isolamento', equipment: 'Manubri' },
  { id: 23, name: 'French Press', muscle: 'Tricipiti', type: 'Isolamento', equipment: 'Bilanciere' },
  { id: 24, name: 'Push Down ai Cavi', muscle: 'Tricipiti', type: 'Isolamento', equipment: 'Cavi' },
  { id: 25, name: 'Kickback con Manubrio', muscle: 'Tricipiti', type: 'Isolamento', equipment: 'Manubri' },

  // CORE / ADDOME
  { id: 26, name: 'Crunch', muscle: 'Addome', type: 'Isolamento', equipment: 'Corpo Libero' },
  { id: 27, name: 'Plank', muscle: 'Addome', type: 'Isolamento', equipment: 'Corpo Libero' },
  { id: 28, name: 'Russian Twist', muscle: 'Addome', type: 'Isolamento', equipment: 'Corpo Libero' },
  { id: 29, name: 'Leg Raise in sospensione', muscle: 'Addome', type: 'Isolamento', equipment: 'Corpo Libero' }
];