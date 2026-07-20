import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiDownload, FiShoppingCart, FiEye, FiStar, FiBook } from 'react-icons/fi'
import SectionTitle from '../components/SectionTitle'
import Card from '../components/Card'

const categories = ['Todos', 'IAM', 'Cloud Security', 'PAM', 'Cybersecurity', 'Carreira']

const allEbooks = [
  { title: 'Guia Completo de IAM', desc: 'Tudo voce precisa saber sobre Identity and Access Management.', price: 'R$ 49,90', oldPrice: 'R$ 79,90', category: 'IAM', pages: 220, rating: 4.9, image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop' },
  { title: 'Seguranca em Cloud', desc: 'Melhores praticas de seguranca para ambientes AWS, Azure e GCP.', price: 'R$ 39,90', oldPrice: 'R$ 69,90', category: 'Cloud Security', pages: 180, rating: 4.8, image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=400&fit=crop' },
  { title: 'PAM na Pratica', desc: 'Implementacao e gestao de Gerenciamento de Acessos Privilegiados.', price: 'R$ 44,90', oldPrice: 'R$ 74,90', category: 'PAM', pages: 195, rating: 4.7, image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=300&h=400&fit=crop' },
  { title: 'Microsoft Entra ID Bible', desc: 'O guia definitivo do Microsoft Entra ID.', price: 'R$ 59,90', oldPrice: 'R$ 99,90', category: 'IAM', pages: 310, rating: 4.9, image: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=300&h=400&fit=crop' },
  { title: 'Carreira em TI', desc: 'Estrategias para construir uma carreira de sucesso em tecnologia.', price: 'R$ 29,90', oldPrice: 'R$ 49,90', category: 'Carreira', pages: 150, rating: 4.8, image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=400&fit=crop' },
  { title: 'Cybersecurity Handbook', desc: 'Manual completo de Seguranca Cibernetica.', price: 'R$ 54,90', oldPrice: 'R$ 89,90', category: 'Cybersecurity', pages: 280, rating: 4.9, image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300&h=400&fit=crop' },
]

export default function Ebooks() {
  const [filter, setFilter] = useState('Todos')
  const [cart, setCart] = useState([])

  const filtered = allEbooks.filter(e => filter === 'Todos' || e.category === filter)

  const addToCart = (ebook) => {
    if (!cart.find(c => c.title === ebook.title)) {
      setCart([...cart, ebook])
    }
  }

  return (
    <div className="min-h-screen pt-24">
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-iam-blue/10 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-montserrat font-black text-4xl md:text-6xl text-white mb-4">
            <span className="text-gradient">E-books</span>
          </motion.h1>
          <p className="text-iam-gray text-lg">Material exclusivo para acelerar seu aprendizado</p>
          {cart.length > 0 && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 glass rounded-full border-iam-blue/30">
              <FiShoppingCart className="h-4 w-4 text-iam-blue" />
              <span className="text-white text-sm">{cart.length} item(ns) no carrinho</span>
            </div>
          )}
        </div>
      </section>

      <section className="pb-8 px-4 sm:px-6 lg:px-8">
        <div className="flex gap-2 justify-center flex-wrap">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === cat ? 'bg-iam-blue text-white' : 'glass text-iam-gray hover:text-white'}`}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((ebook, i) => (
              <Card key={i} delay={i * 0.1} className="overflow-hidden group">
                <div className="relative h-64 rounded-xl overflow-hidden mb-4 mx-auto max-w-[220px]">
                  <img src={ebook.image} alt={ebook.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center gap-2 text-xs text-white/80">
                      <FiBook className="h-3 w-3" /> {ebook.pages} paginas
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 flex gap-1">
                    <span className="px-2 py-1 bg-iam-blue/90 rounded-full text-xs font-semibold text-white">{ebook.category}</span>
                  </div>
                </div>
                <h3 className="font-montserrat font-bold text-white text-lg mb-2 text-center">{ebook.title}</h3>
                <p className="text-iam-gray text-sm mb-3 text-center line-clamp-2">{ebook.desc}</p>
                <div className="flex items-center justify-center gap-1 mb-3">
                  <FiStar className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-white font-semibold text-sm">{ebook.rating}</span>
                </div>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="text-iam-gray line-through text-sm">{ebook.oldPrice}</span>
                  <span className="text-iam-blue font-bold text-2xl">{ebook.price}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => addToCart(ebook)} className="flex-1 py-3 bg-iam-blue text-white rounded-xl font-semibold hover:shadow-neon transition-all flex items-center justify-center gap-2">
                    <FiShoppingCart className="h-4 w-4" /> Comprar
                  </button>
                  <button className="px-4 py-3 glass border-glow rounded-xl text-iam-blue hover:bg-iam-blue/10 transition-all">
                    <FiEye className="h-4 w-4" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center p-10 bg-gradient-to-br from-iam-blue/10 to-transparent border-iam-blue/20">
            <FiDownload className="h-12 w-12 text-iam-blue mx-auto mb-4" />
            <h3 className="font-montserrat font-bold text-2xl text-white mb-2">Download Gratuito</h3>
            <p className="text-iam-gray mb-6">Acesse nossa biblioteca de materiais gratuitos</p>
            <a href="/downloads" className="inline-flex items-center gap-2 px-6 py-3 glass border-glow rounded-xl text-iam-blue font-semibold hover:bg-iam-blue/10 transition-all">
              <FiDownload className="h-4 w-4" /> Ver Downloads
            </a>
          </Card>
        </div>
      </section>
    </div>
  )
}
