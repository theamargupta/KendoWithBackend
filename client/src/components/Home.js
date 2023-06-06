import React, { useEffect, useState } from "react";
import GridComp from "./Grid";
import ChartContainer from "./Charts";
import axios from "axios";

const Home = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const getOrders = await axios.get(`/api/getOrders`);
        setOrders(getOrders.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  return (
    <div className="row m-10">
      {orders.length > 0 ? <GridComp orders={orders} /> : "...Loading"}
      <ChartContainer />
    </div>
  );
};

export default Home;
