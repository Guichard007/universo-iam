import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiShield, FiBookOpen, FiDownload, FiYoutube, FiLock, FiCloud, FiUsers, FiAward, FiCode, FiCheckCircle, FiStar } from 'react-icons/fi'
import SectionTitle from '../components/SectionTitle'
import Card from '../components/Card'
import Typewriter from '../components/Typewriter'

const heroTexts = [
  'Alavanque sua carreira profissional na area de tecnologia',
  'Domine Seguranca da Informacao e IAM',
  'Construa sua carreira em Cloud Security',
  'Aprenda Microsoft Entra ID e Okta',
  'Torne-se um especialista em Cybersecurity',
  'Certificacoes que transformam seu curriculo',
]

const highlights = [
  { icon: FiShield, title: 'IAM', desc: 'Identity and Access Management' },
  { icon: FiLock, title: 'PAM', desc: 'Privileged Access Management' },
  { icon: FiCloud, title: 'Cloud Security', desc: 'Seguranca em Nuvem' },
  { icon: FiCode, title: 'Cybersecurity', desc: 'Seguranca Cibernetica' },
  { icon: FiUsers, title: 'IGA', desc: 'Identity Governance' },
  { icon: FiAward, title: 'Certificacoes', desc: 'Preparacao para Certificacoes' },
]

const recentArticles = [
  { title: 'Microsoft Entra ID: Guia Completo 2026', category: 'IAM', date: '15 Jul 2026', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=400&h=250&fit=crop' },
  { title: 'Como Implementar PAM na Pratica', category: 'PAM', date: '12 Jul 2026', image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop' },
  { title: 'Top 5 Certificacoes de Seguranca 2026', category: 'Carreira', date: '10 Jul 2026', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop' },
  { title: 'Azure Security Best Practices', category: 'Cloud Security', date: '08 Jul 2026', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop' },
]

const popularCourses = [
  { title: 'Fundamentos de IAM', level: 'Iniciante', duration: '8h', rating: 4.9, students: 1250, image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=250&fit=crop' },
  { title: 'SailPoint IdentityNow', level: 'Intermediario', duration: '12h', rating: 4.8, students: 890, image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop' },
  { title: 'Azure AD Avancado', level: 'Avancado', duration: '15h', rating: 4.9, students: 2100, image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=250&fit=crop' },
]

const featuredEbooks = [
  { title: 'Guia Completo de IAM', price: 'R$ 49,90', oldPrice: 'R$ 79,90', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop' },
  { title: 'Seguranca em Cloud', price: 'R$ 39,90', oldPrice: 'R$ 69,90', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=400&fit=crop' },
  { title: 'PAM na Pratica', price: 'R$ 44,90', oldPrice: 'R$ 74,90', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=300&h=400&fit=crop' },
]

const recentVideos = [
  { title: 'O que e IAM? Explicacao Completa', views: '15K', duration: '18:30', thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=225&fit=crop' },
  { title: 'Configurando Microsoft Entra ID', views: '8.2K', duration: '25:15', thumbnail: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=225&fit=crop' },
  { title: 'Top Ferramentas de Seguranca', views: '12K', duration: '20:45', thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=225&fit=crop' },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-iam-dark via-iam-dark/90 to-iam-dark" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-iam-blue/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-iam-blue/5 rounded-full blur-[100px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <FiShield className="h-24 w-24 md:h-32 md:w-32 text-iam-blue mx-auto animate-float" />
              <div className="absolute inset-0 bg-iam-blue/20 rounded-full blur-2xl animate-pulse-slow" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-montserrat font-black text-5xl md:text-7xl lg:text-8xl mb-6"
          >
            <span className="text-white">UNIVERSO</span>{' '}
            <span className="text-gradient">IAM</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-inter text-lg md:text-xl lg:text-2xl text-iam-gray max-w-3xl mx-auto mb-10 min-h-[60px] flex items-center justify-center"
          >
            <Typewriter texts={heroTexts} speed={70} pause={3000} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/blog"
              className="group flex items-center gap-2 px-8 py-4 bg-iam-blue text-white rounded-xl font-semibold transition-all hover:shadow-neon-lg hover:scale-105"
            >
              Explorar Conteudos
              <FiArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/cursos"
              className="flex items-center gap-2 px-8 py-4 glass border-glow rounded-xl font-semibold text-white hover:bg-iam-blue/10 transition-all"
            >
              <FiBookOpen className="h-5 w-5" />
              Cursos Gratuitos
            </Link>
            <a
              href="https://youtube.com/@SEUCANAL"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 bg-red-600/20 border border-red-500/30 text-red-400 rounded-xl font-semibold hover:bg-red-600/30 transition-all"
            >
              <FiYoutube className="h-5 w-5" />
              Canal do YouTube
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {[
              { num: '100+', label: 'Artigos' },
              { num: '15+', label: 'Cursos' },
              { num: '10K+', label: 'Alunos' },
              { num: '50+', label: 'E-books' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-montserrat font-bold text-2xl md:text-3xl text-iam-blue">{stat.num}</div>
                <div className="text-iam-gray text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            subtitle="Destaques"
            title="Areas de Conhecimento"
            description="Explore nossos conteudos organizados por area de especializacao"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {highlights.map((item, i) => (
              <Card key={i} delay={i * 0.1} className="text-center group cursor-pointer">
                <item.icon className="h-10 w-10 text-iam-blue mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-montserrat font-bold text-white text-sm">{item.title}</h3>
                <p className="text-iam-gray text-xs mt-1">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-iam-blue/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            subtitle="Blog"
            title="Ultimos Artigos"
            description="Fique por dentro dos conteudos mais recentes"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentArticles.map((article, i) => (
              <Card key={i} delay={i * 0.1} className="overflow-hidden group cursor-pointer">
                <div className="relative h-40 rounded-xl overflow-hidden mb-4">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-iam-blue/90 rounded-full text-xs font-semibold text-white">
                    {article.category}
                  </div>
                </div>
                <h3 className="font-montserrat font-bold text-white text-sm mb-2 group-hover:text-iam-blue transition-colors">{article.title}</h3>
                <p className="text-iam-gray text-xs">{article.date}</p>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3 glass border-glow rounded-xl text-iam-blue font-semibold hover:bg-iam-blue/10 transition-all">
              Ver Todos os Artigos <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            subtitle="Aprenda"
            title="Cursos Populares"
            description="Desenvolva suas habilidades com nossos cursos especializados"
          />
          <div className="grid md:grid-cols-3 gap-6">
            {popularCourses.map((course, i) => (
              <Card key={i} delay={i * 0.1} className="overflow-hidden group">
                <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 px-3 py-1 bg-black/70 rounded-full text-xs font-semibold text-iam-blue">
                    {course.level}
                  </div>
                </div>
                <h3 className="font-montserrat font-bold text-white mb-2">{course.title}</h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-iam-gray">{course.duration}</span>
                  <div className="flex items-center gap-1">
                    <FiStar className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-semibold">{course.rating}</span>
                    <span className="text-iam-gray">({course.students})</span>
                  </div>
                </div>
                <Link to="/cursos" className="mt-4 block text-center py-2 bg-iam-blue/10 text-iam-blue rounded-lg font-semibold hover:bg-iam-blue/20 transition-all">
                  Saiba Mais
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Ebooks */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-iam-blue/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            subtitle="E-books"
            title="E-books em Destaque"
            description="Material exclusivo para acelerar seu aprendizado"
          />
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {featuredEbooks.map((ebook, i) => (
              <Card key={i} delay={i * 0.1} className="overflow-hidden text-center">
                <div className="relative h-56 rounded-xl overflow-hidden mb-4 mx-auto max-w-[200px]">
                  <img src={ebook.image} alt={ebook.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <h3 className="font-montserrat font-bold text-white mb-2">{ebook.title}</h3>
                <div className="flex items-center justify-center gap-3 mb-3">
                  <span className="text-iam-gray line-through text-sm">{ebook.oldPrice}</span>
                  <span className="text-iam-blue font-bold text-xl">{ebook.price}</span>
                </div>
                <button className="w-full py-2.5 bg-iam-blue text-white rounded-lg font-semibold hover:shadow-neon transition-all">
                  Comprar Agora
                </button>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/ebooks" className="inline-flex items-center gap-2 px-6 py-3 glass border-glow rounded-xl text-iam-blue font-semibold hover:bg-iam-blue/10 transition-all">
              Ver Todos os E-books <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Videos */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            subtitle="YouTube"
            title="Videos Recentes"
            description="Assista nossos ultimos videos no canal"
          />
          <div className="grid md:grid-cols-3 gap-6">
            {recentVideos.map((video, i) => (
              <Card key={i} delay={i * 0.1} className="overflow-hidden group cursor-pointer">
                <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 rounded text-xs text-white">{video.duration}</div>
                </div>
                <h3 className="font-montserrat font-bold text-white text-sm mb-2 group-hover:text-iam-blue transition-colors">{video.title}</h3>
                <p className="text-iam-gray text-xs">{video.views} visualizacoes</p>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="https://youtube.com/@SEUCANAL" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all">
              <FiYoutube className="h-5 w-5" /> Inscreva-se no Canal
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center p-12 bg-gradient-to-br from-iam-blue/10 to-transparent border-iam-blue/20">
            <FiShield className="h-16 w-16 text-iam-blue mx-auto mb-6" />
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-white mb-4">
              Junte-se a Comunidade
            </h2>
            <p className="text-iam-gray text-lg mb-8 max-w-xl mx-auto">
              Receba conteudos exclusivos, dicas de carreira e atualizacoes do mundo da Seguranca da Informacao.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/downloads" className="inline-flex items-center gap-2 px-8 py-4 bg-iam-blue text-white rounded-xl font-semibold hover:shadow-neon-lg transition-all">
                <FiDownload className="h-5 w-5" /> Downloads Gratuitos
              </Link>
              <Link to="/contato" className="inline-flex items-center gap-2 px-8 py-4 glass border-glow rounded-xl text-white font-semibold hover:bg-iam-blue/10 transition-all">
                Fale Conosco
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
