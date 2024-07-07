import { useParams } from "react-router-dom"

function ProductDetails() {
  const {id} = useParams();
  return (
    <div>ProductDetails: {id}</div>
  )
}

export default ProductDetails