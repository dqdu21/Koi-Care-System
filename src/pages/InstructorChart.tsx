import { ResponsiveLine } from "@nivo/line";

const InstructorChart = () => {
  const data = [
    {
      "id": "Sales",
      "color": "hsl(249, 70%, 50%)",
      "data": [
        { "x": "Jan", "y": 259 },
        { "x": "Feb", "y": 192 },
        { "x": "Mar", "y": 240 },
        { "x": "Apr", "y": 48 },
        { "x": "May", "y": 92 },
        { "x": "Jun", "y": 64 },
        { "x": "Jul", "y": 122 },
        { "x": "Aug", "y": 88 },
        { "x": "Sep", "y": 300 },
        { "x": "Oct", "y": 220 },
        { "x": "Nov", "y": 122 },
        { "x": "Dec", "y": 59 }
      ]
    },
    {
      "id": "Courses",
      "color": "hsl(45, 70%, 50%)",
      "data": [
        { "x": "Jan", "y": 180 },
        { "x": "Feb", "y": 245 },
        { "x": "Mar", "y": 16 },
        { "x": "Apr", "y": 175 },
        { "x": "May", "y": 194 },
        { "x": "Jun", "y": 254 },
        { "x": "Jul", "y": 45 },
        { "x": "Aug", "y": 114 },
        { "x": "Sep", "y": 91 },
        { "x": "Oct", "y": 50 },
        { "x": "Nov", "y": 86 },
        { "x": "Dec", "y": 59 }
      ]
    },
    {
      "id": "Purchased",
      "color": "hsl(96, 70%, 50%)",
      "data": [
        { "x": "Jan", "y": 137 },
        { "x": "Feb", "y": 39 },
        { "x": "Mar", "y": 49 },
        { "x": "Apr", "y": 246 },
        { "x": "May", "y": 62 },
        { "x": "Jun", "y": 71 },
        { "x": "Jul", "y": 272 },
        { "x": "Aug", "y": 86 },
        { "x": "Sep", "y": 127 },
        { "x": "Oct", "y": 172 },
        { "x": "Nov", "y": 103 },
        { "x": "Dec", "y": 290 }
      ]
    },
    {
      "id": "Followers",
      "color": "hsl(126, 70%, 50%)",
      "data": [
        { "x": "Jan", "y": 13 },
        { "x": "Feb", "y": 51 },
        { "x": "Mar", "y": 123 },
        { "x": "Apr", "y": 67 },
        { "x": "May", "y": 234 },
        { "x": "Jun", "y": 123 },
        { "x": "Jul", "y": 123 },
        { "x": "Aug", "y": 44 },
        { "x": "Sep", "y": 154 },
        { "x": "Oct", "y": 50 },
        { "x": "Nov", "y": 86 },
        { "x": "Dec", "y": 59 }
      ]
    },
  ];

  return (
    <div className="w-full h-96 md:h-400 lg:h-500">
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 0,
          max: 'auto',
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        curve="cardinal"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Month',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Value',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        colors={{ scheme: 'dark2' }}
        pointSize={7}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableArea={true}
        areaOpacity={0.1}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[]}
      />
    </div>
  );
};

export default InstructorChart;
