import React from 'react'
import prog from "../../assets/prog.jpg"


export default function UserCard({
  role,
  userName,
  joinDate,
  email,
  phone,
  profileImg,
  onDelete,
  onUpdate

}) {
  return (
    <div className="user-card relative md:w-4/5 sm:w-5/6 w-full mt-8 md:flex block gap-2 justify-between items-center px-4 py-8 bg-sky-50 shadow-lg rounded-md">
      <p className="font-medium absolute -top-3 right-1/2 bg-sky-600 px-3 text-sm py-1 rounded-md text-white">
        {role}
      </p>

      <div className="left flex items-center gap-3">
        <img src={profileImg} className="w-20 h-20 rounded-full" alt="" />
        <div className="name-join">
          <p className="md:text-xl w-full  text-lg font-medium">{userName}</p>
          <span className="text-sm"> <strong>joined:</strong>  {joinDate} </span>
        </div>
      </div>

      <div className="email-phone md:mt-0 mt-3">
        <div className="email flex gap-2 items-center">
          <i className="fa-solid text-blue-900 fa-envelope"></i> {email}
        </div>
        <div className="phone flex gap-2 items-center">
          <i className="fa-solid text-blue-900 fa-phone-volume"></i> {phone}
        </div>
      </div>

      <div className="update-delete md:mt-auto mt-3 flex flex-col gap-2">
        <button onClick={onUpdate}
          className="px-2 flex justify-center items-center gap-2 py-2 bg-sky-600 text-white hover:bg-sky-500 rounded-md">
          <i className="fa-solid fa-pen-to-square"></i> Update
        </button>
        <button
          className="px-2 flex justify-center items-center gap-2 py-2 bg-red-600 text-white hover:bg-red-500 rounded-md"
          onClick={onDelete}
        >
          <i className="fa-solid fa-trash"></i> Delete
        </button>
      </div>
    </div>
  );
}