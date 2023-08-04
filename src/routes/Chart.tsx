import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: 0;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data:
                data?.map((price) => [
                  price.time_close * 1000,
                  parseFloat(price.open),
                  parseFloat(price.high),
                  parseFloat(price.low),
                  parseFloat(price.close),
                ]) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              type: "candlestick",
              height: 100,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            xaxis: {
              type: "datetime",
              // categories: data?.map((date) =>
              //   new Date(date.time_close * 1000).toUTCString()
              // ),
              // axisBorder: { show: false },
              // axisTicks: { show: false },
              // labels: { show: false },
            },
            // yaxis: {
            //   show: false,
            // },
            // fill: {
            //   type: "gradient",
            //   gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
            // },
            // colors: ["#0fbcf9"],
            // tooltip: {
            //   y: { formatter: (value) => `$${value.toFixed(2)}` },
            // },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
