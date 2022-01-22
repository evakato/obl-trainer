import React from 'react';
import logo from './logo.svg';
import './App.css';
import Case from './Case';

function App() {
  let solved = new Case([1, 2, 3, 4], [], [1, 2, 3, 4], []);
  // 1,0/-4,-1/
  let kitekite = solved.slice(0).audf(3,0).slice(1);
  return (
    <div className="App">
      Top corners: {kitekite.gettc()} 
      Top edges: {kitekite.gette()}
      Bottom corners: {kitekite.getbc()}
      Bottom edges: {kitekite.getbe()}
    </div>
  );
}

export default App;
