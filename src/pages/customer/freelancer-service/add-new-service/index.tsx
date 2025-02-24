import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, TreeSelect, Upload, Cascader, message } from 'antd';
import { useState } from 'react';
import { uploadToCloudinary } from '../../../../consts/function';

const AddNewService = () => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleUpload = async (file: File) => {
        message.loading("Uploading...");
        const url = await uploadToCloudinary(file);
        if (url) {
            setImageUrl(url);
            message.success("Upload thành công!");
        } else {
            message.error("Upload thất bại!");
        }
    };

    const onFinish = (values) => {
        console.log("values: ", values);
    }

    return (
        <div className="mx-5 mt-10">
            <div className="container mx-auto">
                <>
                    <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                        onFinish={onFinish}
                    >
                        <div className='grid grid-cols-12'>
                            <div className='col-span-6'>
                                <Form.Item label="a" >
                                    <Upload
                                        showUploadList={false}
                                        beforeUpload={(file) => {
                                            handleUpload(file);
                                            return false; // Ngăn không cho AntD upload tự động
                                        }}
                                    >
                                        <Button icon={<UploadOutlined />}>Upload Ảnh</Button>
                                    </Upload>
                                    {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ width: 200, marginTop: 10 }} />}
                                </Form.Item>
                            </div>
                            <div className='col-span-6'>
                                <Form.Item label="Input" name="a">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Input" name="b">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Select" name="c">
                                    <Select>
                                        <Select.Option value="demo">Demo</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="TreeSelect" name="d">
                                    <TreeSelect
                                        treeData={[
                                            { title: 'Light', value: 'light', children: [{ title: 'Bamboo', value: 'bamboo' }] },
                                        ]}
                                    />
                                </Form.Item>
                                <Form.Item label="Cascader" name="e">
                                    <Cascader
                                        options={[
                                            {
                                                value: 'zhejiang',
                                                label: 'Zhejiang',
                                                children: [
                                                    {
                                                        value: 'hangzhou',
                                                        label: 'Hangzhou',
                                                    },
                                                ],
                                            },
                                        ]}
                                    />
                                </Form.Item>
                                <Form.Item label={null}>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </div>
                        </div>
                    </Form>
                </>
            </div>
        </div>
    )
}

export default AddNewService