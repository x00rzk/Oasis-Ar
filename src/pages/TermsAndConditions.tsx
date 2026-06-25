import {
    IonPage,
    IonContent,
    IonButton,
} from "@ionic/react";
import { useHistory } from "react-router-dom";

const TermsAndConditions: React.FC = () => {
    const history = useHistory();

    return (
        <IonPage>
            <IonContent className="ion-padding">
                <h1>Términos y Condiciones de Uso</h1>
                <p><strong>Última actualización:</strong> Junio de 2026</p>

                <p><strong>1. Aceptación de los términos</strong></p>
                <p>
                    Al acceder y utilizar esta aplicación, el usuario acepta cumplir con los presentes Términos y
                    Condiciones. Si no está de acuerdo con alguno de ellos, deberá abstenerse de utilizar el servicio.
                </p>

                <p><strong>2. Objeto de la aplicación</strong></p>
                <p>
                    Esta aplicación tiene como finalidad brindar apoyo complementario a estudiantes universitarios
                    mediante un asistente basado en inteligencia artificial que facilita conversaciones orientadas al
                    bienestar emocional y proporciona herramientas de seguimiento para profesionales autorizados.
                    La aplicación tiene fines de apoyo y acompañamiento, y no constituye un servicio médico,
                    psicológico o psiquiátrico.
                </p>

                <p><strong>3. No sustitución de atención profesional</strong></p>
                <p>El usuario reconoce que:</p>
                <ul>
                    <li>La inteligencia artificial puede cometer errores o generar respuestas inexactas.</li>
                    <li>La información proporcionada no equivale a un diagnóstico clínico ni a una recomendación médica.</li>
                    <li>La aplicación no sustituye la evaluación o tratamiento de un profesional de la salud mental.</li>
                </ul>

                <p><strong>4. Uso adecuado</strong></p>
                <p>El usuario se compromete a:</p>
                <ul>
                    <li>Utilizar la aplicación de manera responsable y conforme a su propósito.</li>
                    <li>No usar la plataforma para actividades ilícitas, ofensivas o perjudiciales.</li>
                    <li>Proporcionar información verídica al momento del registro.</li>
                </ul>

                <p><strong>5. Privacidad y datos personales</strong></p>
                <p>
                    Los datos del usuario serán tratados conforme a nuestra Política de Privacidad. La información
                    compartida en las conversaciones podrá ser accesible por profesionales autorizados vinculados
                    al usuario, con fines de seguimiento y apoyo.
                </p>

                <p><strong>6. Propiedad intelectual</strong></p>
                <p>
                    Todos los contenidos, diseño y funcionalidades de la aplicación son propiedad de sus
                    desarrolladores y están protegidos por las leyes de propiedad intelectual aplicables.
                </p>

                <p><strong>7. Modificaciones</strong></p>
                <p>
                    Nos reservamos el derecho de actualizar estos Términos y Condiciones en cualquier momento.
                    Se notificará al usuario sobre cambios significativos a través de la aplicación.
                </p>

                <p><strong>8. Contacto</strong></p>
                <p>
                    Para dudas o comentarios sobre estos términos, puedes contactarnos a través de los canales
                    oficiales de soporte de la aplicación.
                </p>

                <IonButton expand="block" fill="solid" color="dark" onClick={() => history.goBack()} style={{ marginTop: 16 }}>
                    Volver
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default TermsAndConditions;