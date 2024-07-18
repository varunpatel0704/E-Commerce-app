function RadioButton({ id, name, label, onOrderFilterChange }) {
  return (
    <div className="flex gap-2">
      <input
        type="radio"
        name={name}
        id={id}
        defaultChecked={id === "all orders" || id === "all time"}
        onClick={(e) =>
          onOrderFilterChange((prev) => ({ ...prev, [name]: id }))
        }
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

function OrderFilter({ onOrderFilterChange }) {
  
  return (
    <div className="filters flex sm:flex-col gap-5 p-5">
      <h3 className="text-2xl font-medium">Filters</h3>
      {/* Add filter options here */}
      <hr className="border" />

      <div className="flex flex-col gap-2.5">
        <h4 className="text-lg mb-1 font-medium">Order Status</h4>

        <RadioButton
          onOrderFilterChange={onOrderFilterChange}
          id="all orders"
          name="orderStatus"
          label="All"
        />
        <RadioButton
          onOrderFilterChange={onOrderFilterChange}
          id="processing"
          name="orderStatus"
          label="Processing"
        />
        <RadioButton
          onOrderFilterChange={onOrderFilterChange}
          id="confirmed"
          name="orderStatus"
          label="Confirmed"
        />
        <RadioButton
          onOrderFilterChange={onOrderFilterChange}
          id="delivered"
          name="orderStatus"
          label="Delivered"
        />
        
        <RadioButton
          onOrderFilterChange={onOrderFilterChange}
          id="returned"
          name="orderStatus"
          label="Returned"
        />
      </div>
      <hr className="border" />

      <div className="flex flex-col gap-2.5">
        <h4 className="text-lg mb-1 font-medium">Order Time</h4>
        <RadioButton
          onOrderFilterChange={onOrderFilterChange}
          id="all time"
          name="time"
          label="All time"
        />
        <RadioButton
          onOrderFilterChange={onOrderFilterChange}
          id="30 days"
          name="time"
          label="Last 30 days"
        />
        <RadioButton
          onOrderFilterChange={onOrderFilterChange}
          id="6 months"
          name="time"
          label="Last 6 months"
        />
        <RadioButton
          onOrderFilterChange={onOrderFilterChange}
          id="year"
          name="time"
          label="Last year"
        />
      </div>
    </div>
  );
}

export default OrderFilter;
