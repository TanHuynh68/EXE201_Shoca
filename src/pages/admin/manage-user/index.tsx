import { Table } from 'antd';
import { adminGetAccountsService } from '../../../services';
import { useEffect, useState } from 'react';
import moment from 'moment';
const ManageUser = () => {
    const [accounts, setAccounts] = useState<Account[]>([]);

    useEffect(()=>{
        getAccount();
    },[])

    const getAccount = async () => {
        const response = await adminGetAccountsService()
        console.log("response: ", response)
        if (response) {
            setAccounts(response)
        }
    }

    const columns = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
            
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            render: (gender: number) => (gender === 1 ? 'Male' : 'Female'), // Optional: for displaying gender as text
        },
        {
            title: 'Date of Birth',
            dataIndex: 'dateOfBirth',
            key: 'dateOfBirth',
            render: (date) => moment(date).format('DD-MM-YYYY'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
    ];

    return (
        <div>
            <p className='text-center text-3xl font-bold'>Manage User</p>
            <Table dataSource={accounts} columns={columns} />;
        </div>
    )
}

export default ManageUser