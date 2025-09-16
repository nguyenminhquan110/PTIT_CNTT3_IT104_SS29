import {Modal, Descriptions, Button, Popconfirm, type PopconfirmProps} from "antd";
import type {Student} from "./Parent.tsx";
import Search from "./Sreach.tsx"

interface ModalViewProps {
    status?: boolean,
    handle?: () => void,
    student?: Student | null,
    search?: (id: (number | null)) => Promise<void>,
    del?: () => Promise<void>
}

export default function ModalView({status, handle, student, search, del}: ModalViewProps) {


    const confirm: PopconfirmProps['onConfirm'] = (e) => {
        console.log(e);
        if(del){
            del().then(r => console.log(r))
        }

    };

    const cancel: PopconfirmProps['onCancel'] = (e) => {
        console.log(e);
        if (handle) {
            handle();
        }
    };

    return (
        <Modal
            title="Thông tin sinh viên"
            open={status}
            onCancel={handle}
            footer={null} //
        >


            <Search search={search}/>


            {student ? (
                <div className={"flex flex-col gap-6 mt-6"}>
                    <Descriptions bordered column={1} size="small">
                        <Descriptions.Item label="ID">{student.id}</Descriptions.Item>
                        <Descriptions.Item label="Tên">{student.student_name}</Descriptions.Item>
                        <Descriptions.Item label="Email">{student.email}</Descriptions.Item>
                        <Descriptions.Item label="Địa chỉ">{student.address}</Descriptions.Item>
                        <Descriptions.Item label="Số điện thoại">{student.phone}</Descriptions.Item>
                        <Descriptions.Item label="Trạng thái">
                            {student.status ? "Active" : "Inactive"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ngày tạo">{student.created_at}</Descriptions.Item>
                    </Descriptions>

                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger>Delete</Button>
                    </Popconfirm>
                </div>
            ) : (
                <p>Không có dữ liệu để hiển thị</p>
            )}


        </Modal>
    );
}