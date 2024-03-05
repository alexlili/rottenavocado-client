import { getUrl } from 'aws-amplify/storage';
import React, { useState, useEffect } from 'react';
import { Image, Button, Table, Typography, Modal, Layout, Flex } from 'antd';
import { getTopNews, getMovieNews, getTVNews } from "../graphql/queries";
import { generateClient } from "aws-amplify/api";
import SectionButton from '../components/sectionButton'
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
const { Header, Footer, Sider, Content } = Layout;
const client = generateClient();

const Index = ({ }) => {

    const [data, setData] = useState({});
    const [content, setContent] = useState('');
    const getUrlParams = useParams();
    console.log('getUrlParams', getUrlParams)
    // setType(getUrlParams?.type||'topNews')

    async function fetchTopNews() {
        const apiData = await client.graphql({
            query: getTopNews,
            variables: { id: getUrlParams.id }
        });
        const dataFromAPI = apiData.data.getTopNews;
        console.log(dataFromAPI)
        if (dataFromAPI.image) {
            const getUrlResult = await getUrl({ key: dataFromAPI.title });
            console.log(getUrlResult)
            dataFromAPI.image = getUrlResult.url;
        }
        setData(dataFromAPI);
    }
    async function fetchMovieNews() {
        const apiData = await client.graphql({
            query: getMovieNews,
            variables: { id: getUrlParams.id }
        });
        const dataFromAPI = apiData.data.getMovieNews;
        console.log(dataFromAPI)
        if (dataFromAPI.image) {
            const getUrlResult = await getUrl({ key: dataFromAPI.title });
            console.log(getUrlResult)
            dataFromAPI.image = getUrlResult.url;
        }
        setData(dataFromAPI);
    }
    async function fetchTVNews() {
        const apiData = await client.graphql({
            query: getTVNews,
            variables: { id: getUrlParams.id }
        });
        const dataFromAPI = apiData.data.getTVNews;
        console.log(dataFromAPI)
        if (dataFromAPI.image) {
            const getUrlResult = await getUrl({ key: dataFromAPI.title });
            console.log(getUrlResult)
            dataFromAPI.image = getUrlResult.url;
        }
        setData(dataFromAPI);
    }

    useEffect(() => {

        // console.log(location)
        switch (getUrlParams.type) {
            case 'topNews':
                setContent('Top News')
                fetchTopNews();
                break;
            case 'TVNews':
                setContent('TV News')
                fetchTVNews();
                break;
            case 'movieNews':
                setContent('Movie News')
                fetchMovieNews();
                break;
            default: ;
                break;
        }
    }, [getUrlParams])
    return (
        <Layout style={{ width: '100%', background: '#fff', padding: '20px 10%' }}>

            <Content style={{}}>

                <Flex justify='start' style={{ border: '1px solid #ddd', borderRadius: 4, padding: 10, marginTop: 30 }}>

                    <div style={{ width: 200 }}>
                        <Image
                            width={200}
                            src={data.image}
                        />
                    </div>
                    <div style={{ paddingLeft: 20, color: '#000' }}>
                        <div style={{ fontSize: 22, fontWeight: 'bold', paddingBottom: 10 }}>{data.title}</div>
                        <div style={{ fontSize: 18, lineHeight: '30px' }}>{data.detail}</div>
                        <div style={{ color: 'rgba(0,0,0,0.54)', padding: '15px 0' }}>{data.publishInfo}</div>
                    </div>
                </Flex>
            </Content>
            <Sider width="25%" style={{ width: '100%', background: '#fff' }}>

            </Sider>
        </Layout>

    );
};

export default Index;