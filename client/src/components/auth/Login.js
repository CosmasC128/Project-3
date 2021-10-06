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
      // console.log(data.token)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="loginPage">
      <div className="logContainer">
        <div className="logBox" id="logBox">
          <form id="logForm" onSubmit={handleSubmit}>
            <h3 id="logTitle">LOGIN</h3>
            <div className="form-field logField">
              <label htmlFor="email" className="logLabel">Email</label>
              <input onInput={handleChange} type="email" name="email" placeholder="Email" value={formData.email}/>
            </div>
            <div className="form-field logField">
              <label htmlFor="password" className="logLabel">Password</label>
              <input onInput={handleChange} type="password" name="password" placeholder="Password" value={formData.password} />
            </div>
            <button id="logBtn">Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login