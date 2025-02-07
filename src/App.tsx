import { type IEmployeeData } from "./types/general";
import { useCallback, useEffect, useState } from "react";
import { SERVER_URL } from "./constants";
import SearchBox from "./components/SearchBox";
import CardList from "./components/CardList";
import Card from "./components/Card";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [employeeList, setEmployeeList] = useState<IEmployeeData[]>([]);

  const fetchEmployeesData = useCallback(async () => {
    setIsLoading(true);

    const resp = await fetch(`${SERVER_URL}/api/v1/employees`, {
      method: "GET",
    });
    const data = (await resp.json())?.data;

    setIsLoading(false);
    setEmployeeList(data);
  }, []);

  useEffect(() => {
    fetchEmployeesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-2 sm:px-8 md:px-12 lg:max-w-[80vw] mx-auto">
      <SearchBox />
      <CardList>
        {isLoading && <span>Loading Employees...</span>}
        {!isLoading &&
          employeeList.map((emp) => <Card key={emp.id} employee={emp} />)}
      </CardList>
    </div>
  );
}

export default App;
