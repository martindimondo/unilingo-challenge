import { Button, Descriptions, Space } from 'antd';
import { YoutubeVideoSnippet } from '../types';

const synth = window.speechSynthesis;


function YouTubeVideoCheckpoint7({
    recognizedText
}: {
    recognizedText: string,
}) {
    
    return <Space direction='vertical'>
        <Descriptions title="Checkpoint 7" bordered layout='vertical' column={{
            sm: 1,
            lg: 1,
            md: 1,
            xl: 1,
            xs: 1,
            xxl: 1,
        }}>
            {recognizedText && <Descriptions.Item label="OCR">
                <code>{recognizedText}</code>
            </Descriptions.Item>}
        </Descriptions>
    </Space>
}

export default YouTubeVideoCheckpoint7