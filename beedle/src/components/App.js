import './App.css';
import Landing from './Landing/landing';
import Game from './Game/game'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={Landing}/>
        <Route path="/game" Component={Game} />
      </Routes>
    </Router>
  );
}

export default App;
