import ProductCard from "./ProductCard.jsx";
import { useGetProductsQuery } from "../features/products/productsApiSlice.js";

function ProductList({ category }) {
  // Todo: fetch a list of products
  const { data, isLoading, isFetching, isError, error } =
    useGetProductsQuery(category);
  const products = data?.data || [];
  console.log(`products under ${category} `, products);
  const productList = products.map((product) => (
    <ProductCard key={product._id} product={product} />
  ));
  return isError ? error.data.messae : productList;
}

export default ProductList;
