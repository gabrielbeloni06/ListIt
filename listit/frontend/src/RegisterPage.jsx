import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'
import cityBg from './assets/back.jpg' 

export default function RegisterPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')

    try {
      await axios.post('http://127.0.0.1:8000/api/register/', {
        username,
        email,
        password
      })

      alert("Conta criada com sucesso! Faça login.")
      navigate('/login')

    } catch (err) {
      console.error(err)
      setError('Erro ao criar conta. Tente outro nome de usuário.')
    }
  }

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${cityBg})`, backgroundSize: 'cover', fontFamily: 'Montserrat' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)' }}></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ background: 'rgba(20, 20, 30, 0.95)', padding: '40px', borderRadius: '20px', zIndex: 2, width: '100%', maxWidth: '400px', border: '1px solid #fcee0a', boxShadow: '0 0 30px rgba(252, 238, 10, 0.2)' }}
      >
        <h1 style={{ fontFamily: 'Oswald', color: 'white', textAlign: 'center', fontSize: '2rem', margin: '0 0 30px 0' }}>
          CRIAR <span style={{color: '#fcee0a'}}>CONTA</span>
        </h1>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="text" placeholder="Nome de Usuário" value={username} onChange={e => setUsername(e.target.value)} required style={{ padding: '15px', background: '#333', border: 'none', color: 'white', borderRadius: '8px', outline: 'none' }} />
          <input type="email" placeholder="Email (Opcional)" value={email} onChange={e => setEmail(e.target.value)} style={{ padding: '15px', background: '#333', border: 'none', color: 'white', borderRadius: '8px', outline: 'none' }} />
          <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} required style={{ padding: '15px', background: '#333', border: 'none', color: 'white', borderRadius: '8px', outline: 'none' }} />
          
          {error && <p style={{ color: '#ff4444', textAlign: 'center', fontSize: '0.9rem' }}>{error}</p>}

          <button type="submit" style={{ padding: '15px', background: '#fcee0a', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem', color: '#000', textTransform: 'uppercase', marginTop: '10px' }}>
            Cadastrar
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center', color: '#aaa', fontSize: '0.9rem' }}>
          Já tem conta? <Link to="/login" style={{ color: '#fcee0a', textDecoration: 'none', fontWeight: 'bold' }}>Entrar</Link>
        </div>
      </motion.div>
    </div>
  )
}