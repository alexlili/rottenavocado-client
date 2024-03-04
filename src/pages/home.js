import React, { useEffect } from 'react';
import SectionBotton from '../components/sectionButton'
import HomeTopNewsSection from '../components/homeTopNewsSection'

const Index = () => {

    useEffect(() => {

    }, [])




    return (
        <div style={{padding:50}}>
            <div>
                <SectionBotton content={'Top News'} type={'topNews'} />
                <div>
                <HomeTopNewsSection/>
                    
                </div>

            </div>

        </div>
    );
};

export default Index;