import DataTable from '@/Components/DataTable';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, usePage } from '@inertiajs/react';
import { Button, Modal, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { PageProps } from '@/types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type UserData = {
    id: number;
    name: string;
    email: string;
};

type Props = {
    users: UserData[];
};

const Index: React.FC = () => {
    const { users } = usePage<PageProps<Props>>().props;
    const [loading, setLoading] = useState(true);
    const [usersData, setUsersData] = useState<UserData[]>([]);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState<UserData | null>(null);

    const { data, setData, put, post, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        setLoading(true);
        setUsersData(users);
        setLoading(false);
    }, [users]);

    const showAddModal = () => {
        setData({ name: '', email: '', password: '' });
        setIsAddModalVisible(true);
    };

    const showEditModal = (user: UserData) => {
        setCurrentUser(user);
        setData({
            name: user.name,
            email: user.email,
            password: '',
        });
        setIsEditModalVisible(true);
    };

    const handleAddUser = () => {
        post(route('admin.user.store'), {
            onSuccess: () => {
                reset();
                toast.success('User added successfully!');
                setIsAddModalVisible(false);
            },
            onError: (errors) => {
                console.log('Validation errors:', errors);
            }
        });
    };

    const handleEditUser = () => {
        if (currentUser) {
            put(route('admin.user.update', currentUser.id), {
                onSuccess: () => {
                    reset();
                    toast.success('User updated successfully!');
                    setIsEditModalVisible(false);
                },
                onError: (errors) => {
                    console.log('Validation errors:', errors);
                }
            });
        }
    };

    const handleCancel = () => {
        setIsEditModalVisible(false);
        setIsAddModalVisible(false);
        reset();
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, record: UserData) => (
                <Button onClick={() => showEditModal(record)}>Edit</Button>
            ),
        },
    ];

    return (
        <AdminLayout>
            <div>
                <div className="flex justify-between items-center">
                    <h1 className='my-10'>User List</h1>
                    <Button type="primary" onClick={showAddModal} style={{ marginRight: 10 }}>
                        Add User
                    </Button>
                </div>
                <DataTable
                    columns={columns}
                    dataSource={usersData}
                    loading={loading}
                    pagination={{ pageSize: 5 }}
                    rowKey="id"
                />

                {/* Add User Modal */}
                <Modal
                    title="Add User"
                    open={isAddModalVisible}
                    onOk={handleAddUser}
                    onCancel={handleCancel}
                    okText="Add"
                    cancelText="Cancel"
                >
                    <Form layout="vertical">
                        <Form.Item
                            label="Name"
                            validateStatus={errors.name && 'error'}
                            help={errors.name}
                        >
                            <Input
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            validateStatus={errors.email && 'error'}
                            help={errors.email}
                        >
                            <Input
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            validateStatus={errors.password && 'error'}
                            help={errors.password}
                        >
                            <Input.Password
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                            />
                        </Form.Item>
                    </Form>
                </Modal>

                {/* Edit User Modal */}
                <Modal
                    title="Edit User"
                    open={isEditModalVisible}
                    onOk={handleEditUser}
                    onCancel={handleCancel}
                    okText="Save"
                    cancelText="Cancel"
                >
                    <Form layout="vertical">
                        <Form.Item
                            label="Name"
                            validateStatus={errors.name && 'error'}
                            help={errors.name}
                        >
                            <Input
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            validateStatus={errors.email && 'error'}
                            help={errors.email}
                        >
                            <Input
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
            <ToastContainer />
        </AdminLayout>
    );
};

export default Index;
