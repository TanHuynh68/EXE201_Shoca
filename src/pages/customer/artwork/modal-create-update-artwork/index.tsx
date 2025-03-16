import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, InputNumber } from 'antd';

export interface ArtworkData {
    title: string;
    description: string;
    thumbnailUrl: string;
    price: number;
    creatorId: string;
    imageUrls: string[];
    categoryIds: string[];
}

interface ArtworkModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: ArtworkData) => void;
    initialData?: ArtworkData | null; // For updating an existing artwork
}

const ModalCreateUpdateArtwork: React.FC<ArtworkModalProps> = ({ open, onClose, onSubmit, initialData }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (initialData) {
            form.setFieldsValue(initialData);
        } else {
            form.resetFields();
        }
    }, [initialData, form]);

    const handleFinish = (values: ArtworkData) => {
        onSubmit(values);
    };

    return (
        <Modal
            title={initialData ? "Update Artwork" : "Create Artwork"}
            visible={open}
            onCancel={onClose}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please input the title!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input the description!' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item
                    label="Thumbnail URL"
                    name="thumbnailUrl"
                    rules={[{ required: true, message: 'Please input the thumbnail URL!' }]}
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
                    label="Creator ID"
                    name="creatorId"
                    rules={[{ required: true, message: 'Please input the creator ID!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Image URLs"
                    name="imageUrls"
                    rules={[{ required: true, message: 'Please input at least one image URL!' }]}
                >
                    <Input.TextArea rows={4} placeholder="Enter image URLs separated by commas" />
                </Form.Item>

                <Form.Item
                    label="Category IDs"
                    name="categoryIds"
                    rules={[{ required: true, message: 'Please input at least one category ID!' }]}
                >
                    <Input.TextArea rows={4} placeholder="Enter category IDs separated by commas" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        {initialData ? "Update Artwork" : "Create Artwork"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalCreateUpdateArtwork;