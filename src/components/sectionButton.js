import { getUrl } from 'aws-amplify/storage';
import React, { useState, useEffect } from 'react';
import { Flex, Image, Button, Table, Typography, Modal } from 'antd';
import { listTopNews } from "../graphql/queries";
import { generateClient } from "aws-amplify/api";
import {useNavigate } from "react-router-dom";
import {
    CaretRightOutlined
} from '@ant-design/icons';
const client = generateClient();


const Index = ({ content,type,color }) => {
    const navigate =useNavigate();
    return (
        <Flex align="center" height='50px' onClick={()=>{
            navigate(`/news/${type}`) 
        }}>
                <div style={{ width: 5, backgroundColor: '#f5c518', height: 30, marginRight: 15 }}></div>
                <div style={{ fontSize: 24, fontWeight: 'bold',color:color||'#fff' }}>{content || ''}</div>
                <CaretRightOutlined style={{ fontSize: 24, color: '#f5c518' }} />
            </Flex>

    );
};

export default Index;