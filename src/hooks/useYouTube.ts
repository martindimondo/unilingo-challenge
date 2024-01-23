import { useCallback, useEffect, useState } from "react"
import { getVideoIdFromUrl } from "../utils";
import { downloadCaption, fetchCaptions, fetchCaptionsV2, fetchComments, fetchTranscriptions, fetchYoutubeVideo } from "../client";
import { ThreadCommentItem, YoutubeVideoResponse, YoutubeVideoSnippet, YoutubeVideoStatistics } from "../types";
import useTranslation from "./useTranslations";
import useOCR from "./useOCR";



function useYouTube() {
    const [url, loadFromURL] = useState<string | null>();
    const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
    const [statistics, setStatistics] = useState<YoutubeVideoStatistics | null>(null)
    const [snippet, setSnippet] = useState<YoutubeVideoSnippet | null>(null)
    const [comment, setComment] = useState<ThreadCommentItem | null>(null)
    const {
        translateText,
        translatedText,
    } = useTranslation()

    const {
        recognizedText,
        runRecognition,
    } = useOCR()

    const fetchAllData = useCallback((url: string | null | undefined) => {
        if (url) {
            setStatus('loading')
            const videoId = getVideoIdFromUrl(url)

            if (!videoId) {
                setStatus("error")
                return
            }

            fetchComments(videoId, ['snippet']).then(
                (res) => {
                    if (res.data.items) {
                        setComment(res.data.items[0])
                    } else {
                        setComment(null)
                    }
                }
            )

            fetchYoutubeVideo(videoId, ['statistics', 'snippet']).then(
                (res) => {
                    if (res.data.items) {
                        const item = res.data.items[0]
                        if (item.statistics) {
                            setStatistics(item.statistics)
                        }

                        if (item.snippet) {
                            console.log(item.snippet)
                            setSnippet(item.snippet)
                            runRecognition(
                                item.snippet.thumbnails.high.url,
                                item.snippet.defaultAudioLanguage
                            )
                        }
                    } else {
                        setStatus('error')
                        setSnippet(null)
                        setStatistics(null)
                    }
                }
            )

            fetchCaptions(videoId, ['snippet']).then(
                (res) => {
                    const data = res.data
                    console.log(data)
                    if (data && data.items) {
                        fetchTranscriptions(url, 30, 45).then(
                            ({ lang, captions }) => {
                                const text = captions.join('. ')
                                translateText(text, lang, 'es')
                            }
                        )
                    }
                }
            )
        }
    }, [])

    useEffect(() => {
        fetchAllData(url)
    }, [url])

    return {
        url,
        status,
        loadFromURL,
        snippet,
        statistics,
        comment,
        translatedText,
        refetch: () => fetchAllData(url),
        recognizedText,
    }
}

export default useYouTube