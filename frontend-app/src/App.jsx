import { useEffect, useState } from 'react'
import axios from 'axios'

const API = 'http://localhost:5000/api'
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

function App() {
  const [donorId, setDonorId] = useState('')
  const [name, setName] = useState('')
  const [bloodGroup, setBloodGroup] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [available, setAvailable] = useState(true)
  const [editId, setEditId] = useState('')
  const [manageId, setManageId] = useState('')
  const [donors, setDonors] = useState([])
  const [searchGroup, setSearchGroup] = useState('')

  // Display donors when the page opens.
  useEffect(() => {
    axios.get(`${API}/viewAll`)
      .then((res) => setDonors(res.data))
      .catch(() => window.alert('Unable to load donors. Check that the backend is running.'))
  }, [])

  const showError = (err) => {
    window.alert(err.response?.data?.message || 'Unable to connect to the server.')
  }

  const loadDonors = () => {
    axios.get(`${API}/viewAll`, {
      params: { bloodGroup: searchGroup }
    })
      .then((res) => setDonors(res.data))
      .catch(showError)
  }

  const resetForm = () => {
    setDonorId('')
    setName('')
    setBloodGroup('')
    setContactNumber('')
    setAvailable(true)
    setEditId('')
    setManageId('')
  }

  const saveDonor = (event) => {
    event.preventDefault()
    const donor = { originalDonorId: editId, donorId, name, bloodGroup, contactNumber, available }
    const route = editId ? '/updateDonor' : '/addNew'
    axios.post(API + route, donor)
      .then((res) => {
        window.alert(res.data.message)
        resetForm()
        loadDonors()
      })
      .catch(showError)
  }

  const editDonor = () => {
    if (!manageId.trim()) {
      window.alert('Enter a Donor ID')
      return
    }
    axios.get(`${API}/findDonor`, { params: { donorId: manageId.trim() } })
      .then((res) => {
        const donor = res.data
        setEditId(donor.donorId)
        setDonorId(donor.donorId)
        setName(donor.name)
        setBloodGroup(donor.bloodGroup)
        setContactNumber(donor.contactNumber || '')
        setAvailable(donor.available ?? true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      })
      .catch(showError)
  }

  const deleteDonor = () => {
    if (!manageId.trim()) {
      window.alert('Enter a Donor ID')
      return
    }
    const id = manageId.trim()
    axios.post(`${API}/deleteDonor`, { donorId: id })
      .then((res) => {
        window.alert(res.data.message)
        if (editId === id) resetForm()
        setManageId('')
        loadDonors()
      })
      .catch(showError)
  }

  return (
    <div className="container py-4">
      <h1 className="text-danger">Blood Donor Manager</h1>

      <div className="card bg-light p-4 mb-4">
        <h2 className="h4">{editId ? 'Update Donor Details' : 'Add New Donor'}</h2>
        <form onSubmit={saveDonor}>
          <div className="row">
            <div className="col-md-4">
              <label htmlFor="donorId" className="form-label">Donor ID</label>
              <input id="donorId" className="form-control mb-3" required
                value={donorId} onChange={(e) => setDonorId(e.target.value)} />
            </div>
            <div className="col-md-4">
              <label htmlFor="name" className="form-label">Name</label>
              <input id="name" className="form-control mb-3" required
                value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="col-md-4">
              <label htmlFor="bloodGroup" className="form-label">Blood Group</label>
              <select id="bloodGroup" className="form-select mb-3" required
                value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}>
                <option value="">Select blood group</option>
                {bloodGroups.map((group) => <option key={group} value={group}>{group}</option>)}
              </select>
            </div>
          </div>
          <label htmlFor="contactNumber" className="form-label">Contact Number</label>
          <input id="contactNumber" type="text" className="form-control mb-3" required
            value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />

          <div className="form-check mb-3">
            <input id="available" type="checkbox" className="form-check-input"
              checked={available} onChange={(e) => setAvailable(e.target.checked)} />
            <label htmlFor="available" className="form-check-label">Available to donate</label>
          </div>
          <button type="submit" className="btn btn-danger me-2">
            {editId ? 'Update Donor' : 'Register Donor'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={resetForm}>
            {editId ? 'Cancel Edit' : 'Clear Form'}
          </button>
        </form>
      </div>

      <hr className="my-4" />

      <h2 className="h4">View All Donors</h2>
      <label htmlFor="searchGroup" className="form-label">Search by Blood Group</label>
      <select id="searchGroup" className="form-select mb-3" value={searchGroup}
        onChange={(e) => setSearchGroup(e.target.value)}>
        <option value="">All blood groups</option>
        {bloodGroups.map((group) => <option key={group} value={group}>{group}</option>)}
      </select>
      <button className="btn btn-primary mb-3" onClick={loadDonors}>Search / View Donors</button>

      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Donor ID</th><th>Name</th><th>Blood Group</th>
              <th>Contact Number</th><th>Availability</th>
            </tr>
          </thead>
          <tbody>
            {donors.length === 0 ? (
              <tr><td colSpan="5" className="text-center">No donors to display.</td></tr>
            ) : donors.map((donor) => (
              <tr key={donor._id}>
                <td>{donor.donorId}</td><td>{donor.name}</td><td>{donor.bloodGroup}</td>
                <td>{donor.contactNumber}</td>
                <td>{(donor.available ?? true) ? 'Available' : 'Unavailable'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <hr className="my-4" />

      <h2 className="h4">Edit or Delete Donor</h2>
      <label htmlFor="manageId" className="form-label">Donor ID</label>
      <input id="manageId" type="text" className="form-control mb-3"
        value={manageId} onChange={(e) => setManageId(e.target.value)} />
      <button className="btn btn-outline-secondary me-2 mb-3" onClick={editDonor}>Edit Donor</button>
      <button className="btn btn-outline-danger mb-3" onClick={deleteDonor}>Delete Donor</button>
    </div>
  )
}

export default App
