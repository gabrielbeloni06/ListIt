import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [animes, setAnimes] = useState([])
  const [filmes, setFilmes] = useState([])
  useEffect(() => {
    fetchDados()
  }, [])
  const fetchDados = async () => {
    try {
      const respostaAnimes = await axios.get('http://127.0.0.1:8000/api/animes/')
      setAnimes(respostaAnimes.data)
      const respostaFilmes = await axios.get('http://127.0.0.1:8000/api/filmes/')
      setFilmes(respostaFilmes.data)
      
    } catch (error) {
      console.error("Deu erro ao buscar dados:", error)
    }
  }
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>📺 Minha Lista (Full Stack)</h1>
      <p>Teste de conexao ao banco</p>
      
      <div style={{ display: 'flex', gap: '50px', marginTop: '20px' }}>
        <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px', width: '300px' }}>
          <h2>Animes 🍥</h2>
          {animes.length === 0 ? <p>Nenhum anime cadastrado.</p> : (
            <ul>
              {animes.map(anime => (
                <li key={anime.id} style={{ marginBottom: '10px' }}>
                  <strong>{anime.titulo}</strong> <br/>
                  <small>Nota: {anime.nota_pessoal} ⭐</small>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px', width: '300px' }}>
          <h2>Filmes 🍿</h2>
          {filmes.length === 0 ? <p>Nenhum filme cadastrado.</p> : (
            <ul>
              {filmes.map(filme => (
                <li key={filme.id} style={{ marginBottom: '10px' }}>
                  <strong>{filme.titulo}</strong> <br/>
                  <small>Nota: {filme.nota_pessoal} ⭐</small>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  )
}

export default App