import { type IEmployeeData } from "./types/general";
import { ChangeEventHandler, useCallback, useEffect, useState } from "react";
import { SERVER_URL } from "./constants";
import SearchBox from "./components/SearchBox";
import CardList from "./components/CardList";
import Card from "./components/Card";
import CardSkeleton from "./components/CardSkeleton";
import useIsMounted from "./hooks/useIsMounted";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [employeeList, setEmployeeList] = useState<IEmployeeData[]>([]);
  const [filteredList, setFilteredList] = useState<IEmployeeData[]>([]);
  const [comparisons, setComparisons] = useState<Record<number, IEmployeeData>>(
    {}
  );
  const comparisonsEntries = Object.entries(comparisons);
  const comparisonsCount = comparisonsEntries.length;
  const canCompare = comparisonsCount < 4;
  const isMountedRef = useIsMounted();

  const fetchEmployeesData = useCallback(async () => {
    setIsLoading(true);

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
      <div
        className={`sticky bottom-0 w-full mt-2 shadow border-t-amber-400 border-t-4 grid ${
          {
            2: "grid-cols-2",
            3: "grid-cols-3",
            4: "grid-cols-4",
            5: "grid-cols-5",
          }[comparisonsCount + 1]
        } bg-gray-200 transition ${
          comparisonsCount > 1 ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="p-2 bg-white"></div>
        {comparisonsEntries.map(([id, emp]) => (
          <div key={id} className="p-2 text-center bg-white font-bold">
            {emp.employee_name.split(" ")[0]}
            <br />
            {emp.employee_name.split(" ")[1]}
            <br />
          </div>
        ))}
        <div
          className={`h-[1px] ${
            {
              2: "col-span-2",
              3: "col-span-3",
              4: "col-span-4",
              5: "col-span-5",
            }[comparisonsCount + 1]
          }`}
        />

        <div className="p-2 bg-gray-100 text-left">Salary</div>
        {comparisonsEntries.map(([id, emp]) => (
          <div key={id} className="p-2 bg-white text-center">
            ${emp.employee_salary.toLocaleString()}
          </div>
        ))}
        <div className={`h-[1px] col-span-${comparisonsCount + 1}`} />

        <div className="p-2 bg-gray-100 text-left">Age</div>
        {comparisonsEntries.map(([id, emp]) => (
          <div key={id} className="p-2 bg-white text-center">
            {emp.employee_age}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
