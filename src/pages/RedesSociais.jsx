import { motion } from 'framer-motion'
import { FiInstagram, FiLinkedin, FiYoutube, FiExternalLink } from 'react-icons/fi'
import { FaTiktok, FaFacebook } from 'react-icons/fa'
import Card from '../components/Card'

// ============================================================
// CONFIGURACAO: Preencha com os links das suas redes sociais
// Deixe vazio '' para esconder ate conectar
// ============================================================
const socials = [
  { name: 'Instagram', icon: FiInstagram, url: '', color: 'from-purple-500 to-pink-500', hoverColor: 'hover:shadow-purple-500/30', desc: 'Dicas diarias e bastidores', followers: '5K+' },
  { name: 'Facebook', icon: FaFacebook, url: '', color: 'from-blue-600 to-blue-500', hoverColor: 'hover:shadow-blue-500/30', desc: 'Comunidade e debates', followers: '3K+' },
  { name: 'TikTok', icon: FaTiktok, url: '', color: 'from-cyan-500 to-pink-500', hoverColor: 'hover:shadow-cyan-500/30', desc: 'Videos curtos e dicas rapidas', followers: '8K+' },
  { name: 'LinkedIn', icon: FiLinkedin, url: '', color: 'from-blue-700 to-blue-600', hoverColor: 'hover:shadow-blue-600/30', desc: 'Artigos e networking profissional', followers: '4K+' },
  { name: 'YouTube', icon: FiYoutube, url: '', color: 'from-red-600 to-red-500', hoverColor: 'hover:shadow-red-500/30', desc: 'Tutoriais e aulas completas', followers: '10K+' },
]
// ============================================================

export default function RedesSociais() {
  const activeSocials = socials.filter(s => s.url !== '')

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
          {activeSocials.length === 0 ? (
            <Card className="text-center p-12">
              <div className="w-20 h-20 rounded-2xl glass border-glow flex items-center justify-center mx-auto mb-6">
                <FiInstagram className="h-10 w-10 text-iam-blue" />
              </div>
              <h3 className="font-montserrat font-bold text-2xl text-white mb-3">Em Breve nas Redes Sociais</h3>
              <p className="text-iam-gray max-w-md mx-auto mb-4">
                Estamos preparando conteudos exclusivos para todas as redes sociais. Fique atento!
              </p>
              <div className="flex justify-center gap-3">
                {socials.map((s, i) => (
                  <div key={i} className="w-12 h-12 rounded-xl bg-gradient-to-br opacity-30 from-gray-500 to-gray-600 flex items-center justify-center">
                    <s.icon className="h-5 w-5 text-white" />
                  </div>
                ))}
              </div>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeSocials.map((social, i) => (
                <Card key={i} delay={i * 0.1} className={`text-center group ${social.hoverColor}`}>
                  <a href={social.url} target="_blank" rel="noopener noreferrer" className="block">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${social.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <social.icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="font-montserrat font-bold text-white text-xl mb-2">{social.name}</h3>
                    <p className="text-iam-gray text-sm mb-3">{social.desc}</p>
                    <div className="inline-block px-4 py-1.5 glass rounded-full text-xs font-semibold text-iam-blue mb-4">
                      {social.followers} seguidores
                    </div>
                    <div>
                      <span className="inline-flex items-center gap-2 px-6 py-3 bg-iam-blue/10 text-iam-blue rounded-xl font-semibold group-hover:bg-iam-blue/20 transition-all">
                        Acessar <FiExternalLink className="h-4 w-4" />
                      </span>
                    </div>
                  </a>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {activeSocials.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-iam-blue/5 to-transparent">
          <div className="max-w-4xl mx-auto">
            <Card className="text-center p-10 bg-gradient-to-br from-iam-blue/10 to-transparent border-iam-blue/20">
              <h3 className="font-montserrat font-bold text-2xl text-white mb-4">Ative as Notificacoes</h3>
              <p className="text-iam-gray mb-6 max-w-xl mx-auto">Ative o sininho em todas as redes para receber alertas quando novos conteudos forem publicados. Nao perca nada!</p>
              <div className="flex flex-wrap justify-center gap-4">
                {activeSocials.map((s, i) => (
                  <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center hover:scale-110 transition-transform`}>
                    <s.icon className="h-5 w-5 text-white" />
                  </a>
                ))}
              </div>
            </Card>
          </div>
        </section>
      )}
    </div>
  )
}
