import React from 'react'
import pyr from "../../assets/pyramids.jpg"
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';


export default function PropertyCard({
    images,
    name,
    time,
    description,
    location,
    price,
    hostName,
    hostImage,
    fn,
    isAdmin,
    onUpdate,
    onDelete

}) {

    const validImages = Array.isArray(images) ? images : JSON.parse(images || "[]");


    const formatTime = (timeString) => {
        const date = new Date(timeString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12; // Convert to 12-hour format
        const formattedMinutes = minutes.toString().padStart(2, "0"); // Add leading zero
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    };




    const settings = {
        dots: true, // Show navigation dots
        infinite: true, // Loop through slides
        speed: 500, // Transition speed
        slidesToShow: 1, // Show one slide at a time
        slidesToScroll: 1, // Scroll one slide at a time
        autoplay: true, // Auto-slide
        autoplaySpeed: 3000, // Duration for each slide
    };
    return <>
        <div onClick={fn} className="property-card cursor-pointer relative h-[420px] shadow-lg hover:shadow-2xl rounded-md group">
            <div className="img-video w-full overflow-hidden relative  h-1/2 rounded-md">
                <Slider {...settings} >
                    {validImages.map((image, index) => (
                        <div key={index}>
                            <img
                                className="h-[210px] w-full object-cover rounded-md"
                                src={`https://test.catalystegy.com/public/${image}`}
                                alt={`Property image ${index + 1}`}
                            />
                        </div>
                    ))}

                </Slider>
            </div>
            <div className="card-body  p-3">

                <div className="name-and-time flex  gap-2items-center justify-between">
                    <p className='baloo w-2/3 overflow-hidden whitespace-nowrap  text-ellipsis group-hover:text-blue-700 transition-colors duration-300 text-blue-950 text-lg font-bold'> {name}</p>
                    <div className="time w-1/3 flex items-center gap-1">
                        <i className="fa-regular text-xs  text-slate-400 fa-clock"></i>
                        <p className='text-xs text-slate-800'>{formatTime(time)} </p>

                    </div>

                </div>

                <div className="desc mt-2">
                    <p className='w-full overflow-hidden whitespace-nowrap  text-ellipsis text-gray-600 text-lg  '>{description}</p>

                </div>
                <div className="location flex gap-2 items-center mt-2">
                    <i className="fa-solid  text-blue-900 fa-location-dot"></i>

                    <p className='w-full overflow-hidden whitespace-nowrap  text-ellipsis text-gray-600 text-sm font-medium'>                       {location}
                    </p>

                </div>
                <div className="price mt-3">
                    <p className='comfort font-semibold text-blue-950'>{price} EGP</p>


                </div>
                <div className="hosted-by py-2 px-2 absolute bottom-0 right-0 left-0 bg-slate-100 flex justify-between gap-2 items-center  mt-2">
                    <p className='text-gray-600 text-sm font-medium'>{hostName}</p>
                    <img src={hostImage} className='w-10 h-10 rounded-full border-2 border-sky-200' alt="" />
                </div>
                {isAdmin && (
                    <div className="update-delete flex justify-center gap-2 backdrop-blur-sm items-center absolute right-0 left-0 bottom-0 top-2/3 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg rounded-b-md">
                        <button
                            className="px-2 h-9 flex justify-center items-center gap-2 py-2 bg-sky-600 text-white hover:bg-sky-500 rounded-md"
                            onClick={() => onUpdate()} // Call onUpdate with the current 
                        >
                            <i className="fa-solid fa-pen-to-square"></i> Update
                        </button>
                        <button
                            className="px-2 h-9 flex justify-center items-center gap-2 py-2 bg-red-600 text-white hover:bg-red-500 rounded-md"
                            onClick={() => onDelete()} // Call onDelete with the current property
                        >
                            <i className="fa-solid fa-trash"></i> Delete
                        </button>
                    </div>
                )}


            </div>
        </div>

    </>
}

