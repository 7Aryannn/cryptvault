import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Vault from './components/Vault'
import MasterPasswordGate from './components/MasterPasswordGate'
import { encryptData, decryptData } from './utils/cryptoUtils'

const STORAGE_KEY = 'cryptvault'

const App = () => {
  const [unlocked, setUnlocked] = useState(false)
  const [masterPassword, setMasterPassword] = useState(null)
  const [credentials, setCredentials] = useState([])

  const handleUnlocked = async (password) => {
    setMasterPassword(password)
    setUnlocked(true)
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const decrypted = await decryptData(stored, password)
        setCredentials(decrypted)
      } catch {
        localStorage.clear()
        window.location.reload()
      }
    }
  }

  const saveCredentials = (updater) => {
    setCredentials(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      encryptData(next, masterPassword).then(cipher => {
        localStorage.setItem(STORAGE_KEY, cipher)
      })
      return next
    })
  }

  if (!unlocked) {
    return <MasterPasswordGate onUnlocked={handleUnlocked} />
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Manager credentials={credentials} setCredentials={saveCredentials} />} />
        <Route path="/vault" element={<Vault credentials={credentials} setCredentials={saveCredentials} />} />
      </Routes>
    </>
  )
}

export default App