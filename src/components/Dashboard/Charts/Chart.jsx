import React from "react";
import PropTypes from 'prop-types';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart, Area, Bar } from 'recharts';

const Chart = ({chartData}) => {
      
const combinedData = chartData.reduce((acc, item)=>{
  const {date,price,quantity} = item;
  if(!acc[date]){
   acc[date] = {date, totalPrice:0, totalQuantity:0, totalOrders:0}
  }
  // 
  acc[date].totalPrice += price;
  acc[date].totalQuantity += quantity;
  acc[date].totalOrders += 1;
  return acc
},{})
const result = Object.values(combinedData)

    //   
  return (
    <div className="overflow-auto">
      <ComposedChart width={730} height={250} data={result}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        <Area type="monotone" dataKey="totalQuantity" fill="#8884d8" stroke="#8884d8" />
        <Bar dataKey="totalOrders" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="totalPrice" stroke="#ff7300" />
      </ComposedChart>
    </div>
  );
};
Chart.propTypes = {
  chartData: PropTypes.shape({
    date: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.number,
    order: PropTypes.number,
  }).isRequired,
};

export default Chart;

