import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import toast from "react-hot-toast";

function ProductForm({ product, heading, buttonText, onSubmit, onDelete }) {
  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.price);
  const [stock, setStock] = useState(product?.stock);
  const [imagePreview, setImagePreview] = useState(product?.image); //just to show a preview to the user
  const [image, setImage] = useState(); // will be actually sent back to the server.
  const [category, setCategory] = useState(product?.category?.category || "");
  const [description, setDescription] = useState(product?.description || "");
  const [discount, setDiscount] = useState(product?.discount);

  function changeImageHandler(e) {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    if (file) {
      reader.onloadend = () => {
        // after reading the file, if successful, assign the url to the state var
        if (typeof reader.result === "string") {
          setImagePreview(reader.result);
          setImage(file);
        }
      };
      reader.readAsDataURL(file); // read the file locaiton as string url
    }
    // if (e.target.files && e.target.files[0]) {
    //   setImage(URL.createObjectURL(e.target.files[0]));
    // }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      [name, category, description, stock, price, image].some(
        (item) => item === undefined || item === ""
      )
    ) {
      toast.error('Provide all fields');
      console.log("fill all inputs");
      return;
    }

    onSubmit?.({
      name,
      price,
      stock,
      discount,
      image,
      category: category.toLowerCase(),
      description,
    }); // returns object with all the required properties and
  }

  return (
    <main className="min-h-[98vh] bg-white p-3 pl-7 border shadow-md rounded w-full relative">
      <Link to={"/admin/dashboard/products"}>
        <BiArrowBack />
      </Link>
      {onDelete && (
        <div className="delete-product-btn">
          <button onClick={onDelete}>
            <BsTrash />
          </button>
        </div>
      )}
      <h2 className="mt-1 w-full text-xl font-bold text-black text-opacity-70 tracking-wide">
        {heading}
      </h2>
      {/* {product?._id&&<span className="text-xs tracking-tight">[ {product._id} ]</span>} */}
      <form className="w-full py-5 flex items-start gap-8 product-form">
        {/* left side */}
        <section className="w-[46%] flex flex-col gap-7">
          {/* name */}
          <div>
            <fieldset className="product-form-fieldset">
              <legend>Name</legend>
              <input
                className="product-form-input"
                required
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </fieldset>
          </div>

          {/* category */}
          <div>
            <fieldset className="product-form-fieldset">
              <legend>Category</legend>
              <input
                className="product-form-input"
                required
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </fieldset>
          </div>

          {/* description */}
          <div>
            <fieldset className="product-form-fieldset">
              <legend>Description</legend>
              <textarea
                required
                name="description"
                className="product-form-input"
                placeholder="Product description..."
                cols="30"
                rows="7"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </fieldset>
          </div>

          {/* stock */}
          <div>
            <fieldset className="product-form-fieldset">
              <legend>Stock</legend>
              <input
                required
                min={0}
                className="product-form-input"
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
              />
            </fieldset>
          </div>
        </section>

        {/* right side */}
        <section className="w-[50%] flex flex-col gap-7">
          {/* price */}
          <div>
            <fieldset className="product-form-fieldset">
              <legend>Price</legend>
              <input
                required
                className="product-form-input"
                type="number"
                min={1}
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </fieldset>
          </div>

          {/* discount */}
          <div>
            <fieldset className="product-form-fieldset">
              <legend>Discount</legend>
              <input
                required
                min={0}
                max={100}
                className="product-form-input"
                type="number"
                placeholder="Discount"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
              />
            </fieldset>
          </div>

          {/* image */}
          <div className="flex flex-col gap-5">
            <fieldset className="border rounded p-3 shadow-sm flex items-end gap-2">
              <legend className="text-[0.8rem] px-[0.3rem] text-black text-opacity-60">
                Product Image
              </legend>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="New Product"
                  className="h-64 w-64 object-cover rounded-md border"
                />
              )}
              <input
                type="file"
                className="p-0.5 text-sm cursor-pointer rounded "
                onChange={changeImageHandler}
              />
            </fieldset>

            <button type="submit" onClick={handleSubmit}>
              {buttonText}
            </button>
          </div>
        </section>
      </form>
    </main>
  );
}

export default ProductForm;
