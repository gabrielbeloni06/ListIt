import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [animes, setAnimes] = useState([])
  const [filmes, setFilmes] = useState([])
  
  const [busca, setBusca] = useState('')
  const [buscaFilme, setBuscaFilme] = useState('')
  
  const [resultados, setResultados] = useState([])
  const [resultadosFilmes, setResultadosFilmes] = useState([])
  
  const TMDB_API_KEY = "87897d6f6b9574dec01a9e050477f47d"

  useEffect(() => {
    fetchMinhaLista()
  }, [])

  const fetchMinhaLista = async () => {
    try {
      const responseAnimes = await axios.get('http://127.0.0.1:8000/api/animes/')
      setAnimes(responseAnimes.data)

      const responseFilmes = await axios.get('http://127.0.0.1:8000/api/filmes/')
      setFilmes(responseFilmes.data)
    } catch (error) {
      console.error("Erro ao buscar dados:", error)
    }
  }

  const pesquisarAnime = async () => {
    if (!busca) return
    try {
      const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${busca}`)
      setResultados(response.data.data) 
    } catch (error) {
      console.error("Erro ao buscar no Jikan:", error)
    }
  }

  const pesquisarFilme = async () => {
    if (!buscaFilme) return
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${buscaFilme}&language=pt-BR`)
      setResultadosFilmes(response.data.results)
    } catch (error) {
      console.error("Erro TMDB:", error)
    }
  }

  const salvarAnime = async (animeExterno) => {
    try {
      const pacoteParaDjango = {
        titulo: animeExterno.title,
        api_id: animeExterno.mal_id,
        capa_url: animeExterno.images.jpg.image_url,
        nota_pessoal: 10,
        comentario: "Adicionado via busca"
      }
      await axios.post('http://127.0.0.1:8000/api/animes/', pacoteParaDjango)
      alert(`Sucesso! ${animeExterno.title} foi salvo.`)
      fetchMinhaLista()
    } catch (error) {
      console.error("Erro ao salvar:", error)
      alert("Erro! Provavelmente você já adicionou esse anime.")
    }
  }

  const salvarFilme = async (filmeExterno) => {
    try {
      const capaCompleta = filmeExterno.poster_path 
        ? `https://image.tmdb.org/t/p/w500${filmeExterno.poster_path}`
        : null

      await axios.post('http://127.0.0.1:8000/api/filmes/', {
        titulo: filmeExterno.title,
        api_id: filmeExterno.id,
        capa_url: capaCompleta,
        nota_pessoal: 10,
        comentario: filmeExterno.overview
      })
      alert(`Filme ${filmeExterno.title} salvo!`)
      fetchMinhaLista()
    } catch (error) {
      console.error("Erro ao salvar filme:", error)
      alert("Erro! Provavelmente já está na lista.")
    }
  }

  const deletarAnime = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/animes/${id}/`)
      fetchMinhaLista()
    } catch (error) {
      console.error("Erro ao deletar:", error)
    }
  }

  const deletarFilme = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/filmes/${id}/`)
      fetchMinhaLista()
    } catch (error) {
      console.error("Erro ao deletar:", error)
    }
  }

  const atualizarNota = async (anime, novaNota) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/animes/${anime.id}/`, {
        nota_pessoal: novaNota
      })
      fetchMinhaLista()
    } catch (error) {
      console.error("Erro ao atualizar nota:", error)
    }
  }

  const atualizarNotaFilme = async (filme, novaNota) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/filmes/${filme.id}/`, {
        nota_pessoal: novaNota
      })
      fetchMinhaLista()
    } catch (error) {
      console.error("Erro ao atualizar nota:", error)
    }
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial', maxWidth: '1200px', margin: '0 auto' }}>
      
      <h1 style={{ textAlign: 'center' }}>🚀 Meu Tracker Full Stack</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
        
        <div style={{ background: '#f0f0f0', padding: '20px', borderRadius: '10px' }}>
          <h2>🔍 Buscar Anime</h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              placeholder="Nome do anime..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              style={{ padding: '10px', flex: 1, fontSize: '16px' }}
            />
            <button onClick={pesquisarAnime} style={{ padding: '10px', background: '#2c3e50', color: 'white', border: 'none', cursor: 'pointer' }}>
              Buscar
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '10px', marginTop: '20px' }}>
            {resultados.map(item => (
              <div key={item.mal_id} style={{ background: 'white', padding: '5px', borderRadius: '5px' }}>
                <img src={item.images.jpg.image_url} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                <h5 style={{ margin: '5px 0' }}>{item.title}</h5>
                <button onClick={() => salvarAnime(item)} style={{ width: '100%', background: '#27ae60', color: 'white', border: 'none', cursor: 'pointer' }}>Add</button>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#e0f7fa', padding: '20px', borderRadius: '10px' }}>
          <h2>🍿 Buscar Filme</h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              placeholder="Nome do filme..."
              value={buscaFilme}
              onChange={(e) => setBuscaFilme(e.target.value)}
              style={{ padding: '10px', flex: 1, fontSize: '16px' }}
            />
            <button onClick={pesquisarFilme} style={{ padding: '10px', background: '#006064', color: 'white', border: 'none', cursor: 'pointer' }}>
              Buscar
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '10px', marginTop: '20px' }}>
            {resultadosFilmes.map(item => (
              <div key={item.id} style={{ background: 'white', padding: '5px', borderRadius: '5px' }}>
                {item.poster_path ? <img src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} style={{ width: '100%', height: '150px', objectFit: 'cover' }} /> : null}
                <h5 style={{ margin: '5px 0' }}>{item.title}</h5>
                <button onClick={() => salvarFilme(item)} style={{ width: '100%', background: '#00838f', color: 'white', border: 'none', cursor: 'pointer' }}>Add</button>
              </div>
            ))}
          </div>
        </div>

      </div>

      <hr />

      <div style={{ marginTop: '40px' }}>
        <h2>📚 Minha Coleção</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          
          <div>
            <h3>Animes Salvos ({animes.length})</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' }}>
              {animes.map(anime => (
                <div key={anime.id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px', position: 'relative' }}>
                  <button onClick={() => deletarAnime(anime.id)} style={{ position: 'absolute', top: '5px', right: '5px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer' }}>X</button>
                  {anime.capa_url && <img src={anime.capa_url} style={{width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px'}} />}
                  <h4 style={{fontSize: '14px', margin: '5px 0'}}>{anime.titulo}</h4>
                  <select value={anime.nota_pessoal} onChange={(e) => atualizarNota(anime, e.target.value)} style={{ width: '100%' }}>
                    {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} ⭐</option>)}
                  </select>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3>Filmes Salvos ({filmes.length})</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' }}>
              {filmes.map(filme => (
                <div key={filme.id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px', position: 'relative' }}>
                  <button onClick={() => deletarFilme(filme.id)} style={{ position: 'absolute', top: '5px', right: '5px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer' }}>X</button>
                  {filme.capa_url && <img src={filme.capa_url} style={{width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px'}} />}
                  <h4 style={{fontSize: '14px', margin: '5px 0'}}>{filme.titulo}</h4>
                  <select value={filme.nota_pessoal} onChange={(e) => atualizarNotaFilme(filme, e.target.value)} style={{ width: '100%' }}>
                    {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} ⭐</option>)}
                  </select>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default App