import { createContext, ReactNode, useState } from 'react';
import { ProductProps } from '../pages/home';

interface CartContextData {
  cart: CartProps[];
  cartAmount: number;
  addItemCart: (newItem: ProductProps) => void;
  removeItemCart: (product: CartProps) => void;
  total: string;
}

interface CartProps extends ProductProps {
  amount: number;
  total: number;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextData);

function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartProps[]>([]);
  const [total, setTotal] = useState<string>('');

  const addItemCart = (newItem: ProductProps) => {
    const indexItem = cart.findIndex((item) => item.id === newItem.id);

    if (indexItem !== -1) {
      const updatedCart = cart.map((item) =>
        item.id === newItem.id
          ? { ...item, amount: item.amount + 1, total: (item.amount + 1) * item.price }
          : item
      );
      setCart(updatedCart);
      totalResultCart(updatedCart);
      return;
    }

    const data: CartProps = {
      ...newItem,
      amount: 1,
      total: newItem.price,
    };

    setCart((prevCart) => [...prevCart, data]);
    totalResultCart([...cart, data]);
  };

  const removeItemCart = (product: CartProps) => {
    const updatedCart = cart.map((item) =>
      item.id === product.id ? { ...item, amount: item.amount - 1, total: (item.amount - 1) * item.price } : item
    );

    const filteredCart = updatedCart.filter((item) => item.amount > 0);
    setCart(filteredCart);
    totalResultCart(filteredCart);
  };

  const totalResultCart = (items: CartProps[]) => {
    const result = items.reduce((acc, obj) => acc + obj.total, 0);
    const resultFormated = result.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    setTotal(resultFormated);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartAmount: cart.reduce((acc, item) => acc + item.amount, 0),
        addItemCart,
        removeItemCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
