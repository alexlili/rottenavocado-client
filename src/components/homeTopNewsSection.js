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

    const columns = [
        {
            title: 'image',
            dataIndex: 'image',
            width: '25%',
            editable: false,
            render: (_, record) => {
                console.log(record)
                return 
            },
        },
        {
            title: 'title',
            dataIndex: 'title',
            width: '15%',
            editable: true,
        },
        {
            title: 'detail',
            dataIndex: 'detail',
            width: '40%',
            editable: true,
        },
        {
            title: 'publishInfo',
            dataIndex: 'publishInfo',
            width: '40%',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => {
                return (
                    <span>
                        <Typography.Link
                            onClick={() => deleteTopNewsItem(record)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Delete
                        </Typography.Link>
                    </span>
                );
            },
        },
    ];

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
        <div>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>Slide 1</SwiperSlide>
                {data.map((item)=><SwiperSlide>
                    <Image
                    width={50}
                    src={item.image}
                    preview={{
                        src: item.image,
                    }}
                />
                <div>
                    <div>{item.title}</div>
                    <div>{item.detail}</div>
                    <div>{item.publishInfo}</div>
                </div>
                </SwiperSlide>)}
            </Swiper>
            <Table
                rowKey={record => record.id}

                bordered
                dataSource={data}
                columns={columns}
            />
        </div>
    );
};

export default Index;