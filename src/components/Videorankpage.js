import React, { useRef, useState, useEffect } from 'react';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from './Highlighter';


function useColumnSearchProps(dataIndex) {
  const [searchText, setSearchText] = useState('');
  const searchInput = useRef();

  const handleSearch = (selectedKeys, confirm) => {
    console.log(selectedKeys[0])
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  return {
    getColumnSearchProps: () => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={searchInput}
            placeholder={`搜索 ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              搜索
            </Button>
            <Button
              onClick={() => handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              重置
            </Button>
          </Space>
        </div>
      ),
      filterIcon: filtered => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: text =>text,
    }),
  };
}



const VideoRankTable = ({onchange}) => {
  const [data, setData] = useState([]);

  // 定义表格的列

  useEffect(() => {
    const apiUrl = 'http://8.130.54.57:5000/api/videorankinfo';

    // 准备发送给后端的数据
    const requestData = {
        ownerlink: 'iJ1Lw2Xs',
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
  const transformedData = data.map(item => ({
    ...item,
    one_day_likecount_increasing: `${(item.one_day_likecount_increasing * 100).toFixed(2)}%`,
  }));

  const one_day_likecount_increasingSorter = (a, b) => {
    const percentA = parseFloat(a.one_day_likecount_increasing.replace('%', ''));
    const percentB = parseFloat(b.one_day_likecount_increasing.replace('%', ''));
    return percentA - percentB;};

  const columns = [
    {
      title: '视频链接',
      dataIndex: 'link',
      key: 'link',
      render: text => <a href={`https://www.douyin.com/video/${text}/`} target='_blank'>{text}</a>,
    },
    {
      title: '视频文案 ',
      dataIndex: 'text',
      key: 'text',
    },
    {
      title: '单日点赞涨幅',
      dataIndex: 'one_day_likecount_increasing',
      key: 'one_day_likecount_increasing',
      sorter: one_day_likecount_increasingSorter
    },
    {
      title: '单日点赞增长',
      dataIndex: 'one_day_likecount',
      key: 'one_day_likecount',
      sorter: (a, b) => a.one_day_likecount - b.one_day_likecount
    },
    {
      title: '跟拍背景音乐',
      dataIndex: 'follow_shot_bgm',
      key: 'follow_shot_bgm',
    },
    {
      title: '跟拍背景音乐单日增长',
      dataIndex: 'one_day_follow_shot_bgm_count',
      key: 'one_day_follow_shot_bgm_count',
    },
    {
      title: '作者名称',
      dataIndex: 'Masternickname',
      key: 'Masternickname',
      ...useColumnSearchProps('Masternickname').getColumnSearchProps()
    },
    {
      title: '达人链接',
      dataIndex: 'Masterlink',
      key: 'Masterlink',
      render: text => <a href={`https://v.douyin.com/${text}/`} target='_blank'>{text}</a>,
    },
    {
      title: '视频上传时间',
      dataIndex: 'uploadtime',
      key: 'uploadtime',
    },

  ];
  return <Table columns={columns} dataSource={transformedData} />;
};

export default VideoRankTable;
