import React, { use, useState } from 'react'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <div className='login'>
      <div className='login_content'>
        <form className='login_content_form'>
          <input type="email" placeholder='Email' required />
          <input type="password" placeholder='Password' required />
          <button type="submit">LOG IN</button>
        </form>
        <a href="/register">Don´t have an account? Sign In Here</a>
      </div>
    </div>
  )
}

export default LoginPage