import React, { useEffect } from "react";
import { Form, Input, Button, Card, Row, Col, Divider, message } from "antd";
import { useSelector } from "react-redux";
import { UpdateUserProfile, ChangePassword } from "../../api_calls/profile"; // You need to create these

function Profile() {
    const [form] = Form.useForm();
    const [passwordForm] = Form.useForm();
    const { user } = useSelector((state) => state.users);

    useEffect(() => {
        if (user) {
            form.setFieldsValue(user);
        }
    }, [user, form]);

    const onFinish = async (values) => {
        try {
            const res = await UpdateUserProfile(values);
            if (res.success) {
                message.success("Profile updated successfully!");
            } else {
                message.error(res.message);
            }
        } catch (err) {
            message.error(err.message);
        }
    };

    const onChangePassword = async (values) => {
        try {
            const res = await ChangePassword(values);
            if (res.success) {
                message.success("Password changed successfully!");
                passwordForm.resetFields();
            } else {
                message.error(res.message);
            }
        } catch (err) {
            message.error(err.message);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">👤 Profile</h1>
            <Card title="Personal Info" bordered={false} className="mb-6">
                <Form layout="vertical" form={form} onFinish={onFinish}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="First Name" name="firstName">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Last Name" name="lastName">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Email" name="email">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Mobile Number" name="phoneNumber">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Identification Type" name="identificationType">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Identification Number" name="IdentificationNumber">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Address" name="address">
                                <Input.TextArea />
                            </Form.Item>
                        </Col>
                    </Row>
                    <div className="text-right">
                        <Button type="primary" htmlType="submit">
                            Save Changes
                        </Button>
                    </div>
                </Form>
            </Card>

            <Divider />

            <Card title="Change Password" bordered={false}>
                <Form layout="vertical" form={passwordForm} onFinish={onChangePassword}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                label="Current Password"
                                name="currentPassword"
                                rules={[{ required: true, message: "Please enter current password" }]}
                            >
                                <Input.Password />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="New Password"
                                name="newPassword"
                                rules={[{ required: true, message: "Please enter new password" }]}
                            >
                                <Input.Password />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Confirm New Password"
                                name="confirmNewPassword"
                                dependencies={["newPassword"]}
                                rules={[
                                    { required: true, message: "Please confirm new password" },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue("newPassword") === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject("Passwords do not match!");
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                        </Col>
                    </Row>
                    <div className="text-right">
                        <Button type="primary" htmlType="submit">
                            Change Password
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
}

export default Profile;
