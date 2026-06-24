import { useReducer } from "react";
import { useHistory } from "react-router-dom";
import {
    IonPage,
    IonContent,
    IonInput,
    IonButton,
    IonRouterLink,
    IonNote,
} from "@ionic/react";
import { signUpReducer, initialState } from "../reducers/signUpReducer";

const validatePassword = (value: string) => ({
    hasMin8: value.length >= 8,
    hasUpper: /[A-Z]/.test(value),
    hasLower: /[a-z]/.test(value),
});

const SignUp: React.FC = () => {
    const [state, dispatch] = useReducer(signUpReducer, initialState);
    const { username, email, password, confirmPassword, errors } = state;
    const history = useHistory();

    const handleSubmit = async () => {
        const newErrors = { username: "", email: "", password: "", confirmPassword: "" };
        let valid = true;

        if (!username.trim()) {
            newErrors.username = "El nombre es obligatorio";
            valid = false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Ingresa un correo válido";
            valid = false;
        }

        const pwd = validatePassword(password);
        if (!pwd.hasMin8 || !pwd.hasUpper || !pwd.hasLower) {
            newErrors.password = "Mínimo 8 caracteres, una mayúscula y una minúscula";
            valid = false;
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Las contraseñas no coinciden";
            valid = false;
        }

        dispatch({ type: "SET_ERRORS", payload: newErrors });

        if (!valid) return;

        // --- Enviar datos al backend ---
        try {
            const response = await fetch("http://localhost/Oasis_Users_Backend/signup.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "username": username, "email": email, "password": password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                dispatch({
                    type: "SET_ERRORS",
                    payload: { ...newErrors, username: data.error ?? "Error al registrar usuario" },
                });
                return;
            }

            history.push("/login");

        } catch (error) {
            dispatch({
                type: "SET_ERRORS",
                payload: { ...newErrors, username: "No se pudo conectar con el servidor" },
            });
        }
    };

    const pwd = validatePassword(password);

    return (
        <IonPage>
            <IonContent className="ion-padding">
                <h1>Crea una cuenta</h1>

                <IonInput
                    label="Nombre"
                    labelPlacement="floating"
                    fill="outline"
                    value={username}
                    onIonInput={(e) => dispatch({ type: "SET_USERNAME", payload: e.detail.value ?? "" })}
                    errorText={errors.username}
                    className={errors.username ? "ion-invalid ion-touched" : ""}
                />

                <IonInput
                    label="Correo"
                    labelPlacement="floating"
                    fill="outline"
                    type="email"
                    value={email}
                    onIonInput={(e) => dispatch({ type: "SET_EMAIL", payload: e.detail.value ?? "" })}
                    errorText={errors.email}
                    className={errors.email ? "ion-invalid ion-touched" : ""}
                    style={{ marginTop: 12 }}
                />

                <IonInput
                    label="Contraseña"
                    labelPlacement="floating"
                    fill="outline"
                    type="password"
                    value={password}
                    onIonInput={(e) => dispatch({ type: "SET_PASSWORD", payload: e.detail.value ?? "" })}
                    errorText={errors.password}
                    className={errors.password ? "ion-invalid ion-touched" : ""}
                    style={{ marginTop: 12 }}
                />

                {password.length > 0 && (
                    <div style={{ marginTop: 6, paddingLeft: 4 }}>
                        <IonNote color={pwd.hasMin8 ? "success" : "danger"} style={{ display: "block", fontSize: "0.8rem" }}>
                            {pwd.hasMin8 ? "✓" : "✗"} Mínimo 8 caracteres
                        </IonNote>
                        <IonNote color={pwd.hasUpper ? "success" : "danger"} style={{ display: "block", fontSize: "0.8rem" }}>
                            {pwd.hasUpper ? "✓" : "✗"} Una letra mayúscula
                        </IonNote>
                        <IonNote color={pwd.hasLower ? "success" : "danger"} style={{ display: "block", fontSize: "0.8rem" }}>
                            {pwd.hasLower ? "✓" : "✗"} Una letra minúscula
                        </IonNote>
                    </div>
                )}

                <IonInput
                    label="Confirmar contraseña"
                    labelPlacement="floating"
                    fill="outline"
                    type="password"
                    value={confirmPassword}
                    onIonInput={(e) => dispatch({ type: "SET_CONFIRM", payload: e.detail.value ?? "" })}
                    errorText={errors.confirmPassword}
                    className={errors.confirmPassword ? "ion-invalid ion-touched" : ""}
                    style={{ marginTop: 12 }}
                />

                {confirmPassword.length > 0 && (
                    <IonNote
                        color={password === confirmPassword ? "success" : "danger"}
                        style={{ display: "block", fontSize: "0.8rem", marginTop: 6, paddingLeft: 4 }}
                    >
                        {password === confirmPassword ? "✓ Las contraseñas coinciden" : "✗ Las contraseñas no coinciden"}
                    </IonNote>
                )}

                <p style={{ marginTop: 16 }}>
                    <strong>Ya tengo cuenta. </strong>
                    <IonRouterLink routerLink="/login">Iniciar sesión</IonRouterLink>
                </p>

                <IonButton expand="block" onClick={handleSubmit} style={{ marginTop: 8 }}>
                    Confirmar
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default SignUp;