import { motion } from 'framer-motion'
import { FiExternalLink, FiBookOpen, FiArrowRight } from 'react-icons/fi'
import Card from '../components/Card'

const BLOG_URL = 'https://universoiam.blogspot.com/'

const categories = [
  { name: 'IAM', desc: 'Identity and Access Management', color: 'from-blue-500 to-cyan-500' },
  { name: 'PAM', desc: 'Privileged Access Management', color: 'from-purple-500 to-pink-500' },
  { name: 'IGA', desc: 'Identity Governance', color: 'from-green-500 to-teal-500' },
  { name: 'Cybersecurity', desc: 'Seguranca Cibernetica', color: 'from-red-500 to-orange-500' },
  { name: 'Cloud Security', desc: 'Seguranca em Nuvem', color: 'from-yellow-500 to-orange-500' },
  { name: 'Carreira em TI', desc: 'Desenvolvimento Profissional', color: 'from-indigo-500 to-purple-500' },
  { name: 'Certificacoes', desc: 'Preparacao para Certificacoes', color: 'from-pink-500 to-rose-500' },
  { name: 'SailPoint', desc: 'Plataforma de Governanca', color: 'from-cyan-500 to-blue-500' },
  { name: 'Microsoft Entra ID', desc: 'Identidade Microsoft', color: 'from-blue-600 to-blue-400' },
  { name: 'Okta', desc: 'Plataforma de Identidade', color: 'from-blue-500 to-indigo-500' },
  { name: 'Active Directory', desc: 'Diretorio Ativo', color: 'from-gray-500 to-blue-500' },
]

export default function Blog() {
  return (
    <div className="min-h-screen pt-24">
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-iam-blue/10 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-iam-blue/10 border border-iam-blue/20 rounded-2xl">
              <FiBookOpen className="h-10 w-10 text-iam-blue" />
            </div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-montserrat font-black text-4xl md:text-6xl text-white mb-4">
            <span className="text-gradient">Blog</span>
          </motion.h1>
          <p className="text-iam-gray text-lg mb-8">Artigos sobre Seguranca da Informacao, IAM e Tecnologia</p>
          <a href={BLOG_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-iam-blue text-white rounded-xl font-semibold hover:shadow-neon-lg hover:scale-105 transition-all text-lg">
            <FiExternalLink className="h-5 w-5" /> Acessar Blog Completo
          </a>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-montserrat font-bold text-2xl text-white text-center mb-10">Categorias de Conteudo</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <a key={i} href={BLOG_URL} target="_blank" rel="noopener noreferrer">
                <Card delay={i * 0.05} className="group cursor-pointer">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <FiBookOpen className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-montserrat font-bold text-white mb-1 group-hover:text-iam-blue transition-colors">{cat.name}</h3>
                  <p className="text-iam-gray text-sm">{cat.desc}</p>
                  <div className="mt-3 flex items-center gap-1 text-iam-blue text-sm font-semibold">
                    Ver artigos <FiArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-iam-blue/5 to-transparent">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center p-10 bg-gradient-to-br from-iam-blue/10 to-transparent border-iam-blue/20">
            <FiBookOpen className="h-16 w-16 text-iam-blue mx-auto mb-4" />
            <h3 className="font-montserrat font-bold text-2xl text-white mb-3">Leia no Blogspot</h3>
            <p className="text-iam-gray mb-6 max-w-xl mx-auto">
              Acesse nosso blog completo com artigos atualizados sobre Seguranca da Informacao, IAM, Cloud Security e muito mais.
            </p>
            <a href={BLOG_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-iam-blue text-white rounded-xl font-semibold hover:shadow-neon transition-all">
              <FiExternalLink className="h-5 w-5" /> universoiam.blogspot.com
            </a>
          </Card>
        </div>
      </section>
    </div>
  )
}
