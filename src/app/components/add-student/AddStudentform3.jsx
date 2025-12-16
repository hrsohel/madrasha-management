import React, { useState, useEffect } from 'react';
import { divisions, getDistrictsByDivision, getUpazilasByDistrict, getUnionsByUpazila } from './locationData';

// Helper to find ID by bn_name
const getIdFromBnName = (dataArray, bnName) => {
  const foundItem = dataArray.find(item => item.bn_name === bnName);
  return foundItem ? foundItem.id : '';
};

// Helper to find bn_name by ID
const getBnNameFromId = (dataArray, id) => {
    const foundItem = dataArray.find(item => item.id === id);
    return foundItem ? foundItem.bn_name : '';
};

export default function AddStudentform3({ setPagination, formData, onDataChange }) {
  const [isSameAsPresent, setIsSameAsPresent] = useState(formData.isSameAsPresent || true);

  const [presentDivisionId, setPresentDivisionId] = useState(() => getIdFromBnName(divisions, formData.presentDivision));
  const [presentDistrictId, setPresentDistrictId] = useState(() => getIdFromBnName(getDistrictsByDivision(getIdFromBnName(divisions, formData.presentDivision)), formData.presentDistrict));
  const [presentUpazilaId, setPresentUpazilaId] = useState(() => getIdFromBnName(getUpazilasByDistrict(getIdFromBnName(getDistrictsByDivision(getIdFromBnName(divisions, formData.presentDivision)), formData.presentDistrict)), formData.presentUpazila));

  const [permanentDivisionId, setPermanentDivisionId] = useState(() => getIdFromBnName(divisions, formData.permanentDivision));
  const [permanentDistrictId, setPermanentDistrictId] = useState(() => getIdFromBnName(getDistrictsByDivision(getIdFromBnName(divisions, formData.permanentDivision)), formData.permanentDistrict));
  const [permanentUpazilaId, setPermanentUpazilaId] = useState(() => getIdFromBnName(getUpazilasByDistrict(getIdFromBnName(getDistrictsByDivision(getIdFromBnName(divisions, formData.permanentDivision)), formData.permanentDistrict)), formData.permanentUpazila));

  // Get filtered data
  const presentDistricts = presentDivisionId ? getDistrictsByDivision(presentDivisionId) : [];
  const presentUpazilas = presentDistrictId ? getUpazilasByDistrict(presentDistrictId) : [];
  const presentUnions = presentUpazilaId ? getUnionsByUpazila(presentUpazilaId) : [];

  const permanentDistricts = permanentDivisionId ? getDistrictsByDivision(permanentDivisionId) : [];
  const permanentUpazilas = permanentDistrictId ? getUpazilasByDistrict(permanentDistrictId) : [];
  const permanentUnions = permanentUpazilaId ? getUnionsByUpazila(permanentUpazilaId) : [];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    onDataChange({ [name]: type === 'checkbox' ? checked : value });
  };

  const handlePresentAddressChange = (e) => {
    const { name, value: bnName } = e.target; // value is now bn_name

    let selectedId = '';

    // Determine the ID from the selected bnName for internal state management
    if (name === 'presentDivision') {
      selectedId = getIdFromBnName(divisions, bnName);
      setPresentDivisionId(selectedId);
      setPresentDistrictId('');
      setPresentUpazilaId('');
    } else if (name === 'presentDistrict') {
      const currentDistricts = getDistrictsByDivision(presentDivisionId);
      selectedId = getIdFromBnName(currentDistricts, bnName);
      setPresentDistrictId(selectedId);
      setPresentUpazilaId('');
    } else if (name === 'presentUpazila') {
      const currentUpazilas = getUpazilasByDistrict(presentDistrictId);
      selectedId = getIdFromBnName(currentUpazilas, bnName);
      setPresentUpazilaId(selectedId);
    } else if (name === 'presentUnion') {
      const currentUnions = getUnionsByUpazila(presentUpazilaId);
      selectedId = getIdFromBnName(currentUnions, bnName);
    }

    // Create update object for formData (stores bnName)
    let updates = { [name]: bnName };

    // Reset dependent fields in formData if higher level changes
    if (name === 'presentDivision') {
      updates.presentDistrict = '';
      updates.presentUpazila = '';
      updates.presentUnion = '';
    } else if (name === 'presentDistrict') {
      updates.presentUpazila = '';
      updates.presentUnion = '';
    } else if (name === 'presentUpazila') {
      updates.presentUnion = '';
    }

    // Handle "Same as Present" logic
    if (isSameAsPresent) {
      if (name === 'presentDivision') {
        setPermanentDivisionId(selectedId);
        setPermanentDistrictId('');
        setPermanentUpazilaId('');
        updates.permanentDivision = bnName;
        updates.permanentDistrict = '';
        updates.permanentUpazila = '';
        updates.permanentUnion = '';
      } else if (name === 'presentDistrict') {
        setPermanentDistrictId(selectedId);
        setPermanentUpazilaId('');
        updates.permanentDistrict = bnName;
        updates.permanentUpazila = '';
        updates.permanentUnion = '';
      } else if (name === 'presentUpazila') {
        setPermanentUpazilaId(selectedId);
        updates.permanentUpazila = bnName;
        updates.permanentUnion = '';
      } else if (name === 'presentUnion') {
        updates.permanentUnion = bnName;
      } else {
        const permanentFieldName = name.replace('present', 'permanent');
        updates[permanentFieldName] = bnName;
      }
    }

    onDataChange(updates);
  };

  const handlePermanentAddressChange = (e) => {
    const { name, value: bnName } = e.target; // value is now bn_name

    let selectedId = '';

    // Determine the ID from the selected bnName for internal state management
    if (name === 'permanentDivision') {
      selectedId = getIdFromBnName(divisions, bnName);
      setPermanentDivisionId(selectedId);
      setPermanentDistrictId('');
      setPermanentUpazilaId('');
    } else if (name === 'permanentDistrict') {
      const currentDistricts = getDistrictsByDivision(permanentDivisionId);
      selectedId = getIdFromBnName(currentDistricts, bnName);
      setPermanentDistrictId(selectedId);
      setPermanentUpazilaId('');
    } else if (name === 'permanentUpazila') {
      const currentUpazilas = getUpazilasByDistrict(permanentDistrictId);
      selectedId = getIdFromBnName(currentUpazilas, bnName);
      setPermanentUpazilaId(selectedId);
    } else if (name === 'permanentUnion') {
      const currentUnions = getUnionsByUpazila(permanentUpazilaId);
      selectedId = getIdFromBnName(currentUnions, bnName);
    }

    // Create update object for formData (stores bnName)
    let updates = { [name]: bnName };

    // Reset dependent fields in formData if higher level changes
    if (name === 'permanentDivision') {
      updates.permanentDistrict = '';
      updates.permanentUpazila = '';
      updates.permanentUnion = '';
    } else if (name === 'permanentDistrict') {
      updates.permanentUpazila = '';
      updates.permanentUnion = '';
    } else if (name === 'permanentUpazila') {
      updates.permanentUnion = '';
    }

    onDataChange(updates);
  };

  // Logic to handle "Same as Present" toggle
  useEffect(() => {
    if (isSameAsPresent) {
      // Set the permanent address IDs for filtering
      setPermanentDivisionId(getIdFromBnName(divisions, formData.presentDivision));
      setPermanentDistrictId(getIdFromBnName(getDistrictsByDivision(getIdFromBnName(divisions, formData.presentDivision)), formData.presentDistrict));
      setPermanentUpazilaId(getIdFromBnName(getUpazilasByDistrict(getIdFromBnName(getDistrictsByDivision(getIdFromBnName(divisions, formData.presentDivision)), formData.presentDistrict)), formData.presentUpazila));

      onDataChange({
        permanentDivision: formData.presentDivision,
        permanentDistrict: formData.presentDistrict,
        permanentUpazila: formData.presentUpazila,
        permanentUnion: formData.presentUnion,
        permanentVillage: formData.presentVillage,
        permanentOthers: formData.presentOthers
      });
    }
  }, [isSameAsPresent, formData.presentDivision, formData.presentDistrict, formData.presentUpazila, formData.presentUnion, formData.presentVillage, formData.presentOthers]);


  return (
    <div className="bg-[#F7F7F7] rounded-lg shadow-xl overflow-hidden w-[60%] mx-auto">
      <div className="text-white p-6">
        <h3 className="text-2xl font-bold text-[#246545]">ঠিকানা</h3>
      </div>

      <div className="p-8 space-y-10">
        <div>
          <h4 className="text-lg font-bold text-gray-800 mb-2">
            বর্তমান ঠিকানা
          </h4>
          <hr className="border-gray-300 mb-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">বিভাগ</label>
              <select
                name="presentDivision"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                value={formData.presentDivision || ''}
                onChange={handlePresentAddressChange}
              >
                <option value="">নির্বাচন করুন</option>
                {divisions.map((div) => (
                  <option key={div.id} value={div.bn_name}>{div.bn_name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">জেলা</label>
              <select
                name="presentDistrict"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                value={formData.presentDistrict || ''}
                onChange={handlePresentAddressChange}
                disabled={!formData.presentDivision}
              >
                <option value="">নির্বাচন করুন</option>
                {presentDistricts.map((dist) => (
                  <option key={dist.id} value={dist.bn_name}>{dist.bn_name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">উপজেলা/থানা</label>
              <select
                name="presentUpazila"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                value={formData.presentUpazila || ''}
                onChange={handlePresentAddressChange}
                disabled={!formData.presentDistrict}
              >
                <option value="">নির্বাচন করুন</option>
                {presentUpazilas.map((upazila) => (
                  <option key={upazila.id} value={upazila.bn_name}>{upazila.bn_name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">ইউনিয়ন</label>
              <select
                name="presentUnion"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                value={formData.presentUnion || ''}
                onChange={handlePresentAddressChange}
                disabled={!formData.presentUpazila}
              >
                <option value="">নির্বাচন করুন</option>
                {presentUnions.map((union) => (
                  <option key={union.id} value={union.bn_name}>{union.bn_name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">গ্রাম</label>
              <input
                type="text"
                name="presentVillage"
                placeholder="পাইকপাড়া"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                defaultValue={formData.presentVillage || ''}
                onChange={handlePresentAddressChange}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">অন্যান্য তথ্য </label>
              <input
                type="text"
                name="presentOthers"
                placeholder="ঠিকানা সম্পর্কিত অন্য কোনো তথ্য "
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                defaultValue={formData.presentOthers || ''}
                onChange={handlePresentAddressChange}
              />
            </div>
          </div>
        </div>

        {/* স্থায়ী ঠিকানা - Permanent Address */}
        <div className="rounded-lg p-6">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              name="isSameAsPresent"
              className="w-5 h-5 rounded focus:ring-blue-500"
              checked={isSameAsPresent}
              onChange={(e) => {
                const checked = e.target.checked;
                setIsSameAsPresent(checked);
                onDataChange({ isSameAsPresent: checked });
              }}
            />
            <span className="text-lg font-bold">
              বর্তমান ঠিকানাই স্থায়ী ঠিকানা
            </span>
          </label>

          <div className={`mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 ${isSameAsPresent ? 'opacity-50 pointer-events-none' : ''}`}>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">বিভাগ</label>
              <select
                name="permanentDivision"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                value={isSameAsPresent ? formData.presentDivision : formData.permanentDivision || ''}
                onChange={handlePermanentAddressChange}
                disabled={isSameAsPresent}
              >
                <option value="">নির্বাচন করুন</option>
                {divisions.map((div) => (
                  <option key={div.id} value={div.bn_name}>{div.bn_name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">জেলা</label>
              <select
                name="permanentDistrict"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                value={isSameAsPresent ? formData.presentDistrict : formData.permanentDistrict || ''}
                onChange={handlePermanentAddressChange}
                disabled={isSameAsPresent || (!isSameAsPresent && !formData.permanentDivision)}
              >
                <option value="">নির্বাচন করুন</option>
                {permanentDistricts.map((dist) => (
                  <option key={dist.id} value={dist.bn_name}>{dist.bn_name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">উপজেলা/থানা</label>
              <select
                name="permanentUpazila"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                value={isSameAsPresent ? formData.presentUpazila : formData.permanentUpazila || ''}
                onChange={handlePermanentAddressChange}
                disabled={isSameAsPresent || (!isSameAsPresent && !formData.permanentDistrict)}
              >
                <option value="">নির্বাচন করুন</option>
                {permanentUpazilas.map((upazila) => (
                  <option key={upazila.id} value={upazila.bn_name}>{upazila.bn_name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">ইউনিয়ন</label>
              <select
                name="permanentUnion"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                value={isSameAsPresent ? formData.presentUnion : formData.permanentUnion || ''}
                onChange={handlePermanentAddressChange}
                disabled={isSameAsPresent || (!isSameAsPresent && !formData.permanentUpazila)}
              >
                <option value="">নির্বাচন করুন</option>
                {permanentUnions.map((union) => (
                  <option key={union.id} value={union.bn_name}>{union.bn_name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">গ্রাম</label>
              <input
                type="text"
                name="permanentVillage"
                placeholder="পাইকপাড়া"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                defaultValue={isSameAsPresent ? formData.presentVillage : formData.permanentVillage || ''}
                onChange={handlePermanentAddressChange}
                disabled={isSameAsPresent}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">অন্যান্য তথ্য </label>
              <input
                type="text"
                name="permanentOthers"
                placeholder="ঠিকানা সম্পর্কিত অন্য কোনো তথ্য "
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                defaultValue={isSameAsPresent ? formData.presentOthers : formData.permanentOthers || ''}
                onChange={handlePermanentAddressChange}
                disabled={isSameAsPresent}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="bg-gray-50 px-8 py-6 flex justify-between items-center border-t">
        <button onClick={() => setPagination(2)} className="flex items-center gap-2 px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition font-bold">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          পূর্বের ধাপে ফিরে যান
        </button>

        <button onClick={() => setPagination(4)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition transform hover:scale-105 flex items-center gap-2">
          পরবর্তী ধাপে যান
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}