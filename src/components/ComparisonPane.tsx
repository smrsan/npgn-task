import { IEmployeeData } from "../types/general";

interface ComparisonPaneProps {
  comparisons: Record<number, IEmployeeData>;
}

const ComparisonPane = ({ comparisons }: ComparisonPaneProps) => {
  const comparisonsEntries = Object.entries(comparisons);
  const comparisonsCount = comparisonsEntries.length;

  return (
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
  );
};

export default ComparisonPane;
