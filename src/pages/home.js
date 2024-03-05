import React, { useEffect } from "react";
import SectionBotton from "../components/sectionButton";
import HomeTopNewsSection from "../components/homeTopNewsSection";
import HomeUpNextMediaSection from "../components/homeUpNextMediaSection";
const Index = () => {
  useEffect(() => {}, []);

  return (
    <div style={{ padding: '50px 70px' }}>
      {/* Home Section */}
      <div>
        <HomeUpNextMediaSection />
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
