import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ParticlesBackground from './components/ParticlesBackground'
import Home from './pages/Home'
import Sobre from './pages/Sobre'
import Blog from './pages/Blog'
import Cursos from './pages/Cursos'
import Ebooks from './pages/Ebooks'
import Downloads from './pages/Downloads'
import Youtube from './pages/Youtube'
import RedesSociais from './pages/RedesSociais'
import Loja from './pages/Loja'
import Contato from './pages/Contato'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <HelmetProvider>
      <Router basename="/universo-iam">
        <ScrollToTop />
        <Helmet>
          <title>Universo IAM - Segurança da Informação e Tecnologia</title>
          <meta name="description" content="Seu Portal Completo de Segurança da Informação, IAM, PAM, IGA, Cloud Security e Carreira em Tecnologia" />
          <meta property="og:title" content="Universo IAM" />
          <meta property="og:description" content="Portal de Segurança da Informação e Tecnologia" />
          <meta property="og:type" content="website" />
        </Helmet>
        <div className="relative min-h-screen bg-iam-dark">
          <ParticlesBackground />
          <Navbar />
          <main className="relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/cursos" element={<Cursos />} />
              <Route path="/ebooks" element={<Ebooks />} />
              <Route path="/downloads" element={<Downloads />} />
              <Route path="/youtube" element={<Youtube />} />
              <Route path="/redes-sociais" element={<RedesSociais />} />
              <Route path="/loja" element={<Loja />} />
              <Route path="/contato" element={<Contato />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  )
}

export default App
