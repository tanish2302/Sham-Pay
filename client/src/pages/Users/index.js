import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetAllUsers, UpdateUserVerifiedStatus } from "../../api_calls/users";
import { message, Table } from "antd";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import PageTitle from "../../components/PageTitle";

function Users() {
    const [users, SetUsers] = React.useState([]);
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetAllUsers();
            dispatch(HideLoading());
            if (response.success) {
                SetUsers(response.data);
            } else {
                message.error(response.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    const updateStatus = async (record, isVerified) => {
        try {
            dispatch(ShowLoading());
            const response = await UpdateUserVerifiedStatus({
                selectedUser: record._id,
                isVerified,
            });
            dispatch(HideLoading());
            if (response.success) {
                message.success(response.message);
                getData();
            } else {
                message.error(response.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    const columns = [
        {
            title: "First Name",
            dataIndex: "firstName",
        },
        {
            title: "Last Name",
            dataIndex: "lastName",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Phone",
            dataIndex: "phoneNumber",
        },
        {
            title: "Verified",
            dataIndex: "isVerified",
            render: (text, record) => {
                return text ? "Yes" : "No";
            },
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => {
                return (
                    <div className="flex gap-1">
                        {record.isVerified ? (
                            <button
                                className="primary-outlined-btn"
                                onClick={() => updateStatus(record, false)}
                            >
                                Suspend
                            </button>
                        ) : (
                            <button
                                className="primary-outlined-btn"
                                onClick={() => updateStatus(record, true)}
                            >
                                Activate
                            </button>
                        )}
                    </div>
                );
            },
        },
    ];

    useEffect(() => {
        getData();
    }, []);
    return (
        <div>
            <PageTitle title="Users" />
            <Table dataSource={users} columns={columns} className="mt-2" />
        </div>
    );
}

export default Users;