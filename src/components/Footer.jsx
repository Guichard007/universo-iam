import { Link } from 'react-router-dom'
import { FiShield, FiGithub, FiLinkedin, FiInstagram, FiYoutube, FiMail } from 'react-icons/fi'
import { FaTiktok, FaFacebook } from 'react-icons/fa'

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
  { name: 'Cursos', path: '/cursos' },
  { name: 'E-books', path: '/ebooks' },
  { name: 'Downloads', path: '/downloads' },
  { name: 'Contato', path: '/contato' },
]

const resources = [
  { name: 'Sobre Nos', path: '/sobre' },
  { name: 'Loja Digital', path: '/loja' },
  { name: 'YouTube', path: '/youtube' },
  { name: 'Redes Sociais', path: '/redes-sociais' },
  { name: 'Blog', path: '/blog', external: false },
]

// ============================================================
// CONFIGURACAO: Links das redes sociais
// ============================================================
const BLOG_URL = 'https://universoiam.blogspot.com/'
const INSTAGRAM_URL = 'https://instagram.com/reviewtheaccess'

const socials = [
  { icon: FiInstagram, href: INSTAGRAM_URL, label: 'Instagram' },
  { icon: FaFacebook, href: '', label: 'Facebook' },
  { icon: FaTiktok, href: '', label: 'TikTok' },
  { icon: FiLinkedin, href: '', label: 'LinkedIn' },
  { icon: FiYoutube, href: '', label: 'YouTube' },
]
// ============================================================

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-iam-dark/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <FiShield className="h-8 w-8 text-iam-blue" />
              <span className="font-montserrat font-bold text-xl">
                <span className="text-white">UNIVERSO</span>
                <span className="text-iam-blue ml-1">IAM</span>
              </span>
            </Link>
            <p className="text-iam-gray text-sm leading-relaxed">
              Seu Portal Completo de Segurança da Informação, IAM, Cloud Security e Carreira em Tecnologia.
            </p>
            <div className="flex gap-3">
              {socials.filter(s => s.href !== '').map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-iam-gray hover:text-iam-blue hover:border-iam-blue/30 transition-all"
                  aria-label={s.label}
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-montserrat font-semibold text-white mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-iam-gray text-sm hover:text-iam-blue transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-montserrat font-semibold text-white mb-4">Recursos</h3>
            <ul className="space-y-2">
              {resources.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-iam-gray text-sm hover:text-iam-blue transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-montserrat font-semibold text-white mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-iam-gray text-sm">
                <FiMail className="h-4 w-4 text-iam-blue" />
                contato@universoiam.com
              </li>
            </ul>
            <div className="mt-4 p-3 glass rounded-lg border-glow">
              <p className="text-xs text-iam-gray">
                Receba novidades e conteúdos exclusivos diretamente no seu e-mail.
              </p>
              <div className="mt-2 flex gap-2">
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-iam-gray focus:outline-none focus:border-iam-blue/50"
                />
                <button className="px-3 py-2 bg-iam-blue text-white rounded-lg text-sm font-medium hover:bg-iam-blue/80 transition-colors">
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-iam-gray text-xs">
            &copy; 2026 Universo IAM - Todos os direitos reservados.
          </p>
          <p className="text-iam-gray/50 text-xs">
            Desenvolvido com dedicacao para a comunidade de Seguranca da Informacao.
          </p>
        </div>
      </div>
    </footer>
  )
}
