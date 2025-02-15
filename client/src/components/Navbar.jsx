import { IconButton } from '@material-ui/core'
import { Search, Person, Menu } from '@material-ui/icons'
import variables from '../styles/variables'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import '../styles/Navbar.css'
import { Link } from 'react-router-dom'
import { setLogout } from '../redux/state'

const Navbar = () => {
  const [ dropdownMenu, setDropdownMenu ] = useState(false)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  
  return (
    <div className='navbar'>
      <a href="/">
        <img src="/assets/logo.png" alt="logo" />
      </a>

      <div className="navbar-search">
        <input type="text" placeholder='Search...' />
        <IconButton>
          <Search sx={{ color: variables.pinkred }} />
        </IconButton>
      </div>

      <div className="navbar_right">
        {
          user ? (
            <a href='/create-listing' className='host'>Become a host</a>
          ) : (
            <a href="/login" className='host'>Become a host</a>
          )
        }

        <button className='navbar_right_account' onClick={() => setDropdownMenu(!dropdownMenu)}>
          <Menu sx={{ color: variables.darkgrey }} />
          {
            !user ?
              <Person sx={{ color: variables.darkgrey }} />
              : (
                <img src={`http://localhost:3001/${user.profileImagePath.replace("public", "")}`}
                  alt="profile photo" style={{ objectFit: "cover", borderRadius: "50%" }} />
              )
          }
        </button>
        {
          dropdownMenu && !user && (  
            <div className='navbar_right_accountmenu'>
              <Link to="/login">Log In</Link>
              <Link to="/register">Sign Up</Link>
            </div>
          )
        }

        {
          dropdownMenu && user && (
            <div className='navbar_right_accountmenu'>
              <Link to="/profile">Trip List</Link>
              <Link to="/create-listing">Wish List</Link>
              <Link to="/logout">Property List</Link>
              <Link to="/logout">Reservation List</Link>
              <Link to="/logout">Become A Host</Link>

              <Link to="/login" onClick={() => {
                dispatch(setLogout())
              }}>Log Out</Link>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Navbar