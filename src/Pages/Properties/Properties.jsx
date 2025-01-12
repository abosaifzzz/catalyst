import React, { useState } from "react";
import { useProperties } from "../../Components/Hooks/useProperties.jsx";
import { PropertiesList } from "../../Components/PropertiesList/PropertiesList.jsx";
import { useNavigate } from "react-router-dom";

export default function Properties() {
    const { properties, loading } = useProperties();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Number of items per page

    const navigate = useNavigate();
    const handleClick = (propertyId) => {
        navigate(`/property-details/${propertyId}`);
    };

    // Pagination handlers
    const handleNextPage = () => {
        if (currentPage < Math.ceil(properties.length / itemsPerPage)) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <>
            <div className="welcome-badge w-full md:h-96 sm:h-72 h-56">
                <div className="welcome-data flex justify-center items-center absolute inset-0">
                    <p className="dancing md:text-7xl sm:text-6xl text-4xl text-white">
                        Travel more, pay less
                    </p>
                </div>
            </div>

            <p className="text-center md:text-4xl baloo text-xl mt-10 mb-4">
                Explore Over 10,000 Properties – Find Your Perfect Match Today!
            </p>

            <hr />

            <PropertiesList
                properties={properties}
                loading={loading}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                handleClick={handleClick}
            />
            <div className="pagination pb-5 flex justify-center items-center gap-4 mt-6">
                <button
                    className={`px-4 py-2 bg-slate-200 rounded-md ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                >
                    <i className="fa-solid md:hidden block fa-angle-left"></i>
                    <p className='md:block hidden'>Previous</p>

                </button>
                <span className="text-lg">
                    Page {currentPage} of {Math.ceil(properties.length / itemsPerPage)}
                </span>
                <button
                    className={`px-4 py-2 bg-slate-200 rounded-md ${currentPage === Math.ceil(properties.length / itemsPerPage)
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                        }`}
                    onClick={handleNextPage}
                    disabled={currentPage === Math.ceil(properties.length / itemsPerPage)}
                >
                    <i className="fa-solid md:hidden block fa-angle-right"></i>
                    <p className='md:block hidden'>Next</p>

                </button>
            </div>


            <div className="e-card w-full md:h-60 playing">
                <div className="image"></div>
                <div className="wave2 lg:w-[1140px] md:w-[400px] w-[200px] lg:h-[700px] md:h-[700px] h-[300px]"></div>
                <div className="wave2 lg:w-[1140px] md:w-[400px] w-[200px] lg:h-[700px] md:h-[700px] h-[300px]"></div>
                <div className="wave2 lg:w-[1140px] md:w-[400px] w-[200px] lg:h-[700px] md:h-[700px] h-[300px]"></div>

                <div className="infotop text-white">
                    <p className="lg:text-6xl mt-4 md:text-5xl sm:text-3xl text-lg z-10 relative p-4 cairo font-semibold">
                        Where Will You Go Next? </p>
                    <p className="md:text-3xl sm:text-xl text-sm comfort  lg:w-1/2 md:w-2/3 z-10 relative font-medium text-slate-300 px-4 messiri">
                        Thousands of Journeys Start Here!

                    </p>
                    <br />
                </div>
            </div>
        </>
    );
}
