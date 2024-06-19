import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext, CartProps } from '../../contexts/CartContext';

export function Cart() {
  const { cart, total, addItemCart, removeItemCart } = useContext(CartContext);

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <h1 className="font-medium text-3xl text-center my-6">Meu Carrinho</h1>

      {cart.length === 0 && (
        <div className="flex flex-col items-center justify-center my-8">
          <p className="font-medium text-xl text-center">Ops, seu carrinho está vazio...</p>
          <Link
            to="/"
            className="bg-gray-800 mt-4 py-2 px-4 text-white font-medium rounded-md hover:bg-gray-900"
          >
            Ver Produtos
          </Link>
        </div>
      )}

      {cart.map((item: CartProps) => (
        <section key={item.id} className="border-b border-gray-300 py-4">
          <div className="flex items-center mb-4 md:mb-0">
            <img
              src={item.image} // Certifique-se de que 'image' está corretamente definido em CartProps
              alt={item.title}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="ml-4">
              <h2 className="font-medium text-lg">{item.title}</h2>
              <p className="text-gray-600">Preço: {formatCurrency(item.price)}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:justify-between mt-4">
            <div className="flex items-center">
              <button
                onClick={() => removeItemCart(item)}
                className="bg-blue-600 text-white px-3 py-1 rounded-md font-medium hover:bg-blue-700 mb-2 md:mb-0 md:mr-2"
              >
                -
              </button>

              <span className="mx-2">{item.amount}</span>

              <button
                onClick={() => addItemCart(item)}
                className="bg-blue-600 text-white px-3 py-1 rounded-md font-medium hover:bg-blue-700 mb-2 md:mb-0 md:ml-2"
              >
                +
              </button>
            </div>

            <strong className="mt-2 md:mt-0 ml-4">
              Subtotal: {formatCurrency(item.total)}
            </strong>
          </div>
        </section>
      ))}

      {cart.length !== 0 && (
        <p className="font-bold mt-8 text-xl text-right">Total: {formatCurrency(Number(total))}</p>
      )}
    </div>
  );
}
