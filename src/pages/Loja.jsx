import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiShoppingCart, FiX, FiPlus, FiMinus, FiTrash2, FiCreditCard } from 'react-icons/fi'
import SectionTitle from '../components/SectionTitle'
import Card from '../components/Card'

const products = [
  { id: 1, name: 'Guia Completo de IAM', type: 'E-book', price: 49.90, image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop' },
  { id: 2, name: 'Curso Microsoft Entra ID', type: 'Curso', price: 199.90, image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=400&fit=crop' },
  { id: 3, name: 'Pack de Templates IAM', type: 'Templates', price: 29.90, image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=300&h=400&fit=crop' },
  { id: 4, name: 'Curso PAM Avancado', type: 'Curso', price: 179.90, image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=300&h=400&fit=crop' },
  { id: 5, name: 'E-book Cloud Security', type: 'E-book', price: 39.90, image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=400&fit=crop' },
  { id: 6, name: 'Pack Certificacoes TI', type: 'Pack de estudo', price: 89.90, image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=400&fit=crop' },
]

export default function Loja() {
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)

  const addToCart = (product) => {
    const existing = cart.find(c => c.id === product.id)
    if (existing) {
      setCart(cart.map(c => c.id === product.id ? { ...c, qty: c.qty + 1 } : c))
    } else {
      setCart([...cart, { ...product, qty: 1 }])
    }
  }

  const removeFromCart = (id) => {
    setCart(cart.filter(c => c.id !== id))
  }

  const updateQty = (id, delta) => {
    setCart(cart.map(c => {
      if (c.id === id) {
        const newQty = c.qty + delta
        return newQty > 0 ? { ...c, qty: newQty } : c
      }
      return c
    }).filter(c => c.qty > 0))
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <div className="min-h-screen pt-24">
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-iam-blue/10 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-montserrat font-black text-4xl md:text-6xl text-white mb-4">
            <span className="text-gradient">Loja Digital</span>
          </motion.h1>
          <p className="text-iam-gray text-lg">Produtos digitais para impulsionar sua carreira</p>
          <button onClick={() => setShowCart(true)} className="mt-6 inline-flex items-center gap-2 px-6 py-3 glass border-glow rounded-xl text-iam-blue font-semibold hover:bg-iam-blue/10 transition-all relative">
            <FiShoppingCart className="h-5 w-5" />
            Carrinho
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-iam-blue text-white rounded-full text-xs font-bold flex items-center justify-center">
                {cart.reduce((sum, c) => sum + c.qty, 0)}
              </span>
            )}
          </button>
        </div>
      </section>

      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <Card key={product.id} delay={i * 0.1} className="overflow-hidden text-center">
                <div className="relative h-56 rounded-xl overflow-hidden mb-4 mx-auto max-w-[200px]">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 px-3 py-1 bg-iam-blue/90 rounded-full text-xs font-semibold text-white">{product.type}</div>
                </div>
                <h3 className="font-montserrat font-bold text-white mb-2">{product.name}</h3>
                <p className="text-iam-blue font-bold text-2xl mb-4">R$ {product.price.toFixed(2)}</p>
                <button onClick={() => addToCart(product)} className="w-full py-3 bg-iam-blue text-white rounded-xl font-semibold hover:shadow-neon transition-all flex items-center justify-center gap-2">
                  <FiShoppingCart className="h-4 w-4" /> Adicionar ao Carrinho
                </button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {showCart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-lg glass-strong rounded-2xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-montserrat font-bold text-xl text-white">Carrinho</h3>
              <button onClick={() => setShowCart(false)} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                <FiX className="h-5 w-5 text-white" />
              </button>
            </div>
            {cart.length === 0 ? (
              <p className="text-iam-gray text-center py-8">Seu carrinho esta vazio</p>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-3 glass rounded-xl">
                      <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white text-sm font-semibold truncate">{item.name}</h4>
                        <p className="text-iam-blue text-sm">R$ {(item.price * item.qty).toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 glass rounded-lg flex items-center justify-center text-white hover:bg-white/10">
                          <FiMinus className="h-3 w-3" />
                        </button>
                        <span className="text-white text-sm w-6 text-center">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 glass rounded-lg flex items-center justify-center text-white hover:bg-white/10">
                          <FiPlus className="h-3 w-3" />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/10 pt-4 mb-4">
                  <div className="flex justify-between text-lg">
                    <span className="text-white font-semibold">Total:</span>
                    <span className="text-iam-blue font-bold">R$ {total.toFixed(2)}</span>
                  </div>
                </div>
                <button className="w-full py-3 bg-iam-blue text-white rounded-xl font-semibold hover:shadow-neon transition-all flex items-center justify-center gap-2">
                  <FiCreditCard className="h-5 w-5" /> Finalizar Compra
                </button>
              </>
            )}
          </motion.div>
        </div>
      )}
    </div>
  )
}
