import React, {  useRef,useState, useEffect } from 'react';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
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
const MasterTable = ({onchange}) => {
  const [data, setData] = useState([]);

  // 定义表格的列
  const columns = [
    {
      title: '达人昵称',
      dataIndex: 'nickname',
      key: 'nickname',
      ...useColumnSearchProps('nickname').getColumnSearchProps(),
    },
    {
      title: '达人链接',
      dataIndex: 'link',
      key: 'link',
      render: text => <a href={`https://v.douyin.com/${text}/`} target='_blank'>{text}</a>,
    },
    {
      title: '达人账号',
      dataIndex: 'account',
      key: 'account',
    },
    {
      title: 'ip归属地',
      dataIndex: 'ipaddress',
      key: 'ipaddress',
    },
    {
      title: '达人关注数',
      dataIndex: 'follow',
      key: 'follow',
      sorter: (a, b) => a.follow - b.follow
    },
    {
      title: '达人粉丝数',
      dataIndex: 'followed',
      key: 'followed',
      sorter: (a, b) => a.followed - b.followed
    },
    {
      title: '点赞总计',
      dataIndex: 'likecount',
      key: 'likecount',
      sorter: (a, b) => a.likecount - b.likecount
    },
    {
      title: '数据更新时间',
      dataIndex: 'updatetime',
      key: 'updatetime',
      sorter: (a, b) => new Date(a.updatetime) - new Date(b.updatetime)
    },
    {
      title: '操作',
      dataIndex: 'link',
      key: 'link',
      render: text => <a onClick={() => onchange(text)}>详情</a>,
    },

  ];

  useEffect(() => {
    const apiUrl = 'http://localhost:5000/api/masterlist';

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

  return <Table columns={columns} dataSource={data} />;
};

export default MasterTable;
