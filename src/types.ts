
export interface YoutubeVideoStatistics {
    viewCount: number
    commentCount: number
    likeCount: number
    favoriteCount: number
}

export interface YoutubeVideoSnippet {
    title: string
    defaultAudioLanguage: string
    description: string
    thumbnails: {
        default: {
            url: string
        },
        high: {
            url: string
        }
    }
}

export interface VideoItem {
    id: string
    kind: string
    statistics?: YoutubeVideoStatistics
    snippet?: YoutubeVideoSnippet
}

export interface YoutubeVideoResponse {
    items: VideoItem[]
}

export interface ThreadCommentItem {
    snippet: {
        topLevelComment: {
            snippet: {
                textDisplay: string
                publishedAt: string
            }
        }
    }
}

export interface ThreadCommentResponse {
    items: ThreadCommentItem[]
}

export interface CaptionItem {
    id: string,
    snippet: {
        language: string
        trackKind: string
        name: string
    }
}

export interface CaptionReponse {
    items: CaptionItem[]
}