export interface ProPackage {
    id: string; // Unique identifier for the package
    name: string;
    price: number;
    features: string[];
    duration: string;
}
import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Form } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { getPackages } from '../../../services/packages.services';
import { priceUnit } from '../../../consts/variable';
import ModalCreateUpdateProPackageDataProps from '../modal-craete-update-package';

const ManageProPackage = () => {
    const [packages, setPackages] = useState<ProPackage[]>([]);
    const [currentPackage, setCurrentPackage] = useState<ProPackage | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [form] = Form.useForm()

    useEffect(() => {
        // Fetch the packages from the server or local storage
        getPackagesFromStaff();
    }, []);

    const getPackagesFromStaff = async () => {
        // Replace this with your actual data fetching logic
        const response = await getPackages() // Example API call
        setPackages(response);
    };

    const handleDelete = async (id: string) => {
        // Replace this with your actual delete logic
        const response = await fetch(`/api/packages/${id}`, { method: 'DELETE' });
        if (response.ok) {
            message.success("Package deleted successfully");
            setPackages(packages.filter(pkg => pkg.id !== id)); // Update the state
        } else {
            message.error("Failed to delete package");
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => `${priceUnit(price)}`,
        },
        {
            title: 'Features',
            dataIndex: 'features',
            key: 'features',
            render: (features: string[]) => features.join(', '),
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, record: ProPackage) => (
                <Popconfirm
                    title="Are you sure to delete this package?"
                    onConfirm={() => handleDelete(record.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="link" icon={<DeleteOutlined />} danger />
                </Popconfirm>
            ),
        },
    ];

    const handleCancel = () => {
        form.resetFields(); // Reset the form fields
        setIsModalOpen(false); // Close the modal
        setCurrentPackage(null); // Clear the current package state
    };

    const handleAddOrUpdatePackage = async (values: ProPackage) => {
        try {
            if (currentPackage) {
                // Update existing package
                // const response = await adminUpdateProPackageService(currentPackage.id, values); // Replace with your actual update service
                // if (response) {
                //     message.success("Package updated successfully");
                // } else {
                //     message.error("Failed to update package");
                // }
            } else {
                // Create new package
                // const response = await adminCreateProPackageService(values); // Replace with your actual create service
                // if (response) {
                //     message.success("Package created successfully");
                // } else {
                //     message.error("Failed to create package");
                // }
            }
            // Refresh the package list after adding or updating
            getPackages(); // Call your function to fetch the updated list of packages
            handleCancel(); // Close the modal
        } catch (error) {
            console.error("Error while adding/updating package:", error);
            message.error("An error occurred while processing your request");
        }
    };
    return (
        <div className="container">
            <ModalCreateUpdateProPackageDataProps
                proPackage={currentPackage} // Pass the current package for editing or null for creating
                form={form}
                isModalOpen={isModalOpen}
                handleCancel={handleCancel}
                onSubmit={handleAddOrUpdatePackage} // Define this function in your ManageProPackage component
            />
            <div className='text-3xl text-center mb-10 font-semibold'>Manage Pro Packages</div>
            <Table
                dataSource={packages}
                columns={columns}
                rowKey="id" // Assuming 'id' is the unique identifier for each package
                pagination={{ pageSize: 5 }} // Adjust pagination as needed
            />
        </div>
    );
};

export default ManageProPackage;