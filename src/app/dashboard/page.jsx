import EmployeeTable from "@/components/table";
import { fetchEmployees } from "@/lib/data";

export default async function Home() {
  const employees = await fetchEmployees();

  return <EmployeeTable employeeData={employees} />;
}
