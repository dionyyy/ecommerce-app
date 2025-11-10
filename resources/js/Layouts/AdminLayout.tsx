import React, { useEffect, useState } from 'react';
import {
    DesktopOutlined,
    DownOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Avatar, Breadcrumb, Button, Dropdown, Layout, Menu, MenuProps, Space, theme } from 'antd';
import { Link as InertiaLink, router, usePage } from '@inertiajs/react';

const { Header, Content, Footer, Sider } = Layout;

type AdminLayoutProps = {
    children: React.ReactNode,
    user?: { name: string; email: string };
}

const menuItems = [
    { key: '/admin/dashboard', icon: <PieChartOutlined />, label: <InertiaLink href="/admin/dashboard">Dashboard</InertiaLink> },
    { key: '/admin/products', icon: <DesktopOutlined />, label: <InertiaLink href="/admin/products">Products</InertiaLink> },
    { key: '/admin/orders', icon: <FileOutlined />, label: <InertiaLink href="/admin/orders">Orders</InertiaLink> },
    {
        key: '/admin/users-management',
        label: 'Users Management',
        icon: <UserOutlined />,
        children: [
            { key: '/admin/users', label: <InertiaLink href="/admin/users">Users</InertiaLink> },
            { key: '/admin/customers', label: <InertiaLink href="/admin/customers">Customers</InertiaLink> },
        ],
    },
    {
        key: '/admin/reports',
        label: 'Reports',
        icon: <FileOutlined />,
        children: [
            { key: '/admin/reports/option9', label: <InertiaLink href="/admin/reports/option9">Option 9</InertiaLink> },
            { key: '/admin/reports/option10', label: <InertiaLink href="/admin/reports/option10">Option 10</InertiaLink> },
        ],
    },
];

const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <a onClick={() => {
                router.post(route('logout'));
            }}>
                Logout
            </a>
        ),
    },
];

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const user = usePage().props.auth.user;
    const [collapsed, setCollapsed] = useState(false);
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    useEffect(() => {
        const path = window.location.pathname;
        const parentKey = menuItems.find(item =>
            item.children?.some(child => child.key === path)
        )?.key;

        if (parentKey) {
            setOpenKeys([parentKey]);
        }
    }, [])

    const onOpenChange = (keys: string[]) => {
        setOpenKeys(keys);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} width={300}>
                <div className="py-6 demo-logo-vertical">
                    <h2 className="text-center text-white">Admin Panel</h2>
                </div>
                <Menu
                    theme="dark"
                    defaultSelectedKeys={['/admin/dashboard']}
                    mode="inline"
                    items={menuItems}
                    selectedKeys={[window.location.pathname]}
                    openKeys={openKeys}
                    onOpenChange={onOpenChange}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <div className="flex justify-between items-center px-4">
                        <h2 className="text-lg"></h2>
                        <Dropdown menu={{ items }} trigger={['click']}>
                            <a onClick={(e) => e.preventDefault()}>
                                <Space style={{ cursor: 'pointer' }}>
                                    <Avatar icon={<UserOutlined />} />
                                    <span style={{ fontWeight: 500 }}>{user?.name}</span>
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown>
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
                    Ant Design ©{new Date().getFullYear()} Created by DonFaqundo
                </Footer>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
