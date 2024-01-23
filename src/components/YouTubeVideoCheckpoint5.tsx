import { Button, Descriptions, Space } from 'antd';

const synth = window.speechSynthesis;


function YouTubeVideoCheckpoint5({
    translatedText
}: {
    translatedText: string
}) {
    const speak = (text: string) => {
        const speech = new SpeechSynthesisUtterance(text)
        speech.lang = "es"
        synth.speak(speech)
    }
    
    return <Space direction='vertical'>
        <Descriptions title="Checkpoint 5" bordered layout='vertical' column={{
            sm: 1,
            lg: 1,
            md: 1,
            xl: 1,
            xs: 1,
            xxl: 1,
        }}>
            {translatedText && <Descriptions.Item label="Text To Speech 🪄">
                <Button onClick={() => speak(translatedText)}>Speak</Button>
            </Descriptions.Item>}
        </Descriptions>
    </Space>
}

export default YouTubeVideoCheckpoint5