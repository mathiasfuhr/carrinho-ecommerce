import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FiShoppingCart } from 'react-icons/fi'

import { CartContext } from '../../contexts/CartContext'

export function Header() {
  const { cartAmount } = useContext(CartContext)

  return (
    <header className="w-full px-1 bg-gradient-to-r from-blue-500 to-blue-400">
      <nav className="w-full max-w-7xl h-14 flex items-center justify-between px-5 mx-auto">
        <Link className="font-bold text-2xl text-white" to="/">
          Dev Shop
        </Link>

        <Link className="relative text-gray-100" to="/cart">
          <FiShoppingCart size={24} color="#121212"/>
          {cartAmount > 0 && (
            <span className="absolute -top-3 -right-3 px-2.5 bg-yellow-400 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs">
              {cartAmount}
            </span>
          )}
        </Link>
      </nav>
    </header>
  )
}
