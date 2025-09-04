import { NavLink, useRoutes } from 'react-router-dom';
import  routes  from './routes'
import Topbar from '@/components/layout/Topbar'
import Sidebar from '@/components/layout/Sidebar'

const App = () => {

    const router = useRoutes(routes)
    
    return (
        <>
            <section className="p-4">

                <Topbar />

                <div className="flex gap-4">
                    <div className="shrink-0">
                        <Sidebar />
                    </div>
                    
                    <div className="grow bg-white rounded-md p-4">
                        { router}
                    </div>
                </div>
            </section>
        </>
    );
}

export default App;
