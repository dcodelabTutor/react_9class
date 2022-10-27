import Layout from "../common/Layout";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Popup from "../common/Popup";
import { useDispatch, useSelector } from 'react-redux';
import { setYoutube } from '../../redux/action';

export default function Youtube() {
	const dispatch = useDispatch();
	//순서1-처음 랜더링시 store에서 전달되는 값은 빈 배열이므로 아래 리턴문에는 순간적으로 출력되는 내용이 없음
	//순서3 -axios로 전달받은 값으로 기존 store값이 변경되면 다시 Vids값에는 변경된 store값이 담기면서 
	//아래 리스트가 출력됨
	const Vids = useSelector(store => store.youtubeReducer.youtube);
	console.log(Vids);
	const pop = useRef(null);
	const [Index, setIndex] = useState(0);

	useEffect(() => {
		const key = 'AIzaSyAKqZ1Dx9awi1lCS84qziASeQYZJqLxLSM';
		const playlist = "PLtt429gshWMp4G-VhNTFhBzBTd7GOEz-G";
		const num = 6;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlist}&maxResults=${num}`;

		//처음 컴포넌트 마운트시 axios로 youtube 데이터를 받아서 다시 리듀서에 액션객체 전달
		//순서2-store에 있는 전역 state값이 변경이 되므로 해당 컴포넌트가 재랜더링됨
		axios.get(url).then((json) => {
			const action = setYoutube(json.data.items);
			dispatch(action);
		})
	}, []);

	return (
		<>
			<Layout name={"Youtube"}>

				{Vids.map((data, index) => {

					const tit = data.snippet.title;
					const desc = data.snippet.description;
					const date = data.snippet.publishedAt;

					return (
						<article key={index}>
							<h3>{tit.length > 30 ? tit.substr(0, 30) + '...' : tit}</h3>
							<div className="txt">
								<p>{desc.length > 100 ? desc.substr(0, 100) : desc}</p>
								<span>{date.split('T')[0]}</span>
							</div>
							<div className="pic" onClick={() => {
								pop.current.open();
								setIndex(index)
							}}>
								<img
									src={data.snippet.thumbnails.standard.url}
									alt={data.snippet.title} />
							</div>
						</article>
					);
				})}
			</Layout>

			<Popup ref={pop}>
				{Vids.length !== 0 && (
					<iframe src={`https://www.youtube.com/embed/${Vids[Index].snippet.resourceId.videoId}`} frameBorder='0'></iframe>
				)}
			</Popup>

		</>

	);
}  