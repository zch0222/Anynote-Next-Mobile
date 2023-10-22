import { AutoCenter, Card } from 'antd-mobile';
import { Typography, Input, Checkbox, Form, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {RootState, wrapper} from "@/store";
import  useSWR, { mutate} from "swr";
import { login, loginUrl } from "@/requests/auth/auth";
import useSWRMutation from "swr/mutation";
import {exportAppRoute} from "next/dist/export/routes/app-route";
import {GetServerSidePropsContext} from "next";
import { setUserInfo } from "@/store/user/userSlice";
// import {useRequest} from "ahooks";
//
// const useRequest = dynamic(() => import('ahooks/lib/useRequest'), { ssr: false });
// import useRequest from 'ahooks/es/useRequest'
// const useRequest = require('ahooks/es/useRequest');

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

function Login() {
    //
    // const { data, error, loading, run } = useRequest(login, {
    //     manual: true
    // })

    const { data, error, isLoading } = useSWR(null,
        async (url, params) => login(params))

    const user = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()
    //
    // console.log(user)

    const onFinish = (value: {
        username: string,
        password: string
    }) => {
        console.log(value)
        mutate([loginUrl, value])
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="h-64 w-[80%] max-w-[300px] p-10">
                <AutoCenter>
                    <Typography.Title level={4}>
                        登录
                    </Typography.Title>
                </AutoCenter>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item<FieldType>
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{ offset: 8, span: 16 }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" loading={isLoading}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

// @ts-ignore
export const getServerSideProps = wrapper.getServerSideProps((store) => {
    // return async function (conext: GetServerSidePropsContext) {
    //     store.dispatch(setUserInfo({
    //         username: "测试用户222",
    //         nickname: "",
    //         role: "",
    //         avatar: "",
    //         token: null
    //     }))
    //
    //     const test = "ttt"
    //     return {
    //         props: {
    //             test: test
    //         }
    //     }
    // }
})

export default Login
