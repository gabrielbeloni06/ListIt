import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { motion } from 'framer-motion' 
import axios from 'axios'
import Tilt from 'react-parallax-tilt'
import './App.css' 
import cloudsBg from './assets/anime-clouds.jpg'
import cityBg from './assets/cyberpunk-city.jpg'
import animeCardBg from './assets/anime-card.jpg'
import movieCardBg from './assets/movie-card.jpg'
function LandingPage() {
  return (
    <div className="snap-container">
      <section className="snap-section">
        <motion.div 
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            backgroundImage: `url(${cloudsBg})`,
            backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0
          }}
        />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.2)', zIndex: 1 }}></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }}
          style={{ zIndex: 2, textAlign: 'center', position: 'relative' }}
        >
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 2 }}
            style={{ fontFamily: "'Great Vibes', cursive", fontSize: '3.5rem', color: '#fff', margin: 0, textShadow: '0 0 10px rgba(255,255,255,0.5)' }}
          >
            
          </motion.p>
          <h1 style={{ fontFamily: "'Great Vibes', cursive", fontSize: 'clamp(4rem, 10vw, 8rem)', letterSpacing: '10px', margin: '-10px 0 0 0', textShadow: '0 10px 30px rgba(0,0,0,0.5)', lineHeight: 1 }}>
            ListIt
          </h1>
          <p style={{ fontSize: '1.2rem', letterSpacing: '5px', marginTop: '10px', opacity: 0.9, fontFamily: 'Montserrat', textTransform: 'uppercase' }}>
            Gerencie os seus filmes e animes favoritos.
          </p>
        </motion.div>
      </section>
      <section className="snap-section" style={{background: '#000'}}>
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1.0 }} 
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            backgroundImage: `url(${cityBg})`,
            backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0
          }}
        />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to right, rgba(10, 0, 20, 0.9), rgba(10, 0, 20, 0.4))', zIndex: 1 }}></div>

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', maxWidth: '1200px', width: '90%', justifyContent: 'space-between', alignItems: 'center', gap: '50px', flexWrap: 'wrap' }}>
          
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} style={{ flex: 1, minWidth: '300px' }}>
            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '4rem', margin: 0, lineHeight: 1, color: 'white', textShadow: '0 0 20px rgba(255, 0, 128, 0.8)' }}>
              Minha Lista<br/><span style={{ color: '#00f2ff' }}>(2025)</span>
            </h2>
            <p style={{ marginTop: '30px', fontFamily: 'Montserrat', fontSize: '1.1rem', lineHeight: '1.8', color: '#e0e0e0', borderLeft: '4px solid #00f2ff', paddingLeft: '20px' }}>
              Um mundo todo de animes e filmes dentro de um site.
              <br/><br/>
              Favorite, avalie e compartilhe seus filmes e animes preferidos. 
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} style={{ flex: 0.8, minWidth: '300px' }}>
             <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable={true} glareMaxOpacity={0.5}>
                <img 
                  src="https://image.tmdb.org/t/p/original/q719jXXEzOoYaps6babgKnONONX.jpg" 
                  alt="Your Name Poster"
                  style={{ width: '100%', borderRadius: '15px', boxShadow: '0 0 30px rgba(0, 242, 255, 0.3)', border: '1px solid rgba(255,255,255,0.1)' }} 
                />
             </Tilt>
          </motion.div>
        </div>
      </section>
      <section className="snap-section" style={{ background: '#0a0a0a' }}>
        <div style={{ textAlign: 'center' }}>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} style={{ fontSize: '2rem', marginBottom: '50px', letterSpacing: '3px', color: 'white' }}>
            ESCOLHA O SEU MUNDO
          </motion.h2>
          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
            
            <Link to="/animes" style={{ textDecoration: 'none' }}>
              <motion.div whileHover={{ scale: 1.05, border: '2px solid #a29bfe' }} style={{ 
                width: '300px', height: '400px', 
                backgroundImage: `url(${animeCardBg})`,
                backgroundSize: 'cover', borderRadius: '15px', display: 'flex', alignItems: 'flex-end', padding: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', border: '2px solid transparent'
              }}>
                <h3 style={{ color: 'white', fontSize: '2rem', fontFamily: 'Oswald', textShadow: '0 2px 10px black' }}>ANIMES</h3>
              </motion.div>
            </Link>

            <Link to="/filmes" style={{ textDecoration: 'none' }}>
              <motion.div whileHover={{ scale: 1.05, border: '2px solid #f1c40f' }} style={{ 
                width: '300px', height: '400px', 
                backgroundImage: `url(${movieCardBg})`,
                backgroundSize: 'cover', borderRadius: '15px', display: 'flex', alignItems: 'flex-end', padding: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', border: '2px solid transparent'
              }}>
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

  useEffect(() => { fetchMinhaLista() }, [])

  const fetchMinhaLista = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/animes/')
      setAnimes(response.data)
    } catch (error) { console.error(error) }
  }

  const pesquisarAnime = async () => {
    if (!busca) return
    try {
      const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${busca}`)
      setResultados(response.data.data) 
    } catch (error) { console.error(error) }
  }

  const salvarAnime = async (animeExterno) => {
    try {
      await axios.post('http://127.0.0.1:8000/api/animes/', {
        titulo: animeExterno.title,
        api_id: animeExterno.mal_id,
        capa_url: animeExterno.images.jpg.image_url,
        nota_pessoal: 10,
        comentario: "Adicionado via busca"
      })
      alert(`Sucesso! ${animeExterno.title} foi salvo.`)
      fetchMinhaLista()
    } catch (error) { alert("Erro! Provavelmente você já adicionou esse anime.") }
  }

  const deletarAnime = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/animes/${id}/`)
    fetchMinhaLista()
  }

  const atualizarNota = async (anime, novaNota) => {
    await axios.patch(`http://127.0.0.1:8000/api/animes/${anime.id}/`, { nota_pessoal: novaNota })
    fetchMinhaLista()
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: '#120a21', minHeight: '100vh', padding: '40px', fontFamily: 'Montserrat' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontFamily: 'Oswald', color: '#a29bfe', fontSize: '3rem' }}>ANIME ARCHIVE</h1>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', border: '1px solid #fff', padding: '10px 20px', borderRadius: '30px' }}>Back Home</Link>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '30px', borderRadius: '20px', backdropFilter: 'blur(10px)', border: '1px solid rgba(162, 155, 254, 0.2)' }}>
        <div style={{ display: 'flex', gap: '20px' }}>
          <input 
            placeholder="Search new anime..." 
            value={busca} onChange={e => setBusca(e.target.value)}
            style={{ flex: 1, background: 'transparent', border: 'none', borderBottom: '2px solid #a29bfe', color: 'white', fontSize: '1.5rem', padding: '10px', outline: 'none' }}
          />
          <button onClick={pesquisarAnime} style={{ padding: '15px 40px', background: '#6c5ce7', color: 'white', border: 'none', borderRadius: '50px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}>SEARCH</button>
        </div>
        
        <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', marginTop: '30px', paddingBottom: '10px' }}>
          {resultados.map(item => (
            <div key={item.mal_id} style={{ minWidth: '150px', cursor: 'pointer' }} onClick={() => salvarAnime(item)}>
              <img src={item.images.jpg.image_url} style={{ width: '150px', height: '220px', objectFit: 'cover', borderRadius: '10px' }} />
              <p style={{ color: '#ccc', fontSize: '0.9rem', marginTop: '10px' }}>+ Add to Library</p>
            </div>
          ))}
        </div>
      </div>

      <h2 style={{ marginTop: '60px', color: '#fff', letterSpacing: '2px' }}>MY COLLECTION ({animes.length})</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '30px', marginTop: '20px' }}>
        {animes.map(anime => (
          <Tilt key={anime.id} scale={1.05}>
            <div style={{ background: '#1e162e', borderRadius: '15px', overflow: 'hidden', position: 'relative', boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}>
              <button onClick={() => deletarAnime(anime.id)} style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.7)', color: 'red', border: 'none', borderRadius: '50%', width: 30, height: 30, cursor: 'pointer' }}>X</button>
              {anime.capa_url && <img src={anime.capa_url} style={{ width: '100%', height: '280px', objectFit: 'cover' }} />}
              <div style={{ padding: '15px' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{anime.titulo}</h3>
                <select value={anime.nota_pessoal} onChange={e => atualizarNota(anime, e.target.value)} style={{ width: '100%', background: '#2d243e', color: '#a29bfe', border: 'none', padding: '8px', borderRadius: '5px' }}>
                  {[10,9,8,7,6,5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                </select>
              </div>
            </div>
          </Tilt>
        ))}
      </div>
    </motion.div>
  )
}

function MoviePage() {
  const [filmes, setFilmes] = useState([])
  const [buscaFilme, setBuscaFilme] = useState('')
  const [resultadosFilmes, setResultadosFilmes] = useState([])
  const TMDB_API_KEY = "87897d6f6b9574dec01a9e050477f47d"

  useEffect(() => { fetchMinhaLista() }, [])

  const fetchMinhaLista = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/filmes/')
      setFilmes(response.data)
    } catch (error) { console.error(error) }
  }

  const pesquisarFilme = async () => {
    if (!buscaFilme) return
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${buscaFilme}&language=pt-BR`)
      setResultadosFilmes(response.data.results)
    } catch (error) { console.error(error) }
  }

  const salvarFilme = async (filmeExterno) => {
    try {
      const capaCompleta = filmeExterno.poster_path ? `https://image.tmdb.org/t/p/w500${filmeExterno.poster_path}` : null
      await axios.post('http://127.0.0.1:8000/api/filmes/', {
        titulo: filmeExterno.title, api_id: filmeExterno.id, capa_url: capaCompleta, nota_pessoal: 10, comentario: filmeExterno.overview
      })
      alert(`Filme ${filmeExterno.title} salvo!`)
      fetchMinhaLista()
    } catch (error) { alert("Erro! Provavelmente já está na lista.") }
  }

  const deletarFilme = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/filmes/${id}/`)
    fetchMinhaLista()
  }

  const atualizarNotaFilme = async (filme, novaNota) => {
    await axios.patch(`http://127.0.0.1:8000/api/filmes/${filme.id}/`, { nota_pessoal: novaNota })
    fetchMinhaLista()
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: '#0f0f0f', minHeight: '100vh', padding: '40px', fontFamily: 'Montserrat' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontFamily: 'Oswald', color: '#f1c40f', fontSize: '3rem' }}>CINEMA VAULT</h1>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', border: '1px solid #fff', padding: '10px 20px', borderRadius: '30px' }}>Back Home</Link>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '30px', borderRadius: '20px', backdropFilter: 'blur(10px)', border: '1px solid rgba(241, 196, 15, 0.2)' }}>
        <div style={{ display: 'flex', gap: '20px' }}>
          <input 
            placeholder="Search new movie..." 
            value={buscaFilme} onChange={e => setBuscaFilme(e.target.value)}
            style={{ flex: 1, background: 'transparent', border: 'none', borderBottom: '2px solid #f1c40f', color: 'white', fontSize: '1.5rem', padding: '10px', outline: 'none' }}
          />
          <button onClick={pesquisarFilme} style={{ padding: '15px 40px', background: '#d35400', color: 'white', border: 'none', borderRadius: '50px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}>SEARCH</button>
        </div>
        
        <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', marginTop: '30px', paddingBottom: '10px' }}>
          {resultadosFilmes.map(item => (
            <div key={item.id} style={{ minWidth: '150px', cursor: 'pointer' }} onClick={() => salvarFilme(item)}>
              {item.poster_path ? <img src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} style={{ width: '150px', height: '220px', objectFit: 'cover', borderRadius: '10px' }} /> : <div style={{width:150, height:220, background:'#333'}}>No Img</div>}
              <p style={{ color: '#ccc', fontSize: '0.9rem', marginTop: '10px' }}>+ Add to Vault</p>
            </div>
          ))}
        </div>
      </div>

      <h2 style={{ marginTop: '60px', color: '#fff', letterSpacing: '2px' }}>MY COLLECTION ({filmes.length})</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '30px', marginTop: '20px' }}>
        {filmes.map(filme => (
          <Tilt key={filme.id} scale={1.05}>
            <div style={{ background: '#1a1a1a', borderRadius: '15px', overflow: 'hidden', position: 'relative', boxShadow: '0 10px 20px rgba(0,0,0,0.3)', border: '1px solid #333' }}>
              <button onClick={() => deletarFilme(filme.id)} style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.7)', color: 'red', border: 'none', borderRadius: '50%', width: 30, height: 30, cursor: 'pointer' }}>X</button>
              {filme.capa_url && <img src={filme.capa_url} style={{ width: '100%', height: '280px', objectFit: 'cover' }} />}
              <div style={{ padding: '15px' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color:'#f1c40f' }}>{filme.titulo}</h3>
                <select value={filme.nota_pessoal} onChange={e => atualizarNotaFilme(filme, e.target.value)} style={{ width: '100%', background: '#333', color: '#f1c40f', border: 'none', padding: '8px', borderRadius: '5px' }}>
                  {[10,9,8,7,6,5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                </select>
              </div>
            </div>
          </Tilt>
        ))}
      </div>
    </motion.div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/animes" element={<AnimePage />} />
      <Route path="/filmes" element={<MoviePage />} />
    </Routes>
  )
}

export default App