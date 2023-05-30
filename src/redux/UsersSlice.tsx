import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface UserInterface {
    id: string;
    name: string;
}

interface initialValue {
    loading: boolean;
    error: string | null;
    users: UserInterface[];
}

const initialState: initialValue = {
    loading: true,
    error: null,
    users: [],
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const response = await axios.get("http://localhost:8000/users");
    return response.data;
});

export const patchUsers = createAsyncThunk(
    "users/patchUsers",
    async ({ id, content }: { id: string; content: string }) => {
        const response = await axios.patch(
            `http://localhost:8000/users/${id}`,
            {
                name: content,
            }
        );
        return response.data;
    }
);

export const UsersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(patchUsers.fulfilled, (state, action) => {
                const index = state.users.findIndex(
                    (user) => user.id === action.payload.id
                );
                state.users[index] = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(patchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            });
    },
});

export const {} = UsersSlice.actions;
export default UsersSlice.reducer;
