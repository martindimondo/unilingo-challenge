import axios from "axios"
import { CaptionReponse, ThreadCommentResponse, YoutubeVideoResponse } from "./types"

const YOUTUBE_ENDPOINT_BASE_URL = 'https://www.googleapis.com/youtube/v3'

type YouTubePart = 'statistics' | 'snippet'

const YouTubeBaseConfig = {
    key: process.env.REACT_APP_YOUTUBE_API_KEY
}

export const fetchYoutubeVideo = (id: string, parts: YouTubePart[]) => (
    axios.get<YoutubeVideoResponse>(`${YOUTUBE_ENDPOINT_BASE_URL}/videos`, {
        params: {
            part: parts.join(','),
            id,
            ...YouTubeBaseConfig
        }
    })
)

export const fetchComments = (id: string, parts: YouTubePart[]) => (
    axios.get<ThreadCommentResponse>(`${YOUTUBE_ENDPOINT_BASE_URL}/commentThreads`, {
        params: {
            part: parts.join(','),
            videoId: id,
            ...YouTubeBaseConfig
        }
    })
)

export const fetchCaptions = (id: string, parts: YouTubePart[]) => (
    axios.get<CaptionReponse>(`${YOUTUBE_ENDPOINT_BASE_URL}/captions`, {
        params: {
            part: parts.join(','),
            videoId: id,
            ...YouTubeBaseConfig
        }
    })
)
export const fetchCaptionsV2 = (id: string, parts: YouTubePart[]) => (
    axios.get<CaptionReponse>(`https://gdata.youtube.com/feeds/api/videos/${id}/captions`, {
        params: {
            part: parts.join(','),
            videoId: id,
            ...YouTubeBaseConfig
        }
    })
)



/*axios.get<any>(`${YOUTUBE_ENDPOINT_BASE_URL}/captions/id`, {
    params: {
        id,
        ...YouTubeBaseConfig
    }
})*/
export const downloadCaption = (videoId: string, id: string) => (
    axios.get<any>(`https://youtube.googleapis.com/youtube/v3/captions/${id}`, {
        params: {
            ...YouTubeBaseConfig
        }
    })
)

export const fetchTranscriptions = (url: string, start: number, end: number) => {
    return new Promise<{ lang: string, captions: string[] }>((resolve, reject) => {
        axios.get<string>("https://images" + ~~(Math.random() * 33) + "-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=" + encodeURIComponent(url)).then(response => {
            const data = response.data;
            const regex = /(?:ytplayer\.config\s*=\s*|ytInitialPlayerResponse\s?=\s?)(.+?)(?:;var|;\(function|\)?;\s*if|;\s*if|;\s*ytplayer\.|;\s*<\/script)/gmsu;

            let parsedData = data.split('window.getPageData')[0];
            parsedData = parsedData.replace('ytInitialPlayerResponse = null', '');
            parsedData = parsedData.replace('ytInitialPlayerResponse=window.ytInitialPlayerResponse', '');
            parsedData = parsedData.replace('ytplayer.config={args:{raw_player_response:ytInitialPlayerResponse}};', '');

            var matches = regex.exec(parsedData);
            if (matches && matches.length > 1) {
                const videoData = JSON.parse(matches[1])
                console.log(videoData)
                const captionTrack = videoData.captions.playerCaptionsTracklistRenderer.captionTracks[0]
                const lang = captionTrack.languageCode;

                axios.get(captionTrack.baseUrl).then(
                    (res) => {
                        const parser = new DOMParser();
                        const xmlDoc = parser.parseFromString(res.data, "text/xml");
                        const elements = xmlDoc.getElementsByTagName("text");
                        const captions: string[] = [];

                        if (elements) {
                            for (let i = 0; i < elements.length; i++) {
                                const text = elements[i];

                                const startAtAttr = text.getAttribute("start");
                                if (startAtAttr) {
                                    const startAt = parseFloat(startAtAttr);
                                    if (startAt >= start && startAt <= end && text.textContent) {
                                        captions.push(text.textContent)
                                    }
                                }
                            }

                            resolve({
                                lang,
                                captions
                            })
                        } else {
                            reject("Not found transcript node")
                        }
                    }
                )
            } else {
                reject('Error fetching detailed data')
            }
        })
    })
}