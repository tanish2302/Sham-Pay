import React from "react";
import { Button, Col, Form, message, Row, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "../../api_calls/users";
import { Input } from "antd";

function Register() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            const response = await RegisterUser(values);
            if (response.success) {
                message.success(response.message);
                navigate("/login");
            } else {
                message.error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    }

    return (
        <div className="m-5">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl"> SHAMPAY - REGISTER </h1>

                <h1 className="text-sm underline"
                    onClick={() => navigate("/login")}
                >
                    Already a Member , LOGIN
                </h1>
            </div>
            <hr />
            <Form layout="vertical"
                onFinish={onFinish}
                form={form}
                validateTrigger="onSubmit"
            >
                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item label="First Name" name="firstName">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Last Name" name="lastName">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Email" name="email">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Phone Number" name="phoneNumber">
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item label="Identification type" name="identificationType">
                            <Select placeholder="Select ID type">
                                <Select.Option value="NATIONAL ID"> National ID</Select.Option>
                                <Select.Option value="PASSPORT"> Passport</Select.Option>
                                <Select.Option value="DRIVING LICENSE">Driving License</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item label="Identification Number" name="IdentificationNumber">
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item label="Address" name="address">
                            <Input.TextArea rows={3} />
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item label="Password" name="password" rules={[
                            { required: true, message: "Please enter your password!" },
                            { min: 3, message: "Password must be at least 6 characters." },
                        ]}

                        >
                            <Input.Password />
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item label="Confirm Password" name="confirmPassword" dependencies={["password"]}
                            onFinish={onFinish}
                            rules={[
                                {
                                    required: true,
                                    message: "Please confirm your password!",
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value) {
                                            return Promise.reject("Please confirm your password!");
                                        }
                                        if (value !== getFieldValue("password")) {
                                            return Promise.reject("Passwords do not match!");
                                        }
                                        return Promise.resolve();
                                    },
                                }),
                            ]}
                            validateTrigger="onSubmit">
                            <Input.Password />
                        </Form.Item>
                    </Col>
                </Row>

                <div className="flex justify-end">
                    <Button className="primary-contained-btn" htmlType="submit" type="primary"> Register </Button>
                </div>
            </Form>


        </div >
    )
}

export default Register