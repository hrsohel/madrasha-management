import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateStudentFullDetails, updateDraftStudent } from "@/services/studentService";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import ConfirmationModal from "@/app/components/ConfirmationModal";
import { divisions, getDistrictsByDivision, getUpazilasByDistrict, getUnionsByUpazila } from '../add-student/locationData';
import { categoryData } from '../add-student/categoryFile';

// Helper to find ID by bn_name
const getIdFromBnName = (dataArray, bnName) => {
    const foundItem = dataArray.find(item => item.bn_name === bnName);
    return foundItem ? foundItem.id : '';
};

export function EditStudentModal({ isOpen, onClose, studentData, onUpdateSuccess, isDraft = false }) {
    // Initial state preparation
    const [formData, setFormData] = useState({
        student: {
            name: studentData?.name || '',
            phone: studentData?.phone || '',
            email: studentData?.email || '',
            gender: studentData?.gender || '',
            bloodGroup: studentData?.bloodGroup || '',
            dob: studentData?.dob ? new Date(studentData.dob).toISOString().split('T')[0] : '',
            nid: studentData?.nid || '',
            birthCertificate: studentData?.birthCertificate || '',
            // Academic
            uid: studentData?.uid || '',
            roll: studentData?.roll || '',
            class: studentData?.class || '',
            section: studentData?.section || '',
            shift: studentData?.shift || '',
            division: studentData?.division || '',
            session: studentData?.session || '',
            residential: studentData?.residential || '',
        },
        guardian: {
            fatherName: studentData?.guardian?.fatherName || '',
            fatherPhone: studentData?.guardian?.fatherPhone || '',
            fatherNID: studentData?.guardian?.fatherNID || '',
            motherName: studentData?.guardian?.motherName || '',
            motherPhone: studentData?.guardian?.motherPhone || '',
            motherNID: studentData?.guardian?.motherNID || '',
            guardianName: studentData?.guardian?.guardianName || '',
            guardianPhone: studentData?.guardian?.guardianPhone || '',
            guardianRelation: studentData?.guardian?.guardianRelation || '',
            guardianNID: studentData?.guardian?.guardianNID || '',
            monthlyIncome: studentData?.guardian?.monthlyIncome || '',
        },
        address: {
            presentDivision: studentData?.address?.presentDivision || '',
            presentDistrict: studentData?.address?.presentDistrict || '',
            presentUpazila: studentData?.address?.presentUpazila || '',
            presentUnion: studentData?.address?.presentUnion || '',
            presentVillage: studentData?.address?.presentVillage || '',
            presentOthers: studentData?.address?.presentOthers || '',
            permanentDivision: studentData?.address?.permanentDivision || '',
            permanentDistrict: studentData?.address?.permanentDistrict || '',
            permanentUpazila: studentData?.address?.permanentUpazila || '',
            permanentUnion: studentData?.address?.permanentUnion || '',
            permanentVillage: studentData?.address?.permanentVillage || '',
            permanentOthers: studentData?.address?.permanentOthers || '',
        },
        madrasa: {
            // Previous Madrasa
            oldMadrasaName: studentData?.admissionExamInfo?.oldMadrasaName || '',
            oldMadrasaClass: studentData?.admissionExamInfo?.oldMadrasaClass || '',
            oldMadrasaRoll: studentData?.admissionExamInfo?.oldMadrasaRoll || '',
            passingYear: studentData?.admissionExamInfo?.passingYear || '',
            result: studentData?.admissionExamInfo?.result || '', // oldMadrasaResult
            // Admission Exam
            admissionExaminer: studentData?.admissionExamInfo?.admissionExaminer || '',
            admissionResult: studentData?.admissionExamInfo?.admissionResult || '',
            notes: studentData?.admissionExamInfo?.notes || '',
            // Taliimi
            talimiGuardianName: studentData?.admissionExamInfo?.talimiGuardianName || '',
            talimiGuardianPhone: studentData?.admissionExamInfo?.talimiGuardianPhone || '',
        },
    });



    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Populate form data when studentData changes
    useEffect(() => {
        if (studentData && isOpen) {
            const getFirst = (item) => Array.isArray(item) ? item[0] : (item || {});

            const s = studentData || {};
            const g = getFirst(studentData.guardian);
            const a = getFirst(studentData.addresse);
            const m = getFirst(studentData.oldMadrasaInfo);
            const f = getFirst(studentData.fees);

            setFormData({
                student: {
                    name: s.name || '',
                    phone: s.phone || '',
                    email: s.email || '',
                    gender: s.gender || '',
                    bloodGroup: s.bloodGroup || '',
                    dob: s.dob ? new Date(s.dob).toISOString().split('T')[0] : '',
                    nid: s.nid || '',
                    birthCertificate: s.birthCertificate || '',
                    uid: s.uid || '',
                    roll: s.roll || '',
                    class: s.class || '',
                    section: s.section || '',
                    shift: s.shift || '',
                    division: s.division || '',
                    session: s.session || '',
                    residential: s.residential || '',
                },
                guardian: {
                    _id: g._id || undefined,
                    fatherName: g.fatherName || '',
                    fatherPhone: g.fatherPhone || '',
                    fatherNID: g.fatherNID || '',
                    motherName: g.motherName || '',
                    motherPhone: g.motherPhone || '',
                    motherNID: g.motherNID || '',
                    guardianName: g.guardianName || '',
                    guardianPhone: g.guardianPhone || '',
                    guardianRelation: g.guardianRelation || '',
                    guardianNID: g.guardianNID || '',
                    monthlyIncome: g.monthlyIncome || '',
                },
                address: {
                    _id: a._id || undefined,
                    presentDivision: a.presentDivision || '',
                    presentDistrict: a.presentDistrict || '',
                    presentUpazila: a.presentUpazila || '',
                    presentUnion: a.presentUnion || '',
                    presentVillage: a.presentVillage || '',
                    presentOthers: a.presentOthers || '',
                    permanentDivision: a.permanentDivision || '',
                    permanentDistrict: a.permanentDistrict || '',
                    permanentUpazila: a.permanentUpazila || '',
                    permanentUnion: a.permanentUnion || '',
                    permanentVillage: a.permanentVillage || '',
                    permanentOthers: a.permanentOthers || '',
                },
                madrasa: {
                    _id: m._id || undefined,
                    oldMadrasaName: m.oldMadrasaName || '',
                    oldMadrasaClass: m.oldMadrasaClass || '',
                    oldMadrasaRoll: m.oldMadrasaRoll || '',
                    passingYear: m.passingYear || '',
                    result: m.oldMadrasaResult || m.result || '',
                    admissionExaminer: m.admissionExaminer || '',
                    admissionResult: m.admissionResult || '',
                    notes: m.notes || '',
                    talimiGuardianName: m.talimiGuardianName || '',
                    talimiGuardianPhone: m.talimiGuardianPhone || '',
                },
                fees: {
                    _id: f._id || undefined,
                    ITFee: f.ITFee || '',
                    IDCardFee: f.IDCardFee || '',
                    LibraryFee: f.LibraryFee || '',
                    confirmationFee: f.confirmationFee || '',
                    helpType: f.helpType || '',
                    helpAmount: f.helpAmount || '',
                    amountInWords: f.amountInWords || ''
                }
            });
        }
    }, [studentData, isOpen]);

    // Helpers for dropdown options
    const getCategoryValues = (categoryName) => {
        const category = categoryData.find(c => c.category === categoryName);
        return category ? category.values : [];
    };
    const sectionOptions = getCategoryValues("সেকশন");
    const shiftOptions = getCategoryValues("শিফট");
    const residentialOptions = getCategoryValues("আবাসিক");

    const divisionToCategoryMap = {
        "নাজেরা": "নাজেরা",
        "হিফজ": "হিফজ",
        "নূরানী": "নূরানী",
        "কিতাব": "কিতাব"
    };
    const selectedCategoryName = formData.student.division ? divisionToCategoryMap[formData.student.division] : null;
    const classOptions = selectedCategoryName ? getCategoryValues(selectedCategoryName) : [];


    // Address State Management (for cascading dropdowns)
    const [presentDivisionId, setPresentDivisionId] = useState(() => getIdFromBnName(divisions, formData.address.presentDivision));
    const [presentDistrictId, setPresentDistrictId] = useState(() => getIdFromBnName(getDistrictsByDivision(getIdFromBnName(divisions, formData.address.presentDivision)), formData.address.presentDistrict));
    const [presentUpazilaId, setPresentUpazilaId] = useState(() => getIdFromBnName(getUpazilasByDistrict(getIdFromBnName(getDistrictsByDivision(getIdFromBnName(divisions, formData.address.presentDivision)), formData.address.presentDistrict)), formData.address.presentUpazila));

    const [permanentDivisionId, setPermanentDivisionId] = useState(() => getIdFromBnName(divisions, formData.address.permanentDivision));
    const [permanentDistrictId, setPermanentDistrictId] = useState(() => getIdFromBnName(getDistrictsByDivision(getIdFromBnName(divisions, formData.address.permanentDivision)), formData.address.permanentDistrict));
    const [permanentUpazilaId, setPermanentUpazilaId] = useState(() => getIdFromBnName(getUpazilasByDistrict(getIdFromBnName(getDistrictsByDivision(getIdFromBnName(divisions, formData.address.permanentDivision)), formData.address.permanentDistrict)), formData.address.permanentUpazila));

    // Get filtered data for dropdowns
    const presentDistricts = presentDivisionId ? getDistrictsByDivision(presentDivisionId) : [];
    const presentUpazilas = presentDistrictId ? getUpazilasByDistrict(presentDistrictId) : [];
    const presentUnions = presentUpazilaId ? getUnionsByUpazila(presentUpazilaId) : [];

    const permanentDistricts = permanentDivisionId ? getDistrictsByDivision(permanentDivisionId) : [];
    const permanentUpazilas = permanentDistrictId ? getUpazilasByDistrict(permanentDistrictId) : [];
    const permanentUnions = permanentUpazilaId ? getUnionsByUpazila(permanentUpazilaId) : [];


    const handleChange = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleAddressChange = (type, field, value) => {
        // type: 'present' or 'permanent', field: 'Division', 'District', etc.
        const fullFieldName = `${type}${field}`; // e.g., presentDivision

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
            const newAddress = { ...prev.address, [fullFieldName]: value };
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
            return { ...prev, address: newAddress };
        });
    };

    const handleSubmit = () => {
        setIsConfirmOpen(true);
    };

    const confirmUpdate = async () => {
        let payload;

        if (isDraft) {
            // Draft payload: Flatten student fields and use singular objects for nested sections
            payload = {
                ...formData.student,
                guardian: formData.guardian,
                addresse: formData.address, // Backend expects 'addresse' object
                oldMadrasaInfo: formData.madrasa,
                fees: formData.fees
            };
        } else {
            // Regular student payload: Nested arrays (existing logic)
            payload = {
                student: formData.student,
                guardian: [formData.guardian],
                addresse: [formData.address],
                oldMadrasaInfo: [formData.madrasa],
                fees: [formData.fees]
            };
        }

        console.log("Updating ID:", studentData._id, "isDraft:", isDraft);
        console.log("Payload:", payload);

        setLoading(true);
        try {
            if (isDraft) {
                await updateDraftStudent(studentData._id, payload);
            } else {
                await updateStudentFullDetails(studentData._id, payload);
            }

            toast.success(isDraft ? "ড্রাফট সফলভাবে আপডেট করা হয়েছে!" : "তথ্য সফলভাবে আপডেট করা হয়েছে!");
            onUpdateSuccess();
            onClose();
            setIsConfirmOpen(false);
        } catch (error) {
            console.error("Update failed:", error);
            toast.error(isDraft ? "ড্রাফট আপডেট ব্যর্থ হয়েছে।" : "আপডেট ব্যর্থ হয়েছে। দয়া করে আবার চেষ্টা করুন।");
            setIsConfirmOpen(false);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg w-full max-w-5xl max-h-[95vh] flex flex-col shadow-xl">
                    {/* Header */}
                    <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50 rounded-t-lg">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">ছাত্রের তথ্য সম্পাদনা করুন</h2>
                            <p className="text-sm text-gray-500">প্রয়োজনীয় তথ্য পরিবর্তন করে সংরক্ষণ করুন।</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition">
                            <X className="w-6 h-6 text-gray-500" />
                        </button>
                    </div>

                    {/* Content - Scrollable */}
                    <div className="flex-1 overflow-y-auto px-8 py-6 bg-white">
                        <div className="space-y-10">

                            {/* 1. Academic Info (Top Priority) */}
                            <div className="space-y-4">
                                <h3 className="font-bold text-lg text-[#2B7752] border-b pb-2">একাডেমিক তথ্য</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <InputWrapper label="আইডি (UID)" value={formData.student.uid} readOnly={true} />
                                    <SelectWrapper label="বিভাগ" value={formData.student.division} onChange={(v) => handleChange('student', 'division', v)} options={["নাজেরা", "হিফজ", "নূরানী", "কিতাব"]} />
                                    <SelectWrapper label="শ্রেণি" value={formData.student.class} onChange={(v) => handleChange('student', 'class', v)} options={classOptions} />
                                    <InputWrapper label="রোল" value={formData.student.roll} onChange={(v) => handleChange('student', 'roll', v)} />
                                    <SelectWrapper label="শাখা" value={formData.student.section} onChange={(v) => handleChange('student', 'section', v)} options={sectionOptions} />
                                    <SelectWrapper label="শিফট" value={formData.student.shift} onChange={(v) => handleChange('student', 'shift', v)} options={shiftOptions} />
                                    <SelectWrapper label="আবাসিক অবস্থা" value={formData.student.residential} onChange={(v) => handleChange('student', 'residential', v)} options={residentialOptions} />
                                    <div className="space-y-1">
                                        <label className="text-sm font-semibold text-gray-700">সেশন</label>
                                        <div className="flex items-center gap-2">
                                            <Input
                                                placeholder="২০২৪"
                                                value={formData.student.session?.split('-')[0] || ''}
                                                onChange={(e) => {
                                                    const start = e.target.value;
                                                    const end = formData.student.session?.split('-')[1] || '';
                                                    handleChange('student', 'session', [start, end].filter(Boolean).join('-'));
                                                }}
                                                className="focus-visible:ring-2 focus-visible:ring-[#2B7752] border-gray-300"
                                            />
                                            <span className="text-gray-500 font-bold">-</span>
                                            <Input
                                                placeholder="২০২৫"
                                                value={formData.student.session?.split('-')[1] || ''}
                                                onChange={(e) => {
                                                    const start = formData.student.session?.split('-')[0] || '';
                                                    const end = e.target.value;
                                                    handleChange('student', 'session', [start, end].filter(Boolean).join('-'));
                                                }}
                                                className="focus-visible:ring-2 focus-visible:ring-[#2B7752] border-gray-300"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 2. Personal Info */}
                            <div className="space-y-4">
                                <h3 className="font-bold text-lg text-[#2B7752] border-b pb-2">ব্যক্তিগত তথ্য</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputWrapper label="নাম" value={formData.student.name} onChange={(v) => handleChange('student', 'name', v)} />
                                    <InputWrapper label="মোবাইল" value={formData.student.phone} onChange={(v) => handleChange('student', 'phone', v)} />
                                    <InputWrapper label="ইমেইল" value={formData.student.email} onChange={(v) => handleChange('student', 'email', v)} />
                                    <SelectWrapper label="লিঙ্গ" value={formData.student.gender} onChange={(v) => handleChange('student', 'gender', v)} options={["Male", "Female"]} />
                                    <SelectWrapper label="রক্তের গ্রুপ" value={formData.student.bloodGroup} onChange={(v) => handleChange('student', 'bloodGroup', v)} options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]} />
                                    <InputWrapper label="জন্ম তারিখ" type="date" value={formData.student.dob} onChange={(v) => handleChange('student', 'dob', v)} />
                                    <InputWrapper label="NID" value={formData.student.nid} onChange={(v) => handleChange('student', 'nid', v)} />
                                    <InputWrapper label="জন্ম নিবন্ধন" value={formData.student.birthCertificate} onChange={(v) => handleChange('student', 'birthCertificate', v)} />
                                </div>
                            </div>

                            {/* 3. Guardian Info */}
                            <div className="space-y-4">
                                <h3 className="font-bold text-lg text-[#2B7752] border-b pb-2">অভিভাবক তথ্য</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <InputWrapper label="পিতার নাম" value={formData.guardian.fatherName} onChange={(v) => handleChange('guardian', 'fatherName', v)} />
                                    <InputWrapper label="পিতার মোবাইল" value={formData.guardian.fatherPhone} onChange={(v) => handleChange('guardian', 'fatherPhone', v)} />
                                    <InputWrapper label="পিতার NID" value={formData.guardian.fatherNID} onChange={(v) => handleChange('guardian', 'fatherNID', v)} />

                                    <InputWrapper label="মাতার নাম" value={formData.guardian.motherName} onChange={(v) => handleChange('guardian', 'motherName', v)} />
                                    <InputWrapper label="মাতার মোবাইল" value={formData.guardian.motherPhone} onChange={(v) => handleChange('guardian', 'motherPhone', v)} />
                                    <InputWrapper label="মাতার NID" value={formData.guardian.motherNID} onChange={(v) => handleChange('guardian', 'motherNID', v)} />

                                    <InputWrapper label="অভিভাবকের নাম" value={formData.guardian.guardianName} onChange={(v) => handleChange('guardian', 'guardianName', v)} />
                                    <InputWrapper label="অভিভাবকের মোবাইল" value={formData.guardian.guardianPhone} onChange={(v) => handleChange('guardian', 'guardianPhone', v)} />
                                    <SelectWrapper label="সম্পর্ক" value={formData.guardian.guardianRelation} onChange={(v) => handleChange('guardian', 'guardianRelation', v)} options={["Father", "Mother", "Other"]} />
                                    <InputWrapper label="মাসিক আয়" value={formData.guardian.monthlyIncome} onChange={(v) => handleChange('guardian', 'monthlyIncome', v)} />
                                </div>
                            </div>

                            {/* 4. Address Info */}
                            <div className="space-y-6">
                                <h3 className="font-bold text-lg text-[#2B7752] border-b pb-2">ঠিকানা</h3>

                                {/* Present Address */}
                                <div>
                                    <h4 className="font-semibold text-sm text-gray-600 mb-3">বর্তমান ঠিকানা</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <AddressSelect label="বিভাগ" value={formData.address.presentDivision} onChange={(v) => handleAddressChange('present', 'Division', v)} options={divisions.map(d => d.bn_name)} />
                                        <AddressSelect label="জেলা" value={formData.address.presentDistrict} onChange={(v) => handleAddressChange('present', 'District', v)} options={presentDistricts.map(d => d.bn_name)} disabled={!formData.address.presentDivision} />
                                        <AddressSelect label="উপজেলা/থানা" value={formData.address.presentUpazila} onChange={(v) => handleAddressChange('present', 'Upazila', v)} options={presentUpazilas.map(d => d.bn_name)} disabled={!formData.address.presentDistrict} />
                                        <AddressSelect label="ইউনিয়ন" value={formData.address.presentUnion} onChange={(v) => handleAddressChange('present', 'Union', v)} options={presentUnions.map(d => d.bn_name)} disabled={!formData.address.presentUpazila} />
                                        <InputWrapper label="গ্রাম" value={formData.address.presentVillage} onChange={(v) => handleChange('address', 'presentVillage', v)} />
                                        <InputWrapper label="অন্যান্য" value={formData.address.presentOthers} onChange={(v) => handleChange('address', 'presentOthers', v)} />
                                    </div>
                                </div>

                                {/* Permanent Address */}
                                <div>
                                    <h4 className="font-semibold text-sm text-gray-600 mb-3">স্থায়ী ঠিকানা</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <AddressSelect label="বিভাগ" value={formData.address.permanentDivision} onChange={(v) => handleAddressChange('permanent', 'Division', v)} options={divisions.map(d => d.bn_name)} />
                                        <AddressSelect label="জেলা" value={formData.address.permanentDistrict} onChange={(v) => handleAddressChange('permanent', 'District', v)} options={permanentDistricts.map(d => d.bn_name)} disabled={!formData.address.permanentDivision} />
                                        <AddressSelect label="উপজেলা/থানা" value={formData.address.permanentUpazila} onChange={(v) => handleAddressChange('permanent', 'Upazila', v)} options={permanentUpazilas.map(d => d.bn_name)} disabled={!formData.address.permanentDistrict} />
                                        <AddressSelect label="ইউনিয়ন" value={formData.address.permanentUnion} onChange={(v) => handleAddressChange('permanent', 'Union', v)} options={permanentUnions.map(d => d.bn_name)} disabled={!formData.address.permanentUpazila} />
                                        <InputWrapper label="গ্রাম" value={formData.address.permanentVillage} onChange={(v) => handleChange('address', 'permanentVillage', v)} />
                                        <InputWrapper label="অন্যান্য" value={formData.address.permanentOthers} onChange={(v) => handleChange('address', 'permanentOthers', v)} />
                                    </div>
                                </div>
                            </div>

                            {/* 5. Taliimi Murabbi */}
                            <div className="space-y-4">
                                <h3 className="font-bold text-lg text-[#2B7752] border-b pb-2">তালিমি মুরব্বি / স্থানীয় মুরব্বি</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputWrapper label="হযরতের নাম" value={formData.madrasa.talimiGuardianName} onChange={(v) => handleChange('madrasa', 'talimiGuardianName', v)} />
                                    <InputWrapper label="হযরতের মোবাইল নম্বর" value={formData.madrasa.talimiGuardianPhone} onChange={(v) => handleChange('madrasa', 'talimiGuardianPhone', v)} />
                                </div>
                            </div>

                            {/* 6. Previous Madrasa & Admission Exam */}
                            <div className="space-y-6">
                                <h3 className="font-bold text-lg text-[#2B7752] border-b pb-2">পূর্ববর্তী মাদ্রাসা ও ভর্তি পরীক্ষা</h3>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <InputWrapper label="পূর্বের মাদ্রাসার নাম" value={formData.madrasa.oldMadrasaName} onChange={(v) => handleChange('madrasa', 'oldMadrasaName', v)} />
                                    <SelectWrapper label="সর্বশেষ উত্তীর্ণ ক্লাস" value={formData.madrasa.oldMadrasaClass} onChange={(v) => handleChange('madrasa', 'oldMadrasaClass', v)} options={["Hifz Completed", "Nazera Completed"]} />
                                    <SelectWrapper label="সর্বশেষ ফলাফল" value={formData.madrasa.result} onChange={(v) => handleChange('madrasa', 'result', v)} options={["Passed", "Failed"]} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-green-50 p-4 rounded-md">
                                    <InputWrapper label="পরীক্ষকের নাম / মূল্যায়ন কারী" value={formData.madrasa.admissionExaminer} onChange={(v) => handleChange('madrasa', 'admissionExaminer', v)} />
                                    <InputWrapper label="ভর্তি পরীক্ষার ফলাফল" value={formData.madrasa.admissionResult} onChange={(v) => handleChange('madrasa', 'admissionResult', v)} />
                                    <div className="md:col-span-2">
                                        <InputWrapper label="নোটস (Notes)" value={formData.madrasa.notes} onChange={(v) => handleChange('madrasa', 'notes', v)} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t flex justify-end gap-3 rounded-b-lg bg-gray-50">
                        <Button variant="outline" onClick={onClose} disabled={loading} className="border-gray-300">বাতিল করুন</Button>
                        <Button onClick={handleSubmit} disabled={loading} className="bg-[#2B7752] hover:bg-green-800 text-white font-bold px-6">
                            {loading ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}
                        </Button>
                    </div>
                </div>
            </div>

            <ConfirmationModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={confirmUpdate}
                title="তথ্য হালনাগাদ নিশ্চিতকরণ"
                message="আপনি কি নিশ্চিত যে আপনি এই ছাত্রের তথ্য আপডেট করতে চান?"
                loading={loading}
            />
        </>
    );
}

// Sub-components for cleaner code
const InputWrapper = ({ label, value, onChange, type = "text", readOnly = false }) => (
    <div className="space-y-1">
        <label className="text-sm font-semibold text-gray-700">{label}</label>
        <Input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            readOnly={readOnly}
            className={`focus-visible:ring-2 focus-visible:ring-[#2B7752] border-gray-300 ${readOnly ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        />
    </div>
);

const SelectWrapper = ({ label, value, onChange, options = [] }) => (
    <div className="space-y-1">
        <label className="text-sm font-semibold text-gray-700">{label}</label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B7752] disabled:cursor-not-allowed disabled:opacity-50"
        >
            <option value="">নির্বাচন করুন</option>
            {options.map((opt, idx) => (
                <option key={idx} value={opt}>{opt}</option>
            ))}
        </select>
    </div>
);

const AddressSelect = ({ label, value, onChange, options = [], disabled = false }) => (
    <div className="space-y-1">
        <label className="text-sm font-semibold text-gray-700">{label}</label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className="flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B7752] disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100"
        >
            <option value="">নির্বাচন করুন</option>
            {options.map((opt, idx) => (
                <option key={idx} value={opt}>{opt}</option>
            ))}
        </select>
    </div>
);
