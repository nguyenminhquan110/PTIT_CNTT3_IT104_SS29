import {Form, Input, Modal} from 'antd';
import React, {useState} from "react";
import type {Student} from "./Parent.tsx";

interface ModalCustomProps {
    status?: boolean,
    handle?: () => void,
    id?: number
    handleAdd: (data: Student) => Promise<void>;
}

type FieldType = {
    // id?: number;
    student_name: string;
    email: string;
    address: string;
    phone: string;
    // status?: boolean;
    // created_at: string;
};


export default function CustomModal({status, handle, id, handleAdd}: ModalCustomProps) {
    const [dataForm, setForm] = useState<FieldType>(
        {
            address: "",
            email: "",
            phone: "",
            student_name: ""
        }
    );

    const handeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        console.log(name + value);

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    const handleOk = async () => {
        const check = Object.entries(dataForm).every(([_, v]) => v !== "");
        if(!id){
            return
        }
        if (check) {

            const date = new Date().toISOString();

            const data:Student = {
                id: (id + 1).toString(),
                student_name: dataForm.student_name,
                email: dataForm.email,
                address: dataForm.address,
                phone: dataForm.phone,
                status: false,
                created_at: date,
            }


            await handleAdd(data);

            if (handle) {
                handle();
            }
        }
    }


    return (
        <div>
            <Modal
                title="Add new student"
                closable={{'aria-label': 'Custom Close Button'}}
                open={status}
                onOk={handleOk}
                onCancel={handle}
            >
                {
                    <div>
                        <Form
                            name="basic"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 16}}
                            initialValues={{remember: true}}
                            // onFinish={onFinish}
                            // onFinishFailed={onFinishFailed}
                            className={"text-center"}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Username"
                                rules={[{required: true, message: 'Please input your username!'}]}
                            >
                                <Input name="student_name" onChange={handeInput}/>
                            </Form.Item>

                            <Form.Item

                                label="Email"

                                rules={[{required: true, message: 'Please input your password!'}]}
                            >
                                <Input name="email" onChange={handeInput}/>
                            </Form.Item>


                            <Form.Item

                                label="Address"

                                rules={[{required: true, message: 'Please input your password!'}]}
                            >
                                <Input name="address" onChange={handeInput}/>
                            </Form.Item>


                            <Form.Item

                                label="Phone"

                                rules={[{required: true, message: 'Please input your password!'}]}
                            >
                                <Input name="phone" onChange={handeInput}/>
                            </Form.Item>

                        </Form>
                    </div>
                }
            </Modal>

        </div>
    )
}