import {type Student} from "./Parent.tsx"
import {Pagination} from "antd";
import {useState} from "react";


interface TableStudentsProps {
    students?: Student[]
}

export default function table({students}: TableStudentsProps) {

    if(!students){
        return <h1>Empty..</h1>
    }
    const [Page, setPage] = useState(1);

    const onChange = (page:number) => {


        setPage(page);
        console.log('Page:', Page);
    }

    return (
        <div className="overflow-x-auto shadow-md mt-10 rounded-lg">
            <table className="min-w-full border border-gray-300 text-sm text-left text-gray-700">
                <thead className="bg-gray-100 text-gray-800 uppercase">
                <tr>
                    <th className="px-4 py-2 border">ID</th>
                    <th className="px-4 py-2 border">Name</th>
                    <th className="px-4 py-2 border">Email</th>
                    <th className="px-4 py-2 border">Address</th>
                    <th className="px-4 py-2 border">Phone</th>
                    <th className="px-4 py-2 border">Status</th>
                    <th className="px-4 py-2 border">Created At</th>
                </tr>
                </thead>
                <tbody>
                {students.slice((Page - 1) * 10, Page * 10)
                    .map((a) => (
                    <tr
                        key={a.id}
                        className="hover:bg-gray-50 transition-colors"
                    >
                        <td className="px-4 py-2 border">{a.id}</td>
                        <td className="px-4 py-2 border">{a.student_name}</td>
                        <td className="px-4 py-2 border">{a.email}</td>
                        <td className="px-4 py-2 border">{a.address}</td>
                        <td className="px-4 py-2 border">{a.phone}</td>
                        <td className="px-4 py-2 border">
                            {a.status ? (
                                <span className="text-green-600 font-medium">Active</span>
                            ) : (
                                <span className="text-red-600 font-medium">Inactive</span>
                            )}
                        </td>
                        <td className="px-4 py-2 border">{a.created_at}</td>
                    </tr>
                ))}





                </tbody>
            </table>

           <div className={"mt-10 pb-20"}>
               <Pagination
                   defaultCurrent={Page}
                   total={students.length}
                   pageSize={10}
                   onChange={onChange}

               />
           </div>

        </div>
    )
}