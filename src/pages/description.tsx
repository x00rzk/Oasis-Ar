import { IonContent, IonPage, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Description: React.FC = () => {
    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem("login_token");
        history.push("/login");
    };

    return (
        <IonPage>
            <IonContent fullscreen className="ion-padding ion-text-center">
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                    <h2>¿Cómo funciona?</h2>
                    <p>Trata de hablar con voz fuerte y clara hacia el celular.</p>
                    <p>La mascota virtual tratará de responder respecto al tema que quieras hablar.</p>
                    <p>Cuando quieras terminar la conversación solo presiona el boton de cerrar, con esto la conversación terminará.</p>
                    <IonButton expand="block" onClick={() => history.push('/ar')}>
                        Iniciar nueva sesión
                    </IonButton>
                    <IonButton expand="block" fill="clear" color="danger" onClick={handleLogout}>
                        Cerrar sesión
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Description;