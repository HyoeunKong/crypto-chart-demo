import { useEffect, useRef, useState } from "react";
import { IHistorical } from "./Coin";

export const useChartOption = ({ data }: any) => {
  const [chartOptions, setChartOptions] = useState<any>();
  const [price, setPrice] = useState<number | string>(0);
  function maxValue(arr?: IHistorical[]) {
    return arr?.reduce((prev, val) =>
      prev.trade_price > val.trade_price ? prev : val
    );
  }

  function minValue(arr?: IHistorical[]) {
    return arr?.reduce((prev, val) =>
      prev.trade_price < val.trade_price ? prev : val
    );
  }

  useEffect(() => {
    setChartOptions({
      theme: { mode: "dark" },
      chart: {
        events: {
          mouseMove: function (
            event: any,
            vhartContextLany: any,
            { dataPointIndex }: any
          ) {
            if (data) {
              if (dataPointIndex === -1) {
                return;
              }
              setPrice(data[dataPointIndex]?.trade_price);
            }
          },

          markerClick: (
            event: any,
            vhartContextLany: any,
            { dataPointIndex }: any
          ) => {
            console.log(dataPointIndex);
            if (data) {
              setPrice(data[dataPointIndex]?.trade_price);
            }
          },
        },
        toolbar: {
          show: false,
        },
        background: "transparent",
        zoom: {
          enabled: false,
        },
      },
      tooltip: {
        custom: () => {
          return null;
        },
      },

      annotations: {
        // xaxis:{
        //     x:data[]
        // },
        points: [
          {
            x: maxValue(data)?.timestamp,
            y: maxValue(data)?.trade_price,
            marker: {
              size: 2,
              offsetY: -10,
              fillColor: "#0fbcf9",
              strokeColor: "#0fbcf9",
              cssClass: "apexcharts-custom-class",
            },
            label: {
              borderColor: "transparent",
              offsetY: -15,
              offsetX: -20,
              style: {
                color: "#0fbcf9",
                background: "transparent",
                fontSize: "10px",
              },

              text: `최고 ${maxValue(data)?.trade_price.toLocaleString()}`,
            },
          },
          {
            x: minValue(data)?.timestamp,
            y: minValue(data)?.trade_price,
            marker: {
              size: 2,
              offsetY: -15,
              fillColor: "#0be881",
              strokeColor: "#0be881",
              radius: 2,
              cssClass: "apexcharts-custom-class",
            },
            label: {
              borderColor: "transparent",
              offsetY: -15,
              style: {
                color: "#0be881",
                background: "transparent",
                fontSize: "10px",
              },

              text: `최저 ${minValue(data)?.trade_price.toLocaleString()}원`,
            },
          },
        ],
      },
      grid: {
        show: false,
      },
      stroke: {
        curve: "smooth",
        width: 4,
      },
      yaxis: {
        show: false,
      },
      xaxis: {
        labels: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },

        axisTicks: {
          show: false,
        },
        axisBorder: { show: false },
        type: "datetime",
        categories: data?.map((price: any) => price.timestamp),
      },
      fill: {
        type: "gradient",
        gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
      },
      colors: ["#0fbcf9"],
      //   markers: {
      //     size: 0,
      //     hover: { size: 0 },
      //   },
    });
  }, [data]);
  return { chartOptions, price };
};
