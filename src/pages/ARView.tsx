import { IonPage } from '@ionic/react';
import { useEffect } from 'react';

const ARView: React.FC = () => {
    useEffect(() => {
        // Evita que Ionic limite el alto del contenedor cuando A-Frame toma pantalla completa
        document.body.classList.add('ar-active');
        return () => {
            document.body.classList.remove('ar-active');
        };
    }, []);

    return (
        <IonPage>
            <a-scene embedded arjs="sourceType: webcam; debugUIEnabled: false;">
                <a-marker type="pattern" preset="hiro">
                    <a-box position="0 0.5 0" material="color: red;"></a-box>
                </a-marker>
                <a-entity camera></a-entity>
            </a-scene>
        </IonPage>
    );
};

export default ARView;