import './App.css';
import Landing from './components/Landing/landing';
import Game from './components/Game/game'
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
