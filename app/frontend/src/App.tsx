import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/menu" element={ <Home /> } />
    </Routes>
  );
}

export default App;
