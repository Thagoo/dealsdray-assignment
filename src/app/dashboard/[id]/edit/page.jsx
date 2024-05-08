import EditEmpoyeeForm from "@/components/dashboard/edit-emploee-form";
import { fetchEmployeeById } from "@/lib/data";

export default async function Edit({ params }) {
  const { id } = params;
  const employee = await fetchEmployeeById(id);

  if (!employee) {
    return;
  }
  return (
    <div>
      <EditEmpoyeeForm employeeData={employee} />
    </div>
  );
}
