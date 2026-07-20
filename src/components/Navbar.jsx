import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiMenu, HiX } from 'react-icons/hi'
import { FiShield } from 'react-icons/fi'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Sobre', path: '/sobre' },
  { name: 'Blog', path: '/blog' },
  { name: 'Cursos', path: '/cursos' },
  { name: 'E-books', path: '/ebooks' },
  { name: 'Downloads', path: '/downloads' },
  { name: 'YouTube', path: '/youtube' },
  { name: 'Loja', path: '/loja' },
  { name: 'Contato', path: '/contato' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass-strong shadow-lg shadow-black/20' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <FiShield className="h-8 w-8 text-iam-blue group-hover:drop-shadow-[0_0_10px_rgba(0,191,255,0.5)] transition-all" />
              <div className="absolute inset-0 bg-iam-blue/20 rounded-full blur-md group-hover:blur-lg transition-all" />
            </div>
            <span className="font-montserrat font-bold text-xl tracking-tight">
              <span className="text-white">UNIVERSO</span>
              <span className="text-iam-blue ml-1">IAM</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'text-iam-blue bg-iam-blue/10 shadow-[0_0_10px_rgba(0,191,255,0.1)]'
                    : 'text-iam-gray hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://youtube.com/@SEUCANAL" // <-- Troque pelo seu link
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-all hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              YouTube
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-iam-gray hover:text-white hover:bg-white/10 transition-all"
            >
              {isOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden glass-strong border-t border-white/10">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === link.path
                    ? 'text-iam-blue bg-iam-blue/10'
                    : 'text-iam-gray hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
