import { useRef } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";
import { useMindAR } from "../hooks/useMindAR";
import "../theme/ARView.css";

const ARView: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useMindAR(containerRef);

  return (
    <IonPage>
      <div ref={containerRef} className="ar-container" />

      <IonHeader className="ar-header">
        <IonToolbar className="ar-toolbar">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/description" />
          </IonButtons>
          <IonTitle className="ar-title">Sesión AR</IonTitle>
        </IonToolbar>
      </IonHeader>
    </IonPage>
  );
};

export default ARView;