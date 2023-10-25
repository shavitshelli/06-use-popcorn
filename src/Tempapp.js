// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function TempApp() {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("USD");

  const [coinVal, setCoinVal] = useState(0);
  const [coinValAfter, setCoinValAfter] = useState(0);

  function handleFrom(newCoin) {
    setFrom(newCoin);
  }

  function handleTo(newCoin) {
    setTo(newCoin);
  }

  useEffect(
    function () {
      async function fetchCoinData() {
        if (coinVal !== 0) {
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${coinVal}&from=${from}&to=${to}`
          );

          const data = await res.json();

          if (data) setCoinValAfter(data.rates[to]);
        }
      }
      from !== to ? fetchCoinData() : setCoinValAfter(coinVal);
    },
    [from, to, coinVal]
  );

  return (
    <div>
      <input type="text" onChange={(e) => setCoinVal(Number(e.target.value))} />
      <select
        vlaue={from}
        onChange={(e) => {
          handleFrom(e.target.value);
        }}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={to} onChange={(e) => handleTo(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      {coinValAfter !== 0 ? <p>{coinValAfter}</p> : null}
    </div>
  );
}
