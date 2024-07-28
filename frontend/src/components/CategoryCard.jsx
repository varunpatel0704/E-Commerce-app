function CategoryCard({category, onClick}) {
  return (
    <div className="product-card flex flex-col justify-around items-center rounded-md border w-[13rem] h-[16rem] shadow hover:shadow-lg">
      <img
        className="object-contain w-24 h-24 rounded"
        src={category.image}
        alt={category.category}
      />
      <h3 className="">
        {category.category.length < 20
          ? category.category[0].toUpperCase()+category.category.slice(1)
          : category.category.slice(20) + "..."}
      </h3>

      <button
        className="rounded-full public-site-btn text-sm text-white py-2 px-3 mb-1.5 flex items-center justify-center"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault(); // to prevent link from activating
          onClick(category.category);

        }}
      >
        See More
      </button>
    </div>
  );
}

export default CategoryCard;
