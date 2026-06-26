import { useReducer } from "react";
import { useHistory } from "react-router-dom";
import {
    IonPage,
    IonContent,
    IonInput,
    IonButton,
    IonText,
    IonRouterLink,
} from "@ionic/react";
import { loginReducer, initialState } from "../reducers/loginReducer";

const Login: React.FC = () => {
    const [state, dispatch] = useReducer(loginReducer, initialState);
    const { email, password, errorMsg, loading } = state;
    const history = useHistory();

    const handleLogin = async () => {
        dispatch({ type: "SET_ERROR", payload: "" });

        if (!email.trim() || !password.trim()) {
            dispatch({ type: "SET_ERROR", payload: "El correo y la contraseña son obligatorios" });
            return;
        }

        dispatch({ type: "SET_LOADING", payload: true });

        try {
            const response = await fetch(`${import.meta.env.VITE_USER_API}/login.php`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "email": email, "password": password }),
            });

            const data = await response.json();

            if (!response.ok) {
                dispatch({ type: "SET_ERROR", payload: "Usuario o contraseña incorrectos" });
                return;
            }

            localStorage.setItem("login_token", data.token);
            console.log("Login exitoso", data);

            history.push("/description")

        } catch (error) {
            dispatch({ type: "SET_ERROR", payload: "No se pudo conectar con el servidor" });
        } finally {
            dispatch({ type: "SET_LOADING", payload: false });
        }
    };

    return (
        <IonPage>
            <IonContent className="ion-padding">
                <h1>Inicia sesión</h1>

                <IonInput
                    label="Correo"
                    labelPlacement="floating"
                    fill="outline"
                    type="email"
                    value={email}
                    onIonInput={(e) => dispatch({ type: "SET_EMAIL", payload: e.detail.value ?? "" })}
                />

                <IonInput
                    label="Contraseña"
                    labelPlacement="floating"
                    fill="outline"
                    type="password"
                    value={password}
                    onIonInput={(e) => dispatch({ type: "SET_PASSWORD", payload: e.detail.value ?? "" })}
                    style={{ marginTop: 12 }}
                />

                {errorMsg && (
                    <IonText color="danger">
                        <p style={{ marginTop: 8, fontSize: "0.88rem" }}>{errorMsg}</p>
                    </IonText>
                )}

                <p style={{ marginTop: 16 }}>
                    <strong>Aun no tengo cuenta. </strong>
                    <IonRouterLink routerLink="/signup">Crear cuenta</IonRouterLink>
                </p>

                <IonButton expand="block" onClick={handleLogin} disabled={loading} style={{ marginTop: 8 }}>
                    {loading ? "Ingresando..." : "Ingresar"}
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Login;