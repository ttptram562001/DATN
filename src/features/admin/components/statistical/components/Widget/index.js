import './widget.scss'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import { useEffect, useState } from 'react';
import statisticApi from '../../../../../../api/statisticApi';


const Widget = ({type}) => {
    const [totalUser, setTotalUser] = useState(0);
    const [totalOrder, setTotalOrder] = useState();
    const [earning, setEarning] = useState(0)

    let data;
    
    const diff = Math.floor(Math.random() * 100);
    useEffect(() => {
        statisticApi.getTotalUser().then(res => setTotalUser(res.data));
        statisticApi.getTotalOrder().then(res => setTotalOrder(res.data));
        statisticApi.getEarning().then(res => setEarning(res.data));
        
    }, [])

    switch (type) {
        case 'users':
            data = {
                title: 'USERS',
                isMoney: false,
                link: 'See All Users',
                amount: totalUser,
                icon: (
                    <PersonOutlinedIcon className='icon' style={{
                        color: 'crimson', 
                        backgroundColor: 'rgba(255, 0, 0, 0.2)'}} />
                ),
            }
            break;
        case 'orders':
            data = {
                title: 'ORDERS',
                isMoney: false,
                link: 'See All Oders',
                amount: totalOrder,
                icon: (
                    <ShoppingCartOutlinedIcon className='icon' style={{
                        color: 'goldenrod', 
                        backgroundColor: 'rgba(218, 65, 32, 0.2)'}} />
                ),
            }
            break;
        case 'earnings':
            data = {
                title: 'EARNINGS',
                isMoney: true,
                link: 'View Earnings',
                amount: earning,
                icon: (
                    <MonetizationOnOutlinedIcon className='icon'  style={{
                        color: 'green', 
                        backgroundColor: 'rgba(0, 128, 0, 0.2)'}} />
                ),
            }
            break;
        case 'balance':
            data = {
                title: 'BALLANCE',
                isMoney: true,
                link: 'See Details',
                icon: (
                    <AccountBalanceWalletOutlinedIcon className='icon' style={{
                        color: 'purple', 
                        backgroundColor: 'rgba(128, 0, 128, 0.2)'}} />
                ),
            }
            break;
        default:
            break;
    }



  return (
    <div className='widget'>
        <div className='left'>
            <span className='title'>{data.title}</span>
            <span className='counter'>{data.isMoney && '$'} {data?.amount}</span>
            <span className='link'>{data.link}</span>
        </div>
        <div className='right'>
            <div className="percentage positive">
                <KeyboardArrowUpIcon />
                {diff}%
            </div>
                {data.icon}
        </div>
    </div>
  )
}

export default Widget