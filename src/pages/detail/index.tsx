import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { ProductProps } from "../home";
import { BsCartPlus } from "react-icons/bs";
import { CartContext } from "../../contexts/CartContext";
import toast from "react-hot-toast";

export function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductProps | null>(null);
  const { addItemCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function getProduct() {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }

    getProduct();
  }, [id]);

  function handleAddItem(product: ProductProps) {
    toast.success("Produto adicionado no carrinho.", {
      style: {
        borderRadius: 10,
        backgroundColor: "#3182CE",
        color: "#FFF",
      },
    });
    addItemCart(product);
    navigate("/cart");
  }

  return (
    <div>
      <main className="w-full max-w-7xl px-4 mx-auto my-6">
        {product && (
          <section className="w-full bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start">
              <img
                className="w-full lg:w-80 h-80 lg:h-auto object-contain rounded-lg mb-4 lg:mb-0"
                src={product.image}
                alt={product.title}
              />

              <div className="flex-1 lg:ml-6">
                <p className="font-bold text-2xl mt-4 mb-2">{product.title}</p>
                <p className="mb-4 text-gray-700">{product.description}</p>
                <strong className="text-blue-600 text-xl mb-2">
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </strong>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex"
                  onClick={() => handleAddItem(product)}
                >
                  <BsCartPlus size={20} />
                  <span className="ml-2">Adicionar ao carrinho</span>
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
