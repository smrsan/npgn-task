import { type IEmployeeData } from "../types/general";

interface CardProps {
  employee: IEmployeeData;
}

const Card = ({ employee: emp }: CardProps) => {
  return (
    <div className="shadow rounded-md overflow-hidden max-w-2xl">
      <img
        className="w-full h-auto aspect-square bg-gray-200"
        alt={emp.employee_name}
        src={emp.profile_image || "/images/256.png"}
      />
      <div className="p-2">
        <div className="flex flex-row">
          <h3 className="text-lg grow">{emp.employee_name}</h3>
          <h3 className="text-lg">{emp.employee_age}</h3>
        </div>
        <h5 className="text-gray-400">
          ${emp.employee_salary.toLocaleString()}
        </h5>
      </div>
    </div>
  );
};

export default Card;
