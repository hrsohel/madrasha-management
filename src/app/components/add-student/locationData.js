// Generated location data from bd_geo_code database
// Data structure: divisions.json, districts.json, upazilas.json, unions.json

import divisionsRaw from '../../../../divisions.json';
import districtsRaw from '../../../../districts.json';
import upazilasRaw from '../../../../upazilas.json';
import unionsRaw from '../../../../unions.json';

// Extract actual data arrays from JSON structure
const divisionsData = divisionsRaw.find(item => item.type === 'table' && item.name === 'divisions')?.data || [];
const districtsData = districtsRaw.find(item => item.type === 'table' && item.name === 'districts')?.data || [];
const upazilasData = upazilasRaw.find(item => item.type === 'table' && item.name === 'upazilas')?.data || [];
const unionsData = unionsRaw.find(item => item.type === 'table' && item.name === 'unions')?.data || [];

// Export processed location data
export const divisions = divisionsData;

// Get districts by division_id
export const getDistrictsByDivision = (divisionId) => {
    return districtsData.filter(district => district.division_id === divisionId);
};

// Get upazilas by district_id
export const getUpazilasByDistrict = (districtId) => {
    return upazilasData.filter(upazila => upazila.district_id === districtId);
};

// Get unions by upazilla_id
export const getUnionsByUpazila = (upazilaId) => {
    return unionsData.filter(union => union.upazilla_id === upazilaId);
};
