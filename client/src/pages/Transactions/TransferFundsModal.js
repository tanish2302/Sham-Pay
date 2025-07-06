import React from "react";
import { Modal, Form, message, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { TransferFunds, VerifyAccount } from "../../api_calls/transactions";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import { ReloadUser } from "../../redux/usersSlice";

function TransferFundsModal({
    showTransferFundsModal,
    setShowTransferFundsModal,
    reloadData,
}) {
    const { user } = useSelector((state) => state.users);
    const [isVerified, setIsVerified] = React.useState("");
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const verifyAccount = async () => {
        try {
            dispatch(ShowLoading());
            const response = await VerifyAccount({
                receiver: form.getFieldValue("receiver"),
            });
            dispatch(HideLoading());
            if (response.success) {
                setIsVerified("true");
            } else {
                setIsVerified("false");
            }
        } catch (error) {
            dispatch(HideLoading());
            setIsVerified("false");
        }
    };

    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading());
            const payload = {
                ...values,
                sender: user._id,
                status: "success",
                reference: values.reference || "no reference",
            };
            const response = await TransferFunds(payload);
            if (response.success) {
                reloadData();
                setShowTransferFundsModal(false);
                message.success(response.message);
                dispatch(ReloadUser(true));
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            message.error(error.message);
            dispatch(HideLoading());
        }
    };

    return (
        <div>
            <Modal
                title="Transfer Funds"
                open={showTransferFundsModal}
                onCancel={() => setShowTransferFundsModal(false)}
                onClose={() => setShowTransferFundsModal(false)}
                footer={null}
            >
                <Form layout="vertical" form={form} onFinish={onFinish}>
                    <div className="flex gap-2 items-center">
                        <Form.Item label="Account Number" name="receiver" className="w-100">
                            <input type="text" />
                        </Form.Item>
                        <Button
                            className="primary-contained-btn mt-1"
                            type="button"
                            onClick={verifyAccount}
                        >
                            VERIFY
                        </Button>
                    </div>

                    {isVerified === "true" && (
                        <div className="success-bg">Account verified successfully</div>
                    )}

                    {isVerified === "false" && (
                        <div className="error-bg">Invalid Account</div>
                    )}

                    <Form.Item
                        label="Amount"
                        name="amount"
                        rules={[
                            {
                                required: true,
                                message: "Please input your amount!",
                            },
                            {
                                max: user.balance,
                                message: "Insufficient Balance",
                            },
                        ]}
                    >
                        <input type="number" max={user.balance} />
                    </Form.Item>

                    <Form.Item label="Reference" name="reference">
                        <textarea type="text" />
                    </Form.Item>

                    <div className="flex justify-end gap-1">
                        <Button className="primary-outlined-btn">Cancel</Button>
                        {isVerified === "true" && (
                            <Button className="primary-contained-btn" htmlType="submit">Transfer</Button>
                        )}
                    </div>
                </Form>
            </Modal>
        </div>
    );
}

export default TransferFundsModal;