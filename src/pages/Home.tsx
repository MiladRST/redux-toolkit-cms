import { useEffect } from 'react'
import PageTitle from '@/components/base/PageTitle'
import PageBody from '@/components/base/PageBody'
import { useDispatch, useSelector } from 'react-redux';
import {getTodos} from "@/redux/store/todos"

const Home = () => {
   
    const dispatch = useDispatch()
    const { data: todos , pending , error } = useSelector( state => state.todos)

    console.log(todos);
    

    useEffect(() => {
        dispatch(getTodos('https://jsonplaceholder.typicode.com/todos'))
    }, []);

  

    return (
        <div>
            <PageTitle>داشبورد </PageTitle>
            
            <PageBody>
               <div>hello world</div>

               <br />
               <br />
               <h1>List of todos</h1>
               <hr />
               { pending && <p>Loading ...</p> }
               { error && <p>Error fetching todos ...</p> }
               { todos?.length > 0 && <ul>
                { todos.map( todo => <li key={todo.id}>{todo.title}</li>)}
               </ul>}
               
                
            </PageBody>

        </div>
    );
}

export default Home;
