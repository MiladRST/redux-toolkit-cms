import Swal from 'sweetalert2'
//redux
import { useDispatch } from 'react-redux'
import { removeCourse } from '@/redux/store/courses'
//shadcn
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
//
import placeholderImg from '/blank.png'


const CourseCard = ({_id, title, price, category, registersCount, discount, desc}) => {

    const dispatch = useDispatch()

    const removeHandler = () => {
            Swal.fire({
                title: `آیا از حذف  ${title } مطمئن هستید؟`,
                text: "این عملیات برگشت پذیر نیست!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: 'خیر',
                confirmButtonText: "بله، پاک شود!"
                }).then((result) => {
                    if (result.isConfirmed) {
    
                        dispatch(removeCourse(_id))
                        
                        Swal.fire({
                            title: `${title} با موفقیت پاک شد.`,
                            icon: "success"
                        });
    
                    }
                });
            
        }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {title} { discount !== 0 ? <Badge variant="secondary">
                        <span className="ml-1">{discount}%</span>
                        تخفیف
                        </Badge> : null}
                </CardTitle>
                
            </CardHeader>
            
            <CardContent>

                <p className="line-clamp-1 truncate mb-2">{desc}</p>

                <div className="w-full flex-col gap-2 mb-2">
                    <div className="flex items-center justify-between w-full">
                        <span>قیمت:</span>
                        <span>{ price }</span>
                    </div>

                    <div className="flex items-center justify-between w-full">
                        <span>دسته بندی:</span>
                        <span>{ category }</span>
                    </div>

                    <div className="flex items-center justify-between w-full">
                        <span>تعداد ثبت نام:</span>
                        <span>{ registersCount }</span>
                    </div>

                    
                </div> 

                <Button className="cursor-pointer" variant="destructive" onClick={removeHandler}>حذف</Button>

            </CardContent>    

  
        </Card>
    );
}

export default CourseCard;
