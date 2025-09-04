import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createUser } from '@/redux/store/users'

//shadcn
import { Button } from '@/components/ui/button'
import { Loader2Icon } from "lucide-react"


const CreateUser = () => {

    const dispatch = useDispatch()
    const { creatingUser } = useSelector( state => state.users)

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        city: '',
        age: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleCreateUser = (e) => {
        e.preventDefault()
        console.log(formData)
        dispatch(createUser(formData))
    }
    return (
        <div>
            <form onSubmit={handleCreateUser}>
                <div className="form-group">
                    <label htmlFor="firstname">نام:</label>
                    <input value={formData.firstname} onChange={handleChange} type="text" id="firstname" required />
                </div>

                <div className="form-group">
                    <label htmlFor="lastname">نام خانوادگی:</label>
                    <input value={formData.lastname} onChange={handleChange} type="text" id="lastname" required />
                </div>

                <div className="form-group">
                    <label htmlFor="username">تام کاربری:</label>
                    <input value={formData.username} onChange={handleChange} type="text" id="username" required />
                </div>

                <div className="form-group">
                    <label htmlFor="email">ایمیل:</label>
                    <input value={formData.email} onChange={handleChange} type="email" id="email" required />
                </div>

                <div className="form-group">
                    <label htmlFor="city">شهر:</label>
                    <input value={formData.city} onChange={handleChange} type="text" id="city" required />
                </div>

                <div className="form-group">
                    <label htmlFor="age">سن:</label>
                    <input value={formData.age} onChange={handleChange} type="number" id="age" required />
                </div>

                <div className="flex justify-end w-full">
                     <Button type="submit" disabled={creatingUser}>
                        { creatingUser ? <Loader2Icon className="animate-spin" /> : null }
                        ایجاد دوره
                    </Button>
                </div>

            </form>
        </div>
    );
}

export default CreateUser;
