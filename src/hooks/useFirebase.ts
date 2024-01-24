import { initializeApp } from "firebase/app";
import { get, getDatabase, ref, set } from "firebase/database";
import { useCallback } from "react";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig);
const db = getDatabase(app)

function useFirebase() {

    const getValue = useCallback((key: string) => {
        return get(ref(db, key))
    }, [])

    const setValue = useCallback((key: string, value: any) => {
        return set(ref(db, key), value)
    }, [])

    return {
        app,
        getValue,
        setValue,
    }
}

export default useFirebase