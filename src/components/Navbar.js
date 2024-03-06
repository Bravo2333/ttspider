import React from 'react';
import { Menu, Button } from 'antd';
import { MailOutlined, PieChartOutlined, BellOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="home" icon={<MailOutlined />}>
      <Link to="/">HomePage</Link>
      </Menu.Item>
      <Menu.Item key="data"  icon={<PieChartOutlined />}>
      <Link to="/Data">DataPage</Link>
      </Menu.Item>
      <Menu.Item key="other"  icon={<PieChartOutlined />}>
      <Link to="/Other">OtherPage</Link>
      </Menu.Item>
      {/* 更多菜单项 */}
    </Menu>
  );
};

export default Navbar;
