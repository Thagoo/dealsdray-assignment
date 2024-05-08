"use client";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import TableSearchInput from "@/ui/table-search";
import Link from "next/link";

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

  const [data, setData] = useState(employeeData);

  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  const handleWeather = () => {
    e.preventDefault();
  };

  useEffect(() => {
    if (searchTerm?.length < 3) {
      setData(employeeData);
    } else {
      const filteredData = deepSearch(data, searchTerm);

      setData(filteredData);
    }
  }, [searchTerm]);

  return (
    <>
      <div className="flex justify-between px-2 mb-2 ">
        <div className="flex justify-between w-full">
          <h1 className="hidden md:block text-lg text-accent-foreground">
            Employees
          </h1>
          <div className="flex gap-4">
            <h1 className="hidden md:block text-lg text-accent-foreground">
              Total Count: {employeeData.length}
            </h1>
            <Link href="/dashboard/create">
              <span className="bg-slate-800 rounded-md py-2 px-4 text-white hover:bg-slate-700">
                Create Employee
              </span>
            </Link>
          </div>

          <TableSearchInput
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </div>
      <div className="w-full max-h-screen overflow-x-auto space-y-2">
        <table className="w-full text-xs md:text-sm text-left text-gray-500 dark:text-gray-400 text-ellipsis whitespace-nowrap ">
          <thead className="sticky top-0 text-xs text-gray-700  bg-background dark:text-gray-400  ">
            <tr>
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
            {data.map((item, i) => (
              <tr
                key={i}
                className="border-b bg-background border border-accent cursor-pointer"
              >
                <td className="px-4 py-4">{item._id}</td>
                <td className="px-4 py-4">{item.image}</td>
                <td className="px-4 py-4">{item.name}</td>
                <td className="px-4 py-4">{item.email}</td>
                <td className="px-4 py-4">{item.mobile}</td>
                <td className="px-4 py-4">{item.designation}</td>
                <td className="px-4 py-4">{item.gender}</td>
                <td className="px-4 py-4">{item.course}</td>
                <td className="px-4 py-4">{item.created}</td>
                <td className="px-4 py-4 gap-2 flex">
                  <Link
                    href={`/dashboard/${item._id}/edit`}
                    className="bg-indigo-600 py-1 px-2 rounded-md text-white hover:bg-indigo-400"
                  >
                    Edit
                  </Link>
                  <button className="bg-red-600 py-1 px-2 rounded-md text-white hover:bg-red-400">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length < 1 && (
          <div className="h-56 w-full flex justify-center items-center">
            <span>No data found</span>
          </div>
        )}
      </div>
      {/* <Pagination
        totalPages={paginatedCityData.totalPages}
        page={page}
        setPage={setPage}
      /> */}
    </>
  );
}
