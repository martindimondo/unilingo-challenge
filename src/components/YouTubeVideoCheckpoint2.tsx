import { Button, Descriptions, Space } from 'antd'
import React from 'react'
import { ThreadCommentItem, YoutubeVideoSnippet, YoutubeVideoStatistics } from '../types'


function YouTubeVideoCheckpoint2({
    videoSnippet,
    videoStatistic,
    videoComment,
    forceRefetch,
}: {
    videoSnippet: YoutubeVideoSnippet,
    videoStatistic: YoutubeVideoStatistics,
    videoComment?: ThreadCommentItem | null,
    forceRefetch: () => void,
}) {
    return <Space direction='vertical'>
        <Descriptions title="Checkpoint 2" size='middle' bordered layout='vertical' column={{
            sm: 1,
            lg: 1,
            md: 1,
            xl: 1,
            xs: 1,
            xxl: 1,
        }}>
            <Descriptions.Item label="Title">{videoSnippet.title}</Descriptions.Item>
            <Descriptions.Item label="View Count">{videoStatistic.viewCount}</Descriptions.Item>
            {videoComment &&
                <Descriptions.Item label="Most Recent Comment">
                    "<i>{videoComment?.snippet.topLevelComment.snippet.textDisplay}</i>"
                    {' '}<b>published at</b>{' '}
                    <i>{videoComment?.snippet.topLevelComment.snippet.publishedAt}</i>
                </Descriptions.Item>
            }
        </Descriptions>
        <Button onClick={forceRefetch}>Refrescar</Button>
    </Space>
}

export default YouTubeVideoCheckpoint2