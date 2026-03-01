import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-8 py-4 navbar-container">
      <Link to="/" className="flex items-center gap-1 group">
        <span className="text-slate-500 text-2xl font-light transition-transform duration-300 group-hover:-translate-x-0.5">&lt;</span>

        <div className="relative flex items-center justify-center mx-0.5">
          <svg width="28" height="28" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-300 group-hover:scale-105">
            <defs>
              <linearGradient id="shieldGradN" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="100%" stopColor="#1e3a5f" />
              </linearGradient>
              <linearGradient id="shackleGradN" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>
              <linearGradient id="accentGradN" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            <path d="M13 18V12C13 7.02944 17.0294 3 22 3C26.9706 3 31 7.02944 31 12V18"
              stroke="url(#shackleGradN)" strokeWidth="4" strokeLinecap="round" />
            <path d="M8.5 17C8.5 15.8954 9.39543 15 10.5 15H33.5C34.6046 15 35.5 15.8954 35.5 17V29.5C35.5 35.5 22 41 22 41C22 41 8.5 35.5 8.5 29.5V17Z"
              fill="url(#shieldGradN)" />
            <circle cx="22" cy="24" r="3.5" fill="#cbd5e1" />
            <path d="M22 27.5V33" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
            <circle cx="22" cy="24" r="1.5" fill="url(#accentGradN)" />
          </svg>
        </div>

        <span className="text-xl font-semibold tracking-[0.12em] navbar-logo-text">
          <span className="text-slate-300">Pass</span>
          <span className="text-blue-400">OP</span>
        </span>

        <span className="text-slate-500 text-2xl font-light transition-transform duration-300 group-hover:translate-x-0.5">/&gt;</span>
      </Link>
    </nav>
  )
}

export default Navbar