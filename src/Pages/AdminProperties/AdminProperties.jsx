import React, { useEffect, useState } from "react";
import { useProperties } from "../../Components/Hooks/useProperties.jsx";
import { PropertiesList } from "../../Components/PropertiesList/PropertiesList.jsx";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import DeleteForm from "../../Components/DeleteForm/DeleteForm.jsx";


export default function AdminProperties() {
    const { properties, loading, fetchProperties } = useProperties();
    const [currentPage, setCurrentPage] = useState(1);
    const [newLoading, setNewLoading] = useState(false); 
    const [showUpdateForm, setShowUpdateForm] = useState(false); 


    const [selectedProperty, setSelectedProperty] = useState(null); 
    const [showDeleteForm, setShowDeleteForm] = useState(false); 

    const itemsPerPage = 8;
    const [showForm, setShowForm] = useState(false); 
    const [imagesPreview, setImagesPreview] = useState([]);
    const [videoPreview, setVideoPreview] = useState(null);
    const [updateFormData, setUpdateFormData] = useState({
        name: "",
        description: "",
        price: "",
        location: "",
        images: [], 
        video: null, 
    });
    const [updateImagesPreview, setUpdateImagesPreview] = useState([]);
    const [updateVideoPreview, setUpdateVideoPreview] = useState(null); 


    const handleUpdate = (property) => {
        setSelectedProperty(property); 
        setShowUpdateForm(true);     };

    useEffect(() => {
        if (selectedProperty) {
            setUpdateFormData({
                name: selectedProperty.name || "",
                description: selectedProperty.description || "",
                price: selectedProperty.price || "",
                location: selectedProperty.location || "",
                images: [], 
                video: null, 
            });

            setUpdateImagesPreview(selectedProperty.images || []);
            setUpdateVideoPreview(selectedProperty.video ? selectedProperty.video : null);
        }
    }, [selectedProperty]);


    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        location: "",
        images: [], 
        video: null, 
    });
    const handleUpdateFileChange = (e) => {
        const { name, files } = e.target;

        if (name.startsWith("updateImage")) {
            const index = parseInt(name.replace("updateImage", ""), 10); 
            const file = files[0];

            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    setUpdateImagesPreview((prev) => {
                        const updatedPreviews = [...prev];
                        updatedPreviews[index] = reader.result; 
                        return updatedPreviews;
                    });
                    setUpdateFormData((prevData) => {
                        const updatedImages = [...prevData.images];
                        updatedImages[index] = file; 
                        return { ...prevData, images: updatedImages };
                    });
                };
                reader.readAsDataURL(file);
            }
        } else if (name === "updateVideo") {
            const file = files[0];
            if (file) {
                setUpdateVideoPreview(URL.createObjectURL(file)); 
                setUpdateFormData((prevData) => ({
                    ...prevData,
                    video: file, 
                }));
            }
        }
    };


    const userId = 346; 
    const handleDelete = (property) => {

        setSelectedProperty(property); 
        setShowDeleteForm(true); 
    };

    const confirmDelete = async () => {
        if (!selectedProperty) return;

        try {

            await axios.delete(`https://test.catalystegy.com/public/api/properties/${selectedProperty.id}`);

            toast.success(`Property "${selectedProperty.name}" deleted successfully!`);
            setShowDeleteForm(false); 
            setSelectedProperty(null); 
            await fetchProperties()
        } catch (error) {
            console.error("Error deleting property:", error);
            toast.error("Failed to delete property.");
        }
    };


    const handleToggleForm = () => {
        setShowForm((prev) => !prev); 
    };
    const handleUpdateSave = async () => {
        if (!selectedProperty) return; 

        const payload = new FormData();
        payload.append("name", updateFormData.name);
        payload.append("description", updateFormData.description);
        payload.append("price", updateFormData.price);
        payload.append("location", updateFormData.location);

        if (updateFormData.images.length > 0) {
            updateFormData.images.forEach((file) => {
                payload.append("images[]", file);
            });
        }

        if (updateFormData.video) {
            payload.append("video", updateFormData.video);
        }

        try {
            setNewLoading(true); 
            const response = await axios.post(
                `https://test.catalystegy.com/public/api/properties/${selectedProperty.id}`,
                payload,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Property updated successfully:", response.data);
            toast.success("Property updated successfully!");

            setShowUpdateForm(false); 
            setSelectedProperty(null); 
            await fetchProperties();

        } catch (error) {
            console.error("Error updating property:", error.response?.data || error.message);
            toast.error("Failed to update property. Please try again.");
        } finally {
            setNewLoading(false); 
        }
    };



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
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleFileChange = (e) => {
        const { name, files } = e.target;

        if (name.startsWith("image")) {
            const index = parseInt(name.replace("image", ""), 10); 
            const file = files[0];

            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    setImagesPreview((prev) => {
                        const updatedPreviews = [...prev];
                        updatedPreviews[index] = reader.result; 
                        return updatedPreviews;
                    });
                    setFormData((prevData) => {
                        const updatedImages = [...prevData.images];
                        updatedImages[index] = file; 
                        return { ...prevData, images: updatedImages };
                    });
                };
                reader.readAsDataURL(file);
            }
        }

=        else if (name === "video") {
            const file = files[0];
            if (file) {
                setVideoPreview(URL.createObjectURL(file));     
                            setFormData((prevData) => ({
                    ...prevData,
                    video: file, 
                                }));
            }
        }
    };



    const handleSave = async () => {
        const payload = new FormData();
        payload.append("user_id", userId);
        payload.append("name", formData.name);
        payload.append("description", formData.description);
        payload.append("price", formData.price);
        payload.append("location", formData.location);

        if (formData.images.length > 0) {
            formData.images.forEach((file) => {
                payload.append("images[]", file); 
            });
        }

        if (formData.video) {
            payload.append("video", formData.video);         }

        try {
            setNewLoading(true); 

            const response = await axios.post(
                "https://test.catalystegy.com/public/api/properties",
                payload,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log("Property added successfully:", response.data);
            toast.success("Property Added Successfully")
            handleToggleForm(); 
        } catch (error) {
            console.error("Error adding property:", error.response?.data || error.message);
        }
        for (let [key, value] of payload.entries()) {
            console.log(`${key}:`, value);
        }

    };





    return <>
        <Toaster />
        <div className="admin-properties">
            <div
                className={`add-property-form ${showForm ? "flex" : "hidden"
                    } fixed justify-center items-center inset-0 bg-black/30 z-20`}
            >
                <div className="add-form relative md:w-2/5 w-4/5 h-fit p-4 rounded-md bg-white">
                    <div
                        onClick={handleToggleForm}
                        className="exit cursor-pointer absolute text-lg top-3 left-4"
                    >
                        X
                    </div>
                    <div className="imgs w-full h-48 flex gap-3 justify-center items-center">
                        {Array.from({ length: 2 }).map((_, index) => (
                            <label
                                key={index}
                                className="property-img border border-gray-400 border-dashed hover:border-gray-300 flex flex-col justify-center items-center lg:w-32 lg:h-32 md:w-28 md:h-28 sm:w-24 sm:h-24 w-20 h-20 bg-gray-100 cursor-pointer rounded-md"
                            >
                                <input
                                    type="file"
                                    name={`updateImage${index}`}
                                    accept=".jpg,.png"
                                    className="hidden"
                                    onChange={handleUpdateFileChange}
                                />
                                {updateImagesPreview[index] ? (
                                    <img
                                        src={
                                            typeof updateImagesPreview[index] === "string"
                                                ? updateImagesPreview[index]
                                                : `https://test.catalystegy.com/public/${updateImagesPreview[index]}`
                                        }
                                        alt={`Preview ${index}`}
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                ) : (
                                    <>
                                        <i className="fa-solid md:text-2xl text-sm text-gray-600 fa-camera"></i>
                                        <p className="text-xs w-full text-gray-600 text-center">
                                            Only Supported jpg/png
                                        </p>
                                    </>
                                )}
                            </label>
                        ))}

                        <label className="property-video border border-gray-400 border-dashed hover:border-gray-300 flex flex-col justify-center items-center lg:w-32 lg:h-32 md:w-28 md:h-28 sm:w-24 sm:h-24 w-20 h-20 bg-gray-100 cursor-pointer rounded-md">
                            <input
                                type="file"
                                name="video"
                                accept=".mp4"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            {videoPreview ? (
                                <video
                                    src={videoPreview}
                                    controls
                                    className="w-full h-full object-cover rounded-md"
                                />
                            ) : (
                                <>
                                    <i className="fa-solid md:text-2xl text-sm text-gray-600 fa-video"></i>
                                    <p className="text-xs w-full text-gray-600 text-center">
                                        Only Supported mp4
                                    </p>
                                </>
                            )}
                        </label>
                    </div>


                    <div className="name-price w-full flex gap-2">
                        <div className="names w-1/2">
                            <label className="font-medium" htmlFor="name">
                                Name:
                            </label>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full border-gray-300 border-2 mt-2 h-8 rounded-md"
                                type="text"
                            />
                        </div>
                        <div className="price w-1/2">
                            <label className="font-medium" htmlFor="price">
                                Price:
                            </label>
                            <div className="relative mt-2">
                                <input
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    className="w-full border-gray-300 border-2 h-8 rounded-md pr-10"
                                    type="text"
                                />
                                <span className="absolute inset-y-0 right-2 flex items-center text-gray-500">
                                    EGP
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="desc flex flex-col mt-3">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="border-2 px-3 py-1 border-gray-300 mt-2 rounded-md resize-none"
                            rows="2"
                        ></textarea>
                    </div>
                    <div className="location flex flex-col mt-3">
                        <label htmlFor="location">Location:</label>
                        <div className="relative mt-2">
                            <input
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                type="text"
                                className="w-full border-gray-300 border-2 h-8 rounded-md pr-10"
                            />
                            <i className="fa-solid fa-location-dot absolute inset-y-0 right-2 flex items-center text-gray-500"></i>
                        </div>
                    </div>
                    <div className="action-btns w-full mt-6 flex justify-between">
                        <button
                            onClick={handleToggleForm}
                            className="px-6 py-2 bg-gray-600 text-white rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-6 py-2 bg-green-600 text-white rounded-md"
                            disabled={newLoading} // Disable button while loading

                        >
                            {newLoading ? "Saving..." : "Save"}

                        </button>
                    </div>
                </div>
            </div>
            {showUpdateForm && (
                <div className={`update-property-form fixed flex justify-center items-center inset-0 bg-black/30 z-20`}>
                    <div className="update-form relative md:w-2/5 w-4/5 h-fit p-4 rounded-md bg-white">
                        <div
                            onClick={() => setShowUpdateForm(false)}
                            className="exit cursor-pointer absolute text-lg top-3 left-4"
                        >
                            X
                        </div>
                        <div className="imgs w-full h-48 flex gap-3 justify-center items-center">
                            {Array.from({ length: 2 }).map((_, index) => (
                                <label
                                    key={index}
                                    className="property-img border border-gray-400 border-dashed hover:border-gray-300 flex flex-col justify-center items-center lg:w-32 lg:h-32 md:w-28 md:h-28 sm:w-24 sm:h-24 w-20 h-20 bg-gray-100 cursor-pointer rounded-md"
                                >
                                    <input
                                        type="file"
                                        name={`updateImage${index}`}
                                        accept=".jpg,.png"
                                        className="hidden"
                                        onChange={handleUpdateFileChange}
                                    />
                                    {updateImagesPreview[index] ? (
                                        <img
                                            src={updateImagesPreview[index]}
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    ) : (
                                        <>
                                            <i className="fa-solid md:text-2xl text-sm text-gray-600 fa-camera"></i>
                                            <p className="text-xs w-full text-gray-600 text-center">
                                                Only Supported jpg/png
                                            </p>
                                        </>
                                    )}
                                </label>
                            ))}
                            <label className="property-video border border-gray-400 border-dashed hover:border-gray-300 flex flex-col justify-center items-center lg:w-32 lg:h-32 md:w-28 md:h-28 sm:w-24 sm:h-24 w-20 h-20 bg-gray-100 cursor-pointer rounded-md">
                                <input
                                    type="file"
                                    name="updateVideo"
                                    accept=".mp4"
                                    className="hidden"
                                    onChange={handleUpdateFileChange}
                                />
                                {updateVideoPreview ? (
                                    <video src={updateVideoPreview} className="w-full h-full object-cover rounded-md" />
                                ) : (
                                    <>
                                        <i className="fa-solid md:text-2xl text-sm text-gray-600 fa-video"></i>
                                        <p className="text-xs w-full text-gray-600 text-center">
                                            Only Supported mp4
                                        </p>
                                    </>
                                )}
                            </label>
                        </div>

                        <div className="name-price w-full flex gap-2">
                            <div className="names w-1/2">
                                <label className="font-medium" htmlFor="updateName">
                                    Name:
                                </label>
                                <input
                                    name="name"
                                    value={updateFormData.name}
                                    onChange={(e) =>
                                        setUpdateFormData({ ...updateFormData, name: e.target.value })
                                    }
                                    className="w-full border-gray-300 border-2 mt-2 h-8 rounded-md"
                                    type="text"
                                />
                            </div>
                            <div className="price w-1/2">
                                <label className="font-medium" htmlFor="updatePrice">
                                    Price:
                                </label>
                                <input
                                    name="price"
                                    value={updateFormData.price}
                                    onChange={(e) =>
                                        setUpdateFormData({ ...updateFormData, price: e.target.value })
                                    }
                                    className="w-full border-gray-300 border-2 mt-2 h-8 rounded-md pr-10"
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="desc flex flex-col mt-3">
                            <label htmlFor="updateDescription">Description:</label>
                            <textarea
                                name="description"
                                value={updateFormData.description}
                                onChange={(e) =>
                                    setUpdateFormData({ ...updateFormData, description: e.target.value })
                                }
                                className="border-2 px-3 py-1 border-gray-300 mt-2 rounded-md resize-none"
                                rows="2"
                            ></textarea>
                        </div>
                        <div className="location flex flex-col mt-3">
                            <label htmlFor="updateLocation">Location:</label>
                            <input
                                name="location"
                                value={updateFormData.location}
                                onChange={(e) =>
                                    setUpdateFormData({ ...updateFormData, location: e.target.value })
                                }
                                type="text"
                                className="w-full border-gray-300 border-2 h-8 rounded-md"
                            />
                        </div>
                        <div className="action-btns w-full mt-6 flex justify-between">
                            <button
                                onClick={() => setShowUpdateForm(false)}
                                className="px-6 py-2 bg-gray-600 text-white rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateSave}
                                className="px-6 py-2 bg-green-600 text-white rounded-md"
                                disabled={newLoading}
                            >
                                {newLoading ? "Updating..." : "Update"}
                            </button>
                        </div>
                    </div>
                </div>
            )}





            <p className="text-2xl text-sky-900">All Properties</p>



            <button onClick={handleToggleForm} className="px-4 py-2 rounded-md bg-green-600 text-white mt-6 hover:bg-green-500 " ><i className="fa-solid fa-plus"></i> Add New Property</button>
            {showDeleteForm && (
                <DeleteForm
                    deleteFn={confirmDelete}
                    deletedData={selectedProperty?.name} 
                    closeFn={() => { setShowDeleteForm(false) }}
                />
            )}



            <PropertiesList
                properties={properties}
                loading={loading}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                handleClick={(id) => console.log("Admin Property Click", id)}
                isAdmin={true} 
                onUpdate={handleUpdate}
                onDelete={handleDelete}             />
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
        </div >
    </>
}


