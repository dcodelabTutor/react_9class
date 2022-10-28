import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useSelector } from 'react-redux';

function Vids() {
	const { youtube } = useSelector((store) => store.youtubeReducer);
	console.log(youtube)

	return (
		<main id="vids" className='myScroll'>
			{youtube.length !== 0 && (
				<Swiper
					modules={[Pagination, Navigation]}
					pagination={
						{
							clickable: true,
						}
					}
					spaceBetween={60}
					navigation={true}
					loop={true}
					slidesPerView={'auto'}
					centeredSlides={true}
				>
					{
						youtube.map((vid, idx) => {
							return (
								<SwiperSlide key={idx}>
									<div className="inner">
										<div className="pic">
											<img src={vid.snippet.thumbnails.standard.url} />
										</div>
										<h2>{vid.snippet.title}</h2>
									</div>
								</SwiperSlide>
							)
						})}
				</Swiper>
			)}
		</main>
	);
}
export default Vids;