import React from 'react';

export default function BookingCard({
    imageSrc,
    createdAt,
    propertyName,
    status,
    location,
    price,
    description,
    startDate,
    endDate,
    onDelete,
    createdBy,
    onStatusChange,
    role
}) {
    return (
        <div className="book  relative md:flex-row flex flex-col mt-8 shadow-sky-100 w-3/5 md:h-64 h-fit md:pb-0 sm:pb-8 pb-8 rounded-md bg-white shadow-xl">

            <div onClick={onDelete} className="delete-book z-10 text-white px-2 py-1 rounded-md cursor-pointer hover:shadow-lg bg-red-500 absolute top-0 right-0">
                <i className="fa-solid fa-trash"></i>

            </div>
            <div className="property-img relative sm:flex-row flex-col flex items-center justify-between w-full md:w-60">
                <img className="w-60 rounded-md md:h-64 h-32" src={imageSrc} alt="" />
                <div className="created-at flex items-center gap-1 absolute bottom-0 right-0 px-1 py-1 bg-green-500/85 text-white rounded-tl-md">
                    <i className="fa-solid fa-clock"></i>
                    <p className="text-sm">{createdAt}</p>
                </div>
            </div>
            <div className="book-data w-full p-4">
                <div className="name-price2 w-full flex mt-8 items-center justify-between">
                    <div className="names-reviews w-3/4">
                        <div className="name-status flex gap-1">
                            <p className="sm:text-xl text-sm w-full overflow-hidden whitespace-nowrap text-ellipsis font-medium">{propertyName}</p>
                            <span className="ms-3 px-2 rounded-md text-sm font-medium bg-yellow-200">{status}</span>
                        </div>
                        <div className="rev-loc md:flex gap-2">

                            <p className="md:w-auto w-full overflow-hidden whitespace-nowrap text-ellipsis text-sm">
                                <i className="fa-solid text-sky-900 fa-location-dot"></i> {location}
                            </p>
                        </div>
                    </div>
                    <div className="price2 flex justify-end w-1/4">
                        <p className="sm:text-xl text-base font-medium text-sky-800">
                            {price} <span className="font-bold text-sky-900">EGP</span>
                        </p>
                    </div>
                </div>
                <div className="start-created-status mt-4 md:flex-row flex flex-col w-full">
                    <div className="start-created md:w-full flex justify-between md:gap-0 sm:gap-12">
                        <div className="start-end gap-3 sm:flex block h-full mt-3">
                            <div className="start">
                                <p className="md:text-base sm:text-lg text-sm font-medium">Start-Date:</p>
                                <p className="md:text-base sm:text-lg w-fit text-sm font-medium bg-blue-200 mt-1 px-1 rounded-md">{startDate}</p>
                            </div>
                            <div className="end">
                                <p className="md:text-base sm:text-lg text-sm font-medium">End-Date:</p>
                                <p className="md:text-base sm:text-lg text-sm font-medium w-fit bg-red-200 mt-1 px-1 rounded-md">{endDate}</p>
                            </div>
                        </div>
                        <div className="Confirm-cancel md:flex-row flex-col flex gap-2 mt-6">
                            <button
                                className="px-2 h-9 flex justify-center items-center gap-2 py-2 bg-green-600 text-white hover:bg-green-500 rounded-md"
                                onClick={() => onStatusChange("confirmed")}
                            >
                                <i className="fa-regular fa-square-check"></i>                                <p className="md:text-base text-sm">Confirm</p>
                            </button>
                            <button
                                className="px-2 h-9 flex justify-center items-center gap-2 py-2 bg-red-600 text-white hover:bg-red-500 rounded-md"
                                onClick={() => onStatusChange("canceled")}
                            >
                                <i className="fa-solid fa-ban"></i>                                <p className="md:text-base text-sm">Cancel</p>
                            </button>

                        </div>
                    </div>
                </div>
            </div>
            <div className="user-data flex md:gap-9 sm:gap-4 gap-2 px-5 text-white py-2 rounded-br-md rounded-tl-md absolute bottom-0 right-0 bg-sky-800">
                <div className="created-by flex gap-2 items-center">
                    <i className="text-gray-200 fa-regular fa-circle-user"></i>
                    <p className="text-sm">{createdBy}</p>
                </div>
                <div className="role flex items-center gap-2">
                    <i className="text-gray-200 fa-regular fa-circle-check"></i>
                    <p className="text-sm">{role}</p>
                </div>
            </div>
        </div>
    );
}
