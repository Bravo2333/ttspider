import React, { useEffect, useState } from 'react';
import { Layout, Card } from 'antd';
import { Line } from '@ant-design/charts';

const {Content } = Layout;

const MasterBar = ({masterlink, onchange}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const MasterBarapiUrl = 'http://localhost:5000/api/masterbaseinfo';
    // 准备发送给后端的数据
    const requestData = {
        ownerlink: masterlink,
    };

    // 使用fetch发送POST请求
    fetch(MasterBarapiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // 告诉后端请求体是JSON格式
      },
      body: JSON.stringify(requestData), // 将JavaScript对象转换为JSON字符串
    })
    .then((response) => response.json())
    .then((data) => {
      setData(data) // 使用后端返回的数据更新状态
    })
    .catch((error) => {
      console.error('Error fetching data: ', error);
      // 处理错误情况
    });
  }, []); // 空数组确保effect只在组件挂载时运行
  const config = data&& data.length > 0 ? {
    data,
    xField: 'updatetime',
    yField: 'likecount',
    height: 200, // 设置折线图的高度为 200
    point: {
      size: 3, // 调整点的大小
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
  }: null;
  const config2 = data&& data.length > 0 ? {
    data,
    xField: 'updatetime',
    yField: 'followed',
    height: 200, // 设置折线图的高度为 200
    point: {
      size: 3, // 调整点的大小
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
  }: null;
  if (!data || data.length === 0) {
    // Render a loading state or a placeholder to handle the case where data is not yet available
    return <div>Loading...</div>;
  }
  const firstItem = data[0];
  return (
    <Layout>
      <Content style={{ padding: '20px' }} >
        <div style={{ display: 'flex' }}>
          {/* 左侧用户信息 */}
          <Card style={{ flex: 1 }}>
            <h2>达人基础信息</h2>
            <p>达人昵称: {firstItem.nickname}</p>
            <p>总获赞量: {firstItem.likecount}</p>
            <p>ip属地: {firstItem.ipaddress}</p>
            <p>总粉丝数: {firstItem.followed}</p>
            <p>主页链接: <a href={`https://v.douyin.com//${firstItem.link}/`} target='_blank'>link</a></p>
          </Card>
          {/* <Card
            title="涨幅数据"
            extra={<a onClick={() => onchange()}>总榜</a>}
            style={{
              width: 300,
            }}
          >
           <p>达人昵称: {firstItem.nickname}</p>
            <p>总获赞量: {firstItem.likecount}</p>
            <p>ip属地: {firstItem.ipaddress}</p>
            <p>总粉丝数: {firstItem.followed}</p>
          </Card> */}
          {/* 右侧折线图 */}
          <Card style={{ flex: 2 }}>
            {/* <h2>点赞数趋势图</h2>
            <Line {...config} /> */}
            <h2>粉丝数趋势图</h2>
            <Line {...config2} />
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default MasterBar;
