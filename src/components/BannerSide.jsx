import { bannerImages } from 'data/BannerSide';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
export default function BannerSide() {
  return (
    <section className='relative'>
      <span
        className='sm:text-[1rem] bannerSpan'
        style={{
          position: 'absolute',
          fontSize: '1rem',
          color: `rgba(0,0,0,0)`,
          top: '50%',
          left: '0%',
          transform: `rotate(-90deg)`,
          WebkitTextStroke: `2px black`,
        }}
      >
        LONDON ALLERY
      </span>
      <Swiper
        slidesPerView={1} // 기본값을 1로 설정
        // navigation={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Navigation, Autoplay]}
        className='mySwiper'
      >
        <ul className='slide'>
          {bannerImages.map((banner, index) => (
            <SwiperSlide key={index}>
              <li
                key={index}
                className='slideItem'
                style={{ position: 'relative' }}
              >
                <span
                  className='text-6xl tablet:text-[2rem]'
                  style={{
                    position: 'absolute',
                    color: `rgba(0,0,0,0)`,
                    top: '10%',
                    left: '50%',
                    transform: `translate(-50%, -50%)`,
                    WebkitTextStroke: `2px #fff`,
                  }}
                >
                  {banner.artist}
                </span>
                <img
                  className='bannerImage'
                  src={banner.src}
                  alt={banner.title}
                  style={{
                    objectFit: 'cover',
                    width: '1000px',
                    height: 'auto',
                  }}
                />
                <span
                  className='text-3xl tablet:text-[1.5rem]'
                  style={{
                    position: 'absolute',
                    color: `rgba(0,0,0,0)`,
                    top: '90%',
                    left: '50%',
                    transform: `translate(-50%, -50%)`,
                    WebkitTextStroke: `2px lightgreen`,
                  }}
                >
                  {banner.title}
                </span>
              </li>
            </SwiperSlide>
          ))}
        </ul>
      </Swiper>
      <span
        className=''
        style={{
          position: 'absolute',
          fontSize: '1rem',
          color: `rgba(0,0,0,0)`,
          top: '70%',
          right: '0%',
          transform: `rotate(-90deg)`,
          WebkitTextStroke: `2px black`,
        }}
      >
        SONG NAME
      </span>
      <span
        className='sm:text-[1rem] bannerSpan'
        style={{
          position: 'absolute',
          fontSize: '1rem',
          color: `rgba(0,0,0,0)`,
          top: '90%',
          right: '0%',
          transform: `rotate(-90deg)`,
          WebkitTextStroke: `2px black`,
        }}
      >
        SONG NAME
      </span>
    </section>
  );
}
