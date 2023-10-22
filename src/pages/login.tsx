import { Card, AutoCenter, Button } from "antd-mobile";
import { Typography, Input } from "antd";

function Login() {

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="h-64 w-[80%] max-w-[300px] p-10">
                <AutoCenter>
                    <Typography.Title level={4}>
                        登录
                    </Typography.Title>
                </AutoCenter>
                <Input placeholder={"请输入用户名"} className="my-2"/>
                <Input placeholder={"请输入密码"} className="mt-2 mb-3"/>
                <Button block color='primary' size='middle'>
                    登录
                </Button>
            </Card>
        </div>
    )
}

export default Login
