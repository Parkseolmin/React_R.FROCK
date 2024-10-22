import React from 'react';
import { mainImage } from '../data/slide';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useNavigate } from 'react-router-dom';

export default function SlideImage() {
  const navigate = useNavigate();
  return (
    <section className='slideBox sectionContents'>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Swiper
          slidesPerView={3} // 기본값을 1로 설정
          navigation={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            600: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
          loop={true}
          modules={[Navigation, Autoplay]}
          className='mySwiper'
        >
          <ul className='slide'>
            {mainImage.map((image, index) => (
              <SwiperSlide key={index}>
                <li
                  key={index}
                  className='slideItem'
                  style={{ position: 'relative' }}
                  onClick={() => navigate(`/products/category/${image.title}`)}
                >
                  <img
                    className='categoriesBtn'
                    src={image.img}
                    alt={image.title}
                    style={{ objectFit: 'cover' }}
                  />
                  <span
                    className='font-Playfair cursor-pointer sm:text-[1rem]'
                    style={{
                      position: 'absolute',
                      fontSize: '2rem',
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%)`,
                    }}
                  >
                    {image.title}
                  </span>
                </li>
              </SwiperSlide>
            ))}
          </ul>
        </Swiper>
      </div>
    </section>
  );
}
