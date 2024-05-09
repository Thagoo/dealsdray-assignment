"use client";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import TableSearchInput from "@/ui/table-search";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { deleteEmpoyee } from "@/lib/action";

const employeeDataHeaders = [
  "Unique ID",
  "Image",
  "Name",
  "Email",
  "Mobile No.",
  "Designation",
  "Gender",
  "Course",
  "Created Date",
  "Action",
];
export default function EmployeeTable({ employeeData }) {
  // const paginatedEmployeeData: PaginatedEmployeeData = generatePagination(employeeData);

  const [employees, setEmployees] = useState(employeeData);

  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  const handleDeleteEmployee = async (id) => {
    await deleteEmpoyee(id);
    router.refresh();
  };

  useEffect(() => {
    router.refresh();
  }, []);

  useEffect(() => {
    setEmployees(employeeData);
  }, [employeeData]);

  useEffect(() => {
    if (searchTerm?.length < 3) {
      setEmployees(employeeData);
    } else {
      const filteredData = employeeData.filter((emp) =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setEmployees(filteredData);
    }
  }, [searchTerm]);

  return (
    <>
      <div className="flex justify-between md:px-2 mb-2">
        <div className="flex justify-between w-full gap-1">
          <h1 className="hidden md:block text-xl text-accent-foreground font-semibold">
            Employees
          </h1>
          <TableSearchInput
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <div className="flex md:gap-4 items-center">
            <h1 className="hidden md:block text-lg text-accent-foreground font-semibold">
              Total Count: {employeeData.length}
            </h1>

            <Link href="/dashboard/create">
              <span className="bg-slate-800 rounded-md py-2 px-2 whitespace-nowrap text-xs md:text-md text-white hover:bg-slate-700">
                Create Employee
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full min-h-[50vh] max-h-[80vh] overflow-x-auto space-y-2 border border-accent">
        <table className="w-full text-xs md:text-sm text-left text-gray-500 dark:text-gray-400 text-ellipsis whitespace-nowrap ">
          <thead className="sticky top-0 text-xs text-gray-700  bg-background dark:text-gray-400 border ">
            <tr className=" border-b-2">
              {employeeDataHeaders.map((header, i) => (
                <th
                  key={i}
                  scope="col"
                  className="px-4 py-2 w-fit whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className=" overflow-auto">
            {employees.map((item, i) => (
              <tr
                key={i}
                className="border-b bg-background border cursor-pointer"
              >
                <td className="px-4 py-4">{item._id}</td>
                <td className="px-4 py-4">
                  <Image
                    src={item.image || "/assets/no-avatar.svg"}
                    alt="avatar logo"
                    width={40}
                    height={24}
                    className="rounded-full p-1 mr-2"
                  />
                </td>
                <td className="px-4 py-4">{item.name}</td>
                <td className="px-4 py-4">{item.email}</td>
                <td className="px-4 py-4">{item.mobile}</td>
                <td className="px-4 py-4">{item.designation}</td>
                <td className="px-4 py-4">{item.gender}</td>
                <td className="px-4 py-4">{item.course}</td>
                <td className="px-4 py-4">{formatDate(item.createdAt)}</td>
                <td className="px-4 py-4 gap-2 flex">
                  <Link
                    href={`/dashboard/${item._id}/edit`}
                    className="bg-indigo-600 py-1 px-2 rounded-md text-white hover:bg-indigo-400"
                  >
                    Edit
                  </Link>
                  <button
                    className="bg-red-600 py-1 px-2 rounded-md text-white hover:bg-red-400"
                    onClick={() => handleDeleteEmployee(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {employees.length < 1 && (
          <div className="h-56 w-full flex justify-center items-center">
            <span>No data found</span>
          </div>
        )}
      </div>
    </>
  );
}
