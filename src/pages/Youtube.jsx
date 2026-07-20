import { motion } from 'framer-motion'
import { FiYoutube, FiPlay, FiExternalLink, FiSettings } from 'react-icons/fi'
import SectionTitle from '../components/SectionTitle'
import Card from '../components/Card'

// ============================================================
// CONFIGURACAO: Preencha com os dados do seu canal
// ============================================================
const CHANNEL_URL = 'https://youtube.com/@SEUCANAL' // <-- Troque pelo seu link
const CHANNEL_NAME = 'Universo IAM'
// ============================================================

const playlists = [
  { name: 'IAM Completo', count: 24, thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=225&fit=crop' },
  { name: 'Microsoft Entra ID', count: 18, thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=225&fit=crop' },
  { name: 'Cybersecurity', count: 15, thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=225&fit=crop' },
  { name: 'Carreira em TI', count: 12, thumbnail: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=225&fit=crop' },
]

const recentVideos = [
  { title: 'O que e IAM? Explicacao Completa para Iniciantes', views: '15K', date: '3 dias atras', duration: '18:30', thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=340&fit=crop' },
  { title: 'Como Configurar Microsoft Entra ID Passo a Passo', views: '8.2K', date: '5 dias atras', duration: '25:15', thumbnail: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=340&fit=crop' },
  { title: 'Top 10 Ferramentas de Seguranca da Informacao', views: '12K', date: '1 semana atras', duration: '20:45', thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=340&fit=crop' },
  { title: 'PAM: Gerenciamento de Acessos Privilegiados', views: '6.5K', date: '1 semana atras', duration: '22:10', thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=340&fit=crop' },
  { title: 'Carreira em TI: Dicas para Conseguir seu Primeiro Emprego', views: '22K', date: '2 semanas atras', duration: '15:30', thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=340&fit=crop' },
  { title: 'Azure Security: Melhores Practicas 2026', views: '9.1K', date: '2 semanas atras', duration: '28:00', thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=340&fit=crop' },
]

export default function Youtube() {
  return (
    <div className="min-h-screen pt-24">
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-600/5 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-600 rounded-2xl">
              <FiYoutube className="h-10 w-10 text-white" />
            </div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-montserrat font-black text-4xl md:text-6xl text-white mb-4">
            Canal <span className="text-red-500">YouTube</span>
          </motion.h1>
          <p className="text-iam-gray text-lg mb-8">Inscreva-se e ative o sininho para nao perder nenhum conteudo</p>

          <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] transition-all text-lg">
            <FiYoutube className="h-6 w-6" /> Inscrever-se no Canal
          </a>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Playlists" title="Assista por Tema" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {playlists.map((pl, i) => (
              <a key={i} href={CHANNEL_URL} target="_blank" rel="noopener noreferrer">
                <Card delay={i * 0.1} className="overflow-hidden group cursor-pointer">
                  <div className="relative h-40 rounded-xl overflow-hidden mb-3">
                    <img src={pl.thumbnail} alt={pl.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                        <FiPlay className="h-5 w-5 text-white ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-xs text-white">{pl.count} videos</div>
                  </div>
                  <h3 className="font-montserrat font-bold text-white text-sm group-hover:text-red-400 transition-colors">{pl.name}</h3>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-red-600/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Ultimos Videos" title="Videos Recentes" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentVideos.map((video, i) => (
              <a key={i} href={CHANNEL_URL} target="_blank" rel="noopener noreferrer">
                <Card delay={i * 0.05} className="overflow-hidden group cursor-pointer">
                  <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <FiPlay className="h-6 w-6 text-white ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 rounded text-xs text-white font-mono">{video.duration}</div>
                  </div>
                  <h3 className="font-montserrat font-bold text-white text-sm mb-2 group-hover:text-red-400 transition-colors line-clamp-2">{video.title}</h3>
                  <div className="flex items-center justify-between text-xs text-iam-gray">
                    <span>{video.views} visualizacoes</span>
                    <span>{video.date}</span>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center p-10 bg-gradient-to-br from-red-600/10 to-transparent border-red-500/20">
            <FiYoutube className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h3 className="font-montserrat font-bold text-2xl text-white mb-2">Junte-se a Comunidade</h3>
            <p className="text-iam-gray mb-6">Assista nossos conteudos e faca parte da comunidade</p>
            <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] transition-all">
              <FiExternalLink className="h-5 w-5" /> Acessar Canal
            </a>
          </Card>
        </div>
      </section>
    </div>
  )
}
