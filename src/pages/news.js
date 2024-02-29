import { getUrl } from 'aws-amplify/storage';
import React, { useState, useEffect } from 'react';
import { Image, Button, Table, Typography, Modal, Layout,Flex } from 'antd';
import { listTopNews } from "../graphql/queries";
import { generateClient } from "aws-amplify/api";
import SectionButton from '../components/sectionButton'
import { NavLink, Outlet, useLocation,useParams} from "react-router-dom";
const { Header, Footer, Sider, Content } = Layout;
const client = generateClient();

const Index = ({  }) => {
   
    const [data, setData] = useState([]);
    const [content,setContent]= useState('');
    const getUrlParams = useParams();
    console.log('getUrlParams',getUrlParams)
    // setType(getUrlParams?.type||'topNews')
    
    async function fetchAllTopNews() {
        const apiData = await client.graphql({ query: listTopNews });
        const dataListFromAPI = apiData.data.listTopNews.items;
        await Promise.all(
            dataListFromAPI.map(async (note) => {
                console.log(note)
                if (note.image) {
                    const getUrlResult = await getUrl({ key: note.title });
                    console.log(getUrlResult)
                    note.image = getUrlResult.url;
                }
                return note;
            })
        );
        setData(dataListFromAPI);
    }
    useEffect(() => {
        
        // console.log(location)
        switch (getUrlParams.type) {
            case 'topNews':
                setContent('Top News')
                fetchAllTopNews();
                break;
            case 'TVNews':

                break;
            case 'MovieNews':

                break;
            default:fetchAllTopNews();
                break;
        }
    }, [getUrlParams])
    return (
        <Layout style={{width:'100%',background:'#fff',padding:'20px 10%'}}>
            
            <Content style={{}}>
            <SectionButton content={content} type={getUrlParams.type} color={'#000'}/>
                <div style={{ }}>
                    {data.map((item) => <Flex justify='start' key={item.id} style={{border:'1px solid #ddd',borderRadius:4,padding:10,marginTop:30}}>
                       
                       <div style={{width:200}}>
                       <Image
                            width={200}
                            src={item.image}
                            preview={{
                                src: item.image,
                            }}
                        />
                        </div> 
                        <div style={{paddingLeft:20,color:'#000'}}>
                            <div style={{fontSize:22, fontWeight:'bold',paddingBottom:10}}>{item.title}</div>
                            <div style={{fontSize:18,lineHeight:'30px'}}>{item.detail}</div>
                            <div style={{color:'rgba(0,0,0,0.54)',padding:'15px 0'}}>{item.publishInfo}</div>
                        </div>
                    </Flex>)}
                </div>
            </Content>
            <Sider width="25%"  style={{width:'100%',background:'#fff'}}>

            </Sider>
        </Layout>

    );
};

export default Index;