import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiClock, FiBarChart2, FiUsers, FiStar, FiPlay, FiMonitor } from 'react-icons/fi'
import SectionTitle from '../components/SectionTitle'
import Card from '../components/Card'

const filters = {
  type: ['Todos', 'Gratuitos', 'Pagos'],
  level: ['Todos', 'Iniciante', 'Intermediario', 'Avancado'],
}

const HOTMART_AFFILIATE_LINK = 'https://go.hotmart.com/T106836940H'

const allCourses = [
  { title: 'Fundamentos de IAM', desc: 'Aprenda os conceitos basicos de Identity and Access Management.', level: 'Iniciante', type: 'Gratuitos', duration: '8h', modules: 12, students: 1250, rating: 4.9, image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=250&fit=crop', instructor: 'Universo IAM', link: '' },
  { title: 'Microsoft Entra ID Completo', desc: 'Domine o Microsoft Entra ID do basico ao avancado.', level: 'Intermediario', type: 'Pagos', duration: '15h', modules: 20, students: 2100, rating: 4.9, image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=250&fit=crop', instructor: 'Universo IAM', link: HOTMART_AFFILIATE_LINK },
  { title: 'SailPoint IdentityNow', desc: 'Curso completo de governanca de identidades com SailPoint.', level: 'Intermediario', type: 'Pagos', duration: '12h', modules: 16, students: 890, rating: 4.8, image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop', instructor: 'Universo IAM', link: HOTMART_AFFILIATE_LINK },
  { title: 'PAM na Pratica', desc: 'Implemente Gerenciamento de Acessos Privilegiados na sua empresa.', level: 'Avancado', type: 'Pagos', duration: '10h', modules: 14, students: 650, rating: 4.7, image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop', instructor: 'Universo IAM', link: HOTMART_AFFILIATE_LINK },
  { title: 'Introducao a Cybersecurity', desc: 'Os fundamentos da Seguranca Cibernetica para iniciantes.', level: 'Iniciante', type: 'Gratuitos', duration: '6h', modules: 10, students: 3200, rating: 4.8, image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop', instructor: 'Universo IAM', link: '' },
  { title: 'Azure Security Avancado', desc: 'Seguranca avancada em ambientes Microsoft Azure.', level: 'Avancado', type: 'Pagos', duration: '14h', modules: 18, students: 780, rating: 4.9, image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop', instructor: 'Universo IAM', link: HOTMART_AFFILIATE_LINK },
  { title: 'Okta Identity Platform', desc: 'Aprenda a gerenciar identidades com Okta.', level: 'Intermediario', type: 'Pagos', duration: '11h', modules: 15, students: 560, rating: 4.7, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop', instructor: 'Universo IAM', link: HOTMART_AFFILIATE_LINK },
  { title: 'Active Directory Seguranca', desc: 'Hardening e seguranca de ambientes Active Directory.', level: 'Avancado', type: 'Pagos', duration: '9h', modules: 12, students: 420, rating: 4.8, image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=250&fit=crop', instructor: 'Universo IAM', link: HOTMART_AFFILIATE_LINK },
  { title: 'Carreira em TI', desc: 'Dicas e estrategias para construir uma carreira de sucesso em tecnologia.', level: 'Iniciante', type: 'Gratuitos', duration: '4h', modules: 8, students: 5400, rating: 4.9, image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=250&fit=crop', instructor: 'Universo IAM', link: '' },
]

export default function Cursos() {
  const [typeFilter, setTypeFilter] = useState('Todos')
  const [levelFilter, setLevelFilter] = useState('Todos')

  const filtered = allCourses.filter(c => {
    const matchType = typeFilter === 'Todos' || c.type === typeFilter
    const matchLevel = levelFilter === 'Todos' || c.level === levelFilter
    return matchType && matchLevel
  })

  return (
    <div className="min-h-screen pt-24">
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-iam-blue/10 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-montserrat font-black text-4xl md:text-6xl text-white mb-4">
            <span className="text-gradient">Cursos</span>
          </motion.h1>
          <p className="text-iam-gray text-lg">Desenvolva suas habilidades com nossos cursos especializados</p>
        </div>
      </section>

      <section className="pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 justify-center">
          <div className="flex gap-2 justify-center">
            <span className="text-iam-gray text-sm self-center mr-2">Tipo:</span>
            {filters.type.map((f) => (
              <button key={f} onClick={() => setTypeFilter(f)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${typeFilter === f ? 'bg-iam-blue text-white' : 'glass text-iam-gray hover:text-white'}`}>
                {f}
              </button>
            ))}
          </div>
          <div className="flex gap-2 justify-center">
            <span className="text-iam-gray text-sm self-center mr-2">Nivel:</span>
            {filters.level.map((f) => (
              <button key={f} onClick={() => setLevelFilter(f)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${levelFilter === f ? 'bg-iam-blue text-white' : 'glass text-iam-gray hover:text-white'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course, i) => (
              <Card key={i} delay={i * 0.05} className="overflow-hidden group">
                <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${course.type === 'Gratuitos' ? 'bg-green-500/90 text-white' : 'bg-iam-blue/90 text-white'}`}>
                      {course.type}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer">
                      <FiPlay className="h-4 w-4 text-white ml-0.5" />
                    </div>
                  </div>
                </div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-iam-blue/10 text-iam-blue border border-iam-blue/20 mb-3">{course.level}</span>
                <h3 className="font-montserrat font-bold text-white text-lg mb-2">{course.title}</h3>
                <p className="text-iam-gray text-sm mb-4 line-clamp-2">{course.desc}</p>
                <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                  <div className="glass rounded-lg py-2">
                    <FiClock className="h-4 w-4 text-iam-blue mx-auto mb-1" />
                    <span className="text-white text-xs font-semibold">{course.duration}</span>
                  </div>
                  <div className="glass rounded-lg py-2">
                    <FiMonitor className="h-4 w-4 text-iam-blue mx-auto mb-1" />
                    <span className="text-white text-xs font-semibold">{course.modules} aulas</span>
                  </div>
                  <div className="glass rounded-lg py-2">
                    <FiUsers className="h-4 w-4 text-iam-blue mx-auto mb-1" />
                    <span className="text-white text-xs font-semibold">{course.students}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <FiStar className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-semibold text-sm">{course.rating}</span>
                  </div>
                  <span className="text-iam-gray text-xs">por {course.instructor}</span>
                </div>
                {course.link ? (
                  <a href={course.link} target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-iam-blue text-white rounded-xl font-semibold hover:shadow-neon transition-all text-center block">
                    {course.type === 'Gratuitos' ? 'Comecar Agora' : 'Saiba Mais'}
                  </a>
                ) : (
                  <button className="w-full py-3 bg-iam-blue text-white rounded-xl font-semibold hover:shadow-neon transition-all">
                    {course.type === 'Gratuitos' ? 'Comecar Agora' : 'Saiba Mais'}
                  </button>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
