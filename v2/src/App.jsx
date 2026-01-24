import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import AboutUs from './pages/AboutUs/AboutUs'; 
import FAQ from './pages/FAQ/FAQ';
import InterestForm from './pages/InterestForm/InterestForm';

function App() {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/interest-form" element={<InterestForm />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
