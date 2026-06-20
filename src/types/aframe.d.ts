import 'react';

declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
            'a-scene': any;
            'a-marker': any;
            'a-box': any;
            'a-entity': any;
            'a-camera': any;
            'a-sky': any;
            'a-assets': any;
        }
    }
}