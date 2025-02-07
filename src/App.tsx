import { useCallback, useEffect, useState } from "react";
import { SERVER_URL } from "./constants";

function App() {
  const [data, setData] = useState({});

  const fetchEmployeesData = useCallback(async () => {
    const resp = await fetch(`${SERVER_URL}/api/v1/employees`, {
      method: "GET",
    });
    const data = await resp.json();

    setData(data);
  }, []);

  useEffect(() => {
    fetchEmployeesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{JSON.stringify(data)}</>;
}

export default App;

