import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom' 
import { motion, AnimatePresence } from 'framer-motion' 
import axios from 'axios' 
import api from './api'  
import Tilt from 'react-parallax-tilt'
import LoginPage from './LoginPage' 
import './App.css' 
import cloudsBg from './assets/anime-clouds.jpg'      
import cityBg from './assets/cyberpunk-city.jpg'      
import animeCardBg from './assets/anime-card.jpg'     
import movieCardBg from './assets/movie-card.jpg'     
import animeHeaderBg from './assets/anime-header.jpg' 
import movieHeaderBg from './assets/movie-header.jpg'
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('access_token')
  return token ? children : <Navigate to="/login" />
}

const HeartIcon = ({ filled, onClick }) => (
  <svg 
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill={filled ? "#e74c3c" : "none"} 
    stroke={filled ? "#e74c3c" : "currentColor"} 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    style={{ width: '24px', height: '24px', cursor: 'pointer', transition: '0.2s transform' }}
    onMouseOver={(e) => e.target.style.transform = 'scale(1.2)'}
    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
)

function LandingPage() {
  const navigate = useNavigate()
  const isLoggedIn = !!localStorage.getItem('access_token')

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    navigate('/login') 
  }

  return (
    <div className="snap-container">
      <div style={{ position: 'fixed', top: 30, right: 30, zIndex: 100 }}>
        {isLoggedIn ? (
          <button onClick={handleLogout} style={{ padding: '10px 25px', background: 'rgba(231, 76, 60, 0.8)', color: 'white', border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', backdropFilter: 'blur(5px)' }}>LOGOUT</button>
        ) : (
          <Link to="/login" style={{ padding: '10px 25px', background: '#00f2ff', color: 'black', textDecoration: 'none', borderRadius: '30px', fontWeight: 'bold', boxShadow: '0 0 15px rgba(0, 242, 255, 0.5)' }}>LOGIN</Link>
        )}
      </div>

      <section className="snap-section">
        <motion.div 
          initial={{ scale: 1 }} animate={{ scale: 1.1 }} transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `url(${cloudsBg})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }}
        />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.2)', zIndex: 1 }}></div>
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }} style={{ zIndex: 2, textAlign: 'center' }}>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 2 }} style={{ fontFamily: "'Great Vibes', cursive", fontSize: '3.5rem', color: '#fff', margin: 0, textShadow: '0 0 10px rgba(255,255,255,0.5)' }}></motion.p>
          <h1 style={{ fontFamily: "'Great Vibes', cursive", fontSize: 'clamp(4rem, 10vw, 8rem)', letterSpacing: '10px', margin: '-10px 0 0 0', textShadow: '0 10px 30px rgba(0,0,0,0.5)', lineHeight: 1 }}>MyListIt</h1>
          <p style={{ fontSize: '1.2rem', letterSpacing: '5px', marginTop: '10px', opacity: 0.9, fontFamily: 'Montserrat', textTransform: 'uppercase' }}>Seu mundo de filmes e animes aqui.</p>
        </motion.div>
      </section>

      <section className="snap-section" style={{background: '#000'}}>
        <motion.div initial={{ scale: 1.1 }} animate={{ scale: 1.0 }} transition={{ duration: 25, repeat: Infinity, repeatType: "reverse", ease: "linear" }} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `url(${cityBg})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to right, rgba(10, 0, 20, 0.9), rgba(10, 0, 20, 0.4))', zIndex: 1 }}></div>
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', maxWidth: '1200px', width: '90%', justifyContent: 'space-between', alignItems: 'center', gap: '50px', flexWrap: 'wrap' }}>
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} style={{ flex: 1, minWidth: '300px' }}>
            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '4rem', margin: 0, lineHeight: 1, color: 'white', textShadow: '0 0 20px rgba(255, 0, 128, 0.8)' }}>MINHA LISTA<br/><span style={{ color: '#00f2ff' }}>(2025)</span></h2>
            <p style={{ marginTop: '30px', fontFamily: 'Montserrat', fontSize: '1.1rem', lineHeight: '1.8', color: '#e0e0e0', borderLeft: '4px solid #00f2ff', paddingLeft: '20px' }}>Crie sua lista completa, compartilhe e avalie seus filmes e animes preferidos<br/><br/>Busca de resultados reais, completos e enormes com API e filmes REAIS.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} style={{ flex: 0.8, minWidth: '300px' }}>
             <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable={true} glareMaxOpacity={0.5}>
                <img src="https://image.tmdb.org/t/p/original/q719jXXEzOoYaps6babgKnONONX.jpg" style={{ width: '100%', borderRadius: '15px', boxShadow: '0 0 30px rgba(0, 242, 255, 0.3)', border: '1px solid rgba(255,255,255,0.1)' }} />
             </Tilt>
          </motion.div>
        </div>
      </section>

      <section className="snap-section" style={{ background: '#0a0a0a' }}>
        <div style={{ textAlign: 'center' }}>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} style={{ fontSize: '2rem', marginBottom: '50px', letterSpacing: '3px', color: 'white' }}>ESCOLHA SEU MUNDO</motion.h2>
          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/animes" style={{ textDecoration: 'none' }}>
              <motion.div whileHover={{ scale: 1.05, border: '2px solid #a29bfe' }} style={{ width: '300px', height: '400px', backgroundImage: `url(${animeCardBg})`, backgroundSize: 'cover', borderRadius: '15px', display: 'flex', alignItems: 'flex-end', padding: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', border: '2px solid transparent' }}>
                <h3 style={{ color: 'white', fontSize: '2rem', fontFamily: 'Oswald', textShadow: '0 2px 10px black' }}>ANIMES</h3>
              </motion.div>
            </Link>
            <Link to="/filmes" style={{ textDecoration: 'none' }}>
              <motion.div whileHover={{ scale: 1.05, border: '2px solid #f1c40f' }} style={{ width: '300px', height: '400px', backgroundImage: `url(${movieCardBg})`, backgroundSize: 'cover', borderRadius: '15px', display: 'flex', alignItems: 'flex-end', padding: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', border: '2px solid transparent' }}>
                <h3 style={{ color: 'white', fontSize: '2rem', fontFamily: 'Oswald', textShadow: '0 2px 10px black' }}>FILMES</h3>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function AnimePage() {
  const [animes, setAnimes] = useState([])
  const [busca, setBusca] = useState('')
  const [resultados, setResultados] = useState([])
  const navigate = useNavigate()

  useEffect(() => { fetchMinhaLista() }, [])
  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    navigate('/login')
  }

  const fetchMinhaLista = async () => {
    try {
      const response = await api.get('animes/') 
      setAnimes(response.data)
    } catch (error) { console.error(error) }
  }

  const pesquisarAnime = async () => {
    if (!busca) return
    const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${busca}`)
    setResultados(response.data.data) 
  }

  const salvarAnime = async (item) => {
    await api.post('animes/', {
      titulo: item.title, api_id: item.mal_id, capa_url: item.images.jpg.image_url, nota_pessoal: 10, comentario: "Via App"
    })
    alert("Anime adicionado!")
    fetchMinhaLista()
    setResultados([]) 
    setBusca('') 
  }

  const deletarAnime = async (id) => {
    if(confirm("Remover dos favoritos?")) {
      await api.delete(`animes/${id}/`)
      fetchMinhaLista()
    }
  }

  const atualizarNota = async (item, novaNota) => {
    await api.patch(`animes/${item.id}/`, { nota_pessoal: novaNota })
    fetchMinhaLista()
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: '#120a21', minHeight: '100vh', fontFamily: 'Montserrat', color: 'white' }}>
      <div style={{ height: '40vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `url(${animeHeaderBg})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.6)', backgroundAttachment: 'fixed' }}></div>
        <div style={{ zIndex: 2, textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Oswald', fontSize: '5rem', letterSpacing: '10px', textShadow: '0 0 20px #a29bfe' }}>ANIME LIST</h1>
        </div>
        <div style={{ position: 'absolute', top: '30px', right: '30px', zIndex: 10, display: 'flex', gap: '15px' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white', border: '1px solid rgba(255,255,255,0.3)', padding: '10px 20px', borderRadius: '30px', backdropFilter: 'blur(5px)', fontWeight: 'bold' }}>
            HOME
          </Link>
          <button onClick={handleLogout} style={{ textDecoration: 'none', color: 'white', background: 'rgba(231, 76, 60, 0.7)', border: 'none', padding: '10px 20px', borderRadius: '30px', backdropFilter: 'blur(5px)', fontWeight: 'bold', cursor: 'pointer' }}>
            LOGOUT
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '-50px auto 0', position: 'relative', zIndex: 3, padding: '0 20px' }}>
        
        <div style={{ background: 'rgba(20, 10, 30, 0.8)', padding: '30px', borderRadius: '20px', backdropFilter: 'blur(20px)', border: '1px solid rgba(162, 155, 254, 0.2)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
          <div style={{ display: 'flex', gap: '15px' }}>
            <input 
              placeholder="Busque seu próximo anime..." 
              value={busca} onChange={e => setBusca(e.target.value)}
              style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid #a29bfe', color: 'white', fontSize: '1.2rem', padding: '15px', borderRadius: '10px', outline: 'none' }}
            />
            <button onClick={pesquisarAnime} style={{ padding: '0 40px', background: '#6c5ce7', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase' }}>Buscar</button>
          </div>
          {resultados.length > 0 && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} style={{ display: 'flex', gap: '20px', overflowX: 'auto', marginTop: '30px', paddingBottom: '20px' }}>
              {resultados.map(item => (
                <div key={item.mal_id} style={{ minWidth: '140px', cursor: 'pointer', position: 'relative' }} onClick={() => salvarAnime(item)}>
                  <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: '0.2s', borderRadius: '10px'}} className="hover-overlay">
                    <span style={{fontSize: '2rem'}}>+</span>
                  </div>
                  <img src={item.images.jpg.image_url} style={{ width: '140px', height: '200px', objectFit: 'cover', borderRadius: '10px' }} />
                  <p style={{ fontSize: '0.8rem', marginTop: '5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</p>
                </div>
              ))}
            </motion.div>
          )}
        </div>
        <div style={{ marginTop: '50px', marginBottom: '50px' }}>
          <h2 style={{ fontFamily: 'Oswald', fontSize: '2rem', marginBottom: '30px', borderLeft: '5px solid #a29bfe', paddingLeft: '15px' }}>MINHA COLEÇÃO <span style={{opacity: 0.5}}>({animes.length})</span></h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '30px' }}>
            {animes.map(anime => (
              <Tilt key={anime.id} scale={1.02} transitionSpeed={2500}>
                <div style={{ background: '#1e162e', borderRadius: '15px', overflow: 'hidden', position: 'relative', boxShadow: '0 10px 20px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  
                  <div style={{ position: 'relative' }}>
                    {anime.capa_url && <img src={anime.capa_url} style={{ width: '100%', height: '280px', objectFit: 'cover' }} />}
                    <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', borderRadius: '50%', padding: '8px', backdropFilter: 'blur(5px)' }}>
                      <HeartIcon filled={true} onClick={() => deletarAnime(anime.id)} />
                    </div>
                  </div>

                  <div style={{ padding: '15px' }}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#fff' }}>{anime.titulo}</h3>
                    
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#2d243e', borderRadius: '8px', padding: '5px 10px' }}>
                      <span style={{ fontSize: '0.8rem', color: '#aaa' }}>Nota:</span>
                      <select 
                        value={anime.nota_pessoal} 
                        onChange={e => atualizarNota(anime, e.target.value)} 
                        style={{ background: 'transparent', color: '#a29bfe', border: 'none', fontWeight: 'bold', cursor: 'pointer', outline: 'none' }}
                      >
                        {[10,9,8,7,6,5,4,3,2,1].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                      <span style={{color:'#f1c40f'}}>★</span>
                    </div>
                  </div>
                </div>
              </Tilt>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  )
}

function MoviePage() {
  const [filmes, setFilmes] = useState([])
  const [busca, setBusca] = useState('')
  const [resultados, setResultados] = useState([])
  const navigate = useNavigate()
  const TMDB_API_KEY = "87897d6f6b9574dec01a9e050477f47d"

  useEffect(() => { fetchMinhaLista() }, [])
  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    navigate('/login')
  }

  const fetchMinhaLista = async () => {
    const response = await api.get('filmes/')
    setFilmes(response.data)
  }

  const pesquisarFilme = async () => {
    if (!busca) return
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${busca}&language=pt-BR`)
    setResultados(response.data.results)
  }

  const salvarFilme = async (item) => {
    const capa = item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null
    await api.post('filmes/', {
      titulo: item.title, api_id: item.id, capa_url: capa, nota_pessoal: 10, comentario: item.overview
    })
    alert("Filme adicionado!")
    fetchMinhaLista()
    setResultados([])
    setBusca('')
  }

  const deletarFilme = async (id) => {
    if(confirm("Remover dos favoritos?")) {
      await api.delete(`filmes/${id}/`)
      fetchMinhaLista()
    }
  }

  const atualizarNota = async (item, novaNota) => {
    await api.patch(`filmes/${item.id}/`, { nota_pessoal: novaNota })
    fetchMinhaLista()
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: '#0f0f0f', minHeight: '100vh', fontFamily: 'Montserrat', color: 'white' }}>
      
      <div style={{ height: '40vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `url(${movieHeaderBg})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.6)', backgroundAttachment: 'fixed' }}></div>
        <div style={{ zIndex: 2, textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Oswald', fontSize: '5rem', letterSpacing: '10px', textShadow: '0 0 20px #d35400' }}>CINEMA LIST</h1>
        </div>
        <div style={{ position: 'absolute', top: '30px', right: '30px', zIndex: 10, display: 'flex', gap: '15px' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white', border: '1px solid rgba(255,255,255,0.3)', padding: '10px 20px', borderRadius: '30px', backdropFilter: 'blur(5px)', fontWeight: 'bold' }}>
            HOME
          </Link>
          <button onClick={handleLogout} style={{ textDecoration: 'none', color: 'white', background: 'rgba(231, 76, 60, 0.7)', border: 'none', padding: '10px 20px', borderRadius: '30px', backdropFilter: 'blur(5px)', fontWeight: 'bold', cursor: 'pointer' }}>
            LOGOUT
          </button>
        </div>
      </div>
      <div style={{ maxWidth: '1200px', margin: '-50px auto 0', position: 'relative', zIndex: 3, padding: '0 20px' }}>
        
        <div style={{ background: 'rgba(20, 10, 0, 0.8)', padding: '30px', borderRadius: '20px', backdropFilter: 'blur(20px)', border: '1px solid rgba(211, 84, 0, 0.2)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
          <div style={{ display: 'flex', gap: '15px' }}>
            <input 
              placeholder="Qual filme vamos assistir hoje?" 
              value={busca} onChange={e => setBusca(e.target.value)}
              style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid #d35400', color: 'white', fontSize: '1.2rem', padding: '15px', borderRadius: '10px', outline: 'none' }}
            />
            <button onClick={pesquisarFilme} style={{ padding: '0 40px', background: '#d35400', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase' }}>Buscar</button>
          </div>
          {resultados.length > 0 && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} style={{ display: 'flex', gap: '20px', overflowX: 'auto', marginTop: '30px', paddingBottom: '20px' }}>
              {resultados.map(item => (
                <div key={item.id} style={{ minWidth: '140px', cursor: 'pointer', position: 'relative' }} onClick={() => salvarFilme(item)}>
                  <img src={item.poster_path ? `https://image.tmdb.org/t/p/w200${item.poster_path}` : 'https://via.placeholder.com/200x300'} style={{ width: '140px', height: '200px', objectFit: 'cover', borderRadius: '10px' }} />
                  <p style={{ fontSize: '0.8rem', marginTop: '5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</p>
                </div>
              ))}
            </motion.div>
          )}
        </div>
        <div style={{ marginTop: '50px', marginBottom: '50px' }}>
          <h2 style={{ fontFamily: 'Oswald', fontSize: '2rem', marginBottom: '30px', borderLeft: '5px solid #d35400', paddingLeft: '15px' }}>MINHA COLEÇÃO <span style={{opacity: 0.5}}>({filmes.length})</span></h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '30px' }}>
            {filmes.map(filme => (
              <Tilt key={filme.id} scale={1.02} transitionSpeed={2500}>
                <div style={{ background: '#1a1a1a', borderRadius: '15px', overflow: 'hidden', position: 'relative', boxShadow: '0 10px 20px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  
                  <div style={{ position: 'relative' }}>
                    {filme.capa_url && <img src={filme.capa_url} style={{ width: '100%', height: '280px', objectFit: 'cover' }} />}
                    <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', borderRadius: '50%', padding: '8px', backdropFilter: 'blur(5px)' }}>
                      <HeartIcon filled={true} onClick={() => deletarFilme(filme.id)} />
                    </div>
                  </div>

                  <div style={{ padding: '15px' }}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#f1c40f' }}>{filme.titulo}</h3>
                    
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#333', borderRadius: '8px', padding: '5px 10px' }}>
                      <span style={{ fontSize: '0.8rem', color: '#aaa' }}>Nota:</span>
                      <select 
                        value={filme.nota_pessoal} 
                        onChange={e => atualizarNota(filme, e.target.value)} 
                        style={{ background: 'transparent', color: '#f1c40f', border: 'none', fontWeight: 'bold', cursor: 'pointer', outline: 'none' }}
                      >
                        {[10,9,8,7,6,5,4,3,2,1].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                      <span style={{color:'#f1c40f'}}>★</span>
                    </div>
                  </div>
                </div>
              </Tilt>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/animes" element={
        <PrivateRoute>
          <AnimePage />
        </PrivateRoute>
      } />
      
      <Route path="/filmes" element={
        <PrivateRoute>
          <MoviePage />
        </PrivateRoute>
      } />
    </Routes>
  )
}

export default App