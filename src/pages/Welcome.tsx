import {
    IonPage,
    IonContent,
    IonButton,
} from "@ionic/react";
import { useHistory } from "react-router-dom";

const Welcome: React.FC = () => {
    const history = useHistory();

    return (
        <IonPage>
            <IonContent scrollY={false}>
                <div style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "0 24px 48px 24px",
                    backgroundImage: "url('/background.webp')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}>
                    <h1 style={{ fontSize: "2.8rem", fontWeight: "bold", margin: 0 }}>
                        Bienvenido
                    </h1>
                    <p style={{ margin: "8px 0 24px 0" }}>
                        Para comenzar...
                    </p>
                    <IonButton expand="block" fill="solid" color="dark" onClick={() => history.push("/login")}>
                        Inicio
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Welcome;