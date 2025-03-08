import { useEffect, useState } from "react";
import { Portfolio } from "../manage-portfolio";
import { getPortfolio } from "../../../../services/portfolio.services";
import { useParams } from "react-router-dom";

const PortfolioDetail = () => {
    const { id } = useParams();
    const [portfolio, setPortfolio] = useState<Portfolio>()

    useEffect(() => {
        if (id) {
            getPortfolioFromCustomer();
        }
    }, [id])

    const getPortfolioFromCustomer = async () => {
        if (id) {
            const response = await getPortfolio(id);
            if (response) {
                console.log("res: ", response)
                setPortfolio(response)
            }
        }
    }

    return (
        <div className="bg-black text-white w-full min-h-screen">
            <div className="mx-20">
                <div className="container mx-auto">
                    <div className="pt-10 justify-items-center">
                        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md::grid-cols-1 mt-10 gap-10">
                            {
                                portfolio?.imageUrls.map((item) => (
                                    <div className="">
                                        <img className="w-[300px] h-[300px] object-cover object-left-top" src={item} alt="" />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    )
}

export default PortfolioDetail