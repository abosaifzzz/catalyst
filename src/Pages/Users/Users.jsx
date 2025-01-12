
import React, { useEffect, useState } from 'react'
import UserCard from '../../Components/UserCard/UserCard.jsx'
import prog from "../../assets/prog.jpg"
import profile from "../../assets/profile.png"

import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import DeleteForm from '../../Components/DeleteForm/DeleteForm.jsx';



export default function Users() {
    const [isDeleteFormVisible, setDeleteFormVisible] = useState(false);
    const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);

    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;
    const [selectedRole, setSelectedRole] = useState("All");
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddFormVisible, setAddFormVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        email: "",
        phone: "",
        profile_image: "",
    });

    const [addFormData, setAddFormData] = useState({
        name: "",
        role: "client",
        email: "",
        phone: "",
        profileImage: null,
    });

    const handleUpdateClick = (user) => {
        setSelectedUser(user);
        setFormData({
            name: user.name || "",
            role: user.role || "",
            email: user.email || "",
            phone: user.phone || "",
            profile_image: user.profile_image || "",
        });
        setIsUpdateFormVisible(true);
    };

    const handleFormClose = () => {
        setSelectedUser(null);
        setIsUpdateFormVisible(false);
    };
    const handleInputChange = (e) => {
        const { name, value, files } = e.target;

        if (files && files[0]) {
            const file = files[0];
            const allowedTypes = ["image/jpeg", "image/png"];

            if (!allowedTypes.includes(file.type)) {

                toast.error("Please select a valid image file (JPG or PNG).")
                return;
            }

            setFormData((prevData) => ({
                ...prevData,
                profileImage: file,
                profilePreview: URL.createObjectURL(file),
            }));
        } else if (name) {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        } else {
            console.error("Input change event is missing 'name' or 'files'.");
        }
    };


    const handleFormSubmit = async () => {
        if (!selectedUser) return;

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("role", formData.role);
            formDataToSend.append("email", formData.email);
            formDataToSend.append("phone", formData.phone);

            if (formData.profileImage) {
                formDataToSend.append("profile_image", formData.profileImage);
            }

            const response = await axios.post(
                `https://test.catalystegy.com/public/api/users/${selectedUser.id}`,
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            toast.success('User Updated Successfully')
            fetchUsers()
            console.log("User updated successfully:", response.data);

            handleFormClose();

        } catch (error) {
            console.error("Error updating user:", error.response?.data || error);
        }
    };





    const toggleDeleteForm = () => {
        setDeleteFormVisible(!isDeleteFormVisible);
    };

    const handleDeleteClick = (user) => {
        setSelectedUser(user);
        setDeleteFormVisible(true);
    };

    const confirmDelete = async () => {
        if (!selectedUser) return;

        try {
            const response = await axios.delete(
                `https://test.catalystegy.com/public/api/users/${selectedUser.id}`
            );

            console.log("User deleted successfully:", response.data);

            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== selectedUser.id));
            toast.success('User Deleted Successfully')

            setDeleteFormVisible(false);
        } catch (error) {
            console.error("Error deleting user:", error.response || error.message);
        }
    };

    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setAddFormData({ ...addFormData, [name]: value });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const allowedTypes = ["image/jpeg", "image/png"];

            if (!allowedTypes.includes(file.type)) {
                toast.error("Please select a valid image file (JPG or PNG).")
                return;
            }

            setAddFormData({
                ...addFormData,
                profileImage: file,
                profilePreview: URL.createObjectURL(file),
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("name", addFormData.name);
            formDataToSend.append("role", addFormData.role);
            formDataToSend.append("email", addFormData.email);
            formDataToSend.append("phone", addFormData.phone);
            if (addFormData.profileImage) {
                formDataToSend.append("profile_image", addFormData.profileImage);
            }

            console.log(formDataToSend);

            const response = await axios.post(
                "https://test.catalystegy.com/public/api/users",
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            toast.success('User Added Successfully')


            console.log("User added successfully:", response.data);
            toggleAddForm();

        } catch (error) {
            toast.error('Faild to add user')

            console.error("Error adding user:", error.response || error.message);
        }
    };




    const roles = ["All", "Admin", "Client", "Owner"];

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
        setDropdownVisible(false);
    };
    const toggleAddForm = () => {
        setAddFormVisible(!isAddFormVisible);
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get(
                "https://test.catalystegy.com/public/api/users"
            );
            setUsers(response.data);
            setLoading(false);

        } catch (error) {
            console.error("Error fetching users:", error);
            setLoading(false);
        }
    };

    useEffect(() => {


        fetchUsers();
    }, []);


    const filteredUsers = users.filter((user) => {
        const matchesRole =
            selectedRole === "All" || user.role.toLowerCase() === selectedRole.toLowerCase();
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.role.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesRole && matchesSearch;
    });


    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const startIndex = (currentPage - 1) * usersPerPage;
    const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };


    return <>
        <Toaster />

        <div className="users-page ">
            {isAddFormVisible && (
                <div className="add-user-form fixed flex justify-center items-center inset-0 bg-black/20 z-20 ">
                    <div className="add-form px-6  relative md:w-1/3 w-4/5 flex flex-col pt-7 items-center rounded-lg bg-white md:h-2/3 h-5/6">
                        <div onClick={toggleAddForm} className="exit cursor-pointer absolute top-4 left-4">
                            X
                        </div>
                        <div className="profile-img relative">
                            <img
                                src={addFormData.profilePreview || profile}
                                className="w-28 h-28 rounded-full"
                                alt="Profile Preview"
                            />

                            <div className="select-img flex justify-center items-center absolute bottom-0 right-0 w-7 h-7 bg-slate-200 rounded-full cursor-pointer">
                                <i className="fa-solid fa-pen-to-square"></i>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={handleFileChange} />
                            </div>
                        </div>

                        <div className="names flex w-full flex-col gap-2 mt-2">
                            <label className="text-lg">Name:</label>
                            <input
                                className="border-2 w-full rounded-md px-2 py-1"
                                type="text"
                                placeholder="Name.."
                                name="name"
                                value={addFormData.name}
                                onChange={handleAddChange}

                            />
                        </div>

                        <div className="role flex mt-3 w-full flex-col gap-2">
                            <label className="text-lg">Role:</label>
                            <select
                                className="border-2 w-full rounded-md px-2 py-1 bg-white"
                                name="role"
                                value={addFormData.role}
                                onChange={handleAddChange}
                            >
                                <option value="client">Client</option>
                                <option value="owner">Owner</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <div className="email flex mt-3 w-full flex-col gap-2">
                            <label className="text-lg">Email:</label>
                            <input
                                name="email"
                                value={addFormData.email}
                                onChange={handleAddChange}

                                className="border-2 w-full rounded-md px-2 py-1"
                                type="email"
                                placeholder="Email.."
                            />
                        </div>

                        <div className="phone flex mt-3 w-full flex-col gap-2">
                            <label className="text-lg">Phone:</label>
                            <input
                                name="phone"
                                value={addFormData.phone}
                                onChange={handleAddChange}

                                className="border-2 w-full rounded-md px-2 py-1"
                                type="tel"
                                placeholder="Phone.."
                            />
                        </div>

                        <div className="action-btns w-full mt-6 flex justify-between">
                            <button
                                className="px-6 py-2 bg-gray-600 text-white rounded-md"
                                onClick={toggleAddForm}
                            >
                                Cancel
                            </button>
                            <button onClick={handleSubmit}
                                className="px-6 py-2 bg-green-600 text-white rounded-md">
                                Save
                            </button>
                        </div>
                    </div>



                </div>
            )}
            {isUpdateFormVisible && (
                <div className="update-user-form fixed flex justify-center items-center inset-0 bg-black/20 z-20">
                    <div className="update-form px-6 relative md:w-1/3 w-4/5 flex flex-col pt-7 items-center rounded-lg bg-white md:h-2/3 h-5/6">
                        <div
                            onClick={handleFormClose}
                            className="exit cursor-pointer absolute top-4 left-4"
                        >
                            X
                        </div>
                        <div className="profile-img relative">
                            <img
                                src={formData.profilePreview || selectedUser?.profile_image || ""}
                                className="w-28 h-28 rounded-full"
                                alt="Profile Preview"
                            />
                            <div className="select-img flex justify-center items-center absolute bottom-0 right-0 w-7 h-7 bg-slate-200 rounded-full cursor-pointer">
                                <i className="fa-solid fa-pen-to-square"></i>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            const file = e.target.files[0];
                                            const allowedTypes = ["image/jpeg", "image/png"]; 

                                            if (!allowedTypes.includes(file.type)) {
                                                toast.error("Please select a valid image file (JPG or PNG).")
                                                return;
                                            }

                                            setFormData((prevData) => ({
                                                ...prevData,
                                                profileImage: file, 
                                                profilePreview: URL.createObjectURL(file), 
                                            }));
                                        }
                                    }}
                                />
                            </div>
                        </div>


                        <div className="names flex w-full flex-col gap-2 mt-2">
                            <label className="text-lg">Name:</label>
                            <input
                                className="border-2 w-full rounded-md px-2 py-1"
                                type="text"
                                name='name'
                                placeholder="Name.."
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="role flex mt-3 w-full flex-col gap-2">
                            <label className="text-lg">Role:</label>
                            <select
                                className="border-2 w-full rounded-md px-2 py-1 bg-white"
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                            >
                                <option value="client">Client</option>
                                <option value="owner">Owner</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <div className="email flex mt-3 w-full flex-col gap-2">
                            <label className="text-lg">Email:</label>
                            <input
                                className="border-2 w-full rounded-md px-2 py-1"
                                type="email"
                                name='email'
                                placeholder="Email.."
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="phone flex mt-3 w-full flex-col gap-2">
                            <label className="text-lg">Phone:</label>
                            <input
                                className="border-2 w-full rounded-md px-2 py-1"
                                type="tel"
                                name='phone'
                                placeholder="Phone.."
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="action-btns w-full mt-6 flex justify-between">
                            <button
                                className="px-6 py-2 bg-gray-600 text-white rounded-md"
                                onClick={handleFormClose}
                            >
                                Cancel
                            </button>
                            <button onClick={handleFormSubmit}
                                className="px-6 py-2 bg-green-600 text-white rounded-md">
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isDeleteFormVisible && selectedUser && (
                <DeleteForm deleteFn={confirmDelete} deletedData={selectedUser.name} />

            )}


            <p className='text-2xl text-sky-900'>All Users</p>


            <div className="users">
                <div className="users-search-add-user   md:w-4/5 w-full  md:flex gap-2 justify-between items-center mb-6 ">
                    <div className="search md:w-3/4 w-full   relative">
                        <input
                            className="w-full h-12 border-2 rounded-lg ps-24 my-4"
                            type="search"
                            placeholder={`Search users...`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        <div
                            className="absolute top-1/2 left-0 rounded-md transform bg-slate-100 px-2 py-3 -translate-y-1/2 flex items-center cursor-pointer text-gray-600"
                            onClick={toggleDropdown}
                        >
                            <span>{selectedRole}</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-4 h-4 ml-1"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                />
                            </svg>
                        </div>

                        {isDropdownVisible && (
                            <div className="role-drpdwn absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                                {roles.map((role) => (
                                    <div
                                        key={role}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleRoleSelect(role)}
                                    >
                                        {role}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>


                    <div className="add-user  md:w-1/4 w-full">
                        <button
                            className="px-4 bg-green-500  w-full rounded-md text-white hover:bg-green-400 py-3"
                            onClick={toggleAddForm}
                        >
                            <i className="fa-solid fa-plus"></i> Add User
                        </button>
                    </div>
                </div>

                {loading
                    ? Array.from({ length: usersPerPage }).map((_, index) => (
                        <div
                            key={index}
                            className="h-[200px] rounded-md flex flex-col justify-center animate-pulse shadow-lg"
                        >
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
                    : currentUsers.map((user) => (
                        <UserCard key={user.id}
                            role={user.role || "N/A"}
                            userName={user.name || "Unknown"}
                            joinDate={new Date(user.created_at).toLocaleDateString() || "Unknown"}
                            email={user.email || "N/A"}
                            phone={user.phone || "N/A"}
                            profileImg={user.profile_image || prog}
                            onDelete={() => handleDeleteClick(user)}
                            onUpdate={() => handleUpdateClick(user)}


                        />
                    ))}

                {filteredUsers.length > usersPerPage && (
                    <div className="pagination my-20 pt-6 flex justify-center items-center mt-4 gap-4">
                        <button
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                        >
                            <i className="fa-solid md:hidden block fa-angle-left"></i>
                            <p className='md:block hidden'>Previous</p>
                        </button>
                        <span>
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                        >
                            <i className="fa-solid md:hidden block fa-angle-right"></i>
                            <p className='md:block hidden'>Next</p>

                        </button>
                    </div>
                )}
            </div>


        </div>


    </>
}
