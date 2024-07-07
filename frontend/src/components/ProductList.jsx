import ProductCard from "./ProductCard.jsx";

function ProductList() {
  // Todo: fetch a list of products
  const products = [
    { id: 1, name: "camera", image: "abcd", price: "1200" },
    { id: 1, name: "camera", image: "abcd", price: "1200" },
    { id: 1, name: "camera", image: "abcd", price: "1200" },
    { id: 1, name: "camera", image: "abcd", price: "1200" },
    { id: 1, name: "camera", image: "abcd", price: "1200" },
  ];
  const productList = products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  return (
    <div className="flex justify-start items-center flex-wrap gap-10">
      {productList}
    </div>
  );
}

export default ProductList;
