"use server";
export async function login(prevState, formData) {
  const credentials = Object.fromEntries(formData);

  return { ...prevState, errors: null };
}
export async function createEmpoyee(prevState, formData) {
  const employee = Object.fromEntries(formData);
  console.log(employee);
  return { ...prevState, errors: null };
}
