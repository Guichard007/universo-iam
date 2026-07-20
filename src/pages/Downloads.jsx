import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiDownload, FiSearch, FiFileText, FiCheckSquare, FiBook, FiGrid, FiClipboard } from 'react-icons/fi'
import SectionTitle from '../components/SectionTitle'
import Card from '../components/Card'

const categories = ['Todos', 'Planilhas', 'Checklists', 'Guias', 'Templates', 'Materiais de Estudo']

const allDownloads = [
  { title: 'Checklist de Seguranca IAM', category: 'Checklists', desc: 'Lista completa de verificacao para ambientes IAM.', icon: FiCheckSquare, downloads: 1250 },
  { title: 'Template de Politica de Acesso', category: 'Templates', desc: 'Modelo de politica de acesso para empresas.', icon: FiGrid, downloads: 890 },
  { title: 'Guia de Implementacao PAM', category: 'Guias', desc: 'Passo a passo para implementar PAM.', icon: FiBook, downloads: 720 },
  { title: 'Planilha de Auditoria de Acessos', category: 'Planilhas', desc: 'Planilha para controle e auditoria de acessos.', icon: FiFileText, downloads: 1100 },
  { title: 'Template de Matriz de Acessos', category: 'Templates', desc: 'Modelo de matriz de acessos por perfil.', icon: FiGrid, downloads: 650 },
  { title: 'Guia de Certificacoes TI', category: 'Guias', desc: 'Mapa de certificacoes para carreira em TI.', icon: FiBook, downloads: 2300 },
  { title: 'Checklist Cloud Security', category: 'Checklists', desc: 'Verificacoes de seguranca para cloud.', icon: FiCheckSquare, downloads: 980 },
  { title: 'Planilha de Risco de Acesso', category: 'Planilhas', desc: 'Avaliacao de risco de acessos privilegiados.', icon: FiFileText, downloads: 540 },
  { title: 'Material de Estudo IAM', category: 'Materiais de Estudo', desc: 'Resumo completo de conceitos de IAM.', icon: Clipboard, downloads: 1800 },
  { template: 'Template de Onboarding', category: 'Templates', desc: 'Processo de onboarding com foco em seguranca.', icon: FiGrid, downloads: 760 },
  { title: 'Guia de Active Directory', category: 'Guias', desc: 'Guia completo de administracao do AD.', icon: FiBook, downloads: 1450 },
  { title: 'Checklist de Incidentes', category: 'Checklists', desc: 'Checklist para resposta a incidentes de seguranca.', icon: FiCheckSquare, downloads: 870 },
]

export default function Downloads() {
  const [filter, setFilter] = useState('Todos')
  const [search, setSearch] = useState('')

  const filtered = allDownloads.filter(d => {
    const title = d.title || ''
    const matchCategory = filter === 'Todos' || d.category === filter
    const matchSearch = title.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  return (
    <div className="min-h-screen pt-24">
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-iam-blue/10 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-montserrat font-black text-4xl md:text-6xl text-white mb-4">
            <span className="text-gradient">Downloads</span>
          </motion.h1>
          <p className="text-iam-gray text-lg">Biblioteca gratuita de materiais para download</p>
        </div>
      </section>

      <section className="pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-iam-gray" />
            <input type="text" placeholder="Buscar materiais..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-12 pr-4 py-3 glass rounded-xl border border-white/10 text-white placeholder-iam-gray focus:outline-none focus:border-iam-blue/50" />
          </div>
          <div className="flex gap-2 justify-center flex-wrap">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === cat ? 'bg-iam-blue text-white' : 'glass text-iam-gray hover:text-white'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, i) => {
              const Icon = item.icon || FiFileText
              return (
                <Card key={i} delay={i * 0.05} className="group">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-iam-blue/10 border border-iam-blue/20 flex items-center justify-center flex-shrink-0 group-hover:bg-iam-blue/20 transition-colors">
                      <Icon className="h-6 w-6 text-iam-blue" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-semibold text-iam-blue uppercase">{item.category}</span>
                      <h3 className="font-montserrat font-bold text-white text-sm mt-1 mb-1 truncate">{item.title}</h3>
                      <p className="text-iam-gray text-xs line-clamp-2 mb-3">{item.desc}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-iam-gray text-xs">{item.downloads} downloads</span>
                        <button className="flex items-center gap-1 px-3 py-1.5 bg-iam-blue/10 text-iam-blue rounded-lg text-xs font-semibold hover:bg-iam-blue/20 transition-all">
                          <FiDownload className="h-3 w-3" /> Baixar
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
