import React, { Children, useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

type AdminLayoutProps = {
    children: React.ReactNode,
    user: { name: string; email: string };
}

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  { key: '1', icon: <PieChartOutlined />, label: 'Dashboard' },
  { key: '2', icon: <DesktopOutlined />, label: 'Products' },
  { key: '3', icon: <FileOutlined />, label: 'Orders' },
  {
    key: '4',
    label: 'Users Management',
    icon: <UserOutlined />,
    children: [
      { key: '6', label: 'Users' },
      { key: '7', label: 'Customers' },
    ],
  },
  {
    key: '5',
    label: 'Reports',
    icon: <FileOutlined />,
    children: [
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' },
      {
        key: 'sub3',
        label: 'Submenu',
        children: [
          { key: '11', label: 'Option 11' },
          { key: '12', label: 'Option 12' },
        ],
      },
    ],
  },
];

const AdminLayout: React.FC<AdminLayoutProps> = ({children, user}) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} width={300}>
            <div className="py-6 demo-logo-vertical">
                <h2 className="text-center">Admin Panel</h2>
            </div>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
        <Layout>
            <Header style={{ padding: 0, background: colorBgContainer }}>
                <div className="flex justify-between items-center px-4">
                    <h2 className="text-lg"></h2>
                    <div>
                        <span className="mr-4">Welcome, {user?.name}</span>
                    </div>
                </div>
            </Header>
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Admin</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div
                    style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                    }}
                >
                    {children}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
        </Layout>
    </Layout>
  );
};

export default AdminLayout;
