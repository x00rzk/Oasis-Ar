import { IonContent, IonPage, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Welcome: React.FC = () => {
    const history = useHistory();
    return (
        <IonPage>
            <IonContent fullscreen className="ion-padding ion-text-center">
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                    <h1>Bienvenido a Oasis AR</h1>
                    <p>Descubre la experiencia de realidad aumentada</p>
                    <IonButton expand="block" onClick={() => history.push('/description')}>
                        Comenzar
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Welcome;