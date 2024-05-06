import { set } from 'mongoose'
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function AddUser() {
  const [formData, setFormData] = useState(
    {
      username: '',
      email: '',
      password: ''
    })
const navigate = useNavigate()
  // useEffect(()=>{
  //   console.log(formData)
  // },[formData])

  const handleUserName = (e) => {
    setFormData(prev => ({ ...prev, username: e.target.value }))

  }

  const handleEmail = (e) => {
    setFormData(prev => ({ ...prev, email: e.target.value }))
  }

  const handlePassword = (e) => {
    setFormData(
      prev => ({ ...prev, password: e.target.value })
    )
  }


  const handleAddUser = async (e) => {
    e.preventDefault()
    console.log('hello'
    )
    const response = await fetch('/api/admin/addUser', {
      method: 'POST',
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    const data = await response.json()
    if (data.success) {
      toast.success('User created successfully')
      navigate('/admin')
    }
  }

  return (

    <div>

      <div className='p-5 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold pb-3'>Add User</h1>
        <form className='text-center flex flex-col gap-3 '>
          <input type="text"
            placeholder='Enter Username'
            id='username'
            onChange={handleUserName}
            value={formData.username}
            className='bg-slate-200  rounded-md text-center p-2'
          />

          <input type="text"
            placeholder='Enter Email'
            id='email'
            onChange={handleEmail}
            value={formData.email}
            className='bg-slate-200 rounded-md text-center p-2'
          />
          <input type="password"
            placeholder='Password'
            id='password'
            onClick={handlePassword}
            // value={formData.password}
            className='bg-slate-200 rounded-md text-center p-2'
          />
          <button className='bg-slate-700 p-2 rounded-md text-white hover:bg-slate-800'
            onClick={handleAddUser}> Add user</button>



        </form>


      </div>


    </div>
  )
}

export default AddUser