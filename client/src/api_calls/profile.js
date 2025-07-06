import axios from "axios";

// ✅ Get user info
export const GetUserInfo = async () => {
    const response = await axios.post(
        "/api/users/get-user-info",
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return response.data;
};

// ✅ Update user profile
export const UpdateUserProfile = async (payload) => {
    const response = await axios.post(
        "/api/users/update-profile",
        payload,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return response.data;
};

// ✅ Change user password
export const ChangePassword = async (payload) => {
    const response = await axios.post(
        "/api/users/change-password",
        payload,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return response.data;
};
