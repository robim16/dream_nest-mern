import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Register.scss'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target
    setFormData({
      ...formData,
      [name]: value,
      [name]: name === 'profileImage' ? files[0] : value
    })
  }

  const [passwordMatch, setPasswordMatch] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "")
  })
  

  const handleSubmit = async (e) => { 

    e.preventDefault()

    try {

      const register_form = new FormData()

      for (let key in formData) {
        register_form.append(key, formData[key])
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {  
        // send the form data to the server to register the user 
        method: 'POST',
        body: register_form
      })

      if (response.ok) {
        navigate('/login')
      }
    } catch (error) {
      console.log("Register failed: ", error.message);
    }
  }

  return (
    <div className='register'>
      <div className='register_content'>
        <form className='register_content_form' onSubmit={handleSubmit}>
          <input
            placeholder='first name'
            name='firstName'
            value={formData.firstName}
            required
            onChange={handleChange}
          />
          <input
            placeholder='Last name'
            name='lastName'
            value={formData.lastName}
            required
            onChange={handleChange}
          />
          <input
            placeholder='email'
            name='email'
            type='email'
            value={formData.email}
            required
            onChange={handleChange}
          />
          <input
            placeholder='Password'
            name='password'
            type='password'
            value={formData.password}
            required
            onChange={handleChange}
          />
          <input
            placeholder='Confirm Password'
            name='confirmPassword'
            type='password'
            value={formData.confirmPassword}
            required
            onChange={handleChange}
          />

          {!passwordMatch && (
            <p style={{ color: 'red' }}>Passwords do not match</p>
          )}

          <input
            id='image'
            type="file"
            name='profileImage'
            accept='image/*'
            style={{ display: 'none' }}
            required
            onChange={handleChange}
          />
          <label htmlFor='image'>
            <img src="assets/addImage.png" alt='add profile photo' />
            <p>Upload Your Profile Photo</p>
          </label>
          {formData.profileImage && (
            <img src={URL.createObjectURL(formData.profileImage)}
              alt="profile photo"
              style={{ maxWidth: "80px"}} />
          )}
          <button type='submit' disabled={!passwordMatch}>REGISTER</button>
        </form>
        <a href="/login">Already have an account? Log In Here</a>
      </div>
    </div>
  )
}

export default RegisterPage