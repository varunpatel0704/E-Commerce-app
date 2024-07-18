import React from "react";
import ProductForm from "../../components/ProductForm.jsx";
import { useAddProductMutation } from "../../features/products/productsApiSlice.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function NewProductForm() {
  const [addProduct, {isLoading}] = useAddProductMutation();
  const navigate = useNavigate();

  async function handleSubmit({ name, price, stock, category, description, image, discount }) {
    try {
      const formData = new FormData();

      formData.set('name', name);
      formData.set('price', price.toString());
      formData.set('stock', stock.toString());
      formData.set('discount', discount.toString());
      formData.set('description', description);
      formData.set('category', category);
      formData.set('image', image);

      const res = await addProduct(formData).unwrap();
      if(res.data){
        console.log(res);
        toast.success('Product Added');
        navigate('/admin/dashboard/products');
      }

    } catch (error) {
      toast.error('Failed to add product');
      console.log('new product creation error', error);
    }
    // console.log(
    //   `New Product Request Received,
    //   name: ${name},
    //   price: ${price},
    //   stock:${stock},
    //   discription:${discription},
    //   category:${category},
    //   image:${image}`
    // );
  }
  if(isLoading) return <h1>Loading...</h1>;

  return (
    <ProductForm
      buttonText={"Add Product"}
      heading={"NEW PRODUCT"}
      onSubmit={handleSubmit}
    />
  );
}

export default NewProductForm;
