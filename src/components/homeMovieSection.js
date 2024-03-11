import { getUrl } from "aws-amplify/storage";
import React, { useState, useEffect } from "react";
import { Image, Modal, Rate, Popconfirm } from "antd";
import { listMovies,listMovieRatings } from "../graphql/queries";
import { generateClient } from "aws-amplify/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { getCurrentUser } from "aws-amplify/auth";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  StarOutlined,
  StarFilled,
  PlusOutlined,
} from "@ant-design/icons";
import { createMovieRating } from "../graphql/mutations";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { convertLegacyProps } from "antd/es/button";
const client = generateClient();

const Index = () => {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState(null);
  const [userId,setUserId]= useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rate, setRate] = useState(0);
  const [currentMovieItem,setCurrentMovieItem]=useState(null);
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
          console.log('note.id===',note.id)
          const getMovieRateList = await client.graphql({query: listMovieRatings, variables: {
            filter: {
              movieId: {
                eq: note.id
              }
            }
          } })
          const getMovieRateListFromAPI = getMovieRateList.data.listMovieRatings.items;
          if(getMovieRateListFromAPI.length){
            console.log('getMovieRateListFromAPI===',getMovieRateListFromAPI)
            // 计算评分
            let sumRate = 0
            for(let i = 0;i<getMovieRateListFromAPI.length;i++){
              sumRate = sumRate+getMovieRateListFromAPI[i].rate
            }
         
            console.log('sumRate===',sumRate)
            const averageRate = sumRate/getMovieRateListFromAPI.length
            note.rate = averageRate
            
          }else{
            note.rate = 0
          }
  
          
          console.log(getUrlResult);
          note.imageList = getUrlResult.url;
        }
       
        return note;
      })
    );
    console.log('dataListFromAPI===',dataListFromAPI)
    setData(dataListFromAPI);
  }
  const showLoginModal = () => {
    setIsModalOpen(true);
  };
  const handleCancelLogin = () => {
    setIsModalOpen(false);
  };
  async function currentAuthenticatedUser() {
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      setUsername(username);
      setUserId(userId)
      console.log(`The username: ${username}`);
      console.log(`The userId: ${userId}`);
      console.log(`The signInDetails: ${signInDetails}`);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    currentAuthenticatedUser();
  }, []);
  const confirm = (e) => {
    console.log(e);
    createMovieRatingItem()
    fetchAllMovies()
    // message.success('Click on Yes');
  };
  const cancel = (e) => {
    console.log(e);
    // message.error('Click on No');
  };
  async function createMovieRatingItem() {
    const data = {
      movieId:currentMovieItem?.id||'',
      userId,
      rate,
    };
    console.log(data);
    await client.graphql({
      query: createMovieRating,
      variables: { input: data },
    });
    setRate(0);
    setCurrentMovieItem(null);
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
      >
        {data.map((item) => (
          <SwiperSlide
            key={item.id}
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
            }}
          >
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 2,
                  cursor: "pointer",
                  background: "rgba(0,0,0,0.5)",
                  padding: 5,
                  borderTopLeftRadius: 5,
                }}
              >
                <PlusOutlined style={{ fontSize: 20, fontWeight: "bold" }} />
              </div>
              <Image
                style={{
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                  position: "relative",
                  zIndex: 1,
                }}
                height={280}
                width={200}
                src={item.imageList}
                preview={false}
              />
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                width: 200,
                padding: 12,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
              }}
            >
              <div style={{ textAlign: "left" }}>
                <StarFilled style={{ color: "#f5c518" }} />
                <span style={{ padding: "0 30px 0 10px", fontWeight: "bold" }}>
                  {item?.rate || 0}
                </span>
                {username ? (
                  <Popconfirm
                    icon={null}
                    title={null}
                    description={() => (
                      <Rate
                        onChange={(value)=>{setRate(value);setCurrentMovieItem(item)}}
                        value={rate}
                        count={10}
                      />
                    )}
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText=""
                    cancelText=""
                  >
                    <StarOutlined
                      style={{ color: "#f5c518", cursor: "pointer" }}
                    />
                  </Popconfirm>
                ) : (
                  <StarOutlined
                    style={{ color: "#f5c518", cursor: "pointer" }}
                    onClick={() => {
                      showLoginModal();
                    }}
                  />
                )}
              </div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  padding: "15px 0",
                  textAlign: "left",
                }}
              >
                {item.name}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  cursor: "pointer",
                  borderRadius: 5,
                  fontSize: 16,
                  fontWeight: "bold",
                  padding: 10,
                  background: "rgba(255,255,255,0.1)",
                  color: "#5799ef",
                }}
              >
                <PlusOutlined
                  style={{ color: "#f5c518", fontSize: 20, fontWeight: "bold" }}
                />
                Watchlist
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
      <Modal
        title=""
        open={isModalOpen}
        footer={null}
        onCancel={handleCancelLogin}
      >
        <div style={{paddingTop:30}}>
        <Authenticator>
          {({ signOut, user }) => {
            setUsername(user.username);
            setUserId(user.userId);
            handleCancelLogin();
          }}
        </Authenticator>
        </div>
      
      </Modal>
    </div>
  );
};

export default Index;
