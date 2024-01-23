import axios from 'axios'
import { useCallback, useEffect, useState } from 'react';


function useTranslation() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
    const [text, setText] = useState('')
    const [lang, setLang] = useState('')
    const [translatedText, setTranslatedText] = useState('')

    const translateText = useCallback((text: string, lang: string, toLang: string) => {
        setText(text)
        setLang(lang)
        setStatus('loading')
        
        if (lang === toLang) {
            setStatus('idle')
            setTranslatedText(text)
            return
        }

        const options = {
            method: "POST",
            url: "https://api.edenai.run/v2/translation/automatic_translation",
            headers: {
                authorization: `Bearer ${process.env.REACT_APP_EDEN_AI_API_KEY}`,
            },
            data: {
                providers: "google",
                text,
                source_language: lang,
                target_language: toLang,
                fallback_providers: "",
            },
        };

        axios
            .request(options)
            .then((response) => {
                const data = response.data;
                setTranslatedText(data['google']['text'])
                setStatus('idle')
            })
            .catch((error) => {
                console.error(error);
            });
    }, [])

    
    return {
        text,
        translatedText,
        translateText,
    }
}

export default useTranslation