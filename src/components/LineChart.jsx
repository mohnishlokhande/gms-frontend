import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const pdata = [
  {
    day: "Monday",
    activeUser: 13,
    inactiveUser: 10,
    revenue: 3,
  },
  {
    day: "Tuesday",
    activeUser: 15,
    inactiveUser: 12,
    revenue: 27,
  },
  {
    day: "Wednesday",
    activeUser: 5,
    inactiveUser: 10,
    revenue: 27,
  },
  {
    day: "Thrusday",
    activeUser: 10,
    inactiveUser: 5,
    revenue: 14,
  },
  {
    day: "Firday",
    activeUser: 9,
    inactiveUser: 4,
    revenue: 21,
  },
  {
    day: "Staturday",
    activeUser: 10,
    inactiveUser: 8,
    revenue: 29,
  },
  {
    day: "Sunday",
    activeUser: 10,
    inactiveUser: 8,
    revenue: 23,
  },
];

function LineChartGraph() {
  return (
    <>
      <ResponsiveContainer width="100%" aspect={2}>
        <LineChart
          data={pdata}
          //   width={500}
          //   height={300}
          //   margin={{ top: 5, right: 300, left: 20, bottom: 5 }}
        >
          <XAxis
            dataKey="day"
            interval={"preserveStartEnd"}
            // tickFormatter={(value) => value + " Programming"}
          />
          <YAxis />
          <Tooltip
          //   contentStyle={{ backgroundColor: "grey" }}
          />
          <Legend />
          <Line dataKey="revenue" stroke="green" activeDot={{ r: 8 }} />
          {/* <Line dataKey="inactiveUser" stroke="grey" activeDot={{ r: 8 }} />
          <Line dataKey="totalUser" stroke="orange" activeDot={{ r: 8 }} /> */}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

export default LineChartGraph;
