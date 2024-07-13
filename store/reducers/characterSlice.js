import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    loading: 'idle',
    error: null
};

export const getCharacter = createAsyncThunk('getCharacter', async (_, { rejectWithValue }) => {
    try {
        const res = await fetch('https://thronesapi.com/api/v2/Characters');
        const data = await res.json();
        if (res.ok) {
            return data;
        } else {
            return rejectWithValue('Failed to fetch characters');
        }
    } catch (error) {
        return rejectWithValue('Failed to fetch characters');
    }
});

const characterSlice = createSlice({
    name: 'character-slice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCharacter.pending, (state) => {
            state.loading = 'pending';
        });
        builder.addCase(getCharacter.fulfilled, (state, action) => {
            state.loading = 'completed';
            state.data = action.payload;
        });
        builder.addCase(getCharacter.rejected, (state, action) => {
            state.loading = 'rejected';
            state.error = action.payload;
        });
    },
});

export const selectAllCharacter = (store) => store.character;
export default characterSlice.reducer;