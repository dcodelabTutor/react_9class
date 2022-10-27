import Layout from "../common/Layout";
import { useSelector } from 'react-redux';

export default function Department() {
    const path = process.env.PUBLIC_URL;
    const Members = useSelector((store) => store.memberReducer.members)


    return (
        <Layout name={'Department'}>

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