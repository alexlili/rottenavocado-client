import React, { useEffect } from "react";
import SectionBotton from "../components/sectionButton";
import HomeTopNewsSection from "../components/homeTopNewsSection";
import HomeUpNextMediaSection from "../components/homeUpNextMediaSection";
import HomeFeaturedTodaySection from "../components/homeFeaturedTodaySection";
import HomeBornTodaySection from '../components/homeBornTodaySection'
import HomeMovieSection from '../components/homeMovieSection'
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
      <div>
        <div style={{color:'#f5c518',fontSize:40, fontWeight:'bolder'}}>Movies</div>
        <HomeMovieSection />
      </div>
      <div>
        <div style={{color:'#f5c518',fontSize:40, fontWeight:'bolder'}}>Born Today</div>
        <HomeBornTodaySection />
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
