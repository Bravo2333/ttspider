import React, { useState, useEffect } from 'react';
import { Layout, Table } from 'antd';
const Masterdetial = ({currentownerlink}) => {
  const [data, setData] = useState([]);

  // 定义表格的列
  const columns = [
    {
      title: '视频链接',
      dataIndex: 'link',
      key: 'link',
      render: text => <a href={`https://www.douyin.com/video/${text}/`} target='_blank'>link</a>,
    },
    {
      title: '视频点赞数',
      dataIndex: 'likecount',
      key: 'likecount',
      sorter: (a, b) => a.likecount - b.likecount
    },
    {
      title: '更新时间',
      dataIndex: 'updatetime',
      key: 'updatetime',
    },
    {
      title: '视频文案',
      dataIndex: 'text',
      key: 'text',
    },
    {
      title: '评论',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: '背景音乐',
      dataIndex: 'follow_shot_bgm',
      key: 'follow_shot_bgm',
    },
    {
      title: '跟拍数量',
      dataIndex: 'follow_shot_bgm_count',
      key: 'follow_shot_bgm_count',
    },
    {
      title: '收藏',
      dataIndex: 'collect',
      key: 'collect',
    },
    {
      title: '作品上传时间',
      dataIndex: 'uploadtime',
      key: 'uploadtime',
    },
    {
      title: 'fatchid',
      dataIndex: 'fatchid',
      key: 'fatchid',
    },
  ];

  useEffect(() => {
    const apiUrl = 'http://localhost:5000/api/masterdetial';

    // 准备发送给后端的数据
    const requestData = {
        ownerlink: currentownerlink,
    };

    // 使用fetch发送POST请求
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // 告诉后端请求体是JSON格式
      },
      body: JSON.stringify(requestData), // 将JavaScript对象转换为JSON字符串
    })
    .then((response) => response.json())
    .then((data) => {
      setData(data); // 使用后端返回的数据更新状态
    })
    .catch((error) => {
      console.error('Error fetching data: ', error);
      // 处理错误情况
    });
  }, []); // 空数组确保effect只在组件挂载时运行
  
  if ((data)==='no video')
    return <p>该用户近三天暂无数据</p>;
  
  return (
  <Table columns={columns} dataSource={data} />
  );
};

export default Masterdetial;
