import { getUrl } from 'aws-amplify/storage';
import React, { useState, useEffect } from 'react';
import { Image, Button, Table, Typography, Modal } from 'antd';
import { listTopNews } from "../graphql/queries";
import { generateClient } from "aws-amplify/api";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
const client = generateClient();
  
const Index = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchAllTopNews();
    }, [])
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
    return (
        <div style={{paddingTop:20}}>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                // modules={[Pagination]}
                className="mySwiper"
            >
                {data.map((item)=><SwiperSlide style={{backgroundColor:'rgb(18,18,18)',display:'flex',flexDirection:'row',justifyContent:'space-between',height:130,width:320,}}>
                    <Image
                    height={120}
                    width={70}
                    src={item.image}
                    preview={{
                        src: item.image,
                    }}
                />
                <div style={{height:130,width:230,display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                    <div className='topNewsSectionTitle'>{item.title}</div>
                    <div style={{fontSize:14,textAlign:'right'}}>{item.publishInfo}</div>
                </div>
                </SwiperSlide>)}
            </Swiper>
        </div>
    );
};

export default Index;