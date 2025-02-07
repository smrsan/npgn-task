import { type IEmployeeData } from "./types/general";
import { ChangeEventHandler, useCallback, useEffect, useState } from "react";
import { SERVER_URL } from "./constants";
import SearchBox from "./components/SearchBox";
import CardList from "./components/CardList";
import Card from "./components/Card";
import CardSkeleton from "./components/CardSkeleton";
import useIsMounted from "./hooks/useIsMounted";
import ComparisonPane from "./components/ComparisonPane";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [employeeList, setEmployeeList] = useState<IEmployeeData[]>([]);
  const [filteredList, setFilteredList] = useState<IEmployeeData[]>([]);
  const [comparisons, setComparisons] = useState<Record<number, IEmployeeData>>(
    {}
  );
  const canCompare = Object.keys(comparisons).length < 4;
  const isMountedRef = useIsMounted();

  const fetchEmployeesData = useCallback(async () => {
    setIsLoading(true);

    // Artificial delay
    await new Promise((r) => setTimeout(r, 1000));

    const resp = await fetch(`${SERVER_URL}/api/v1/employees`, {
      method: "GET",
    });
    const data = (await resp.json())?.data;

    if (isMountedRef.current === false) return;

    setIsLoading(false);
    setEmployeeList(data);
    setFilteredList(data);
  }, [isMountedRef]);

  const handleSearchChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      const searchText = event.target.value.toLowerCase().trim();

      if (searchText === "") {
        setFilteredList(employeeList);
        return;
      }

      setFilteredList(
        employeeList.filter((emp) => {
          return emp.employee_name.toLowerCase().includes(searchText);
        })
      );
    },
    [employeeList]
  );

  const handleToggleCompare = useCallback(
    (emp: IEmployeeData) => {
      if (emp.id in comparisons) {
        setComparisons((prev) => {
          const newComparisons = { ...prev };
          delete newComparisons[emp.id];
          return newComparisons;
        });
      } else {
        setComparisons((prev) => ({ ...prev, [emp.id]: emp }));
      }
    },
    [comparisons]
  );

  useEffect(() => {
    fetchEmployeesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-2 sm:px-8 md:px-12 lg:max-w-[80vw] mx-auto">
      <SearchBox onChange={handleSearchChange} />
      <CardList>
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => <CardSkeleton key={i} />)
          : filteredList.map((emp) => (
              <Card
                key={emp.id}
                employee={emp}
                onToggleCompare={handleToggleCompare}
                isCompared={emp.id in comparisons}
                canCompare={canCompare}
              />
            ))}
      </CardList>
      <ComparisonPane comparisons={comparisons} />
    </div>
  );
}

export default App;
