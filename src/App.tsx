import React from 'react';
import './App.css';

import Robot from './components/Robot/Robot';

import {Robot as RobotModel} from './modules/Robot'

const App: React.FC = () => {
  const robot = new RobotModel()

  return (
    <div className="App">
      <Robot energy={robot.energy} />
    </div>
  );
}

export default App;
