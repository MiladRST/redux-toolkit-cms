import { NavLink } from "react-router-dom"
import MyLogo from '/mylogo.svg'

import './Sidebar.css'
const Sidebar = () => {
    return (
        <aside className="sticky right-0 w-80 bg-white rounded-md p-4">
            
            <div className="flex items-center justify-center bg-gray-200 h-30 rounded-md mb-2">
                <img src={MyLogo} width={75} height={75}/>
            </div>

            <ul className="flex flex-col gap-2">
                <li>
                    <NavLink to="/" className="sidebar_item">خانه</NavLink>
                </li>

                <li>
                    <NavLink to="/users" end className="sidebar_item">کاربران</NavLink>
                </li>

                <li>
                    <NavLink to="/users/create" end className="sidebar_item">ساخت کاربر جدید</NavLink>
                </li>

                <li>
                    <NavLink to="/courses" end className="sidebar_item">دوره ها</NavLink>
                </li>

                <li>
                    <NavLink to="/courses/create" end className="sidebar_item">ساخت دوره جدید</NavLink>
                </li>

                <li>
                    <NavLink to="/articles" end className="sidebar_item">مقالات</NavLink>
                </li>

                <li>
                    <NavLink to="/articles/create" end className="sidebar_item">ساخت مقاله جدید</NavLink>
                </li>

                <li>
                    <NavLink to="/infos" className="sidebar_item">اطلاعات</NavLink>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;
