import React, { useState, useEffect } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'passop_credentials'

const Vault = () => {
  const [credentials, setCredentials] = useState([])
  const [revealedIds, setRevealedIds] = useState(new Set())
  const [editingId, setEditingId] = useState(null)
  const [editValues, setEditValues] = useState({ url: '', username: '', password: '' })
  const [showEditPassword, setShowEditPassword] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setCredentials(JSON.parse(stored))
    } catch {
      setCredentials([])
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(credentials))
  }, [credentials])

  const handleDelete = (id) => {
    setCredentials(prev => prev.filter(c => c.id !== id))
    setRevealedIds(prev => { const s = new Set(prev); s.delete(id); return s })
  }

  const handleEditStart = (cred) => {
    setEditingId(cred.id)
    setEditValues({ url: cred.url, username: cred.username, password: cred.password })
    setShowEditPassword(false)
  }

  const handleEditSave = (id) => {
    if (!editValues.url.trim() || !editValues.username.trim() || !editValues.password.trim()) return
    setCredentials(prev => prev.map(c => c.id === id ? { ...c, ...editValues } : c))
    setEditingId(null)
  }

  const handleEditCancel = () => {
    setEditingId(null)
    setShowEditPassword(false)
  }

  const toggleReveal = (id) => {
    setRevealedIds(prev => {
      const s = new Set(prev)
      s.has(id) ? s.delete(id) : s.add(id)
      return s
    })
  }



  return (
    <>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />

      <div className="manager-root min-h-screen flex flex-col items-center justify-start px-4 pt-28 pb-16">
        <div className="w-full max-w-xl flex flex-col gap-6">

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-slate-200 text-base font-semibold tracking-wide vault-font-mono">
                Saved Vault
              </h1>
              <p className="text-slate-600 text-xs mt-0.5">
                {credentials.length} {credentials.length === 1 ? 'credential' : 'credentials'} stored
              </p>
            </div>
            <Link
              to="/"
              className="group flex items-center overflow-hidden rounded-lg border border-slate-700/50 hover:border-slate-500/60 px-3 py-2 transition-all duration-300 vault-back-link"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="rgba(96,165,250,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="flex-shrink-0">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span className="max-w-0 overflow-hidden group-hover:max-w-[56px] group-hover:ml-2 transition-all duration-300 text-slate-400 group-hover:text-slate-200 text-xs tracking-widest uppercase whitespace-nowrap vault-font-mono">
                Back
              </span>
            </Link>
          </div>

          <div className="divider-line" />

          {credentials.length === 0 ? (
            <div className="rounded-2xl p-10 flex flex-col items-center gap-4 vault-card">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
                stroke="rgba(100,116,139,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
              </svg>
              <p className="text-slate-600 text-xs tracking-widest uppercase vault-font-mono">
                No credentials saved yet.
              </p>
              <Link
                to="/"
                className="text-blue-400/70 hover:text-blue-300 text-xs tracking-widest uppercase transition-colors duration-200 vault-font-mono"
              >
                Add your first credential →
              </Link>
            </div>
          ) : (
            <div className="rounded-2xl p-6 flex flex-col gap-1 vault-card">
              {credentials.map((cred, i) => (
                <div key={cred.id}>
                  {i !== 0 && <div className="divider-line my-4" />}

                  {editingId === cred.id ? (
                    <div className="flex flex-col gap-3 py-1">
                      <input
                        type="url"
                        value={editValues.url}
                        onChange={e => setEditValues(prev => ({ ...prev, url: e.target.value }))}
                        className="w-full rounded-lg px-4 py-2.5 text-sm font-light text-slate-100 border border-slate-700/60 focus:border-blue-500/60 outline-none transition-all duration-200 vault-input"
                        placeholder="Website URL"
                      />
                      <div className="flex gap-3">
                        <input
                          type="text"
                          value={editValues.username}
                          onChange={e => setEditValues(prev => ({ ...prev, username: e.target.value }))}
                          className="w-full rounded-lg px-4 py-2.5 text-sm font-light text-slate-100 border border-slate-700/60 focus:border-blue-500/60 outline-none transition-all duration-200 vault-input"
                          placeholder="Username"
                        />
                        <div className="relative w-full">
                          <input
                            type={showEditPassword ? 'text' : 'password'}
                            value={editValues.password}
                            onChange={e => setEditValues(prev => ({ ...prev, password: e.target.value }))}
                            className="w-full rounded-lg px-4 pr-10 py-2.5 text-sm font-light text-slate-100 border border-slate-700/60 focus:border-blue-500/60 outline-none transition-all duration-200 vault-input"
                            placeholder="Password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowEditPassword(prev => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-300 transition-colors duration-200 outline-none"
                          >
                            {showEditPassword ? <EyeOff size={13} strokeWidth={2} /> : <Eye size={13} strokeWidth={2} />}
                          </button>
                        </div>
                      </div>
                      <div className="flex gap-3 mt-1">
                        <button
                          type="button"
                          onClick={() => handleEditSave(cred.id)}
                          className="flex-1 py-2 rounded-lg text-xs tracking-widest uppercase border border-blue-600/30 text-blue-400/80 hover:border-blue-500/50 hover:text-blue-300 transition-all duration-200 vault-btn-save"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={handleEditCancel}
                          className="flex-1 py-2 rounded-lg text-xs tracking-widest uppercase border border-slate-700/40 text-slate-500 hover:text-slate-300 hover:border-slate-500/50 transition-all duration-200 vault-btn-cancel"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="cred-row flex items-center justify-between gap-4 rounded-lg px-3 py-2.5 transition-colors duration-200">
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <span className="text-slate-300 text-xs truncate vault-font-mono">
                          {cred.url}
                        </span>
                        <span className="text-slate-500 text-xs truncate">{cred.username}</span>
                        <span
                          className="text-slate-600 text-xs mt-0.5 tracking-widest cursor-pointer hover:text-slate-400 transition-colors duration-200 vault-font-mono"
                          onClick={() => toggleReveal(cred.id)}
                        >
                          {revealedIds.has(cred.id) ? cred.password : '••••••••'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => handleEditStart(cred)}
                          className="text-slate-600 hover:text-blue-400/80 transition-colors duration-200 outline-none p-1"
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(cred.id)}
                          className="text-slate-600 hover:text-red-400/80 transition-colors duration-200 outline-none p-1"
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                            <path d="M10 11v6M14 11v6" />
                            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <p className="text-center text-slate-700 text-xs tracking-widest uppercase vault-font-mono">
            End-to-end encrypted · Local only
          </p>

        </div>
      </div>
    </>
  )
}

export default Vault