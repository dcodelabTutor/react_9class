import Layout from "../common/Layout";
import Popup from "../common/Popup";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Masonry from 'react-masonry-component';

export default function Gallery() {
	const masonryOptions = { transitionDuration: '0.5s' };
	const [Items, setItems] = useState([]);
	const [Loading, setLoading] = useState(true);
	const [EnableClick, setEnableClick] = useState(true);
	const [Index, setIndex] = useState(0);
	const frame = useRef(null);
	const input = useRef(null);
	const pop = useRef(null);

	const getFlickr = async (opt) => {
		const key = '4612601b324a2fe5a1f5f7402bf8d87a';
		const method_interest = "flickr.interestingness.getList";
		const method_search = "flickr.photos.search";
		const method_user = "flickr.people.getPhotos";
		const num = 20;
		let url = '';

		if (opt.type === 'interest') {
			url = `https://www.flickr.com/services/rest/?method=${method_interest}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1`;
		}
		if (opt.type === 'search') {
			url = `https://www.flickr.com/services/rest/?method=${method_search}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&tags=${opt.tags}`;
		}
		if (opt.type === 'user') {
			url = `https://www.flickr.com/services/rest/?method=${method_user}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&user_id=${opt.user}`;
		}


		const result = await axios.get(url);
		if (result.data.photos.photo.length === 0) return alert('해당 검색어의 결과 이미지가 없습니다');
		setItems(result.data.photos.photo);

		setTimeout(() => {
			setLoading(false);
			frame.current.classList.add('on');

			setTimeout(() => {
				setEnableClick(true);
			}, 500);

		}, 1000);
	};

	const showSearch = () => {
		const result = input.current.value.trim();
		input.current.value = '';

		if (!result) return alert('검색어를 입력하세요');

		if (!EnableClick) return;
		setEnableClick(false);
		setLoading(true);
		frame.current.classList.remove('on');
		getFlickr({ type: 'search', tags: result, });
	};

	const showInterest = () => {
		if (!EnableClick) return;
		setEnableClick(false);
		setLoading(true);
		frame.current.classList.remove('on');
		getFlickr({ type: 'interest' });
	}

	const showMine = () => {
		if (!EnableClick) return;
		setEnableClick(false);
		setLoading(true);
		frame.current.classList.remove('on');
		getFlickr({ type: 'user', user: '164021883@N04' });
	}

	const showUser = (e) => {
		if (!EnableClick) return;
		setEnableClick(false);
		setLoading(true);
		frame.current.classList.remove('on');
		getFlickr({ type: 'user', user: e.target.innerText });
	}

	useEffect(showMine, []);


	return (
		<>
			<Layout name={'Gallery'}>
				{Loading && (
					<img
						className="loading"
						src={`${process.env.PUBLIC_URL}/img/6.gif`}
					/>
				)}

				<div className="controls">
					<nav>
						<button onClick={showInterest}>Interest Gallery</button>
						<button onClick={showMine}>My Gallery</button>
					</nav>

					<div className="searchBox">
						<input type="text" ref={input} placeholder='검색어를 입력하세요'
							onKeyUp={(e) => {
								if (e.key === 'Enter') showSearch();
							}} />
						<button onClick={showSearch}>Search</button>
					</div>
				</div>

				<div className="frame" ref={frame}>
					<Masonry elementType={'div'} options={masonryOptions}>


						{Items.map((item, idx) => {
							return (
								<article key={idx}>
									<div className="inner">
										<div className="pic"
											onClick={() => {
												pop.current.open();
												setIndex(idx);
											}}
										>
											<img
												src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
												alt={item.title} />
										</div>
										<h2>{item.title}</h2>

										<div className="profile">
											<img src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`} alt={item.owner}
												onError={(e) => {
													e.target.setAttribute(
														'src',
														'https://www.flickr.com/images/buddyicon.gif'
													);
												}}
											/>
											<span onClick={showUser}>{item.owner}</span>
										</div>
									</div>
								</article>
							)
						})}
					</Masonry>
				</div>
			</Layout>

			<Popup ref={pop}>
				{Items.length !== 0 && (

					<img
						src={`https://live.staticflickr.com/${Items[Index].server}/${Items[Index].id}_${Items[Index].secret}_b.jpg`}
						alt={Items[Index].title} />
				)

				}

			</Popup>
		</>
	);
}
