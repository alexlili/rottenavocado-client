import { getUrl } from "aws-amplify/storage";
import React, { useState, useEffect } from "react";
import { Image, Button, Table, Typography, Modal } from "antd";
import { listBornTodays } from "../graphql/queries";
import { generateClient } from "aws-amplify/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
const client = generateClient();

const Index = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchAllBornTodays();
  }, []);
  async function fetchAllBornTodays() {
    const apiData = await client.graphql({ query: listBornTodays });
    const dataListFromAPI = apiData.data.listBornTodays.items;
    await Promise.all(
      dataListFromAPI.map(async (note) => {
        console.log(note);
        if (note.avatarImage) {
          const getUrlResult = await getUrl({ key: note.name });
          console.log(getUrlResult);
          note.avatarImage = getUrlResult.url;
        }
        return note;
      })
    );
    setData(dataListFromAPI);
  }
  return (
    <div style={{ paddingTop: 20, paddingBottom:50 }}>
      <Swiper
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          disabledClass: "disable",
        }}
        slidesPerView={5}
        spaceBetween={30}
        modules={[Navigation]}
        className="mySwiper"
      >
        {data.map((item) => (
          <SwiperSlide
            onClick={() => {
            //   navigate(`/bornTodays/${item.id}`);
            }}
            style={{
              backgroundColor: "rgb(18,18,18)",
              display: "flex",
              flexDirection:'column',
              alignItems:'center',
              height: 220,
              width:200,
              padding: "0 20px",
            }}
          >
            <Image
            style={{borderRadius:80}}
              height={160}
              width={160}
              src={item.avatarImage}
              preview={false}
            />
            <div style={{ fontSize: 16, fontWeight:'bold',paddingTop:10}}>{item.name}</div>
            <div style={{ fontSize: 14,color:'rgba(255,255,255,0.7)' }}>{item.age}</div>
          </SwiperSlide>
        ))}
        <div className="swiper-button-prev">
          <CaretLeftOutlined style={{ color: "#f5c518", fontSize: 28 }} />
        </div>
        <div className="swiper-button-next">
          <CaretRightOutlined style={{ color: "#f5c518", fontSize: 28 }} />
        </div>
      </Swiper>
    </div>
  );
};

export default Index;
