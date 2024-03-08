import React, { useEffect } from "react";
import SectionBotton from "../components/sectionButton";
import HomeTopNewsSection from "../components/homeTopNewsSection";
import HomeUpNextMediaSection from "../components/homeUpNextMediaSection";
import HomeFeaturedTodaySection from "../components/homeFeaturedTodaySection";
const Index = () => {
  useEffect(() => {}, []);

  return (
    <div style={{ padding: '50px 70px' }}>
      {/* Home Section */}
      <div>
        <HomeUpNextMediaSection />
      </div>
      {/* Home Section */}
      <div>
        <div style={{color:'#f5c518',fontSize:40, fontWeight:'bolder'}}>Featured Today</div>
        <HomeFeaturedTodaySection />
      </div>
      {/* HomeTopNewsSection */}
      <div>
        <SectionBotton content={"Top News"} type={"topNews"} />
        <div>
          <HomeTopNewsSection />
        </div>
      </div>
    </div>
  );
};

export default Index;
