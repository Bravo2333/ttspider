import React , { useState }from 'react';
import { Layout, Menu, Card, Space } from 'antd';
import { Line } from '@ant-design/charts';
import { Link, useLocation } from 'react-router-dom';
import MasterBar from '../components/MasterBar';
import MasterTable from '../components/MasterTable';
import Masterdetial from '../components/Masterdetial';
import MasterRankTable from '../components/MasterRankTable';
import VideoRankTable from '../components/Videorankpage'
import VideoTable from '../components/VideoTable';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;
const {Content, Sider, Footer } = Layout;

const HomePage = () => {
  const [selectedMenu, setSelectedMenu] = useState('1');
  const [Masterlink, setMasterlink] = useState('iJj5KDf5');

  const handleMenuClick = e => {
    setSelectedMenu(e.key);
  };
  function MasterRankClick(){
    setSelectedMenu('1');
  }
  function MasterdetialClick (link){
    setMasterlink(link);
    setSelectedMenu('3');
    //var divs = document.getElementById("masterdetia");
            // 设置 div 的新内容
    //divs.innerHTML = <Masterdetial currentownerlink={Masterlink}/>;
  };
  function returncurrentlink(){
    return Masterlink
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            onClick={handleMenuClick}
            selectedKeys={[selectedMenu]}

            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }
          }
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="达人管理">
              <Menu.Item key="1">达人榜单</Menu.Item>
              <Menu.Item key="2">达人概览</Menu.Item>
              <Menu.Item key="3" >达人详情</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="视频管理">
              <Menu.Item key="5">视频榜单</Menu.Item>
              <Menu.Item key="6">视频概览</Menu.Item>
              <Menu.Item key="7">视频详情</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<NotificationOutlined />} title="设置">
              <Menu.Item key="9" >option9</Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '24px 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{ 
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            
            
            {/* 内容区域，可以放置你的卡片布局或其他组件 */}
            {selectedMenu === '1' && (
            <div>
              <MasterRankTable onchange = {MasterdetialClick}/>
              </div>
        )}
        {selectedMenu === '2' && (
          <div>
          <Space direction="horizontal" size={16} style={{ display: 'flex', justifyContent: 'start' }}>
          <Card
            title="Default size card"
            extra={<a href="#">More</a>}
            style={{
              width: 300,
            }}
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          <Card
            title="Default size card"
            extra={<a href="#">More</a>}
            style={{
              width: 300,
            }}
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          <Card
            title="Default size card"
            extra={<a href="#">More</a>}
            style={{
              width: 300,
            }}
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          <Card
            title="Default size card"
            extra={<a href="#">More</a>}
            style={{
              width: 300,
            }}
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Space>
        <p></p>
            {/* SubMenu 2被选择时显示的内容 */}
            <MasterTable onchange = {MasterdetialClick}/>
          </div>
        )}
        {selectedMenu === '3' && (
            <div  > 
            <Layout>
              <MasterBar masterlink= {Masterlink} onchange = {MasterRankClick}/>
            <Masterdetial currentownerlink = {Masterlink} />
            </Layout>
            </div>
            
        )}
        {selectedMenu === '5' && (
            <div>
              <VideoRankTable/>
              </div>
        )}
        {selectedMenu === '6' && (
            <div>
              <VideoTable/>
              </div>
        )}
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2024 Created by yyp</Footer>
        </Layout> 
      </Layout>
    </Layout>
  );
};

export default HomePage;
 