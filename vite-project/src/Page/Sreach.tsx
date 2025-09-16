import {Button, InputNumber, Tooltip} from "antd";
import {SearchOutlined} from "@ant-design/icons"


interface SearchProps {
    search?: (id: any) => Promise<void>
}

export default function SearchBox({search}: SearchProps) {


    const handle = async (val:any) => {
        console.log(val);

        if( val === "null"){
            if (search) {
                await search(null);
            }
        }
        if (search) {
            await search(val)
        }
    }

    return (
        <div className={"w-33 flex justify-between items-center"}>
            <InputNumber
                placeholder="Enter id: "
                type={"number"}
                size="large"
                onChange={(val) => handle(val)}
            />
            <Tooltip title="search">
                <Button  type="primary" shape="circle" icon={<SearchOutlined/>}/>
            </Tooltip>
        </div>
    );
}