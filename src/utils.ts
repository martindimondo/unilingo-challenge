

/**
 * Function to get the video id from a youtube video url
 * 
 * @param videoUrl 
 * @returns id
 */
export function getVideoIdFromUrl(videoUrl: string) {
    const parsedUrl = new URL(videoUrl)
    const searchParams = new URLSearchParams(parsedUrl.search)
    return searchParams.get('v')
}

