// Importing Ionic UI components needed for this screen
import {
    IonContent, IonPage, IonButton, IonInput, IonItem,
    IonLabel, IonSegment, IonSegmentButton, IonToast
} from '@ionic/react';
// Hook for storing and updating values that change on screen
import { useState } from 'react';
// Hook for navigating between screens
import { useHistory } from 'react-router-dom';

// Base URL of the backend server
const API_URL = 'http://localhost:3001/api/auth';

// Welcome screen component
const Welcome: React.FC = () => {
    // Enables navigation to other screens
    const history = useHistory();

    // Tracks whether the form is in 'login' or 'signup' mode, starts as 'login'
    const [mode, setMode] = useState<'login' | 'signup'>('login');

    // Stores what gets typed in the name field
    const [name, setName] = useState('');
    // Stores what gets typed in the email field
    const [email, setEmail] = useState('');
    // Stores what gets typed in the password field
    const [password, setPassword] = useState('');
    // Stores the error message to show, empty means no error
    const [error, setError] = useState('');

    // Runs when the submit button is pressed
    const handleSubmit = async () => {
        try {
            // Picks the right endpoint based on current mode
            const endpoint = mode === 'signup' ? '/signup' : '/login';
            // Builds the request body, signup needs name, login doesn't
            const body = mode === 'signup' ? { name, email, password } : { email, password };

            // Sends the HTTP request to the backend
            const res = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST', // Type of request
                headers: { 'Content-Type': 'application/json' }, // Tells the server the data is JSON
                body: JSON.stringify(body), // Converts the JS object to JSON text
            });

            // Converts the server response from JSON to a JS object
            const data = await res.json();

            // If the response status is not 200-299, shows the error from the server
            if (!res.ok) {
                setError(data.message || 'Error de conexión');
                return; // Stops here, doesn't continue
            }

            // Saves the logged-in user's data in the browser's local storage
            localStorage.setItem('user', JSON.stringify(data.user));
            // Navigates to the next screen
            history.push('/description');
        } catch (err) {
            // Runs if the backend is unreachable (network error)
            setError('No se pudo conectar con el servidor');
        }
    };

    // What gets displayed on screen
    return (
        // Wrapper that marks this as a full screen page
        <IonPage>
            {/* Scrollable content area with padding */}
            <IonContent fullscreen className="ion-padding">
                {/* App title, centered */}
                <h1 className="ion-text-center">Oasis AR</h1>

                {/* Tab switcher between Login and Signup */}
                <IonSegment value={mode} onIonChange={(e) => setMode(e.detail.value as 'login' | 'signup')}>
                    <IonSegmentButton value="login">
                        <IonLabel>Iniciar sesión</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="signup">
                        <IonLabel>Registrarse</IonLabel>
                    </IonSegmentButton>
                </IonSegment>

                {/* Name field only appears in signup mode */}
                {mode === 'signup' && (
                    <IonItem>
                        <IonLabel position="floating">Nombre</IonLabel>
                        {/* Updates name state every time a character is typed */}
                        <IonInput value={name} onIonInput={(e) => setName(e.detail.value!)} />
                    </IonItem>
                )}

                {/* Email field, always visible */}
                <IonItem>
                    <IonLabel position="floating">Correo</IonLabel>
                    {/* type="email" shows email keyboard on mobile */}
                    <IonInput type="email" value={email} onIonInput={(e) => setEmail(e.detail.value!)} />
                </IonItem>

                {/* Password field, always visible */}
                <IonItem>
                    <IonLabel position="floating">Contraseña</IonLabel>
                    {/* type="password" hides the typed characters */}
                    <IonInput type="password" value={password} onIonInput={(e) => setPassword(e.detail.value!)} />
                </IonItem>

                {/* Submit button, text changes based on current mode */}
                <IonButton expand="block" className="ion-margin-top" onClick={handleSubmit}>
                    {mode === 'signup' ? 'Crear cuenta' : 'Entrar'}
                </IonButton>

                {/* Pop-up error message at the bottom of the screen */}
                <IonToast
                    isOpen={!!error}           // Shows only when error is not empty
                    message={error}             // The error text to display
                    duration={3000}             // Auto-closes after 3 seconds
                    onDidDismiss={() => setError('')} // Clears the error after closing
                    color="danger"              // Red color to indicate an error
                />
            </IonContent>
        </IonPage>
    );
};

// Exports the component so App.tsx can use it as a route
export default Welcome;