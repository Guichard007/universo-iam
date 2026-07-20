import { motion } from 'framer-motion'
import { FiShield, FiTarget, FiEye, FiLock, FiCloud, FiCode, FiUsers, FiAward, FiCheckCircle } from 'react-icons/fi'
import SectionTitle from '../components/SectionTitle'
import Card from '../components/Card'
import Typewriter from '../components/Typewriter'

const missionTexts = [
  'Democratizar o Conhecimento em Seguranca da Informacao',
  'Compartilhar Expertise em IAM e Cloud Security',
  'Formar Profissionais Qualificados para o Mercado',
  'Construir uma Comunidade Forte de Especialistas',
]

const values = [
  { icon: FiShield, title: 'Seguranca', desc: 'Protecao de dados e identidadesdigitais em primeiro lugar.' },
  { icon: FiTarget, title: 'Excelencia', desc: 'Conteudos de alta qualidade e atualizados.' },
  { icon: FiUsers, title: 'Comunidade', desc: 'Construir uma rede de profissionais de TI.' },
  { icon: FiAward, title: 'Reconhecimento', desc: 'Preparar profissionais para certificacoes.' },
]

const areas = [
  { icon: FiLock, title: 'IAM', desc: 'Identity and Access Management - Gerenciamento de Identidades e Acessos' },
  { icon: FiLock, title: 'PAM', desc: 'Privileged Access Management - Gerenciamento de Acessos Privilegiados' },
  { icon: FiUsers, title: 'IGA', desc: 'Identity Governance and Administration - Governanca de Identidades' },
  { icon: FiCloud, title: 'Cloud Security', desc: 'Seguranca em Ambientes de Nuvem' },
  { icon: FiCode, title: 'Cybersecurity', desc: 'Seguranca Cibernetica e Defesa Digital' },
  { icon: FiAward, title: 'Carreira', desc: 'Desenvolvimento Profissional em Tecnologia' },
]

const timeline = [
  { year: '2023', title: 'Fundacao', desc: 'Inicio do Universo IAM como canal no YouTube' },
  { year: '2024', title: 'Expansao', desc: 'Lancamento do blog, cursos e e-books' },
  { year: '2025', title: 'Crescimento', desc: 'Mais de 10.000 alunos e profissionais atendidos' },
  { year: '2026', title: 'Portal Completo', desc: 'Plataforma integrada de conteudos e produtos digitais' },
]

export default function Sobre() {
  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-iam-blue/10 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-iam-blue/5 rounded-full blur-[150px]" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <div className="relative inline-block mb-8">
              <FiShield className="h-20 w-20 text-iam-blue" />
              <div className="absolute inset-0 bg-iam-blue/20 rounded-full blur-xl animate-pulse-slow" />
            </div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-montserrat font-black text-4xl md:text-6xl text-white mb-6">
            Sobre o <span className="text-gradient">Universo IAM</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-iam-gray text-lg md:text-xl max-w-2xl mx-auto">
            Conheca nossa missao, valores e o que nos move a compartilhar conhecimento sobre Seguranca da Informacao.
          </motion.p>
        </div>
      </section>

      {/* Missao */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-iam-blue/5 to-transparent border-iam-blue/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-iam-blue text-sm font-semibold uppercase tracking-wider">Nossa Missao</span>
                <h2 className="font-montserrat font-bold text-3xl text-white mt-2 mb-4 min-h-[80px]">
                  <Typewriter texts={missionTexts} speed={60} pause={3000} />
                </h2>
                <p className="text-iam-gray leading-relaxed mb-4">
                  Compartilhar conhecimento sobre Seguranca da Informacao, IAM, Cloud, Governanca de Acessos e desenvolvimento profissional em tecnologia.
                </p>
                <p className="text-iam-gray leading-relaxed">
                  Acreditanos que cada profissional de TI merece acesso a conteudos de qualidade sobre as principais ferramentas e praticas do mercado.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl glass border-glow p-8 flex items-center justify-center">
                  <FiShield className="h-32 w-32 text-iam-blue/30" />
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-iam-blue/10 rounded-full blur-xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-iam-blue/5 rounded-full blur-xl" />
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-iam-blue/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="Nossos Valores" title="O Que Acreditamos" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <Card key={i} delay={i * 0.1} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-iam-blue/10 border border-iam-blue/20 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="h-8 w-8 text-iam-blue" />
                </div>
                <h3 className="font-montserrat font-bold text-white mb-2">{v.title}</h3>
                <p className="text-iam-gray text-sm">{v.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="Especializacao" title="Areas de Conhecimento" description="Atuamos nas principais areas de Seguranca da Informacao e tecnologia" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {areas.map((a, i) => (
              <Card key={i} delay={i * 0.1} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-iam-blue/10 border border-iam-blue/20 flex items-center justify-center flex-shrink-0">
                  <a.icon className="h-6 w-6 text-iam-blue" />
                </div>
                <div>
                  <h3 className="font-montserrat font-bold text-white mb-1">{a.title}</h3>
                  <p className="text-iam-gray text-sm">{a.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-iam-blue/5 to-transparent">
        <div className="max-w-4xl mx-auto">
          <SectionTitle subtitle="Nossa Historia" title="Trajetoria" />
          <div className="space-y-8">
            {timeline.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-iam-blue/10 border border-iam-blue/20 flex items-center justify-center flex-shrink-0">
                    <span className="font-montserrat font-bold text-iam-blue text-lg">{t.year}</span>
                  </div>
                  <div>
                    <h3 className="font-montserrat font-bold text-white">{t.title}</h3>
                    <p className="text-iam-gray text-sm">{t.desc}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Objetivos */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionTitle subtitle="Objetivos" title="O Que Queremos Alcançar" />
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Formar profissionais qualificados em IAM e Seguranca',
              'Disponibilizar conteudos gratuitos e de qualidade',
              'Criar uma comunidade forte de profissionais de TI',
              'Ser referencia em conteudo sobre Seguranca da Informacao',
              'Ajudar profissionais a conquistarem certificacoes',
              'Promover o crescimento de carreira em tecnologia',
            ].map((obj, i) => (
              <Card key={i} delay={i * 0.05} className="flex items-center gap-3">
                <FiCheckCircle className="h-5 w-5 text-iam-blue flex-shrink-0" />
                <span className="text-iam-gray text-sm">{obj}</span>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
