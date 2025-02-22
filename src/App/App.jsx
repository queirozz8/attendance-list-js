import { useState, useEffect } from 'react'

import './styles.css'

import Card from '../components/Card/Card';
export default function App() {
  const [studentName, setStudentName] = useState('')
  const [students, setStudents] = useState([])
  const [user, setUser] = useState({ name: '', avatar: '' })

  function handleAddStudent() {
    if (!studentName.trim()) return;

    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    }
    setStudents(prevState => [...prevState, newStudent])
    setStudentName('')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleAddStudent()
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.github.com/users/queirozz8')
      const data = await response.json()
        setUser({
          name: data.name,
          avatar: data.avatar_url,
        })
    }

    fetchData();
  }, [])

  return (
    <div className='container'>
      <header>
      <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de perfil" />
        </div>
      </header>


      <input 
        type="text" 
        placeholder="Digite o nome..."
        onChange={ e => setStudentName(e.target.value) }
        onKeyDown={handleKeyDown}
        value={studentName}
        id='input'
      />
      <button 
        type="button" 
        onClick={handleAddStudent}>
          Adicionar
      </button>

      {
        students.map(student => <Card key={student.time} name={student.name} time={student.time} />)
      }
    </div>
  )
}
