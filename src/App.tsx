import React from 'react';
import './App.css';

import Robot from './components/Robot/Robot';

import {Robot as RobotModel} from './modules/Robot'
import {Power as PowerEnum} from './modules/defs'
import Power from './components/Power/Power';
import { Deck } from './modules/Deck';
import Card from './components/Card/Card';

const App: React.FC = () => {
  const robot = new RobotModel()
  const deck = new Deck(undefined, false)
  const card = deck.drawOneCard()
  console.log('card to draw on', card)

  return (
    <div className="App">
      <Robot energy={robot.energy} />
      <Power type={PowerEnum.Energy} />
      <Power type={PowerEnum.Hit} />
      <Power type={PowerEnum.Rocket} />
      <Card card={card} />
    </div>
  );
}

export default App;
