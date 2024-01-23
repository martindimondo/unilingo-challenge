import { Button, Descriptions, Space } from 'antd';
import { YoutubeVideoSnippet } from '../types';

const synth = window.speechSynthesis;


function YouTubeVideoCheckpoint6({
    videoSnippet
}: {
    videoSnippet: YoutubeVideoSnippet
}) {
    
    return <Space direction='vertical'>
        <Descriptions title="Checkpoint 5" bordered layout='vertical' column={{
            sm: 1,
            lg: 1,
            md: 1,
            xl: 1,
            xs: 1,
            xxl: 1,
        }}>
            {videoSnippet && <Descriptions.Item label="Thumbnails">
                <img src={videoSnippet.thumbnails.default.url} />
                <br />
                <Button 
                    download 
                    href={videoSnippet.thumbnails.default.url}
                    target='_blank'
                >
                    Download
                </Button>
            </Descriptions.Item>}
        </Descriptions>
    </Space>
}

export default YouTubeVideoCheckpoint6