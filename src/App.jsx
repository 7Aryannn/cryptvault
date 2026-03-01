import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Vault from './components/Vault'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Manager />} />
        <Route path="/vault" element={<Vault />} />
      </Routes>
    </>
  )
}

export default App