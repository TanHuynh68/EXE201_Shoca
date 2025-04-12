import Title from 'antd/es/typography/Title'
import { PremiumIcon, PremiumOptionCard } from '../../../components'
import { Col, Row } from 'antd'


const RegisterPremiumPage = () => {


  return (
    <div className='container mx-auto pb-10'>
      <PremiumIcon />
      <Title className='mt-5' level={1}>
        Nâng tầm Portfolio của bạn – Đăng ký tài khoản Premium ngay!
        <p className='text-orange-300 ' >Nơi bạn thể hiện đẳng cấp và sự chuyên nghiệp.</p>
      </Title>

      <Row gutter={10}>
        <Col span={8}>
          <div className='justify-items-center'>
            <PremiumOptionCard
              packageId={'5500e9cf-13c1-48cf-117a-08dd79456e0e'}
              price={10000}
              month={1}
              description='Lựa chọn linh hoạt, có thể hủy bất cứ lúc nào.'
              interest={[
                'Cho phép đổi màu BG của profile',
                'Tăng data upload',
                'Tăng đề xuất',
                'Có khung và huy hiệu PRE'
              ]}
            />
          </div>
        </Col>
        <Col span={8}>
          <div className='justify-items-center'>
            <PremiumOptionCard
              packageId={'f5df7093-f19f-437c-6045-08dd79d8e6cd'}
              price={40000}
              month={1}
              description='Lựa chọn linh hoạt, có thể hủy bất cứ lúc nào.'
              interest={[
                'Cho phép đổi màu BG của profile',
                'Tăng data upload',
                'Tăng đề xuất',
                'Có khung và huy hiệu PRE',
                'Tiết kiệm lên tới 20.000 vnd'
              ]}
            />
          </div>
        </Col>
        <Col span={8}>
          <div className='justify-items-center'>
            <PremiumOptionCard
              packageId={'90c4f47e-b861-4912-6046-08dd79d8e6cd'}
              price={70000}
              month={1}
              description='Lựa chọn linh hoạt, có thể hủy bất cứ lúc nào.'
              interest={[
                'Cho phép đổi màu BG của profile',
                'Tăng data upload',
                'Tăng đề xuất',
                'Có khung và huy hiệu PRE',
                'Tiết kiệm lên tới 50.000 vnd'
              ]}
            />
          </div>
        </Col>
      </Row>
      <div className='text-center'>
        <p className='text-xl text-purple-800 m-0 pt-10'>Nâng cấp ngay – Tận dụng các tính năng vượt trội của gói Pro!</p>
        <div className='text-red-500'>Đảm bảo hoàn tiền trong 30 ngày nếu không hài lòng.</div>
      </div>
    </div>
  )
}

export default RegisterPremiumPage
