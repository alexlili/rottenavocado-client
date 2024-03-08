import { getUrl } from "aws-amplify/storage";
import React, { useState, useEffect } from "react";
import { Image } from "antd";
import { listFeaturedTodays } from "../graphql/queries";
import { generateClient } from "aws-amplify/api";
import { Swiper, SwiperSlide} from "swiper/react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { CaretLeftOutlined,CaretRightOutlined } from '@ant-design/icons';
// Import Swiper styles
import "swiper/css";
import 'swiper/css/navigation';
const client = generateClient();

const Index = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchAllFeaturedTodays();
  }, []);
  async function fetchAllFeaturedTodays() {
    const apiData = await client.graphql({ query: listFeaturedTodays });
    const dataListFromAPI = apiData.data.listFeaturedTodays.items;
    await Promise.all(
      dataListFromAPI.map(async (note) => {
        console.log(note);
        if (note.backgroundImage) {
          const getUrlResult = await getUrl({ key: note.title });
          console.log(getUrlResult);
          note.backgroundImage = getUrlResult.url;
        }
        return note;
      })
    );
    setData(dataListFromAPI);
  }
  return (
    <div style={{ paddingTop: 20, width:'54%', paddingBottom:50}}>
      <Swiper
        navigation={{nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        disabledClass: 'disable' }}
        slidesPerView={2}
        spaceBetween={30}
        modules={[Navigation]}
        className="mySwiper"
      >
        {data.map((item) => (
          <SwiperSlide
            onClick={() => {
              navigate(`/featuredToday/${item.id}`);
            }}
            style={{
              backgroundColor: "rgb(18,18,18)",
              height: 200,
              width: 320,
              padding:'0 20px',
              position:'relative'
            }}
          >
            <Image
              height={170}
              width={280}
              src={item.backgroundImage}
              preview={false}
            />
            <div
              style={{
                height: 30,
                width: 280,
                textAlign:'left'
              }}
            >
              {item.title}
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-button-prev"><CaretLeftOutlined style={{color:'#f5c518',fontSize:28}}/></div>
        <div className="swiper-button-next"><CaretRightOutlined style={{color:'#f5c518',fontSize:28}} /></div>
      </Swiper>
    </div>
  );
};

export default Index;
