import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Payment from './pages/Payment/Payment'  // optional later

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/payment" element={<Payment />} />
        {/* Add more pages later: /results, /blog, etc. */}
      </Routes>
      <Footer />
    </>
  )
}

export default App