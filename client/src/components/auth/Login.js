import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Login = () => {

  // History
  const history = useHistory()

  // State
  const [ formData, setFormData ] = useState({
    email: '',
    password: '',
  })

  const handleChange = (event) => {
    const newObj = { ...formData, [event.target.name]: event.target.value }
    setFormData(newObj)
  }

  const setTokenToLocalStorage = (token) => {
    window.localStorage.setItem('token', token)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post('api/login', formData)
      setTokenToLocalStorage(data.token)
      history.push('/matches')
      console.log(data.token)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="form-page">
      <div className="container">
        <div className="row">
          <form onSubmit={handleSubmit} className="col-10 offset-1 col-md-6 offset-md-3 mt-4">
            <h3>Login</h3>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input onInput={handleChange} type="email" name="email" placeholder="Email" value={formData.email}/>
            </div>
            <div className="form-field">
              <label htmlFor="password">Password</label>
              <input onInput={handleChange} type="password" name="password" placeholder="Password" value={formData.password} />
            </div>
            <button className="btn btn-yellow w-100">Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login