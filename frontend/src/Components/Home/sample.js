import React, { useEffect, useState } from "react";
import PropTypes from "prop-types"; // for type-checking props
import "../../CSS/FilterModal.css";
import "react-input-range/lib/css/index.css"; //Importing CSS file for input range styling
import InputRange from "react-input-range";

const FilterModal = ({ selectedFilters, onFilterChange, onClose }) => {
const [priceRange, setPriceRange] = useState({
min: selectedFilters.priceRange?.min || 600,
max: selectedFilters.priceRange?.max || 30000,
});

const [propertyType, setPropertyType] = useState(
selectedFilters.propertyType || "" // Default it is empty or the selected property type from props
);

const [roomType, setRoomType] = useState(selectedFilters.roomType || "");
const [amenities, setAmenities] = useState(selectedFilters.amenities || []);

//useEffect hook to update states when selectedFilters prop changes
useEffect(() => {
setPriceRange({
min: selectedFilters.priceRange?.min || 600,
max: selectedFilters.priceRange?.max || 30000,
});
setPropertyType(selectedFilters.propertyType || "");
setRoomType(selectedFilters.roomType || "");
setAmenities(selectedFilters.amenities || []);
}, [selectedFilters]);

//Function to handle changes in price Range
const handlePriceRangeChange = (value) => {
setPriceRange(value); //it will update the price range state
};

//function to handle min value
const handleMinInputChange = (e) => {
const minValue = parseInt(e.target.value, 10);
setPriceRange((prev) => ({ ...prev, min: minValue }));
};
//function to handle max value
const handleMaxInputChange = (e) => {
const maxValue = parseInt(e.target.value, 10);
setPriceRange((prev) => ({ ...prev, max: maxValue }));
};

//function to handle applying filters
const handleFilterChange = () => {
onFilterChange("minPrice", priceRange.min);
onFilterChange("maxPrice", priceRange.max);
onFilterChange("propertyType", propertyType);
onFilterChange("roomType", roomType);
onFilterChange("amenities", amenities);
onClose(); // closes the modal
};

//Options for property types

const propertyTypeOptions = [
{
value: "House",
label: "House",
icon: "home",
},
{ value: "Flat", label: "Flat", icon: "apartment" },
{
value: "Guest House",
label: "Guest House",
icon: "hotel",
},
{ value: "Hotel", label: "Hotel", icon: "meeting_room" },
];

// Options for room types
const roomTypeOptions = [
{
value: "Entire Room",
label: "Entire Room",
icon: "hotel",
},
{
value: "Room",
label: "Room",
icon: "meeting_room",
},
{
value: "AnyType",
label: "AnyType",
icon: "apartment",
},
];

//Options for amenities

const amenitiesOptions = [
{
value: "Wifi",
label: "Wifi",
icon: "wifi",
},
{
value: "Kitchen",
label: "Kitchen",
icon: "kitchen",
},
{
value: "Ac",
label: "AC",
icon: "ac_unit",
},
{
value: "Washing Machine",
label: "Washing Machine",
icon: "local_laundry_service",
},
{
value: "Tv",
label: "Tv",
icon: "tv",
},
{
value: "Pool",
label: "Pool",
icon: "pool",
},
{
value: "Free Parking",
label: "Free parking",
icon: "local_parking",
},
];

//function to handle clearing filters
const handleClearFilters = () => {
setPriceRange({ min: 600, max: 30000 }); // reset the price range
setPropertyType("");
setRoomType("");
setAmenities([]);
};

// function to handle changes in amenities
const handleAmenitiesChange = (selectedAmenity) => {
setAmenities((prevAmenities) =>
prevAmenities.includes(selectedAmenity)
? prevAmenities.filter((item) => item !== selectedAmenity)
: [...prevAmenities, selectedAmenity]
);
};

// function to handle changes in propertyType
const handlePropertyTypeChange = (selectedType) => {
setPropertyType((prevType) =>
prevType === selectedType ? "" : selectedType
);
};

//function to handle room type
const handleRoomTypeChange = (selectedType) => {
setRoomType((prevType) => (prevType === selectedType ? "" : selectedType));
};

return (
<div className="modal-backdrop">
<div className="modal-content">
<h4>
Filters <hr />
</h4>
{/* close button */}
<button className="close-button" onClick={onClose}>
<span>&times;</span>
</button>

{/* Filter sections */}
<div className="modal-filters-container">
<div className="filter-section">
<label>Price range:</label>
<InputRange
minValue={600}
maxValue={30000}
value={priceRange}
onChange={handlePriceRangeChange}
/>
<div className="range-inputs">
<input
type="number"
value={priceRange.min}
onChange={handleMinInputChange}
/>
<span>-</span>
<input
type="number"
value={priceRange.max}
onChange={handleMaxInputChange}
/>
</div>
</div>

{/* Property type filter */}
<div className="filter-section">
<label>Property Type: </label>
<div className="icon-box">
{propertyTypeOptions.map((options) => (
<div
key={options.value}
className={`selectable-box ${
propertyType === options.value ? "selected" : ""
}`}
onClick={() => handlePropertyTypeChange(options.value)}
>
<span className="material-icons">{options.icon}</span>
<span>{options.label}</span>
</div>
))}
</div>
</div>
</div>
</div>
</div>
);
};

export default FilterModal;