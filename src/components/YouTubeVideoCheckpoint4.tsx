import { Descriptions, Space } from 'antd'


function YouTubeVideoCheckpoint4({
    translatedText
}: {
    translatedText: string
}) {
    return <Space direction='vertical'>
        <Descriptions title="Checkpoint 4" bordered layout='vertical' column={{
            sm: 1,
            lg: 1,
            md: 1,
            xl: 1,
            xs: 1,
            xxl: 1,
        }}>
            <Descriptions.Item label="Translated to Spanish 🪄">{translatedText}</Descriptions.Item>
            
        </Descriptions>
    </Space>
}

export default YouTubeVideoCheckpoint4