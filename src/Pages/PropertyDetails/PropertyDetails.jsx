import React, { useEffect, useState } from 'react'
import pyr from "../../assets/pyramids.jpg"
import location from "../../assets/loc2.png"
import time from "../../assets/time.png"
import money from "../../assets/money3.png"
import air from "../../assets/air.png"
import khetm from "../../assets/khetm.png"
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';





export default function PropertyDetails() {
    const { id } = useParams(); // Extract ID from the URL
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [property, setProperty] = useState(null); // State to hold property details
    const [loading, setLoading] = useState(true); // State for loading
    useEffect(() => {

        const fetchPropertyDetails = async () => {
            try {
                const response = await axios.get(`https://test.catalystegy.com/public/api/properties/${id}`);
                console.log(response.data);

                setProperty(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching property details:", error);
            }
        };

        fetchPropertyDetails();
    }, [id]); // Re-fetch data if the `id` changes

    const handleBooking = async () => {
        if (!startDate) {
            alert('Please select a start date.');
            return;
        }

        if (!endDate) {
            alert('Please select an end date.');
            return;
        }

        // Create an object with the required data
        const bookingData = {
            user_id: 745,
            property_id: id,          // ID from the URL
            start_date: startDate,   // Start date selected
            end_date: endDate      // End date selected
        };
        console.log(bookingData);

        try {
            const response = await axios.post('https://test.catalystegy.com/public/api/bookings', bookingData);

            console.log('Booking successful:', response.data);
            toast.success('The Property Booked Successfully')
        } catch (error) {
            if (error.response) {
                toast.success('failed To book')
            } else {
                console.error('Error setting up request:', error.message);
            }
        }
    };




    const formatTime = (timeString) => {
        const date = new Date(timeString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12; // Convert to 12-hour format
        const formattedMinutes = minutes.toString().padStart(2, "0"); // Add leading zero
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    };



    return <>
        <Toaster />

        <div className="property-details relative mb-12 md:w-4/5 w-full mx-3  md:mx-auto">
            <div className="shape absolute -rotate-12 top-24 -left-52">
                <img src={khetm} className='md:w-96 w-44' alt="" />
            </div>
            <Link to={"/"}>
                <div className="back-btn flex items-center gap-2">
                    <i className="fa-solid text-blue-900 cursor-pointer fa-arrow-left-long"></i>
                    <p className='text-xl text-blue-900 cursor-pointer'>Back</p>

                </div>
            </Link>
            <div className="property-name-price mt-12 z-10 relative flex justify-between items-center">
                <p className='md:text-4xl text-lg  text-blue-950'>{property?.name} </p>
                <div className="time-creation flex gap-3 items-center">
                    <img className='md:w-7 w-4' src={time} alt="" />
                    <p className='md:text-lg text-sm font-medium'>{formatTime(property?.created_at)}</p>

                </div>


            </div>

            <div className="property-images bg-slate-50 rounded-md overflow-hidden mt-5  grid grid-cols-3 gap-2">
                {/* Video Section */}
                <div className="shape1 absolute  -right-52">
                    <img src={air} className='md:w-60 w-44' alt="" />
                </div>

                <div className="video z-10 col-span-2 h-full">
                    <video className="h-full w-full object-cover"
                        src={property?.video}
                    ></video>
                </div>
                {/* Images Section */}
                <div className="images col-span-1 grid grid-rows-2 gap-2">
                    {property?.images &&
                        JSON.parse(property?.images).map((image, index) => (
                            <img
                                key={index}
                                className="w-full h-full object-cover"
                                src={`https://test.catalystegy.com/public/${image}`}
                                alt={`Property Image ${index}`}
                                onError={(e) => {
                                    e.target.style.display = "none"; // Hide the image if it fails to load
                                }}
                            />
                        ))}
                </div>
            </div>




            <div className="location-price pb-3 flex justify-between mt-3">
                <div className="location md:w-2/3 w-full flex items-center gap-3 ">
                    <i className="fa-solid md:text-xl text-sm text-blue-900 fa-location-dot"></i>

                    <p className='location-t lg:text-xl md:text-lg text-sm font-medium'>{property?.location}</p>


                </div>
                <div className="money md:w-1/3 w-full flex gap-2 md:justify-end justify-start md:mt-auto mt-3 items-center">
                    <i className="fa-solid md:text-xl text-sm text-blue-900  fa-money-bill-wave"></i>
                    <p className='md:text-xl  text-sm font-medium '>{property?.price} EGP</p>


                </div>

            </div>

            <div className="describtion mt-8">
                <p className='md:text-2xl text-lg font-semibold pb-3'>Description</p>
                <hr />
                <p className='md:text-lg text-sm'>{property?.description} </p>

            </div>


            <div className="date md:flex block justify-center items-center w-full p-3 md:h-28 h-64 mt-5 rounded-lg bg-white  shadow-xl">

                <div className="start md:w-1/3 w-full">

                    <label className='block pb-3  md:text-xl text-lg' htmlFor="">Start Date</label>
                    <input id="start-date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className='border-2 font-medium cursor-pointer md:w-4/5 w-full py-2 px-2 rounded-md' type="date" />
                </div>
                <div className="end md:mt-auto mt-4 md:w-1/3 w-full">
                    <label className='block pb-3  md:text-xl text-lg' htmlFor=""> End Date</label>
                    <input id="end-date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)} className='border-2 font-medium cursor-pointer md:w-4/5 w-full py-2 px-2 rounded-md' type="date" />

                </div>
                <div className="book">
                    <button onClick={handleBooking} className='bg-sky-500 hover:bg-sky-400 px-4 py-2 md:w-auto w-full md:mt-auto mt-2 rounded-md text-white'>Book Now</button>
                </div>


            </div>
            <div className="property-owner md:flex block justify-between px-3 py-4 mt-7 w-full bg-slate-100 rounded-md">
                <div className="left-side flex items-center gap-2">
                    <img src={property?.user?.profile_image} className='w-16 h-16 rounded-full' alt="" />
                    <div className="name-role">
                        <p className='font-medium text-xl'>{property?.user?.name}</p>
                        <p className=' text-gray-700 '>{property?.user?.role}</p>
                    </div>
                </div>
                <div className="right-side md:mt-auto mt-2">
                    <div className="email flex gap-2 items-center"><i className="fa-solid text-blue-900 fa-envelope"></i> {property?.user?.email}</div>
                    <div className="phone flex gap-2 items-center"><i className="fa-solid text-blue-900 fa-phone-volume"></i> {property?.user?.phone}</div>
                </div>




            </div>


        </div>


    </>



}
