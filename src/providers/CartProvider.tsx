import CartScreen from "@/app/cart";
import { CartItem, Product } from "@/types";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import products from "@assets/data/products";
import { randomUUID } from "expo-crypto";

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity:(itemId:string,amount:-1|1)=>void
};

export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity:()=>{}
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const addItem = (product: Product, size: CartItem["size"]) => {
    const newCartItem: CartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };

    setItems([newCartItem, ...items]);
  };

    const updateQuantity=(itemId:string,amount:-1|1)=>{
            const updatedItems=items.map(item=>item.id!=itemId?item:{...item,quantity:item.quantity+amount})
            setItems(updatedItems)
    }
  return (
    <CartContext.Provider value={{ items, addItem,updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
