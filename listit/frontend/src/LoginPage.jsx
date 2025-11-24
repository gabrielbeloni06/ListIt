import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'
import cityBg from './assets/cyberpunk-city.jpg'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', {
        username,
        password
      })
      localStorage.setItem('access_token', response.data.access)
      localStorage.setItem('refresh_token', response.data.refresh)
      navigate('/')
      window.location.reload()

    } catch (err) {
      setError('Usuário ou senha incorretos!')
      console.error(err)
    }
  }

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundImage: `url(${cityBg})`, 
      backgroundSize: 'cover',
      fontFamily: 'Montserrat'
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)' }}></div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ 
          background: 'rgba(20, 20, 30, 0.9)', 
          padding: '40px', 
          borderRadius: '20px', 
          zIndex: 2, 
          width: '100%', 
          maxWidth: '400px',
          border: '1px solid #00f2ff',
          boxShadow: '0 0 30px rgba(0, 242, 255, 0.2)'
        }}
      >
        <h1 style={{ fontFamily: 'Oswald', color: 'white', textAlign: 'center', fontSize: '2.5rem', margin: '0 0 30px 0' }}>
          LOGIN <span style={{color: '#00f2ff'}}>SYSTEM</span>
        </h1>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <input 
            type="text" 
            placeholder="Usuário"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{ padding: '15px', background: '#333', border: 'none', color: 'white', borderRadius: '8px', outline: 'none' }}
          />
          <input 
            type="password" 
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ padding: '15px', background: '#333', border: 'none', color: 'white', borderRadius: '8px', outline: 'none' }}
          />
          
          {error && <p style={{ color: '#ff4444', textAlign: 'center' }}>{error}</p>}

          <button 
            type="submit"
            style={{ 
              padding: '15px', 
              background: '#00f2ff', 
              border: 'none', 
              borderRadius: '8px', 
              fontWeight: 'bold', 
              cursor: 'pointer',
              fontSize: '1rem',
              color: '#000'
            }}
          >
            ACESSAR
          </button>
        </form>
      </motion.div>
    </div>
  )
}