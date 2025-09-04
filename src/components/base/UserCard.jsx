import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeUser } from '@/redux/store/users'
import Swal from 'sweetalert2'
//components
import Modal from '@/components/base/Modal'
//shadcn
import { Button } from "@/components/ui/button"
import {Card, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"

const UserCard = ({ _id, firstname, lastname, email }) => {

    const dispatch = useDispatch()

    const [showModal, setShowModal] = useState(false)

    const removeHandler = () => {
        Swal.fire({
            title: `آیا از حذف کاربر ${firstname + ' ' + lastname } مطمئن هستید؟`,
            text: "این عملیات برگشت پذیر نیست!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: 'خیر',
            confirmButtonText: "بله، پاک شود!"
            }).then((result) => {
                if (result.isConfirmed) {

                    dispatch(removeUser(_id))
                    
                    Swal.fire({
                        title: `${firstname + ' ' + lastname} با موفقیت پاک شد.`,
                        text: "کاربر با موفقیت پاک شد.",
                        icon: "success"
                    });

                }
            });
        
    }
    
    return (
        <>
            <Card>
                <CardHeader>
                    
                    <CardTitle>
                        <div className="flex gap-2">
                            <img src="https://secure.gravatar.com/avatar/4d7f5ae19a6d2eca260d87a06e29ba25?s=96&d=mm&r=g"
                                alt={firstname + ' ' + lastname} width={45} height={45} className="rounded-full" />
                            <div className="flex flex-col gap-2">
                                <span>{ firstname} {lastname}</span>
                                <span className="text-gray-400 font-normal truncate">
                                    { email }
                                </span>
                            </div>
                        </div>
                    </CardTitle>
                </CardHeader>
                
                <CardFooter>
                    <div className="flex items-center gap-2 justify-between w-full">
                        <Button className="cursor-pointer" onClick={() => setShowModal(true)}>جزئیات</Button>
                        <Button className="cursor-pointer" variant="destructive" onClick={removeHandler}>حذف</Button>
                    </div>
                </CardFooter>
                
            </Card>

            <Modal 
            isOpen={showModal} 
            onClose={() => setShowModal(false)}
            title={firstname + ' ' + lastname} >
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio id tempore quaerat labore excepturi soluta minima, reprehenderit illo laboriosam vitae, molestias fugiat nostrum dolorum voluptatem corporis veritatis consequatur amet distinctio.</p>
            </Modal>
        </>
    );
}

export default UserCard;
