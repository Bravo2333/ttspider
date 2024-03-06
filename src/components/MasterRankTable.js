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
    }),
  };
}



const MasterRankTable = ({onchange}) => {
  const [data, setData] = useState([]);

  // 定义表格的列

  useEffect(() => {
    const apiUrl = 'http://localhost:5000/api/masterrankinfo';

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
    One_day_like_increasing: `${(item.One_day_like_increasing * 100).toFixed(2)}%`,
    Three_day_like_increasing: `${(item.Three_day_like_increasing * 100).toFixed(2)}%`,
    One_day_followed_increasing: `${(item.One_day_followed_increasing * 100).toFixed(2)}%`,
    Three_day_followed_increasing: `${(item.Three_day_followed_increasing * 100).toFixed(2)}%`,
  }));

  const One_day_like_increasingSorter = (a, b) => {
    const percentA = parseFloat(a.One_day_like_increasing.replace('%', ''));
    const percentB = parseFloat(b.One_day_like_increasing.replace('%', ''));
    return percentA - percentB;};
  const Three_day_like_increasingSorter = (a, b) => {
    const percentA = parseFloat(a.Three_day_like_increasing.replace('%', ''));
    const percentB = parseFloat(b.Three_day_like_increasing.replace('%', ''));
    return percentA - percentB;};
  const One_day_followed_increasingSorter = (a, b) => {
    const percentA = parseFloat(a.One_day_followed_increasing.replace('%', ''));
    const percentB = parseFloat(b.One_day_followed_increasing.replace('%', ''));
    return percentA - percentB;};
  const Three_day_followed_increasingSorter = (a, b) => {
    const percentA = parseFloat(a.Three_day_followed_increasing.replace('%', ''));
    const percentB = parseFloat(b.Three_day_followed_increasing.replace('%', ''));
    return percentA - percentB;};

  const columns = [
    {
      title: '达人昵称',
      dataIndex: 'Masternickname',
      key: 'Masternickname',
      render: (text,record) => <a href={`https://v.douyin.com/${record.Masterlink}/`} target='_blank'>{text}</a>,
      ...useColumnSearchProps('Masternickname').getColumnSearchProps()
    },
    {
      title: '单日点赞涨幅',
      dataIndex: 'One_day_like_increasing',
      key: 'One_day_like_increasing',
      sorter: One_day_like_increasingSorter
    },
    {
      title: '单日点赞增长',
      dataIndex: 'One_day_like_increasing_count',
      key: 'One_day_like_increasing_count',
      sorter: (a, b) => a.One_day_like_increasing_count - b.One_day_like_increasing_count
    },
    {
      title: '三日点赞涨幅',
      dataIndex: 'Three_day_like_increasing',
      key: 'Three_day_like_increasing',
      sorter: Three_day_like_increasingSorter
    },
    {
      title: '三日点赞增长',
      dataIndex: 'Three_day_like_increasing_count',
      key: 'Three_day_like_increasing_count',
      sorter: (a, b) => a.Three_day_like_increasing_count - b.Three_day_like_increasing_count
    },
    {
      title: '追踪至今点赞增长',
      dataIndex: 'to_current_likecount_increasing',
      key: 'to_current_likecount_increasing',
      sorter: (a, b) => a.to_current_likecount_increasing - b.to_current_likecount_increasing
    },

    {
      title: '单日关注涨幅',
      dataIndex: 'One_day_followed_increasing',
      key: 'One_day_followed_increasing',
      sorter:One_day_followed_increasingSorter
    },
    {
      title: '单日关注增长',
      dataIndex: 'One_day_followed_increasing_count',
      key: 'One_day_followed_increasing_count',
      sorter: (a, b) => a.One_day_followed_increasing_count - b.One_day_followed_increasing_count
    },
    {
      title: '三日关注涨幅',
      dataIndex: 'Three_day_followed_increasing',
      key: 'Three_day_followed_increasing',
      sorter: Three_day_followed_increasingSorter
    },
    {
      title: '三日关注增长',
      dataIndex: 'Three_day_followed_increasing_count',
      key: 'Three_day_followed_increasing_count',
      sorter: (a, b) => a.Three_day_followed_increasing_count - b.Three_day_followed_increasing_count
    },
    {
      title: '追踪至今关注增长',
      dataIndex: 'to_current_followed_increasing',
      key: 'to_current_followed_increasing',
      sorter: (a, b) => a.to_current_followed_increasingt - b.to_current_followed_increasing
    },
    {
      title: '追踪天数',
      dataIndex: 'trace_days',
      key: 'trace_days',
    },

  ];
  return <Table columns={columns} dataSource={transformedData} />;
};

export default MasterRankTable;
