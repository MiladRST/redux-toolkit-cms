import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2'

import { getUsers } from '@/redux/store/users'

//components
import PageTitle from '@/components/base/PageTitle'
import PageBody from '@/components/base/PageBody'
import UserCard from '@/components/base/UserCard'

const Users = () => {
    const {data:users, pending, error } = useSelector( state => state.users )
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers('/users'))
    } , [])

     const renderContent = () => {
        if(pending) {
            return <p>در حال بارگذاری کاربران ...</p>
        } else if(error) {
            return <p>خطا در بارگذاری کاربران!</p>
        } else if(users.length > 0) {
            return(
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    { users.map( user => <UserCard key={user._id} {...user} /> )}
                </div>
            )
        } else {
            return <p>هیچ کاربری وجود ندارد</p>
        }
    }

    
    return (
        <div>
            <PageTitle>کاربران</PageTitle>
            <PageBody>
                { renderContent()}
            </PageBody>
        </div>
    );
}

export default Users;
