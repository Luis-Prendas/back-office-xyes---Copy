import { createSlice } from '@reduxjs/toolkit';

// Definición del tipo para el objeto inicial
interface InitialState {
    _id: string | null,
    name: string | null,
    lastname: string | null,
    status: string | null
}

// Ejemplo de uso del tipo con initialState
const initialState: InitialState = {
    _id: null,
    name: null,
    lastname: null,
    status: null
};

const userInfoSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        singIn(state, { payload }: { payload: InitialState }) {
            console.log(state)
            state._id = payload._id;
            state.lastname = payload.lastname;
            state.name = payload.name;
            state.status = payload.status;
            console.log(state)
        },
        singOut(state) {
            state = initialState
        }
    },
});

export const { singIn, singOut } = userInfoSlice.actions;

export default userInfoSlice.reducer;
