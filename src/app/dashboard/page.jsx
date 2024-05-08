import EmployeeTable from "@/components/table";

export default function Home() {
  const employee = [
    {
      image: "lmao",
      name: "lol",
      email: "lol@gmail.com",
      mobile: 20320984,
      gender: "male",
      designation: "hr",
      course: "bca",
    },
  ];
  return (
    <div>
      <EmployeeTable employeeData={employee} />
    </div>
  );
}
