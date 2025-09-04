import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createCourse } from '@/redux/store/courses'

//shadcn
import { Button } from '@/components/ui/button'
import { Loader2Icon } from "lucide-react"


const CreateCourse = () => {

    const dispatch = useDispatch()
    const { creatingCourse } = useSelector( state => state.courses)

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        category: '',
        registersCount: 1000,
        discount: 0,
        desc: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleCreateCourse = (e) => {
        e.preventDefault()
        dispatch(createCourse(formData))
    }
    return (
        <div>
            <form onSubmit={handleCreateCourse}>
                <div className="form-group">
                    <label htmlFor="title">عنوان:</label>
                    <input value={formData.title} onChange={handleChange} type="text" id="title" required />
                </div>

                <div className="form-group">
                    <label htmlFor="price">قیمت :</label>
                    <input value={formData.price} onChange={handleChange} type="number" id="price" required />
                </div>

                <div className="form-group">
                    <label htmlFor="category">دسته بندی:</label>
                    <input value={formData.category} onChange={handleChange} type="text" id="category" required />
                </div>

                <div className="form-group">
                    <label htmlFor="registersCount">افراد حاضر در دوره:</label>
                    <input value={formData.registersCount} onChange={handleChange} type="number" id="registersCount" />
                </div>

                <div className="form-group">
                    <label htmlFor="discount">تخفیف:</label>
                    <input value={formData.discount} onChange={handleChange} type="number" id="discount" />
                </div>

                <div className="form-group">
                    <label htmlFor="desc">توضیحات:</label>
                    <textarea value={formData.desc} onChange={handleChange} id="desc" required />
                </div>

                <div className="flex justify-end w-full">
                    <Button type="submit" disabled={creatingCourse}>
                        { creatingCourse ? <Loader2Icon className="animate-spin" /> : null }
                        ایجاد دوره
                    </Button>
                </div>

            </form>
        </div>
    );
}

export default CreateCourse;
