import { useState, useEffect } from "react";
import { Pencil, X } from "lucide-react";
import { updateStudentFullDetails, updateDraftStudent } from "@/services/studentService";
import { divisions, getDistrictsByDivision, getUpazilasByDistrict, getUnionsByUpazila } from "../add-student/locationData";
import toast from "react-hot-toast";
import ConfirmationModal from "@/app/components/ConfirmationModal";

// Helper to find ID by bn_name
const getIdFromBnName = (dataArray, bnName) => {
  const foundItem = dataArray.find(item => item.bn_name === bnName);
  return foundItem ? foundItem.id : '';
};

export default function AddressInfo({ address, studentId, onUpdateSuccess, isDraft = false }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSameAddress, setIsSameAddress] = useState(address?.isSameAsPresent || false);

  // Form State
  const [formData, setFormData] = useState({
    presentDivision: address?.presentDivision || "",
    presentDistrict: address?.presentDistrict || "",
    presentUpazila: address?.presentUpazila || "",
    presentUnion: address?.presentUnion || "",
    presentVillage: address?.presentVillage || "",
    presentOthers: address?.presentOthers || "",
    permanentDivision: address?.permanentDivision || "",
    permanentDistrict: address?.permanentDistrict || "",
    permanentUpazila: address?.permanentUpazila || "",
    permanentUnion: address?.permanentUnion || "",
    permanentVillage: address?.permanentVillage || "",
    permanentOthers: address?.permanentOthers || "",
  });


  // Location IDs state for cascading
  const [presentDivisionId, setPresentDivisionId] = useState("");
  const [presentDistrictId, setPresentDistrictId] = useState("");
  const [presentUpazilaId, setPresentUpazilaId] = useState("");

  const [permanentDivisionId, setPermanentDivisionId] = useState("");
  const [permanentDistrictId, setPermanentDistrictId] = useState("");
  const [permanentUpazilaId, setPermanentUpazilaId] = useState("");


  useEffect(() => {
    // Initialize form data from props
    setFormData({
      presentDivision: address?.presentDivision || "",
      presentDistrict: address?.presentDistrict || "",
      presentUpazila: address?.presentUpazila || "",
      presentUnion: address?.presentUnion || "",
      presentVillage: address?.presentVillage || "",
      presentOthers: address?.presentOthers || "",
      permanentDivision: address?.permanentDivision || "",
      permanentDistrict: address?.permanentDistrict || "",
      permanentUpazila: address?.permanentUpazila || "",
      permanentUnion: address?.permanentUnion || "",
      permanentVillage: address?.permanentVillage || "",
      permanentOthers: address?.permanentOthers || "",
    });
    setIsSameAddress(address?.isSameAsPresent || false);

    // Initialize IDs
    if (address?.presentDivision) setPresentDivisionId(getIdFromBnName(divisions, address.presentDivision));
    if (address?.permanentDivision) setPermanentDivisionId(getIdFromBnName(divisions, address.permanentDivision));
    // Note: Deep initialization of District/Upazila IDs is tricky without chaining, 
    // but the dropdowns will rely on IDs. For simplicity, we re-calculate IDs if needed or let user re-select.
    // Better to calculate them if possible.
    if (address?.presentDivision) {
      const divId = getIdFromBnName(divisions, address.presentDivision);
      setPresentDivisionId(divId);
      if (address?.presentDistrict) {
        const dists = getDistrictsByDivision(divId);
        const distId = getIdFromBnName(dists, address.presentDistrict);
        setPresentDistrictId(distId);
        if (address?.presentUpazila) {
          const upzs = getUpazilasByDistrict(distId);
          const upzId = getIdFromBnName(upzs, address.presentUpazila);
          setPresentUpazilaId(upzId);
        }
      }
    }
    if (address?.permanentDivision) {
      const divId = getIdFromBnName(divisions, address.permanentDivision);
      setPermanentDivisionId(divId);
      if (address?.permanentDistrict) {
        const dists = getDistrictsByDivision(divId);
        const distId = getIdFromBnName(dists, address.permanentDistrict);
        setPermanentDistrictId(distId);
        if (address?.permanentUpazila) {
          const upzs = getUpazilasByDistrict(distId);
          const upzId = getIdFromBnName(upzs, address.permanentUpazila);
          setPermanentUpazilaId(upzId);
        }
      }
    }

  }, [address]);


  // Derived lists
  const presentDistricts = presentDivisionId ? getDistrictsByDivision(presentDivisionId) : [];
  const presentUpazilas = presentDistrictId ? getUpazilasByDistrict(presentDistrictId) : [];
  const presentUnions = presentUpazilaId ? getUnionsByUpazila(presentUpazilaId) : [];

  const permanentDistricts = permanentDivisionId ? getDistrictsByDivision(permanentDivisionId) : [];
  const permanentUpazilas = permanentDistrictId ? getUpazilasByDistrict(permanentDistrictId) : [];
  const permanentUnions = permanentUpazilaId ? getUnionsByUpazila(permanentUpazilaId) : [];


  const handleAddressChange = (type, field, value) => {
    // type: 'present' or 'permanent', field: 'Division', 'District', etc.
    const fullFieldName = `${type}${field}`;

    let selectedId = '';
    if (field === 'Division') selectedId = getIdFromBnName(divisions, value);
    else if (field === 'District') selectedId = getIdFromBnName(getDistrictsByDivision(type === 'present' ? presentDivisionId : permanentDivisionId), value);
    else if (field === 'Upazila') selectedId = getIdFromBnName(getUpazilasByDistrict(type === 'present' ? presentDistrictId : permanentDistrictId), value);


    if (type === 'present') {
      if (field === 'Division') { setPresentDivisionId(selectedId); setPresentDistrictId(''); setPresentUpazilaId(''); }
      else if (field === 'District') { setPresentDistrictId(selectedId); setPresentUpazilaId(''); }
      else if (field === 'Upazila') { setPresentUpazilaId(selectedId); }
    } else {
      if (field === 'Division') { setPermanentDivisionId(selectedId); setPermanentDistrictId(''); setPermanentUpazilaId(''); }
      else if (field === 'District') { setPermanentDistrictId(selectedId); setPermanentUpazilaId(''); }
      else if (field === 'Upazila') { setPermanentUpazilaId(selectedId); }
    }

    // Update Form Data
    setFormData(prev => {
      const newAddress = { ...prev, [fullFieldName]: value };
      // Reset children
      if (field === 'Division') {
        newAddress[`${type}District`] = '';
        newAddress[`${type}Upazila`] = '';
        newAddress[`${type}Union`] = '';
      } else if (field === 'District') {
        newAddress[`${type}Upazila`] = '';
        newAddress[`${type}Union`] = '';
      } else if (field === 'Upazila') {
        newAddress[`${type}Union`] = '';
      }
      return newAddress;
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsConfirmOpen(true);
  };

  const confirmUpdate = async () => {
    setLoading(true);
    try {
      const addressData = {
        ...formData,
        isSameAsPresent: isSameAddress
      };

      if (isDraft) {
        // For drafts, send as a singular object 'addresse' at root
        await updateDraftStudent(studentId, { addresse: addressData });
      } else {
        // For active students, send as an array 'addresse'
        await updateStudentFullDetails(studentId, { addresse: [addressData] });
      }

      toast.success("ঠিকানা সফলভাবে আপডেট করা হয়েছে!");
      if (onUpdateSuccess) onUpdateSuccess();
      setIsModalOpen(false);
      setIsConfirmOpen(false);
    } catch (error) {
      console.error("Address update failed:", error);
      toast.error("আপডেট ব্যর্থ হয়েছে।");
      setIsConfirmOpen(false);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      <div className=" mx-auto mt-10">
        {/* Main Content */}
        <div className="bg-[#F7F7F7] rounded-lg shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-dashed border-gray-300 px-6 py-4">
            <h1 className="text-xl font-semibold text-[#246545]">ঠিকানা</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center text-[#2B7752] font-semi-bold gap-2 px-4 py-[6px] border-[1px] bg-[#E7FEF2] border-[#2B7752] rounded-md hover:bg-[#E7FEF2] transition-colors"
            >
              <Pencil className="w-4 h-4" />
              <span>Edit</span>
            </button>
          </div>

          <div className="p-6">
            {/* বর্তমান ঠিকানা */}
            <div className="mb-8 pb-6 border-b border-gray-200">
              <h3 className="text-base font-semibold text-[#63736C] mb-4">
                বর্তমান ঠিকানা
              </h3>
              <div className="grid grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-[#63736C] font-semibold mb-1">গ্রাম</p>
                  <p className="text-sm text-[#424D47] font-semibold">
                    {formData.presentVillage}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#63736C] font-semibold mb-1">উপজেলা/থানা</p>
                  <p className="text-sm text-[#424D47] font-semibold ">
                    {formData.presentUpazila}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#63736C] font-semibold mb-1">জেলা</p>
                  <p className="text-sm text-[#424D47] font-semibold">
                    {formData.presentDistrict}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#63736C] font-semibold mb-1">বিভাগ</p>
                  <p className="text-sm text-[#424D47] font-semibold">
                    {formData.presentDivision}
                  </p>
                </div>
              </div>
            </div>

            {/* স্থায়ী ঠিকানা */}
            <div>
              <h3 className="text-base font-semibold text-[#63736C] mb-4">
                স্থায়ী ঠিকানা
              </h3>
              <div className="grid grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-[#63736C] font-semibold mb-1">গ্রাম</p>
                  <p className="text-sm text-[#424D47] font-semibold">
                    {formData.permanentVillage}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#63736C] font-semibold mb-1">উপজেলা/থানা</p>
                  <p className="text-sm text-[#424D47] font-semibold">
                    {formData.permanentUpazila}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#63736C] font-semibold mb-1">জেলা</p>
                  <p className="text-sm text-[#424D47] font-semibold">
                    {formData.permanentDistrict}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#63736C] font-semibold mb-1">বিভাগ</p>
                  <p className="text-sm text-[#424D47] font-semibold">
                    {formData.permanentDivision}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-semibold text-[#246545]">ঠিকানা সম্পাদনা</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8">
              {/* বর্তমান ঠিকানা Section */}
              <div className="mb-6 pb-6 border-b border-dashed border-gray-300">
                <h3 className="text-base font-semibold text-gray-700 mb-4">
                  বর্তমান ঠিকানা
                </h3>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">বিভাগ</label>
                    <select
                      value={formData.presentDivision}
                      onChange={(e) => handleAddressChange('present', 'Division', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">নির্বাচন করুন</option>
                      {divisions.map((div, i) => <option key={i} value={div.bn_name}>{div.bn_name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">জেলা</label>
                    <select
                      value={formData.presentDistrict}
                      onChange={(e) => handleAddressChange('present', 'District', e.target.value)}
                      disabled={!formData.presentDivision}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                    >
                      <option value="">নির্বাচন করুন</option>
                      {presentDistricts.map((d, i) => <option key={i} value={d.bn_name}>{d.bn_name}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">উপজেলা/থানা</label>
                    <select
                      value={formData.presentUpazila}
                      onChange={(e) => handleAddressChange('present', 'Upazila', e.target.value)}
                      disabled={!formData.presentDistrict}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                    >
                      <option value="">নির্বাচন করুন</option>
                      {presentUpazilas.map((u, i) => <option key={i} value={u.bn_name}>{u.bn_name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">ইউনিয়ন</label>
                    <select
                      value={formData.presentUnion}
                      onChange={(e) => handleAddressChange('present', 'Union', e.target.value)}
                      disabled={!formData.presentUpazila}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                    >
                      <option value="">নির্বাচন করুন</option>
                      {presentUnions.map((u, i) => <option key={i} value={u.bn_name}>{u.bn_name}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">গ্রাম</label>
                    <input
                      type="text"
                      value={formData.presentVillage}
                      onChange={(e) => handleInputChange('presentVillage', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">অন্যান্য তথ্য</label>
                    <input
                      type="text"
                      value={formData.presentOthers}
                      onChange={(e) => handleInputChange('presentOthers', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>

              {/* স্থায়ী ঠিকানা Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="checkbox"
                    id="sameAddress"
                    checked={isSameAddress}
                    onChange={(e) => setIsSameAddress(e.target.checked)}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label htmlFor="sameAddress" className="text-sm text-gray-700">বর্তমান ঠিকানার মতো</label>
                </div>

                {!isSameAddress && (
                  <>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">বিভাগ</label>
                        <select
                          value={formData.permanentDivision}
                          onChange={(e) => handleAddressChange('permanent', 'Division', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                          <option value="">নির্বাচন করুন</option>
                          {divisions.map((div, i) => <option key={i} value={div.bn_name}>{div.bn_name}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">জেলা</label>
                        <select
                          value={formData.permanentDistrict}
                          onChange={(e) => handleAddressChange('permanent', 'District', e.target.value)}
                          disabled={!formData.permanentDivision}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                        >
                          <option value="">নির্বাচন করুন</option>
                          {permanentDistricts.map((d, i) => <option key={i} value={d.bn_name}>{d.bn_name}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">উপজেলা/থানা</label>
                        <select
                          value={formData.permanentUpazila}
                          onChange={(e) => handleAddressChange('permanent', 'Upazila', e.target.value)}
                          disabled={!formData.permanentDistrict}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                        >
                          <option value="">নির্বাচন করুন</option>
                          {permanentUpazilas.map((u, i) => <option key={i} value={u.bn_name}>{u.bn_name}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">ইউনিয়ন</label>
                        <select
                          value={formData.permanentUnion}
                          onChange={(e) => handleAddressChange('permanent', 'Union', e.target.value)}
                          disabled={!formData.permanentUpazila}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                        >
                          <option value="">নির্বাচন করুন</option>
                          {permanentUnions.map((u, i) => <option key={i} value={u.bn_name}>{u.bn_name}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">গ্রাম</label>
                        <input
                          type="text"
                          value={formData.permanentVillage}
                          onChange={(e) => handleInputChange('permanentVillage', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">অন্যান্য তথ্য</label>
                        <input
                          type="text"
                          value={formData.permanentOthers}
                          onChange={(e) => handleInputChange('permanentOthers', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Note */}
              <p className="text-xs text-gray-600 mt-6 mb-4">
                আপডেটকৃত তথ্য সংরক্ষন করলে 'সেভ করুন' বাটনে ক্লিক করুন অথবা 'ক্যানসেল করুন'
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button onClick={handleSave} disabled={loading} className="px-6 py-2 bg-[#246545] text-white rounded-md hover:bg-green-700 transition-colors shadow">
                  {loading ? 'সংরক্ষণ হচ্ছে...' : 'সেভ করুন'}
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  ক্যানসেল করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmUpdate}
        title="ঠিকানা হালনাগাদ নিশ্চিতকরণ"
        message="আপনি কি নিশ্চিত যে আপনি এই ঠিকানা আপডেট করতে চান?"
        loading={loading}
      />
    </div>
  );
}
