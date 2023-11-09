import { useState, useEffect } from "react";

export function useLocalStorageState(initState, keyName) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(keyName);

    return storedValue ? JSON.parse(storedValue) : initState;
  });
  useEffect(
    function () {
      localStorage.setItem(keyName, JSON.stringify(value));
    },
    [value, keyName]
  );

  return [value, setValue];
}
