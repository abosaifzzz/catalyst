import React, { useEffect, useState } from 'react'
import prog from "../../assets/prog.jpg"
import BookingCard from '../../Components/BookingCard/BookingCard.jsx'
import axios from 'axios';
import DeleteForm from '../../Components/DeleteForm/DeleteForm.jsx';
import toast, { Toaster } from 'react-hot-toast';


export default function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBook, setSelectedBook] = useState(null); // Store property to delete

    const [currentPage, setCurrentPage] = useState(1);
    const [showDeleteForm, setShowDeleteForm] = useState(false); // Control visibility of DeleteForm

    const itemsPerPage = 5; // Number of items per page

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBookings = bookings.slice(indexOfFirstItem, indexOfLastItem);

    // Fetch bookings from the API
    const fetchBookings = async () => {
        try {
            const response = await axios.get("https://test.catalystegy.com/public/api/bookings");
            console.log(response.data);

            setBookings(response.data); // Assuming response.data is the array of bookings
            setLoading(false);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    useEffect(() => {
        fetchBookings(); // Fetch bookings on component mount
    }, []);
    const handleUpdate = (booking) => {
        console.log("Update clicked for booking:", booking);
        // Add logic for updating the booking
    };
    const handleDelete = (booking) => {
        console.log("ckiii");
        console.log(booking);

        setSelectedBook(booking); // Set the property to be deleted
        setShowDeleteForm(true); // Show the DeleteForm
    };

    // Handle delete action
    const confirmDelete = async () => {
        if (!selectedBook) return;


        try {
            console.log(selectedBook.id);

            await axios.delete(`https://test.catalystegy.com/public/api/bookings/${selectedBook.id}`);
            toast.success("Book Deleted Successfully")
            setShowDeleteForm(false); // Show the DeleteForm

            fetchBookings(); // Refresh bookings after deletion
        } catch (error) {
            console.error("Error deleting booking:", error);
        }
    };

    const handleStatusChange = async (bookingId, newStatus) => {
        try {
            await axios.post(`https://test.catalystegy.com/public/api/bookings/${bookingId}/status`, { status: newStatus });
            console.log(`Booking status updated to ${newStatus}`);
            fetchBookings(); // Refresh the bookings list
        } catch (error) {
            console.error("Error updating booking status:", error);
        }
    };


    return <>
        <Toaster />
        <div className="bookings-page">

            {/* <div className="update-book-form fixed flex justify-center items-center inset-0 z-20 bg-black/25">
                <div className="update-form flex flex-col pt-6 items-center bg-white p-3 w-1/3 h-1/3 rounded-md">
                    <i className="text-3xl fa-solid fa-pen-to-square"></i>
                    <div className="start-end-date mt-8 w-full gap-3 flex">
                        <div className="start-date w-1/2">
                            <label htmlFor="">Start Date:</label>
                            <input type="date" className='w-full border-2 rounded-md ' />


                        </div>
                        <div className="end-date w-1/2">
                            <label htmlFor="">Start Date:</label>
                            <input type="date" className='w-full border-2 rounded-md ' />


                        </div>

                    </div>

                </div>


            </div> */}
            {showDeleteForm && (
                <DeleteForm
                    deleteFn={confirmDelete}
                    deletedData={selectedBook.property?.name} // Pass the property name
                    closeFn={() => { setShowDeleteForm(false) }}
                />
            )}

            <p className='text-3xl text-sky-900'>All Bookings</p>


            <div className="bookings mt-8">
                {loading
                    ? Array.from({ length: itemsPerPage }).map((_, index) => (
                        <div
                            key={index}
                            className="h-[200px] rounded-md flex flex-col justify-center animate-pulse shadow-lg"
                        >
                            {/* Skeleton content */}
                            <div className="relative flex w-64 animate-pulse gap-2 p-4">
                                <div className="h-12 w-12 rounded-full bg-slate-400"></div>
                                <div className="flex-1">
                                    <div className="mb-1 h-5 w-3/5 rounded-lg bg-slate-400 text-lg"></div>
                                    <div className="h-5 w-[90%] rounded-lg bg-slate-400 text-sm"></div>
                                </div>
                                <div className="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400"></div>
                            </div>
                        </div>
                    ))
                    : currentBookings.length > 0 ? (
                        currentBookings.map((booking) => (
                            <BookingCard
                                key={booking.id}
                                imageSrc={
                                    booking.property?.images
                                        ? `https://test.catalystegy.com/public/${JSON.parse(booking.property.images)[0]}`
                                        : "default-image.jpg"
                                } // Replace with actual property image field
                                createdAt={new Date(booking.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || "N/A"}
                                propertyName={booking.property?.name || "Unknown Property"} // Replace with actual field
                                status={booking.status || "N/A"} // Replace with actual field
                                location={booking.property?.location || "Unknown Location"} // Replace with actual field
                                price={booking.property?.price || "N/A"} // Replace with actual field
                                startDate={new Date(booking.start_date).toLocaleDateString() || "N/A"}
                                endDate={new Date(booking.end_date).toLocaleDateString() || "N/A"}
                                onUpdate={() => handleUpdate(booking)}
                                onDelete={() => handleDelete(booking)}
                                onStatusChange={(newStatus) => handleStatusChange(booking.id, newStatus)}

                                createdBy={booking.user?.name || "Unknown"}
                                role={booking.user?.role || "User"}
                            />
                        ))
                    ) : (
                        <p>No bookings found.</p>
                    )}
            </div>

            <div className="pagination flex justify-center items-center gap-4 mt-6">
                <button
                    className={`px-4 py-2 bg-slate-200 rounded-md ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                            <i className="fa-solid md:hidden block fa-angle-left"></i>
                            <p className='md:block hidden'>Previous</p>

                </button>
                <span className="text-lg">
                    Page {currentPage} of {Math.ceil(bookings.length / itemsPerPage)}
                </span>
                <button
                    className={`px-4 py-2 bg-slate-200 rounded-md ${currentPage === Math.ceil(bookings.length / itemsPerPage) ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(bookings.length / itemsPerPage)))}
                    disabled={currentPage === Math.ceil(bookings.length / itemsPerPage)}
                >
                    <i className="fa-solid md:hidden block fa-angle-right"></i>
                    <p className='md:block hidden'>Next</p>

                </button>
            </div>


        </div>




    </>



}
