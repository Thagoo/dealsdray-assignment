import EditEmpoyeeForm from "@/components/dashboard/edit-emploee-form";

const employee = {
  image: "lmao",
  name: "lol",
  email: "lol@gmail.com",
  mobile: 20320984,
  gender: "male",
  designation: "hr",
  course: "bca",
};

export default function Edit() {
  return (
    <div>
      <EditEmpoyeeForm employeeData={employee} />
    </div>
  );
}
