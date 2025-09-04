
import { LuBell, LuSettings, LuShoppingCart } from "react-icons/lu";
import './Topbar.css'

const Topbar = () => {
    
    return (
        <div className="w-full sticky top-0 right-0 z-[99999] shadow-sm">
            <div className="flex flex-row items-center justify-between bg-white rounded-md mb-2 p-2">
                <div className="font-[600] text-2xl">
                    داشبورد مدیریت
                </div>
                <div className="flex items-center gap-2 text-xl">
                    
                    <span className="w-10 h-10 flex items-center justify-center relative cursor-pointer">
                        <LuShoppingCart />
                        <span className="badge">
                            0
                        </span>
                    </span>
                    
                    <span className="w-10 h-10 flex items-center justify-center relative cursor-pointer">
                        <LuSettings />
                        <span className="badge">
                            2
                        </span>
                    </span>

                </div>
            </div>
        </div>
    );
}

export default Topbar;
