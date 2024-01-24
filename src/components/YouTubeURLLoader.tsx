import React, { useEffect, useState } from 'react'
import './YouTubeURLLoader.css'
import { Button, Form, Input } from 'antd'


interface YouTubeURLLoaderProps {
    onLoadClick: (url: string) => void,
    initialUrl?: string,
}

function YouTubeURLLoader({
    onLoadClick,
    initialUrl,
}: YouTubeURLLoaderProps) {
    const [url, setUrl] = useState('')

    useEffect(() => {
        if (initialUrl) {
            setUrl(initialUrl)
        }
    }, [initialUrl])

    return <Form
        onFinish={() => onLoadClick(url)}
    >
        <div className="youtube-url-loader-container">
            <Input
                className="youtube-url-loader-input"
                placeholder="Enter the YouTube video URL"
                onChange={(e) => setUrl(e.target.value)}
                value={url}
            />
            <Button type='primary' htmlType='submit'>Load</Button>
        </div>
    </Form>
}

export default YouTubeURLLoader