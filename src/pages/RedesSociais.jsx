import { motion } from 'framer-motion'
import { FiInstagram, FiLinkedin, FiYoutube, FiExternalLink } from 'react-icons/fi'
import { FaTiktok, FaFacebook } from 'react-icons/fa'
import Card from '../components/Card'

const BLOG_URL = 'https://universoiam.blogspot.com/'
const INSTAGRAM_URL = 'https://instagram.com/reviewtheaccess'

const socials = [
  { name: 'Instagram', icon: FiInstagram, url: INSTAGRAM_URL, color: 'from-purple-500 to-pink-500', hoverColor: 'hover:shadow-purple-500/30', desc: 'Dicas diarias e bastidores', followers: '5K+' },
  { name: 'Blog', icon: FiExternalLink, url: BLOG_URL, color: 'from-iam-blue to-blue-600', hoverColor: 'hover:shadow-blue-500/30', desc: 'Artigos e conteudos completos', followers: 'Blog' },
]

export default function RedesSociais() {
  return (
    <div className="min-h-screen pt-24">
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-iam-blue/10 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-montserrat font-black text-4xl md:text-6xl text-white mb-4">
            <span className="text-gradient">Redes Sociais</span>
          </motion.h1>
          <p className="text-iam-gray text-lg">Siga o Universo IAM nas redes sociais e fique por dentro de tudo</p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {socials.map((social, i) => (
              <Card key={i} delay={i * 0.1} className={`text-center group ${social.hoverColor}`}>
                <a href={social.url} target="_blank" rel="noopener noreferrer" className="block">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${social.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <social.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-montserrat font-bold text-white text-xl mb-2">{social.name}</h3>
                  <p className="text-iam-gray text-sm mb-4">{social.desc}</p>
                  <span className="inline-flex items-center gap-2 px-6 py-3 bg-iam-blue/10 text-iam-blue rounded-xl font-semibold group-hover:bg-iam-blue/20 transition-all">
                    Acessar <FiExternalLink className="h-4 w-4" />
                  </span>
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-iam-blue/5 to-transparent">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center p-10 bg-gradient-to-br from-iam-blue/10 to-transparent border-iam-blue/20">
            <h3 className="font-montserrat font-bold text-2xl text-white mb-4">Siga Nos</h3>
            <p className="text-iam-gray mb-6 max-w-xl mx-auto">Ative as notificacoes para receber alertas quando novos conteudos forem publicados.</p>
            <div className="flex flex-wrap justify-center gap-4">
              {socials.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center hover:scale-110 transition-transform`}>
                  <s.icon className="h-6 w-6 text-white" />
                </a>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
