import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Image, Input, Upload, message } from "antd";
import { useEffect, useState } from "react";
import { uploadToCloudinary } from "../../../../consts/function";
import { getUserDataFromLocalStorage } from "../../../../consts/variable";
import { createNewSerivce, editSerivce, getService } from "../../../../services/freelancer.services";
import { useNavigate, useParams } from "react-router-dom";
import { Service } from "../manage-freelancer-service";
import { useForm } from "antd/es/form/Form";

export interface NewService {
    servicename: string;
    description: string;
    price: number;
    imageUrl: string[];
    deliveryTime: number;
    numConcepts: number;
    numRevisions: number;
    userId: string;
}

const AddNewService = () => {
    const { id } = useParams();
    const [form] = useForm();
    const [fileList, setFileList] = useState<string[]>([]); // Chuyển sang danh sách URL ảnh
    const [service, setService] = useState<Service>();
    const navigate = useNavigate();

    useEffect(() => {
        getServicebyClient();
    }, [id]);

    const getServicebyClient = async () => {
        if (id) {
            const response = await getService(id);
            setService(response);
            setFileList(response.imageUrl ? [response.imageUrl] : []); // Cập nhật danh sách ảnh nếu có
        }
    };

    if (service) {
        form.setFieldsValue({
            servicename: service.servicename,
            description: service.description,
            price: service.price,
            deliveryTime: service.deliveryTime,
            numConcepts: service.numConcepts,
            numRevisions: service.numRevisions
        });
    }

    // Xóa ảnh khỏi danh sách
    const handleRemove = (fileUrl: string) => {
        setFileList((prev) => prev.filter((url) => url !== fileUrl));
    };

    // Xử lý upload ảnh
    const handleUpload = async ({ file, onSuccess, onError }: any) => {
        try {
            message.loading({ content: "Uploading...", key: "upload" });
            const url = await uploadToCloudinary(file);
            if (url) {
                setFileList((prev) => [...prev, url]); // Lưu nhiều ảnh
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
                imageUrl: fileList, // Cập nhật danh sách URL ảnh
                userId: user.userId,
            };

            console.log("newService: ", newService);
            let response;
            if (!id) {
                response = await createNewSerivce(newService);
                if (response) {
                    message.success("Tạo dịch vụ mới thành công");
                    navigate('/customer/manage-services');
                } else {
                    message.error("Tạo dịch vụ mới thất bại");
                }
            } else {
                response = await editSerivce(newService, id);
                if (response) {
                    message.success("Chỉnh sửa dịch vụ thành công");
                    navigate('/customer/manage-services');
                } else {
                    message.error("Chỉnh sửa dịch vụ thất bại");
                }
            }
        }
    };

    return (
        <div className="mx-5 mt-10">
            <div className="container mx-auto">
                <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="vertical" onFinish={onFinish}>
                    <div className="grid grid-cols-12 gap-4">
                        {/* Upload Hình Ảnh */}
                        <div className="col-span-5">
                            <Form.Item label="Upload Ảnh">
                                <Upload
                                    listType="picture-card"
                                    customRequest={handleUpload}
                                    fileList={fileList.map((url) => ({ uid: url, url }))}
                                    onPreview={(file) => window.open(file.url, "_blank")}
                                    showUploadList={{ showRemoveIcon: true }}
                                    multiple={true}
                                    onRemove={(file) => handleRemove(file.url)}
                                >
                                    {fileList.length < 10 && ( // Giới hạn số ảnh tối đa (tùy chỉnh)
                                        <div className="flex flex-col items-center">
                                            <PlusOutlined className="text-xl" />
                                            <div style={{ marginTop: 8 }}>Thêm ảnh</div>
                                        </div>
                                    )}
                                </Upload>
                            </Form.Item>
                        </div>

                        {/* Form Nhập Thông Tin */}
                        <div className="col-span-7">
                            <div className="text-xl font-bold">New Service</div>
                            <p className="mt-2 text-gray-600">
                                Add a service to let potential clients know what you're available for, and help them easily book you.
                            </p>
                            <Form.Item className="mt-5" label="Service Name" name="servicename">
                                <Input placeholder="Enter service name" />
                            </Form.Item>
                            <Form.Item label="Description" name="description">
                                <Input placeholder="Enter description" />
                            </Form.Item>
                            <Form.Item label="Price" name="price">
                                <Input type="number" placeholder="Enter price" />
                            </Form.Item>
                            <Form.Item label="Delivery Time (days)" name="deliveryTime">
                                <Input type="number" placeholder="Enter delivery time (days)" />
                            </Form.Item>
                            <Form.Item label="Number of Concepts" name="numConcepts">
                                <Input type="number" placeholder="Enter number of concepts" />
                            </Form.Item>
                            <Form.Item label="Number of Revisions" name="numRevisions">
                                <Input type="number" placeholder="Enter number of revisions" />
                            </Form.Item>
                            {service && (
                                <Form.Item label="Ảnh cũ">
                                    <div className="flex gap-2">
                                        {service.imageUrl && service.imageUrl.map((url) => (
                                            <Image key={url} src={url} width={100} height={100} />
                                        ))}
                                    </div>
                                </Form.Item>
                            )}
                            <Form.Item label={null}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default AddNewService;
