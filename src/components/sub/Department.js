import Layout from "../common/Layout";
import { useSelector, useDispatch } from 'react-redux';
import { setMembers } from '../../redux/action';

export default function Department() {
    const path = process.env.PUBLIC_URL;
    //useDispatch로 부터 리듀서에 액션객체를 전달해주는 함수 활성화
    const dispatch = useDispatch();
    const Members = useSelector((store) => store.memberReducer.members)

    /*
    useEffect(() => {
        axios.get(`${path}/DB/members.json`).then((json) => {
            setMembers(json.data.members);
        })
    }, []);
    */
    return (
        <Layout name={'Department'}>
            <button onClick={() => {
                const newMembers = [...Members];
                newMembers[0].name = 'Emma';
                //새롭게 변경한 데이터를 액션생성함수의 인수로 집어넣어서 액션객체로 변환
                //{type: 'SET_MEMBERS', payload: newMembers}
                const action = setMembers(newMembers);
                //방금 생성한 액션객체를 dispatch에 의해서 리듀서에 전달
                dispatch(action);
            }}>멤버수정</button><br />

            {Members.map((data, index) => {
                return (
                    <article key={index}>
                        <div className="inner">
                            <div className="pic">
                                <img src={`${path}/img/${data.pic}`} alt={data.name} />
                            </div>
                            <h3>{data.name}</h3>
                            <p>{data.position}</p>
                        </div>
                    </article>
                );
            })}



        </Layout>
    );
}