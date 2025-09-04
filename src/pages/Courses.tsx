import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
//redux
import { getCourses } from '@/redux/store/courses'
//components
import PageTitle from '@/components/base/PageTitle'
import PageBody from '@/components/base/PageBody'
import CourseCard from '@/components/base/CourseCard'
import EmptyBox from '@/components/base/EmptyBox'

const Courses = () => {

    const dispatch = useDispatch()

    const {data:courses, pending, error} = useSelector( state => state.courses)


    useEffect(() => {
        dispatch(getCourses())
    }, []);

    const renderContent = () => {
        if(pending) {
            return <p>در حال بارگذاری دوره ها ...</p>
        } else if(error) {
            return <p>خطا در بارگذاریدوره ها!</p>
        } else if(courses.length > 0) {
            return(
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {courses.map( course => <CourseCard  key={course._id} {...course}/>)}
                </div> 
            )
        } else {
            return <p>هیچ دوره ای وجود ندارد</p>
        }
    }

    return (
        <div>
           <PageTitle>دوره ها</PageTitle>

           <PageBody>
                {renderContent()}
           </PageBody>

        </div>
    );
}

export default Courses;
