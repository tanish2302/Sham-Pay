import React from "react";
import { Modal, Form, message, Button } from "antd";
import StripeCheckout from "react-stripe-checkout";
import { DepositFunds } from "../../api_calls/transactions";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loaderSlice";

function DepositModal({ showDepositModal, setShowDepositModal, reloadData }) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const onToken = async (token) => {
        try {
            dispatch(ShowLoading());
            const response = await DepositFunds({
                token,
                amount: form.getFieldValue("amount"),
            });
            dispatch(HideLoading());
            if (response.success) {
                reloadData();
                setShowDepositModal(false);
                message.success(response.message);
            } else {
                message.error(response.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    return (
        <Modal
            title="Deposit"
            open={showDepositModal}
            onCancel={() => setShowDepositModal(false)}
            footer={null}
        >
            <div className="flex-col gap-1">
                <Form layout="vertical" form={form}>
                    <Form.Item
                        label="Amount"
                        name="amount"
                        rules={[
                            {
                                required: true,
                                message: "Please input amount",
                            },
                        ]}
                    >
                        <input type="number" />
                    </Form.Item>

                    <div className="flex justify-end gap-1">
                        <Button
                            className="primary-outlined-btn"
                            onClick={() => setShowDepositModal(false)}
                        >
                            Cancel
                        </Button>
                        <StripeCheckout
                            token={onToken}
                            currency="INR"
                            amount={form.getFieldValue("amount") * 100}
                            shippingAddress
                            stripeKey="pk_test_51RgrchPCSWUxkf8UlnXvFSMwqsfKFqTXSBlVY6JR2oNBHTquaTlyg7LZ8gA2a3Ex12De7eXK00A1gbz9O7o9t7yK0021SZlW2m"
                        >
                            <Button className="primary-contained-btn">Deposit</Button>
                        </StripeCheckout>
                    </div>
                </Form>
            </div>
        </Modal>
    );
}

export default DepositModal;