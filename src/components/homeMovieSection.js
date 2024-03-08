import { getUrl } from "aws-amplify/storage";
import React, { useState, useEffect } from "react";
import { Image } from "antd";
import { listMovies } from "../graphql/queries";
import { generateClient } from "aws-amplify/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "swiper/modules";
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  StarOutlined,
  StarFilled,
  PlusOutlined
} from "@ant-design/icons";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
const client = generateClient();

const Index = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchAllMovies();
  }, []);
  async function fetchAllMovies() {
    const apiData = await client.graphql({ query: listMovies });
    const dataListFromAPI = apiData.data.listMovies.items;
    await Promise.all(
      dataListFromAPI.map(async (note) => {
        console.log(note);
        if (note.imageList) {
          const getUrlResult = await getUrl({ key: note.name + note.year });
          console.log(getUrlResult);
          note.imageList = getUrlResult.url;
        }
        return note;
      })
    );
    setData(dataListFromAPI);
  }
  return (
    <div style={{ paddingTop: 20, paddingBottom: 50 }}>
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
              //   navigate(`/Movies/${item.id}`);
            }}
            style={{
              backgroundColor: "rgb(18,18,18)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 5,
              overflow: "hidden",
              width: 200,
              padding: "0 20px",
            }}
          >
            <Image
              style={{ borderTopLeftRadius:5,borderTopRightRadius:5}}
              height={280}
              width={200}
              src={item.imageList}
              preview={false}
            />
            <div style={{background:'rgba(255,255,255,0.05)',width:200,padding:12,borderBottomLeftRadius:5,borderBottomRightRadius:5}}>
            <div style={{textAlign:'left'}}>
              <StarFilled style={{color:'#f5c518', }}/>
              <span style={{padding:'0 30px 0 10px',fontWeight:'bold'}}>{(item?.rate||0)}</span>
              <StarOutlined style={{color:'#f5c518',cursor:'pointer'}}/>
            </div>
            <div style={{ fontSize: 16, fontWeight: "bold", padding:'15px 0',textAlign:'left' }}>
              {item.name}
            </div>
            <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',cursor:'pointer', borderRadius:5, fontSize: 16, fontWeight: "bold", padding: 10,background:'rgba(255,255,255,0.1)',color:'#5799ef' }}>
            <PlusOutlined style={{color:'#f5c518', fontSize:20,fontWeight:'bold'}}/>Watchlist
            </div>

            </div>

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
