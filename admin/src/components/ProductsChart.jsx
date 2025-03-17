import { BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis,Bar } from 'recharts';

const ProductsChart = () => {
    const productData = [
        { name: 'T-Shirt', sales: 150 },
        { name: 'Jeans', sales: 120 },
        { name: 'Shoes', sales: 90 },
        { name: 'Jacket', sales: 80 },
      ];
  return (
    <div className="bg-white p-4 shadow-lg rounded-xl">
    <h2 className="text-xl font-bold mb-4">Top Selling Products</h2>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={productData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="sales" fill="#0033cc" barSize={20} radius={[5, 5, 0, 0]} fillOpacity={0.9} />
      </BarChart>
    </ResponsiveContainer>
  </div>
  )
}

export default ProductsChart;