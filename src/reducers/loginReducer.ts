export const initialState = {
    email: "",
    password: "",
    errorMsg: "",
    loading: false,
};

export type State = typeof initialState;

export type Action =
    | { type: "SET_EMAIL"; payload: string }
    | { type: "SET_PASSWORD"; payload: string }
    | { type: "SET_ERROR"; payload: string }
    | { type: "SET_LOADING"; payload: boolean }
    | { type: "RESET" };

export const loginReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_EMAIL": return { ...state, email: action.payload };
        case "SET_PASSWORD": return { ...state, password: action.payload };
        case "SET_ERROR": return { ...state, errorMsg: action.payload };
        case "SET_LOADING": return { ...state, loading: action.payload };
        case "RESET": return initialState;
        default: return state;
    }
};