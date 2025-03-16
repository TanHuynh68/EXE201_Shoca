import { useEffect, useState } from "react";
import { Button, Table, Popconfirm, message } from "antd";

import { createArtworkService, getAtWorksService, updateArtworkService } from "../../../../services/atworrk.services";
import { getCategoriesService } from "../../../../services/category.services";
import ModalCreateUpdateArtwork, { ArtworkData } from "../modal-create-update-artwork";

export interface AtWork {
    id: string; // Assuming you have an ID for each artwork
    title: string;
    description: string;
    thumbnailUrl: string;
    price: number;
    categories: any[]; // Adjust this type as necessary
}
export interface Cate {
    name: string; // The name of the graphic
    description: string; // A description of the graphic
    id: string; // Unique identifier for the graphic
    creationDate: string; // Date when the graphic was created (ISO 8601 format)
    createdBy: string; // User ID of the creator
    modificationDate: string; // Date when the graphic was last modified (ISO 8601 format)
    modifiedBy: string; // User ID of the person who last modified the graphic
    deletionDate: string | null; // Date when the graphic was deleted, if applicable
    deletedBy: string | null; // User ID of the person who deleted the graphic, if applicable
    isDeleted: boolean; // Flag indicating if the graphic is deleted
}
const ManageArtwork = () => {
    const [atworks, setAtWorks] = useState<AtWork[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentArtwork, setCurrentArtwork] = useState<ArtworkData | null>(null);
    const [cates, setCates] = useState<Cate[]>([])
    useEffect(() => {
        getAtWorks();
        getCate();
    }, []);

    const getAtWorks = async () => {
        const response = await getAtWorksService();
        if (response) {
            setAtWorks(response);
        }
    };
    const getCate = async ()=>{
        const response = await getCategoriesService();
        console.log("getCate: ", response)
        if(response){
            setCates(response)
        }
    }
    const handleAddArtwork = async (data: ArtworkData) => {
        const response = await createArtworkService(data);
        if (response) {
            message.success("Artwork added successfully");
            getAtWorks(); // Refresh the list
            setIsModalOpen(false);
        } else {
            message.error("Failed to add artwork");
        }
    };

    const handleUpdateArtwork = async (data: ArtworkData) => {
        if (currentArtwork) {
            const response = await updateArtworkService(currentArtwork.id, data);
            if (response) {
                message.success("Artwork updated successfully");
                getAtWorks(); // Refresh the list
                setIsModalOpen(false);
                setCurrentArtwork(null);
            } else {
                message.error("Failed to update artwork");
            }
        }
    };

    // const handleDeleteArtwork = async (id: string) => {
    //     const response = await deleteAtWorkService(id);
    //     if (response) {
    //         message.success("Artwork deleted successfully");
    //         getAtWorks(); // Refresh the list
    //     } else {
    //         message.error("Failed to delete artwork");
    //     }
    // };

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Thumbnail',
            dataIndex: 'thumbnailUrl',
            key: 'thumbnailUrl',
            render: (url: string) => <img src={url} alt="Thumbnail" style={{ width: 100, height: 100, objectFit: 'cover' }} />,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => `$${price.toFixed(2)}`,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, record: ArtworkData) => (
                <>
                    <Button type="link" onClick={() => { setCurrentArtwork(record); setIsModalOpen(true); }}>Update</Button>
                    <Popconfirm
                        title="Are you sure to delete this artwork?"
                        // onConfirm={() => handleDeleteArtwork(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" danger>Delete</Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    return (
        <div className="mx-20 my-10">
            <div className="container mx-auto">
                <ModalCreateUpdateArtwork
                    open={isModalOpen}
                    onClose={() => { setIsModalOpen(false); setCurrentArtwork(null); }}
                    onSubmit={currentArtwork ? handleUpdateArtwork : handleAddArtwork}
                    initialData={currentArtwork || null}
                />
                <div className="text-3xl font-bold text-center mb-4">Manage Artwork</div>
                <div className="mb-4">
                    <Button onClick={() => { setIsModalOpen(true); setCurrentArtwork(null); }} type="primary">Add Artwork</Button>
                </div>
                <Table
                    dataSource={atworks}
                    columns={columns}
                    rowKey="id"
                    pagination={{ pageSize: 5 }} // Adjust pagination as needed
                />
            </div>
        </div>
    );
};

export default ManageArtwork;