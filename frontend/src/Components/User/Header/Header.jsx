import logo from './../../../assets/Images/logo.png'
import profile from './../../../assets/Images/profile.png'
import { MdArticle  ,MdPermContactCalendar } from "react-icons/md";

import { GoHomeFill } from "react-icons/go";
import { PiTelegramLogoFill } from "react-icons/pi";
import { IoLogOut } from "react-icons/io5";

import HeaderItems from './HeaderItems';

import { Link, NavLink ,useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from './../../../redux/auth/authSlice'; 
import { toast } from 'react-toastify';


function Header() {

    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await dispatch(logout()); // Dispatch the logout action
            dispatch(reset()); // Dispatch the reset action after logout is completed
            navigate("/login")
            toast.success("logout succesfull")
        } catch (error) {
            // Handle any logout errors here
            console.error("Logout error:", error);
        }
    };

    const menu=[
        {
            name:'Home',
            icon:GoHomeFill,
            link:'/'
        },
        {
            name:'Trips',
            icon:PiTelegramLogoFill
        },
        {
            name:'About',
            icon:MdArticle  
        },
        {
            name:'Contact',
            icon:MdPermContactCalendar
        },

    ]
    return (
        <div className='flex p-5 items-center justify-between'>
        <div className="flex gap-10 ">
            <img src={logo} className='w-[150px] md:w-[200px] object-cover cursor-pointer mr-20' />
            <div className='hidden md:flex gap-8'>
                {menu.map((item ,index)=>(
                    <Link key={index} to={item.link} className="text-black hover:text-gray-500">{/* Wrap menu item with Link */}
                        <HeaderItems name={item.name} Icon={item.icon} />
                    </Link>
                ))}
            </div>
        </div>
        <div className="flex items-center gap-12"> {/* Flex container for profile picture */}
            <div className='md:hidden flex gap-8'>
                {menu.map((item ,index)=>(
                    <HeaderItems key={index} to={item.link} name={item.name} Icon={item.icon} />
                ))}
            </div>
            {user && (
                <button className="text-white hover:text-gray-500" onClick={handleLogout}>
                <span>Logout</span> <IoLogOut className="inline-block" />
                </button>
            )}
            <NavLink to="/login" activeClassName="active"> 
                <img className='flex w-[30px] rounded-full cursor-pointer' src={profile} />
            </NavLink>
        </div>
        
    </div>
    
  )
}

export default Header