"use server";
export async function login(prevState, formData) {
  const credentials = Object.fromEntries(formData);
  console.log(credentials);
  return { ...prevState, errors: null };
}
