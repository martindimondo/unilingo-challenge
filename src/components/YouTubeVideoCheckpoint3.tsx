import { Button, Descriptions, Space } from 'antd';
import YouTube, { YouTubePlayer, YouTubeProps } from 'react-youtube';
import { ThreadCommentItem, YoutubeVideoSnippet, YoutubeVideoStatistics } from '../types';
import { getVideoIdFromUrl } from '../utils';
import { useState } from 'react';


function YouTubeVideoCheckpoint3({
    url,
}: {
    url: string,
}) {
    const [player, setPlayer] = useState<null | YouTubePlayer>(null);

    const videoId = getVideoIdFromUrl(url)

    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        console.log(event)
        setPlayer(event.target)
    }
    if (!videoId) {
        return <></>
    }

    return <Space direction='vertical'>
        <Descriptions title="Checkpoint 3" bordered layout='vertical' column={{
            sm: 1,
            lg: 1,
            md: 1,
            xl: 1,
            xs: 1,
            xxl: 1,
        }}>
            <Descriptions.Item label="Audio">
                {player && <Button
                    onClick={() => player.playVideo()}
                >Play audio</Button>}
            </Descriptions.Item>
        </Descriptions>
        <YouTube
                videoId={videoId}
                style={{
                    position: 'fixed',
                    left: 0,
                    top: 100,
                    zIndex: -99999
                }}
                onReady={onPlayerReady}
                opts={{
                    playerVars: {
                        autoplay: 0,
                        start: 30,
                        end: 45,
                    },
                    width: 0,
                    height: 0,

                }}
            />
    </Space>
}

{/**

             */}
export default YouTubeVideoCheckpoint3