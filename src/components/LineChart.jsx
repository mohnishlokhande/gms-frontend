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
    totalUser: 23,
  },
  {
    day: "Tuesday",
    activeUser: 15,
    inactiveUser: 12,
    totalUser: 27,
  },
  {
    day: "Wednesday",
    activeUser: 5,
    inactiveUser: 10,
    totalUser: 27,
  },
  {
    day: "Thrusday",
    activeUser: 10,
    inactiveUser: 5,
    totalUser: 23,
  },
  {
    day: "Firday",
    activeUser: 9,
    inactiveUser: 4,
    totalUser: 21,
  },
  {
    day: "Staturday",
    activeUser: 10,
    inactiveUser: 8,
    totalUser: 29,
  },
  {
    day: "Sunday",
    activeUser: 10,
    inactiveUser: 8,
    totalUser: 23,
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
          <Line dataKey="activeUser" stroke="green" activeDot={{ r: 8 }} />
          <Line dataKey="inactiveUser" stroke="grey" activeDot={{ r: 8 }} />
          <Line dataKey="totalUser" stroke="orange" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

export default LineChartGraph;
