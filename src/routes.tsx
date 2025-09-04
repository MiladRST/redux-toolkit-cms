import Home from './pages/Home'
import Users from './pages/Users'
import CreateUser from './pages/CreateUser'
import Articles from './pages/Articles'
import CreateArticle from './pages/CreateArticle'
import Courses from './pages/Courses'
import CreateCourse from './pages/CreateCourse'
import Infos from './pages/Infos'

const routes = [
    { path: '/', element: <Home /> },
    { path: '/users', element: <Users />},
    { path: '/users/create', element: <CreateUser />},
    { path: '/articles', element: <Articles /> },
    { path: '/articles/create', element: <CreateArticle /> },
    { path: '/courses' , element: <Courses />},
    { path: '/courses/create' , element: <CreateCourse />},
    { path: '/infos' , element: <Infos />},

]

export default routes;

