import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../helpers/auth.js'

const AdminUpload = () => {

  const [ user, setUser ] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          '/api/user',
          {
            headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
          })
        setUser(data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  const [updateForm, setUpdateForm] = useState({
    title: '', 
    url: '', 
    views: 1,
    votes: 1,
  })

  const handleChange = (event) => {
    const newMatch = { ...updateForm, [event.target.name]: event.target.value }
    setUpdateForm(newMatch)
  }

  const handleSubmit = async () => {
    try {
      await axios.post(
        '/api/matches/',
        updateForm,
        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        }
      )
    } catch (err) {
      console.log(err)  
    }
  }

  return (<>
    { user.username === 'admin' ?
      <div className="uploadPage">
        <div className="adminUploader">
          <div className="uploaderWrap">
            <h1 className="uploadTitle">Yay! More Videos!</h1>
            <form onSubmit={handleSubmit} id="uploadForm">
              <div className="form-field uploadField">
                <label htmlFor="password" className="uploadLabel">Username</label>
                <input className="uploaderItem" type="text" placeholder="Title " name="title"  onChange={handleChange} value={updateForm.title}></input>
              </div>
              <div className="form-field uploadField">
                <label htmlFor="password" className="uploadLabel">Password</label>
                <input className="uploaderItem" type="text" placeholder="Url " name="url"  onChange={handleChange} value={updateForm.url}></input>
              </div>
              <button className="uploaderItem" id="uploadBtn">SUBMIT</button>
            </form>
          </div>  
        </div>
      </div>
      :
      <div className="uploadPage">
        <div className="naughtyWrap">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" id="naughtyEyes" viewBox="0 0 16 16">
            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
          </svg>
          <div id="naughtyMessage">You Are Being Naughty</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" id="naughtyEyes" viewBox="0 0 16 16">
            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
          </svg>
        </div>
      </div>
    }
  </>)
}

export default AdminUpload