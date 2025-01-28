import { useState } from 'react'
import '../styles/RegisterPage.css'
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

  return (
    <div className='register'>
      <div className='register_content'>
        <form className='register_content_form'>
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
          <input
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
          <button type='submit'>REGISTER</button>
        </form>
        <a href="/login">Already have an account? Log In Here</a>
      </div>
    </div>
  )
}

export default RegisterPage