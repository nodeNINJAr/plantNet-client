import React from "react";
import PropTypes from 'prop-types';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart, Area, Bar } from 'recharts';

const Chart = ({chartData}) => {
    const data = [
        {
          "date": chartData?.date,
          "quantity": chartData?.quantity,
          "price": chartData?.price,
          "order": chartData?.order,
        },
       
      ]

      
    //   
  return (
    <div>
      <ComposedChart width={730} height={250} data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        <Area type="monotone" dataKey="quantity" fill="#8884d8" stroke="#8884d8" />
        <Bar dataKey="order" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="price" stroke="#ff7300" />
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

