import React from "react";
import ProductForm from "../../components/ProductForm.jsx";

function NewProductForm() {
  function handleSubmit({ name, price, stock, category, discription, image }) {
    console.log(
      `New Product Request Received,
      name: ${name},
      price: ${price},
      stock:${stock},
      discription:${discription},
      category:${category},
      image:${image}`
    );
  }

  return (
    <ProductForm
      buttonText={"Add Product"}
      heading={"NEW PRODUCT"}
      onSubmit={handleSubmit}
      // product={product}
    />
  );
}

export default NewProductForm;
