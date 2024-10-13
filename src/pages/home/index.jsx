import { useEffect, useState } from 'react';
// import { Stack } from '@mui/material';
import reactLogo from '../../assets/react.svg';
import blockletLogo from '../../assets/blocklet.svg';
import viteLogo from '../../assets/vite.svg';
import walletLogo from '../../assets/wallet.png';
import api from '../../libs/api';
import './index.css';
import React from 'react';
import { Row, Col, Card, Typography, Button, Modal, Input, message, Select } from 'antd';
import 'antd/dist/reset.css'; // 引入重置样式


const { Title } = Typography;

function Home () {
  const [isEditing, setEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: 'lin',
    email: 'user@example.com',
    phone: '13512121212',
    countryCode: '+86'
  });
  useEffect(() => {
    const getUser = () => {
      api.get('/user/sel').then((res) => {
        if (res.status == 200) {
          if (res.data.message) {

            const userMess = res.data.message;
            if (userMess.length == 0) {
              setUserDb();
            } else {
              setUserInfo(userMess[0]);
            }
          }
        }
      });
    }
    getUser();
  }, []);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleOk = () => {
    const usernamePattern = /^[a-zA-Z\s]{4,15}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^(\+?\d{1,3}[- ]?)?\d{11}$/;
    if (!userInfo.username) {
      return message.error('Please input your username!');
    }
    if (!usernamePattern.test(userInfo.username)) {
      return message.error('Username must be 4-15 characters long and can only contain letters and spaces!');
    }

    if (userInfo.email) {
      if (!emailPattern.test(userInfo.email)) {
        return message.error('Please enter a valid email address!');
      }
    }
    if (!userInfo.phone) {
      return message.error('Please input your username!');
    }
    if (!phonePattern.test(userInfo.phone)) {
      return message.error('Please enter a valid phone!');
    }
    setEditing(false);
    setUserInfo(userInfo);
    setUserDb();
  };



  const setUserDb = () => {
    api.post('/user/edit', { userInfo })
      .then((res) => {
        if (res.status == 200) {
          message.success('Edit success');
        }
      })
      .catch(() => {
        message.error('Edit error');
      });
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value.trim(),
    });
  };
  const handleCountryCodeChange = (value) => {
    setUserInfo({ ...userInfo, countryCode: value });
  };
  return (
    <Row justify="center" style={{ marginTop: '150px' }}>
      <Col xs={24} sm={18} md={9}>
        <Card className='card'>
          <Title level={3} style={{ textAlign: 'center', color: '#333' }}>
            User Mess
          </Title>
          <Row className='row-margin'>
            <Col span={7} className='col-b'>username：</Col>
            <Col span={1} ></Col>
            <Col span={16}>{userInfo.username}</Col>
          </Row>
          <Row className='row-margin'>
            <Col span={7} className='col-b'>email：</Col><Col span={1} ></Col>
            <Col span={16} >{userInfo.email}</Col>
          </Row>
          <Row className='row-margin'>
            <Col span={7} className='col-b'>phone：</Col><Col span={1} ></Col>
            <Col span={16} >{userInfo.phone}</Col>
          </Row>
          <Button type="primary" size='large' onClick={handleEditClick} style={{ width: '100%' }} className='row-margin'>
            Edit
          </Button>
        </Card>
      </Col>

      <Modal
        title="Edit Mess"
        open={isEditing}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row className='row-margin'>
          <Col xs={11} sm={7} md={5} style={{ lineHeight: "2.5em" }} className='col-b'><span style={{ color: 'red' }}>*</span>username：</Col>
          <Col span={1}></Col>
          <Col xs={12} sm={16} md={18} >
            <Input className="underlined-input"
              name="username"
              value={userInfo.username} onChange={handleInputChange}
            />
          </Col>
        </Row>
        <Row className='row-margin'>
          <Col xs={11} sm={7} md={5} style={{ lineHeight: "2.5em" }} className='col-b'>email：</Col>
          <Col span={1}></Col>
          <Col xs={12} sm={16} md={18} >
            <Input className="underlined-input"
              name="email"
              value={userInfo.email} onChange={handleInputChange}
            />
          </Col>
        </Row>
        <Row className='row-margin'>
          <Col xs={11} sm={7} md={5} style={{ lineHeight: "2.5em" }} className='col-b'><span style={{ color: 'red' }}>*</span>phone：</Col>
          <Col span={3}>
            <Select
              defaultValue="+86"
              onChange={handleCountryCodeChange}
            >
              <Option value="+1">+1</Option>
              <Option value="+86">+86</Option>
              <Option value="+44">+44</Option>
            </Select>
          </Col>
          <Col xs={10} sm={14} md={16} >
            <Input className="underlined-input"
              name="phone"
              value={userInfo.phone} onChange={handleInputChange}
            />
          </Col>
        </Row>
      </Modal >
    </Row >
  );
}


export default Home;
