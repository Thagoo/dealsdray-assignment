import { Employee } from "./models";
import { connectDb } from "./utils";

export async function fetchEmployees() {
  try {
    connectDb();
    const employees = await Employee.find();
    return JSON.parse(JSON.stringify(employees));
  } catch (error) {}
}

export async function fetchEmployeeById(id) {
  try {
    await connectDb();
    const employee = await Employee.findById(id);

    return JSON.parse(JSON.stringify(employee));
  } catch (error) {
    console.log(error);
  }
}
