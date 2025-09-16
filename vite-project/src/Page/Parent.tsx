import { useEffect, useState } from "react";
import TableStudents from "./Table.tsx"
import Search from "./Sreach.tsx"
import axios from "axios";
import {Button} from "antd";
import ModalCustom from "./Modal.tsx"
import ModalDel from "./ModalDelete.tsx"
import Loader from "./Loading.tsx"

export interface Student {
    id: string;
    student_name: string;
    email: string;
    address: string;
    phone: string,
    status: boolean,
    created_at: string;
}

export default function GetAllApi() {
    const [students, setStudents] = useState<Student[]>([]);
    const [currentS, setCurrent] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalStatus, setModal] = useState(false);
    const [modalStatusDel, setModalDel] = useState(false);
    const [StudentTarget, setTarget] = useState<Student | null>(null)


    const fetchStudents = async() => {
        await fetch("http://localhost:3000/student")
            .then(response => response.json())
            .then((data: Student[]) => {
                setStudents(data);
                setCurrent(data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err)
            });
    }





    const getStudentById = async (id: number | null) =>{
        if(id === null){
            setCurrent(students)
            return;
        }
        if(id <= 0){
            return;
        }
        try{
            const response = await axios.get(`http://localhost:3000/student/${id}`);

            if(response.data) {
                console.log(response.data)
                setCurrent([response.data])
            }else{
                console.log("Without")
            }
        } catch(error: any){
            setCurrent([]);
            console.log(error);
        }
    }

    const handleModal = () => {
        setModal(!modalStatus);
    }

    const handleModalDel = () => {
        setTarget(null)
        setModalDel(!modalStatusDel);

    }


    const getStudentByIdToDel = async (id: number | null) =>{
        if(id === null){
            setTarget(null);
            return;
        }
        if(id <= 0){
            setTarget(null);
            return;
        }
        try{
            const response = await axios.get(`http://localhost:3000/student/${id}`);

            if(response.data) {
                setTarget(response.data)
            }else{
                console.log("Without")
            }
        } catch(error: any){
            setTarget(null);
            console.log(error);
        }
    }

    const handelDel = async() => {
        try{
            await axios.delete(`http://localhost:3000/student/${StudentTarget?.id}`);


            setModalDel(!modalStatusDel);
            setTarget(null);
            fetchStudents();
        } catch(error: any){

            console.log(error);
        }
    }



    useEffect(() => {
        fetchStudents().then(r => console.log(r));
    }, []);






    const handleAdd = async (data:Student) => {
        try{
            const res = await axios.post("http://localhost:3000/student", data);
            console.log("Success !!:", res.data);


            const updated = await axios.get("http://localhost:3000/student");
            setStudents(updated.data);
            setCurrent(updated.data);

        } catch (error) {
            console.error("error: ", error);
        }
   }




    return (
        <>

            {loading ? (
                <Loader/>
                ):(
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4">Danh sách Sinh viên</h1>
                    <div className={"flex gap-10 items-center"}>
                        <Search search={getStudentById} />
                        <Button onClick={handleModal} type="primary">
                            Add new Student
                        </Button>

                        <Button onClick={handleModalDel} color="danger" variant="solid">
                            Delete Student !!
                        </Button>
                    </div>
                    <ModalCustom status={modalStatus} handle={handleModal} id={students.length} handleAdd={handleAdd}/>
                    <ModalDel status={modalStatusDel} handle={handleModalDel} student={StudentTarget} search={getStudentByIdToDel} del={handelDel}/>

                    <TableStudents students={currentS}/>
                </div>
            )

            }
        </>
    )

}
