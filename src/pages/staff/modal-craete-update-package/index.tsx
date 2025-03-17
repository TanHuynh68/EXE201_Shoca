export interface ProPackageDataProps {
    id?: string; // Optional for new packages
    name: string;
    price: number;
    features: string[];
    duration: string;
}

import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, InputNumber, Select } from 'antd';

export interface ModalCreateUpdateProPackageDataPropsProps {
    proPackage?: ProPackageDataProps | null; // For updating an existing package
    form: any; // Ant Design form instance
    isModalOpen: boolean;
    handleCancel: () => void;
    onSubmit: (data: ProPackageDataProps) => void; // Function to handle form submission
}

const ModalCreateUpdateProPackageDataProps: React.FC<ModalCreateUpdateProPackageDataPropsProps> = ({ proPackage, form, isModalOpen, handleCancel, onSubmit }) => {
    useEffect(() => {
        if (proPackage) {
            form.setFieldsValue({
                ...proPackage,
                features: proPackage.features.join(', '), // Convert array to comma-separated string for input
            });
        } else {
            form.resetFields();
        }
    }, [proPackage, form]);

    const handleFinish = (values: ProPackageDataProps) => {
        // Split the features string back into an array
        values.features = values.features.split(',').map(feature => feature.trim());
        onSubmit(values);
    };

    return (
        <Modal
            title={proPackage ? "Update Pro Package" : "Create Pro Package"}
            visible={isModalOpen}
            onCancel={handleCancel}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
            >
                <Form.Item
                    label="Package Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input the package name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: 'Please input the price!' }]}
                >
                    <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label="Features"
                    name="features"
                    rules={[{ required: true, message: 'Please input the features!' }]}
                >
                    <Input placeholder="Enter features separated by commas" />
                </Form.Item>

                <Form.Item
                    label="Duration"
                    name="duration"
                    rules={[{ required: true, message: 'Please input the duration!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        {proPackage ? "Update Package" : "Create Package"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalCreateUpdateProPackageDataProps;