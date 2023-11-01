import { Link } from 'react-router-dom'
import './Navbar.css'
import Balance from '../Info/Balance';

const Navbar = ({balance}: {balance: number}) => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          Taquito React Demo
        </div>
        <div className="nav-elements">
          <ul>
            <li>
              <Link to="/transfer">Transfer</Link>
            </li>
            <li>
              <Link to="/originate">Originate</Link>
            </li>
            <li>
              <Link to="/counter">Increment/Decrement Contract</Link>
            </li>
          </ul>
        </div>
        <Balance balance={balance}/>
      </div>
    </nav>
  )
}

export default Navbar;