import { Button, Col, Row } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'

const index = () => {
    return (
        <div>
            <div className='h-60 flex items-center justify-center'>
                <div>
                    <p className='text-7xl font-thin m-0'>"God is a design"</p>
                    <p className='text-center mt-2'>Thiết kế là nghệ thuật, portfolio là câu chuyện</p>
                </div>
            </div>

            <div className='w-full flex justify-center'>
                <div className=''>
                    <Button className="bg-red-500 mr-10 text-white">
                        Nổi bật
                    </Button>
                    <Button className="bg-red-500 mr-10 text-white" >Xu Hướng</Button>
                    <Button className="bg-red-500 text-white" >Mới nhất</Button>
                </div>
            </div>

            <div className='px-24'>
                <div className='border-solid border-2 mt-5'>
                </div>
                <div className='border-solid border-2 mt-2'>
                </div>
            </div>

            <Title className='text-center mt-10' level={1}>Khám phá những thiết kế sáng tạo</Title>

            <Row>
                <Col>
                
                </Col>
            </Row>
        </div>
    )
}

export default index
