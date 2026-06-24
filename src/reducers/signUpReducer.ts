export const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: { username: "", email: "", password: "", confirmPassword: "" },
};

export type State = typeof initialState;

export type Action =
    | { type: "SET_USERNAME"; payload: string }
    | { type: "SET_EMAIL"; payload: string }
    | { type: "SET_PASSWORD"; payload: string }
    | { type: "SET_CONFIRM"; payload: string }
    | { type: "SET_ERRORS"; payload: State["errors"] }
    | { type: "RESET" };

export const signUpReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_USERNAME": return { ...state, username: action.payload };
        case "SET_EMAIL": return { ...state, email: action.payload };
        case "SET_PASSWORD": return { ...state, password: action.payload };
        case "SET_CONFIRM": return { ...state, confirmPassword: action.payload };
        case "SET_ERRORS": return { ...state, errors: action.payload };
        case "RESET": return initialState;
        default: return state;
    }
};