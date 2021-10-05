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
      <div className="adminUploader">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Title... " name="title"  onChange={handleChange} value={updateForm.title}></input>
          <input type="text" placeholder="Url... " name="url"  onChange={handleChange} value={updateForm.url}></input>
          <button>Submit</button>
        </form>
      </div>
      :
      <div>you are being naughty</div>
    }
  </>)
}

export default AdminUpload