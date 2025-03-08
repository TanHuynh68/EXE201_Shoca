import { useEffect, useState } from "react";
import { createPortfolio, getPortfolios } from "../../../../services/portfolio.services"
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import PortfolioModal, { PortfolioData } from "../portfolio-modal";
import { getUserDataFromLocalStorage } from "../../../../consts/variable";
export interface Portfolio {
    title: string;
    description: string;
    coverImageUrl: string;
    userId: string;
    skills: string;
    experience: string;
    contactUrl: string;
    imageUrls: string[];
    id: string;
    creationDate: string;
    createdBy: string;
    modificationDate: string | null;
    modifiedBy: string | null;
    deletionDate: string | null;
    deletedBy: string | null;
    isDeleted: boolean;
}

const ManagePortfolio = () => {

    const [portfolios, setPortfolios] = useState<Portfolio[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const user = getUserDataFromLocalStorage()
    const navigate = useNavigate()
    useEffect(() => {
        getPortfolioFromCustomer()
    }, [])

    const getPortfolioFromCustomer = async () => {
        const response = await getPortfolios();
        if (response) {
            console.log("res: ", response)
            setPortfolios(response)
        }
    }
    const handleCreatePortfolio = async(data: PortfolioData) => {
        console.log("Dữ liệu portfolio:", data);
        setIsModalOpen(false);
        if(data){
            const imagesSummit = data.images.map((item)=> JSON.parse(item))
            const dataSubmit: PortfolioData = {
                contactUrl: data.contactUrl,
                coverImageUrl: data.coverImageUrl,
                experience: data.experience,
                images: data.images,
            }
            const response = await createPortfolio(data);
            if(response){
                console.log("handleCreatePortfolio: ",response)
                navigate('/customer/manage-portfolios')
            }
        }
    };
    return (
        <div className="mx-20 my-10">
            <div className="container mx-auto">
                <PortfolioModal
                    userId={user?.userId ? user.userId : ""}
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleCreatePortfolio}
                />
                <div className="text-3xl font-bold text-center">
                    My portfolio
                </div>
                <div>
                    <Button onClick={() => setIsModalOpen(true)} type="primary">Thêm porfolio</Button>
                </div>
                <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md::grid-cols-1 mt-10 gap-10">
                    {
                        portfolios.map((item) => (
                            <div className={item.id} >
                                <Link to={`/customer/portfolios/${item.id}`}>
                                    <img className="w-[300px] h-[300px] object-cover object-left-top" src={item.coverImageUrl} alt={item.title} />
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ManagePortfolio