import React from "react";
import ProductForm from "../../components/ProductForm.jsx";
import { useGetProductQuery, useUpdateProductMutation, useDeleteProductMutation } from "../../features/products/productsApiSlice.js";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function EditProductForm() {
  const {id} = useParams();
  const navigate = useNavigate();

  const {data, isLoading, isError, error, isSuccess} = useGetProductQuery(id);
  const product = data?.data;
  console.log(product);

  const [updateProduct, update] = useUpdateProductMutation();  
  const [deleteProduct, del] = useDeleteProductMutation();

  async function handleSubmit({name, price, stock, discount, image, category, description}) {
    try {
      const formData = new FormData();
      formData.set('name', name);
      formData.set('category', category);
      formData.set('description', description);
      formData.set('image', image);
      formData.set('stock', stock.toString());
      formData.set('price', price.toString());
      formData.set('discount', discount.toString());      
      
      const res = await updateProduct({id, formData});
      if(res.data){
        console.log('product updated',res);
        toast.success('Product updated');
        navigate('/admin/dashboard/products');
      }
      
    } catch (error) {
      console.log('could not update the product', error);
    }  
  }

  async function handleDelete(){
    try {
      const res = await deleteProduct(id).unwrap();
      toast.success('Product removed');
      navigate('/admin/dashboard/products');
    } catch (error) {
      toast.error('Error removing the product');
      console.log('error deleting the product', error);
    }
  }

  if(isLoading || update.isLoading || del.isLoading)return <h1>Loading...</h1>;
  
  else if(isError || update.isError || del.isError)return <h1>Error...</h1>
  
  else
  return (
    <ProductForm
      heading={"EDIT PRODUCT"}
      buttonText={"Update Product Details"}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      product={product}
    />
  );
}

export default EditProductForm;
