import axios from 'axios';
import { useCallback, useState } from 'react';


function useOCR() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
    const [recognizedText, setRecognizedText] = useState('')

    const runRecognition = useCallback((image: string,  lang: string) => {
        setStatus('loading')

        const options = {
            method: "POST",
            url: "https://api.edenai.run/v2/ocr/ocr",
            headers: {
                authorization: `Bearer ${process.env.REACT_APP_EDEN_AI_API_KEY}`,
            },
            data: {
                providers: "google",
                language: lang,
                file_url: image,
                fallback_providers: "",
            },
        };

        axios
            .request(options)
            .then((response) => {
                const data = response.data;
                setRecognizedText(data['google']['text'])
                setStatus('idle')
            })
            .catch((error) => {
                console.error(error);
            });
    }, [])

    
    return {
        recognizedText,
        runRecognition,
    }
}

export default useOCR