import { IonContent, IonPage, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Description: React.FC = () => {
    const history = useHistory();
    return (
        <IonPage>
            <IonContent fullscreen className="ion-padding ion-text-center">
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                    <h2>Sobre la app</h2>
                    <p>Aquí va la descripción de tu aplicación de realidad aumentada.</p>
                    <IonButton expand="block" onClick={() => history.push('/ar')}>
                        Iniciar sesión
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Description;