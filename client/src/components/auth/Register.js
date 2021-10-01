import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const Register = () => {

  // History
  const history = useHistory()

  // State
  const [ formData, setFormData ] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })
  const [ errors, setErrors ] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const handleChange = (event) => {
    const newObj = { ...formData, [event.target.name]: event.target.value }
    setFormData(newObj)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post('api/register', formData)
      history.push('/login')
    } catch (err) {
      setErrors(err.response.data.errors)
      console.log(errors)
    }
  }

  return (
    <div className="form-page">
      <div className="container">
        <div className="row">
          <form onSubmit={handleSubmit} className="col-10 offset-1 col-md-6 offset-md-3 mt-4">
            <h3>Register</h3>
            <div className="form-field">
              <label htmlFor="username">Username</label>
              <input onInput={handleChange} type="text" name="username" placeholder="Username" value={formData.username} />
              {errors.username && <p className="error">{errors.username}</p>}
            </div>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input onInput={handleChange} type="email" name="email" placeholder="Email" value={formData.email}/>
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="form-field">
              <label htmlFor="password">Password</label>
              <input onInput={handleChange} type="password" name="password" placeholder="Password" value={formData.password} />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <div className="form-field">
              <label htmlFor="passwordConfirmation">Password Confirmation</label>
              <input onInput={handleChange} type="password" name="passwordConfirmation" placeholder="Password Confirmation"  value={formData.passwordConfirmation} />
              {errors.passwordConfirmation && <p className="error">{errors.passwordConfirmation}</p>}
            </div>
            <button className="btn btn-yellow w-100">Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register