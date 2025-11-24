import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [animes, setAnimes] = useState([])
  const [busca, setBusca] = useState('')
  const [resultados, setResultados] = useState([])
  useEffect(() => {
    fetchMinhaLista()
  }, [])
  const fetchMinhaLista = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/animes/')
      setAnimes(response.data)
    } catch (error) {
      console.error("Erro ao buscar do Django:", error)
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
  const deletarAnime = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/animes/${id}/`)
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
  return (
    <div style={{ padding: '40px', fontFamily: 'Arial', maxWidth: '1000px', margin: '0 auto' }}>
      
      <h1 style={{ textAlign: 'center' }}>🚀 Meu Tracker de Animes</h1>
      <div style={{ background: '#f0f0f0', padding: '20px', borderRadius: '10px', marginBottom: '40px' }}>
        <h2>🔍 Adicionar Novo Anime</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Digite o nome (ex: Naruto)..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={{ padding: '10px', flex: 1, fontSize: '16px' }}
          />
          <button 
            onClick={pesquisarAnime}
            style={{ padding: '10px 20px', background: '#2c3e50', color: 'white', border: 'none', cursor: 'pointer' }}
          >
            Pesquisar
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px', marginTop: '20px' }}>
          {resultados.map(item => (
            <div key={item.mal_id} style={{ background: 'white', padding: '10px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
              <img src={item.images.jpg.image_url} alt={item.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px' }} />
              <h4 style={{ fontSize: '14px', margin: '10px 0' }}>{item.title}</h4>
              <button 
                onClick={() => salvarAnime(item)}
                style={{ width: '100%', padding: '5px', background: '#27ae60', color: 'white', border: 'none', cursor: 'pointer' }}
              >
                + Adicionar
              </button>
            </div>
          ))}
        </div>
      </div>

      <hr />
      <div style={{ marginTop: '40px' }}>
        <h2>📚 Minha Coleção (Salva no Django)</h2>
        {animes.length === 0 ? <p>Sua lista está vazia.</p> : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
            {animes.map(anime => (
              <div key={anime.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', position: 'relative' }}>
                <button 
                  onClick={() => deletarAnime(anime.id)}
                  style={{ position: 'absolute', top: '5px', right: '5px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '50%', width: '25px', height: '25px', cursor: 'pointer' }}
                >
                  X
                </button>

                {anime.capa_url && <img src={anime.capa_url} style={{width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px'}} />}
                
                <h3 style={{fontSize: '16px', margin: '10px 0'}}>{anime.titulo}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span>Nota:</span>
                  <select 
                    value={anime.nota_pessoal} 
                    onChange={(e) => atualizarNota(anime, e.target.value)}
                    style={{ padding: '5px' }}
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(n => (
                      <option key={n} value={n}>{n} ⭐</option>
                    ))}
                  </select>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default App