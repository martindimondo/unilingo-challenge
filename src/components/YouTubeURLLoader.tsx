import React, { useState } from 'react'
import './YouTubeURLLoader.css'
import { Button, Form, Input } from 'antd'


interface YouTubeURLLoaderProps {
    onLoadClick: (url: string) => void
}

function YouTubeURLLoader({
    onLoadClick
}: YouTubeURLLoaderProps) {
    const [url, setUrl] = useState('')

    return <Form
        onFinish={() => onLoadClick(url)}
    >
        <div className="youtube-url-loader-container">
            <Input
                className="youtube-url-loader-input"
                placeholder="Enter the YouTube video URL"
                onChange={(e) => setUrl(e.target.value)}
            />
            <Button type='primary' htmlType='submit'>Load</Button>
        </div>
    </Form>
}

export default YouTubeURLLoader