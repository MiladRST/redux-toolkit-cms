import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getArticles } from '@/redux/store/articles'
//components
import PageTitle from '@/components/base/PageTitle'
import PageBody from '@/components/base/PageBody'
import EmptyBox from '@/components/base/EmptyBox'
//
const Articles = () => {

    const dispatch = useDispatch()
    const articles = useSelector( state => state.articles)


    useEffect(() => {
        if(articles.length === 0 ) {
            dispatch(getArticles('/articles'))
        }
    }, []);

    return (
        <div>
           <PageTitle>مقالات</PageTitle>

           <PageBody>
                { articles.length > 0 ? (
                    articles.map( article => <span  key={article._id}>{article.title}</span>)
                ) : <EmptyBox />}
           </PageBody>

        </div>
    );
}

export default Articles;
