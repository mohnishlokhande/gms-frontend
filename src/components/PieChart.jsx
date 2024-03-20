import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "New Membership", value: 1 },
  { name: "Renewal", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F"];

const renderCustomizedLabel = (props) => {
  const { name } = props;

  return name;
};

export default function PieChartGraph() {
  return (
    <ResponsiveContainer width="100%" aspect={2}>
      <PieChart width="100%" height="100%">
        <Pie
          data={data}
          cx="45%"
          cy="50%"
          labelLine={true}
          label={renderCustomizedLabel}
          isAnimationActive={false}
          outerRadius={80}
          fill="#fff"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
