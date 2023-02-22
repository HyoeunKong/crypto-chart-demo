import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ApexChart from "react-apexcharts";
import { useEffect, useState } from "react";
import { useChartOption } from "./chartOptions";
export interface IHistorical {
  market: string;
  candle_date_time_utc: string;
  candle_date_time_kst: string;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  timestamp: number;
  candle_acc_trade_price: number;
  candle_acc_trade_volume: number;
  unit: number;
}

function Coin() {
  const fetchCoinHistory = () => {
    return fetch(
      "https://api.upbit.com/v1/candles/days?market=KRW-BTC&count=90"
    ).then((res) => res.json());
  };
  const { data, isLoading } = useQuery<IHistorical[]>(
    "coinHistory",
    fetchCoinHistory,
    {
      refetchInterval: 3000,
    }
  );

  const { chartOptions, price } = useChartOption({ data });
  if (!data) {
    return <></>;
  }
  return (
    <div
      style={{
        width: "100%",
        padding: 10,
        maxWidth: 1000,
      }}
    >
      {isLoading ? (
        "Loading chart..."
      ) : (
        <>
          <div>
            <h1 style={{ color: "#fff", lineHeight: 10 }}>
              {`${price?.toLocaleString()}`}
            </h1>
          </div>
          <ApexChart
            type="line"
            width="100%"
            height="300"
            series={[
              {
                name: "Price",
                data: data?.map((price) => +price.trade_price) ?? [],
              },
            ]}
            options={chartOptions}
          />
        </>
      )}
    </div>
  );
}
export default Coin;
