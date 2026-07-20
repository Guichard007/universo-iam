import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSearch, FiClock, FiUser, FiArrowRight, FiTag } from 'react-icons/fi'
import SectionTitle from '../components/SectionTitle'
import Card from '../components/Card'

const categories = ['Todos', 'IAM', 'IGA', 'PAM', 'Cybersecurity', 'Cloud Security', 'Carreira em TI', 'Certificacoes', 'SailPoint', 'Microsoft Entra ID', 'Okta', 'Active Directory']

const allArticles = [
  { title: 'Microsoft Entra ID: Guia Completo 2026', category: 'Microsoft Entra ID', author: 'Universo IAM', date: '15 Jul 2026', readTime: '8 min', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=600&h=400&fit=crop', excerpt: 'Aprenda a configurar e gerenciar o Microsoft Entra ID para sua organizacao.' },
  { title: 'Como Implementar PAM na Pratica', category: 'PAM', author: 'Universo IAM', date: '12 Jul 2026', readTime: '12 min', image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop', excerpt: 'Passo a passo para implementar um sistema de Gerenciamento de Acessos Privilegiados.' },
  { title: 'Top 5 Certificacoes de Seguranca 2026', category: 'Certificacoes', author: 'Universo IAM', date: '10 Jul 2026', readTime: '6 min', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop', excerpt: 'As certificacoes mais valiosas para impulsionar sua carreira em seguranca.' },
  { title: 'Azure Security Best Practices', category: 'Cloud Security', author: 'Universo IAM', date: '08 Jul 2026', readTime: '10 min', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop', excerpt: 'Melhores praticas de seguranca para ambientes Microsoft Azure.' },
  { title: 'Okta vs Entra ID: Comparativo', category: 'Okta', author: 'Universo IAM', date: '05 Jul 2026', readTime: '15 min', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop', excerpt: 'Analise detalhada entre as duas maiores plataformas de identidade.' },
  { title: 'SailPoint IdentityNow: Introducao', category: 'SailPoint', author: 'Universo IAM', date: '02 Jul 2026', readTime: '9 min', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop', excerpt: 'Primeiros passos com a plataforma SailPoint IdentityNow.' },
  { title: 'Active Directory: Seguranca Avancada', category: 'Active Directory', author: 'Universo IAM', date: '28 Jun 2026', readTime: '11 min', image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=400&fit=crop', excerpt: ' Tecnicas avancadas de seguranca para ambiente Active Directory.' },
  { title: 'Carreira em TI: Primeiros Passos', category: 'Carreira em TI', author: 'Universo IAM', date: '25 Jun 2026', readTime: '7 min', image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop', excerpt: 'Guia completo para iniciar sua carreira na area de tecnologia.' },
  { title: 'IGA: Governanca de Identidades', category: 'IGA', author: 'Universo IAM', date: '22 Jun 2026', readTime: '13 min', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop', excerpt: 'Entenda os principios de Governanca de Identidades e Acessos.' },
  { title: 'Cybersecurity: Ameacas Emergentes', category: 'Cybersecurity', author: 'Universo IAM', date: '18 Jun 2026', readTime: '8 min', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop', excerpt: 'As principais ameacas ciberneticas de 2026 e como se proteger.' },
  { title: 'IAM na Pratica: Casos Reais', category: 'IAM', author: 'Universo IAM', date: '15 Jun 2026', readTime: '14 min', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop', excerpt: 'Estudos de caso reais de implementacao de IAM em empresas.' },
  { title: 'Cloud Security Framework', category: 'Cloud Security', author: 'Universo IAM', date: '10 Jun 2026', readTime: '10 min', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop', excerpt: 'Framework completo de seguranca para ambientes cloud.' },
]

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6

  const filtered = allArticles.filter(a => {
    const matchCategory = selectedCategory === 'Todos' || a.category === selectedCategory
    const matchSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) || a.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchCategory && matchSearch
  })

  const indexOfLast = currentPage * postsPerPage
  const indexOfFirst = indexOfLast - postsPerPage
  const currentPosts = filtered.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(filtered.length / postsPerPage)

  return (
    <div className="min-h-screen pt-24">
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-iam-blue/10 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-montserrat font-black text-4xl md:text-6xl text-white mb-4">
            <span className="text-gradient">Blog</span>
          </motion.h1>
          <p className="text-iam-gray text-lg">Artigos sobre Seguranca da Informacao, IAM e Tecnologia</p>
        </div>
      </section>

      <section className="pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-iam-gray" />
              <input
                type="text"
                placeholder="Buscar artigos..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1) }}
                className="w-full pl-12 pr-4 py-3 glass rounded-xl border border-white/10 text-white placeholder-iam-gray focus:outline-none focus:border-iam-blue/50"
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setCurrentPage(1) }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-iam-blue text-white'
                      : 'glass text-iam-gray hover:text-white hover:border-iam-blue/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPosts.map((article, i) => (
              <Card key={i} delay={i * 0.05} className="overflow-hidden group cursor-pointer">
                <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-iam-blue/90 rounded-full text-xs font-semibold text-white flex items-center gap-1">
                    <FiTag className="h-3 w-3" /> {article.category}
                  </div>
                </div>
                <h3 className="font-montserrat font-bold text-white text-lg mb-2 group-hover:text-iam-blue transition-colors">{article.title}</h3>
                <p className="text-iam-gray text-sm mb-3 line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-iam-gray">
                  <span className="flex items-center gap-1"><FiUser className="h-3 w-3" /> {article.author}</span>
                  <span className="flex items-center gap-1"><FiClock className="h-3 w-3" /> {article.readTime}</span>
                </div>
                <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-iam-gray">{article.date}</span>
                  <span className="text-iam-blue text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Ler mais <FiArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                    currentPage === i + 1
                      ? 'bg-iam-blue text-white'
                      : 'glass text-iam-gray hover:text-white'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
