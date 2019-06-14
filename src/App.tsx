import React from 'react';
import './App.css';
import EnergyBar from './components/EnergyBar/EnergyBar';

const App: React.FC = () => {
  return (
    <div className="App">
      <EnergyBar energy={4} />
    </div>
  );
}

export default App;
