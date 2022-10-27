import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

function News() {

    const Members = useSelector((store) => store.memberReducer.members);

    const getLocalData = () => {
        const dummyPosts = [
            { title: 'HELLO5', content: 'Here comes description in details' },
            { title: 'HELLO4', content: 'Here comes description in details' },
            { title: 'HELLO3', content: 'Here comes description in details' }, //, enableUpdate : true 
            { title: 'HELLO2', content: 'Here comes description in details' },
            { title: 'HELLO1', content: 'Here comes description in details' },

        ];
        const data = localStorage.getItem('post');

        if (data) {
            return JSON.parse(data);
        } else {
            return dummyPosts;
        }


    };
    //  const [Posts, setPosts] = useState([]);

    const [Posts] = useState(getLocalData());



    useEffect(() => {
        localStorage.setItem('post', JSON.stringify(Posts));
    }, []);

    return (
        <main id="news" className='myScroll'>
            <h1>News</h1>
            {Posts.map((post, idx) => {
                if (idx >= 5) return; //5개의 인덱스만 가져다 달라는 의미

                return (
                    <article key={idx}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                    </article>
                );
            })}

            {
                Members.map((member, idx) => {
                    if (idx >= 2) return;
                    return (
                        <p key={member.name}>{member.name}</p>
                    )
                })
            }


        </main>
    );
}
export default News;