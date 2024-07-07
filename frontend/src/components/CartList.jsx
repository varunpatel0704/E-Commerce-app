import { useOutletContext } from "react-router-dom";
import CartItem from "./CartItem.jsx";

function CartList() {
  const cartItems = useOutletContext();
  return (
    // <main className="flex flex-col w-full sm:w-[65%] mr-2 rounded-lg border">
    <div className="flex flex-col">
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
    // </main>
  );
}

export default CartList;
