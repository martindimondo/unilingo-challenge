import React, { useEffect, useState } from "react"
import { Layout, theme, Row, Col, Card } from 'antd';
import { Content } from "antd/es/layout/layout";
import YouTubeURLLoader from "../components/YouTubeURLLoader";
import useYouTube from "../hooks/useYouTube";
import YouTubeVideoCheckpoint2 from "../components/YouTubeVideoCheckpoint2";
import YouTubeVideoCheckpoint3 from "../components/YouTubeVideoCheckpoint3";
import YouTubeVideoCheckpoint4 from "../components/YouTubeVideoCheckpoint4";
import YouTubeVideoCheckpoint5 from "../components/YouTubeVideoCheckpoint5";
import YouTubeVideoCheckpoint6 from "../components/YouTubeVideoCheckpoint6";
import YouTubeVideoCheckpoint7 from "../components/YouTubeVideoCheckpoint7";
import useFirebase from "../hooks/useFirebase";


function YouTubeView() {
    const {
        token: { borderRadiusLG },
    } = theme.useToken()

    const { getValue, setValue } = useFirebase()
    const [initialUrl, setInitialUrl] = useState('')

    const {
        loadFromURL,
        url,
        snippet,
        statistics,
        comment,
        refetch,
        translatedText,
        recognizedText,
    } = useYouTube({
        onChangeUrl: (url: string) => {
            setValue('userURL', url)
        }
    })

    useEffect(() => {
        getValue('userURL').then(value => {
            const storedURL = value.val();
            setInitialUrl(storedURL)
        });
    }, [])

    return <Layout>
        <Content style={{ padding: '0 48px' }}>
            <div
                style={{
                    background: "colorBgContainer",
                    minHeight: '100vh',
                    padding: 24,
                    borderRadius: borderRadiusLG,
                    display: 'flex',
                    flexDirection: 'column',
                    margin: '0 auto'
                }}
            >
                <Row>
                    <Col xs={12}>
                        <Card>
                            <YouTubeURLLoader 
                                initialUrl={initialUrl}
                                onLoadClick={(url) => loadFromURL(url)} 
                            />
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        {snippet && statistics && <Card>
                            <YouTubeVideoCheckpoint2
                                videoSnippet={snippet}
                                videoStatistic={statistics}
                                videoComment={comment}
                                forceRefetch={refetch}
                            />
                        </Card>}
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        {url && <Card>
                            <YouTubeVideoCheckpoint3
                                url={url}
                            />
                        </Card>}
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        {url && <Card>
                            <YouTubeVideoCheckpoint4 translatedText={translatedText} />
                        </Card>}
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        {url && <Card>
                            <YouTubeVideoCheckpoint5 translatedText={translatedText} />
                        </Card>}
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        {snippet && <Card>
                            <YouTubeVideoCheckpoint6 videoSnippet={snippet} />
                        </Card>}
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        {recognizedText && <Card>
                            <YouTubeVideoCheckpoint7 recognizedText={recognizedText} />
                        </Card>}
                    </Col>
                </Row>
            </div>
        </Content>
    </Layout>
}

export default YouTubeView