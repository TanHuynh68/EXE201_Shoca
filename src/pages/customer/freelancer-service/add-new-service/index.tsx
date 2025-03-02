import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload, message } from "antd";
import { useState } from "react";
import { uploadToCloudinary } from "../../../../consts/function";
import { getUserDataFromLocalStorage } from "../../../../consts/variable";
import { createNewSerivce } from "../../../../services/freelancer.services";

export interface NewService {
    servicename: string;
    description: string;
    price: number;
    imageUrl: string;
    deliveryTime: number;
    numConcepts: number;
    numRevisions: number;
    userId: string;
}

const AddNewService = () => {
    const [file, setFile] = useState<any>(null);

    const handleUpload = async ({ file, onSuccess, onError }: any) => {
        try {
            message.loading({ content: "Uploading...", key: "upload" });
            const url = await uploadToCloudinary(file);
            if (url) {
                setFile({ url, name: file.name });
                message.success({ content: "Upload thành công!", key: "upload" });
                onSuccess("ok");
            } else {
                message.error({ content: "Upload thất bại!", key: "upload" });
                onError(new Error("Upload failed"));
            }
        } catch (error) {
            message.error("Đã xảy ra lỗi khi upload!");
            onError(error);
        }
    };

    const user = getUserDataFromLocalStorage();

    const onFinish = async (values: NewService) => {
        if (user) {
            const newService: NewService = {
                ...values,
                price: Number(values.price),
                deliveryTime: Number(values.deliveryTime),
                numConcepts: Number(values.numConcepts),
                numRevisions: Number(values.numRevisions),
                imageUrl: file?.url || "",
                userId: user.userId,
            };

            console.log("newService: ", newService);
            const response = await createNewSerivce(newService);
            if (response) {
                message.success("Tạo dịch vụ mới thành công");
            } else {
                message.error("Tạo dịch vụ mới thất bại");
            }
        }
    };

    return (
        <div className="mx-5 mt-10">
            <div className="container mx-auto">
                <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="vertical" onFinish={onFinish}>
                    <div className="grid grid-cols-12 gap-4">
                        {/* Upload Hình Ảnh */}
                        <div className="col-span-5">
                            <Form.Item label="Upload Ảnh">
                                <Upload
                                    listType="picture-card"
                                    customRequest={handleUpload}
                                    fileList={file ? [file] : []}
                                    onPreview={() => window.open(file?.url, "_blank")}
                                    showUploadList={{ showRemoveIcon: false }}
                                >
                                    {!file && (
                                        <div className="flex flex-col items-center">
                                            <PlusOutlined className="text-xl" />
                                            <div style={{ marginTop: 8 }}>Upload</div>
                                        </div>
                                    )}
                                </Upload>
                            </Form.Item>
                        </div>

                        {/* Form Nhập Thông Tin */}
                        <div className="col-span-7">
                            <div className="text-xl font-bold">New Service</div>
                            <p className="mt-2 text-gray-600">Add a service to let potential clients know what you're available for, and help them easily book you.</p>
                            <Form.Item className="mt-5" label="Basic Info" name="servicename">
                                <Input placeholder="Enter service name" />
                            </Form.Item>
                            <Form.Item name="description">
                                <Input placeholder="Enter description" />
                            </Form.Item>
                            <Form.Item name="price">
                                <Input type="number" placeholder="Enter price" />
                            </Form.Item>
                            <Form.Item name="deliveryTime">
                                <Input type="number" placeholder="Enter delivery time (days)" />
                            </Form.Item>
                            <Form.Item name="numConcepts">
                                <Input type="number" placeholder="Enter num concepts" />
                            </Form.Item>
                            <Form.Item name="numRevisions">
                                <Input type="number" placeholder="Enter num revisions" />
                            </Form.Item>
                            <Form.Item label={null}>
                                <Button type="primary" htmlType="submit">Submit</Button>
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default AddNewService;
