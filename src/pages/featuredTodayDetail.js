import { getUrl } from "aws-amplify/storage";
import React, { useState, useEffect } from "react";
import { Image } from "antd";
import { getFeaturedToday } from "../graphql/queries";
import { generateClient } from "aws-amplify/api";
import { useParams, useNavigate } from "react-router-dom";
import { CloseCircleOutlined } from "@ant-design/icons";
const client = generateClient();

const Index = ({}) => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const getUrlParams = useParams();
  console.log("getUrlParams", getUrlParams);

  async function fetchFeaturedToday() {
    const apiData = await client.graphql({
      query: getFeaturedToday,
      variables: { id: getUrlParams.id },
    });
    const dataFromAPI = apiData.data.getFeaturedToday;
    console.log(dataFromAPI);
    if (dataFromAPI.backgroundImage) {
      const getUrlResult = await getUrl({ key: dataFromAPI.title });
      console.log(getUrlResult);
      dataFromAPI.backgroundImage = getUrlResult.url;
    }
    setData(dataFromAPI);
  }

  useEffect(() => {
    fetchFeaturedToday();
  }, [getUrlParams]);
  return (
    <div
      style={{
        position: "fixed",
        zIndex: 999,
        width: "100%",
        height: "100%",
        background: "#000",
        marginTop: -60,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          padding: "20px 0px 0px 60px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          fontSize: 20,
          cursor: "pointer",
        }}
        onClick={() => {
          navigate(`/home`);
        }}
      >
        <CloseCircleOutlined
          style={{ fontSize: 30, color: "#f5c518", paddingRight: 10 }}
        />
        close
      </div>
      <div style={{ padding: 60, paddingTop: 70 }}>
        <Image height={"100%"} src={data.backgroundImage} preview={false} />
      </div>
      <div
        style={{
          background: "rgba(0,0,0,0.8)",
          padding: "40px 60px",
          color: "#fff",
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        <div style={{ flex: 2, fontWeight: "bold" }}>
          <div style={{ color: "#f5c518" }}>Photos We Love</div>
          <div style={{ color: "#5799ef", paddingTop: 30, fontSize: 20 }}>
            {data.people} for {data.title}
          </div>
        </div>
        <div style={{ flex: 1, borderLeft: "1px solid #fff", paddingLeft: 40 }}>
          <div style={{ fontSize: 18, lineHeight: "30px", color: "#5799ef" }}>
            <span
              style={{ color: "#fff", fontWeight: "bold", paddingRight: 10 }}
            >
              People
            </span>
            {data.people}
          </div>
          <div style={{ fontSize: 18, lineHeight: "30px", color: "#5799ef" }}>
            <span
              style={{ color: "#fff", fontWeight: "bold", paddingRight: 10 }}
            >
              Title
            </span>
            {data.title}
          </div>
          <div
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.7)",
              padding: "10px 0",
            }}
          >
            {data.photographerInfo}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
