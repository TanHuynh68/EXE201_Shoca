import { useEffect, useState } from "react"
import { NewService } from "../customer/freelancer-service/add-new-service"
import { getServices } from "../../services/freelancer.services"

const HireFreelancer = () => {
    const [services, setServices] = useState<NewService[]>([])

    useEffect(() => {
        getSerivcesByClient();
    }, [])

    const getSerivcesByClient = async () => {
        const response = await getServices()
        console.log("getSerivcesByClient: ", response)
        if (response) {
            setServices(response);
        }
    }

    return (
        <div className="mx-5">
            <div className="container mx-auto mt-10 justify-items-center">
                <div className="grid grid-cols-4 gap-10">
                    {
                        services.map((item) => (
                            <div className="border border-solid">
                                <img className='w-[200px] h-[100px] object-cover object-left-top' src={item.imageUrl} alt={item.servicename} />
                                <div className="mx-2">
                                    <div className="mt-2">
                                        {item.servicename}
                                    </div>
                                    <div className="mt-2 text-purple-800">
                                        {item.price}
                                    </div>
                                    <div className="mt-2 truncate">
                                        {item.description}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default HireFreelancer
