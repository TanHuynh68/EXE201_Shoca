import { DownCircleOutlined, FileOutlined } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import ReportIcon from '@mui/icons-material/Report';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
const PaymentMethod = () => {
    return (
        <div className='container mx-auto'>
            <Card className='bg-pink-100 mt-10' >
                <Row >
                    <Col span={12}>
                        <img src="https://images.ui8.net/uploads/6_1729479362712.png" alt="" />
                        <p className='mt-5 text-2xl font-bold'>Premium Car Rent App</p>
                        <div className='border-2 border-black'></div>
                        <Row className='mt-10'>
                            <Col span={2}>
                                <FileOutlined className='text-purple-500 text-xl' />
                            </Col>
                            <Col span={22}>
                                <p><span className='font-bold'>Filetype:</span> PSD</p>
                            </Col>
                        </Row>
                        <Row className='mt-5'>
                            <Col span={2}>
                                <DownCircleOutlined className='text-purple-500 text-xl' />
                            </Col>
                            <Col span={22}>
                                <p><span className='font-bold'>Size:</span> 52.9 MB</p>
                            </Col>
                        </Row>
                        <Row className='mt-5'>
                            <Col span={2}>
                                <ReportIcon className='text-purple-500 text-xl' />
                            </Col>
                            <Col span={22}>
                                <p><span className='font-bold'>License:</span> Standard Commercial License</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12} className='flex flex-col'>
                        <p className='text-center text-2xl font-bold'>Download File</p>
                        <p className='text-center mt-auto'>
                            By continuing you agree to be charged by PayPal, Inc. Learn more. You also agree to the Adobe Terms of Use and Behance Additional Terms
                        </p>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default PaymentMethod