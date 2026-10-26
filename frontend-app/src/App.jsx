import { useState } from 'react'
import axios from 'axios'

// Functional components
function App() {
  const [name, setName] = useState('')
  const [regno, setRegno] = useState('')
  const [cgpa, setCgpa] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      const student = {
        name: name, regno: regno, cgpa: cgpa
      }
      axios.post("http://localhost:5000/saveStudent", student)
        .then((response) => {
          console.log(response.data.message)
        })
        .catch((err) => {
          console.log(err.response.data.message)
        })
    } catch(err) {
      console.error(err)
    }
  }

  return (
    <div className="container">
      <h1>Student Form</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" className="form-control mb-3" required value={name} 
        onChange={(e) => setName(e.target.value)}/>

        <label>Regno</label>
        <input type="text" className="form-control mb-3" required value={regno}
        onChange={(e) => setRegno(e.target.value)}/>

        <label>CGPA</label>
        <input type="text" className="form-control mb-3" required value={cgpa}
        onChange={(e) => setCgpa(e.target.value)}/>

        <button className="btn btn-primary">Submit</button>
      </form>

      <p className='mt-3 text-success'>
        {status && <span>{message}</span>}
      </p>
    </div>
  )
}

export default App
