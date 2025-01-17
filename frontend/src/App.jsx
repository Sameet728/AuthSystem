import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Home from './components/Home'; 
import State from './components/State';  // Import the Home component
 // Import the Home component

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} /> {/* Add the Home route */}
          <Route path="/" element={<State />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
