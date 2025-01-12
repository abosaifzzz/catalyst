

import React, { useState } from 'react'

export default function DeleteForm({deleteFn, deletedData , closeFn}) {
    
    
  return <>
    <div className="Delete-user-form fixed flex justify-center items-center inset-0 bg-black/20 z-20">
                    <div className="delete-form px-6 relative md:w-1/3 w-4/5 flex flex-col pt-7 justify-center items-center rounded-lg bg-white md:h-1/4 h-1/3">
                        <i className="fa-solid fa-trash text-2xl pb-5 text-red-700"></i>
                        <p className='text-center'>
                            Are you sure you want to delete:{" "}
                            <span className="text-gray-700 font-medium">{deletedData}</span>?
                        </p>
                        <div className="delete-action-btns flex gap-2 mt-3">
                            <button
                                className="bg-transparent text-black border-2 rounded-md px-2 py-2"
                                onClick={closeFn}
                            >
                                No, Cancel
                            </button>
                            <button
                                className="bg-red-600 text-white rounded-md px-2 py-2"
                                onClick={deleteFn}
                            >
                                Yes, I'm sure
                            </button>
                        </div>
                    </div>
                </div>
  </>
}
