import { getUrl } from "aws-amplify/storage";
import React, { useState, useEffect } from "react";
import { Image, Button, Table, Typography, Modal } from "antd";
import { listUpNextMedias } from "../graphql/queries";
import { generateClient } from "aws-amplify/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { EffectCoverflow, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
const client = generateClient();

const Index = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchAllUpNextMedias();
  }, []);
  async function fetchAllUpNextMedias() {
    const apiData = await client.graphql({ query: listUpNextMedias });
    const dataListFromAPI = apiData.data.listUpNextMedias.items;
    await Promise.all(
      dataListFromAPI.map(async (note) => {
        console.log(note);
        if (note.coverImage) {
          const getUrlResult = await getUrl({ key: note.title + "cover" });
          console.log(getUrlResult);
          note.coverImage = getUrlResult.url;
        }
        if (note.profileImage) {
          const getUrlResult = await getUrl({ key: note.title + "profile" });
          console.log(getUrlResult);
          note.profileImage = getUrlResult.url;
        }
        return note;
      })
    );
    setData(dataListFromAPI);
  }
  return (
    <div style={{ marginBottom: 50 }}>
      <Swiper
        initialSlide={1}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {data.map((item) => (
          <SwiperSlide
            onClick={() => {
              //   navigate(`/newsDetail/topNews/${item.id}`);
            }}
            style={{
              backgroundColor: "rgb(18,18,18)",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: 750,
              position: "relative",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <Image
              style={{
                position: "relative",
                zIndex: 1,
              }}
              height={550}
              width={750}
              src={item.coverImage}
              preview={false}
            />

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                position: "absolute",
                bottom: 0,
                left: 0,
                zIndex: 2,
                width: 750,
                height: 200,
                background:
                  "linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.9), black)",
              }}
            >
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                <Image
                  height={200}
                  width={150}
                  src={item.profileImage}
                  preview={false}
                />
              </div>

              <div
                style={{
                  padding: "10px 50px",
                  fontSize: 45,
                  fontWeight: "bolder",
                }}
              >
                {item.title}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Index;
