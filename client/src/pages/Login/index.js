import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, message, Row } from "antd";
import { LoginUser } from "../../api_calls/users";
import {Input} from "antd";

function Login() {
    const navigate = useNavigate();
    const onFinish = async(values) => {
        try {
            const response = await LoginUser(values);
            if (response.success) {
                message.success(response.message);
                localStorage.setItem("token", response.data);
                window.location.href = "/";
            } else {
                message.error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    return (
        <div className="bg-primary flex items-center justify-center h-screen">
            <div className="card w-400 p-2">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl"> SHAMPAY - LOGIN</h1>

                </div>
                <hr />
                <Form layout="vertical" onFinish={onFinish}>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Email" name="email">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Password" name="password">
                                <Input.Password />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Button className="primary-contained-btn w-100" htmlType="submit" type="primary">
                        Login
                    </Button>
                    <h1 className="text-sm underline mt-2"
                        onClick={() => navigate("/register")}
                    > Not a Member, Click Here to Register</h1>

                </Form>
            </div>
        </div>
    );
}

export default Login;