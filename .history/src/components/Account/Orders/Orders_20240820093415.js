import { useState, useEffect } from "react";
import { Order } from "@/api";

const orderCtrl = new Order();

export function Orders() {
  const [orders, setOrders] = useState(null);
  return (
    <div>
      <h2>Orders</h2>
    </div>
  );
}
