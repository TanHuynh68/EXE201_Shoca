import { message, Modal } from 'antd';
import { Form, Input, Button, Select, DatePicker } from 'antd';
import { adminCreateAccount } from '../../services/admin.services';
import { useNavigate } from 'react-router-dom';

interface ModalCreateModalProps {
    isModalOpen: boolean;
    handleCancel: () => void;
    form: ReturnType<typeof Form.useForm<AccountCreateProps>>;
}

export interface AccountCreateProps {
    firstName: string;
    lastName: string;
    gender: number;
    dateOfBirth: string;
    address: string;
    phoneNumber: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: number;
}


const { Option } = Select;

const ModalCreateAccount = ({ isModalOpen, handleCancel, form }: ModalCreateModalProps) => {

    const navogate = useNavigate();
    const handleSubmit = async (values: AccountCreateProps) => {
        console.log('Form Values:', values);
        const response = await adminCreateAccount(values);
        if (response && response.status === true) {
            navogate('/admin/manage-accounts')
            message.success("Create account successfully!")
        }
    };

    return (
        <div>
            <Modal width={800} title="Create Account" footer={null} open={isModalOpen} onCancel={handleCancel}>
                <Form
                    className='my-10'
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{ gender: 0, role: 0 }}
                >
                    <div className='grid grid-cols-2 gap-5'>
                        <Form.Item label="First Name" name="firstName" rules={[{ required: true }]}>
                            <Input placeholder="First Name" />
                        </Form.Item>

                        <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
                            <Input placeholder="Last Name" />
                        </Form.Item>
                    </div>

                    <div className='grid grid-cols-2 gap-5'>
                        <Form.Item label="Gender" name="gender" rules={[{ required: true }]}>
                            <Select>
                                <Option value={0}>Male</Option>
                                <Option value={1}>Female</Option>
                                <Option value={2}>Other</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label="Date of Birth" name="dateOfBirth" rules={[{ required: true }]}>
                            <DatePicker className="w-full" />
                        </Form.Item>
                    </div>

                    <div className='grid grid-cols-2 gap-5'>
                        <Form.Item label="Address" name="address" rules={[{ required: true }]}>
                            <Input placeholder="Address" />
                        </Form.Item>

                        <Form.Item label="Phone Number" name="phoneNumber" rules={[{ required: true }]}>
                            <Input placeholder="Phone Number" />
                        </Form.Item>
                    </div>

                    <div className='grid grid-cols-2 gap-5'>
                        <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
                            <Input placeholder="Email" />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                { required: true, message: 'Password is required.' },
                                { min: 6, message: 'Password must be at least 6 characters.' },
                                {
                                    validator: (_, value) => {
                                        if (!value || (/[a-z]/.test(value) && /[A-Z]/.test(value))) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Password must contain at least one uppercase letter and one lowercase letter.'));
                                    },
                                },
                            ]}
                        >
                            <Input.Password placeholder="Password" />
                        </Form.Item>
                    </div>

                    <div className='grid grid-cols-2 gap-5'>
                        <Form.Item label="Confirm Password" name="confirmPassword"
                         rules={[
                            { required: true, message: 'Password is required.' },
                            { min: 6, message: 'Password must be at least 6 characters.' },
                            {
                                validator: (_, value) => {
                                    if (!value || (/[a-z]/.test(value) && /[A-Z]/.test(value))) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Password must contain at least one uppercase letter and one lowercase letter.'));
                                },
                            },
                        ]}>
                            <Input.Password placeholder="Confirm Password" />
                        </Form.Item>

                        <Form.Item label="Role" name="role">
                            <Select>
                                <Option value={0}>User </Option>
                                <Option value={1}>Admin</Option>
                            </Select>
                        </Form.Item>
                    </div>

                    <Form.Item className='flex justify-center'>
                        <Button type="primary" htmlType="submit" className="w-[200px] bg-purple-500">Create Account</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default ModalCreateAccount;