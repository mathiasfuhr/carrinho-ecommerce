// src/pages/home/index.tsx

import { useEffect, useState, useContext } from "react";
import { BsCartPlus } from "react-icons/bs";

import { api } from "../../services/api";
import { CartContext } from "../../contexts/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export interface ProductProps {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string; // Corrigido para 'image' ao invés de 'cover'
}

export function Home() {
  const { addItemCart } = useContext(CartContext);
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Erro ao carregar os produtos:', error);
        toast.error('Erro ao carregar os produtos. Por favor, tente novamente mais tarde.');
      }
    }

    getProducts();
  }, []);

  function handleAddCartItem(product: ProductProps) {
    toast.success("Produto adicionado no carrinho.", {
      style: {
        borderRadius: 10,
        backgroundColor: "#3182CE",
        color: "#FFF",
      },
    });
    addItemCart(product);
  }

  return (
    <div>
      <main className="w-full max-w-7xl px-4 mx-auto">
        <h1 className="font-bold text-2xl mb-4 mt-10 text-center">
          Produtos em alta
        </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <section
              key={product.id}
              className="w-full bg-gray-100 rounded-lg shadow-md p-4 flex flex-col justify-between"
            >
              <Link to={`/product/${product.id}`}>
                <img
                  className="w-full h-48 object-cover rounded-lg mb-2"
                  src={product.image} // Ajustado para 'image' ao invés de 'cover'
                  alt={product.title}
                />
                <p className="font-medium mt-1 mb-2 text-gray-800">
                  {product.title}
                </p>
              </Link>

              <div className="mt-auto">
                <strong className="text-blue-600 block">
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </strong>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded mt-2 flex gap-2"
                  onClick={() => handleAddCartItem(product)}
                >
                  <BsCartPlus size={20} />
                  Adicionar ao carrinho
                </button>
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
