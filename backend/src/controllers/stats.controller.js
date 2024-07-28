import ApiError from "../utils/ApiError.class.js";
import ApiResponse from "../utils/ApiResponse.class.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import Payment from "../models/payment.model.js";

function getPercentDiff(curr = 100, prev = 100) {
  if (prev === 0) return curr * 100;
  else return (curr - prev / prev) * 100;
}

const getDashboardInsights = asyncHandler(async function (req, res, next) {
  /* 
    stats to generate 
    widget stats=>revenue, users, orders, products
    gender ratio
    revenue & orders in past 6 months
    inventory=>%stock remaining in respective category
  */

  // widget stats
  // first of all, get the start and end date of current and previous month
  // then get the respective metrics and return the percentage difference.
  const today = new Date(); //today itself is the currentMonthEnd
  const thisMonth = {
    end: today.toISOString(),
    start: new Date(today.getFullYear(), today.getMonth(), 1).toISOString(), //first day of current month
  };

  const prevMonth = {
    end: new Date(today.getFullYear(), today.getMonth(), 0).toISOString(), // last day of previous month
    start: new Date(today.getFullYear(), today.getMonth() - 1, 1).toISOString(), // first day of previous month
  };

  // now query the metrics between prevStart & prevEnd

  // to calculate widget
  const currentNewUsersPromise = User.find({
    createdAt: {
      $gte: thisMonth.start,
      $lte: thisMonth.end,
    },
  });
  const prevNewUsersPromise = User.find({
    createdAt: {
      $gte: prevMonth.start,
      $lte: prevMonth.end,
    },
  });

  const currentNewProductsPromise = Product.find({
    createdAt: {
      $gte: thisMonth.start,
      $lte: thisMonth.end,
    },
  });
  const prevNewProductsPromise = Product.find({
    createdAt: {
      $gte: prevMonth.start,
      $lte: prevMonth.end,
    },
  });

  const currentNewOrdersPromise = Order.find({
    createdAt: {
      $gte: thisMonth.start,
      $lte: thisMonth.end,
    },
  });
  const prevNewOrdersPromise = Order.find({
    createdAt: {
      $gte: prevMonth.start,
      $lte: prevMonth.end,
    },
  });

  const allUsersPromise = User.find({}); // to calculate gender ratio
  const allProductsPromise = Product.find({}); // to calculate inventory

  const start = new Date(
    today.getFullYear(),
    today.getMonth() - 6,
  );
  const end = new Date(today.getFullYear(), today.getMonth(), 0);

  // calculate revenue and order distribution
  const orderDistributionPromise = Order.find({
    createdAt: {
      $gte: start.toISOString(),
      $lte: end.toISOString(),
    },
  });

  const [
    currentNewUsers,
    prevNewUsers,
    currentNewProducts,
    prevNewProducts,
    currentNewOrders,
    prevNewOrders,
    allUsers,
    allProducts,
    orderDistribution,
  ] = await Promise.all([
    currentNewUsersPromise,
    prevNewUsersPromise,
    currentNewProductsPromise,
    prevNewProductsPromise,
    currentNewOrdersPromise,
    prevNewOrdersPromise,
    allUsersPromise,
    allProductsPromise,
    orderDistributionPromise,
  ]);

  const usersPercent = getPercentDiff(
    currentNewUsers.length,
    prevNewUsers.length
  );
  const productsPercent = getPercentDiff(
    currentNewProducts.length,
    prevNewProducts.length
  );
  const ordersPercent = getPercentDiff(
    currentNewOrders.length,
    prevNewOrders.length
  );

  const newRevenue = currentNewOrders.reduce(
    (total, { priceDetails }) => total + priceDetails.total,
    0
  );
  const oldRevenue = prevNewOrders.reduce(
    (total, { priceDetails }) => total + priceDetails.total,
    0
  );
  const revenuePercent = getPercentDiff(newRevenue, oldRevenue);

  //calculate gender ratio
  let maleCount = 0;
  allUsers.forEach((user) => {
    if (user.gender === "male") maleCount++;
  });

  const malePercent = (maleCount / allUsers.length) * 100;

  // calculate revenue and orders distribution
  // return previous 6 months of revenue and order distribution
  const revenueAndOrders = {
    start,
    end,
    revenue:[],
    orders:[]
  };
  const sortedDistribution = orderDistribution.sort((o1, o2) => {
    const d1 = new Date(o1.createdAt);
    const d2 = new Date(o2.createdAt);
    return d1 < d2 ? -1 : 1; //sorted in ascending order by date.
  });

  let it = 0;
  for (let i = 6; i >= 1; i--) {
    const currentMonth = today.getMonth() - i;
    let revenue = 0;
    let orders = 0;
    while (it < sortedDistribution.length) {
      const order = sortedDistribution[it];
      const month = new Date(order.createdAt).getMonth();
      if (month <= currentMonth) {
        revenue += order.priceDetails.total;
        orders += order.orderItems.length;
        it++;
      } else break;
    }
    revenueAndOrders.revenue.push(revenue);
    revenueAndOrders.orders.push(orders);
  }

  // calculate inventory
  const inventory = allProducts.map(({ initialStock, stock }) => ({
    initialStock,
    stock,
  }));

  const stats = {
    widget: { usersPercent, productsPercent, ordersPercent, revenuePercent },
    genderRatio: malePercent,
    revenueAndOrders,
    inventory,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, "Generated dashboard stats", stats));
});

export { getDashboardInsights };