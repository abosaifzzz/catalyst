import React from "react";
import PropertyCard from "../PropertyCard/PropertyCard.jsx"; // Assuming you have a PropertyCard component

export const PropertiesList = ({
  properties,
  loading,
  currentPage,
  itemsPerPage,
  handleClick,
  isAdmin = false,
  onUpdate,
  onDelete,
}) => {
  // Calculate the indices for slicing
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProperties = properties.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="properties p-0 mt-8 mb-12 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-8 gap-x-7">
      {loading
        ? Array.from({ length: itemsPerPage }).map((_, index) => (
          <div
            key={index}
            className="h-[420px] rounded-md flex flex-col justify-center animate-pulse shadow-lg"
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
        : currentProperties.map((property) => (
          <PropertyCard
            fn={() => handleClick(property.id)}
            key={property.id}
            images={property.images}
            name={property.name || "Unknown Property"}
            time={property.created_at || "N/A"}
            description={property.description || "No description provided."}
            location={property.location || "Location not specified"}
            price={`${property.price || "N/A"} ${property.currency || ""}`}
            hostName={property.user?.name || "Unknown Host"}
            hostImage={property.user?.profile_image || "default-image-url"}
            isAdmin={isAdmin} // Show admin actions
            onUpdate={isAdmin ? () => onUpdate(property) : undefined}
            onDelete={isAdmin ? () => onDelete(property) : undefined}
          />
        ))}
    </div>
  );
};
