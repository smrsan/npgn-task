import { useCallback } from "react";
import { type IEmployeeData } from "../types/general";

interface CardProps {
  employee: IEmployeeData;
  onToggleCompare: (emp: IEmployeeData) => void;
  isCompared: boolean;
  canCompare: boolean;
}

const Card = ({
  employee: emp,
  onToggleCompare,
  isCompared,
  canCompare,
}: CardProps) => {
  const handleToggleCompare = useCallback(() => {
    onToggleCompare(emp);
  }, [emp, onToggleCompare]);

  return (
    <div className="group shadow rounded-md overflow-hidden max-w-2xl">
      <div className="relative">
        <img
          className="w-full h-auto aspect-square bg-gray-200"
          alt={emp.employee_name}
          src={emp.profile_image || "/images/256.png"}
        />
        <div
          className={`absolute top-0 left-0 w-full aspect-square bg-amber-300/75 transition opacity-0 flex items-center justify-center ${
            isCompared
              ? "opacity-100"
              : canCompare
              ? "group-hover:opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {isCompared ? (
            <button onClick={handleToggleCompare} className="btn">
              Remove
            </button>
          ) : (
            <button onClick={handleToggleCompare} className="btn-outlined">
              Compare
            </button>
          )}
        </div>
      </div>
      <div className="p-2">
        <div className="flex flex-row items-center">
          <h3 className="text-lg grow">{emp.employee_name}</h3>
          <h3 className="text-sm">Age: {emp.employee_age}</h3>
        </div>
        <h5 className="text-gray-400">
          ${emp.employee_salary.toLocaleString()}
        </h5>
      </div>
    </div>
  );
};

export default Card;
