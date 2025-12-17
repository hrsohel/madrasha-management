"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMadrasaSettings, addOrUpdateFee, removeFee } from '@/lib/features/settings/settingsSlice';
import { Save, Loader2, Plus, Trash2, Edit } from 'lucide-react';
import toast from 'react-hot-toast';
import ConfirmationModal from '@/app/components/ConfirmationModal';

// Convert English numbers to Bangla
const toBanglaNumber = (num) => {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/\d/g, digit => banglaDigits[digit]);
};

export default function FeeManagementPage() {
  const dispatch = useDispatch();
  const { madrasaSettings, loading, error, success } = useSelector((state) => state.settings);

  // New fee form
  const [newFeeName, setNewFeeName] = useState('');
  const [newFeeAmount, setNewFeeAmount] = useState('');

  // Edit mode for fees
  const [editingFee, setEditingFee] = useState(null);
  const [editAmount, setEditAmount] = useState('');

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteFeeName, setDeleteFeeName] = useState(null);

  // Fetch madrasa settings on mount
  useEffect(() => {
    dispatch(fetchMadrasaSettings());
  }, [dispatch]);

  // Show success message temporarily
  useEffect(() => {
    if (success) {
      // toast.success('Operation successful'); // Success handled in handlers for better messages
    }
  }, [success]);

  const handleAddFee = (e) => {
    e.preventDefault();
    if (newFeeName.trim() && newFeeAmount) {
      dispatch(addOrUpdateFee({
        feeName: newFeeName.trim(),
        amount: parseInt(newFeeAmount)
      }));
      toast.success(`${newFeeName} ফি যোগ/আপডেট করা হয়েছে`);
      setNewFeeName('');
      setNewFeeAmount('');
    }
  };

  const handleUpdateFee = (feeName) => {
    if (editAmount) {
      dispatch(addOrUpdateFee({
        feeName,
        amount: parseInt(editAmount)
      }));
      toast.success(`${feeName} ফি আপডেট করা হয়েছে`);
      setEditingFee(null);
      setEditAmount('');
    }
  };

  const handleDeleteClick = (feeName) => {
    setDeleteFeeName(feeName);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (deleteFeeName) {
      dispatch(removeFee(deleteFeeName));
      toast.success(`${deleteFeeName} ফি মুছে ফেলা হয়েছে`);
      setIsConfirmOpen(false);
      setDeleteFeeName(null);
    }
  };

  const startEdit = (feeName, currentAmount) => {
    setEditingFee(feeName);
    setEditAmount(currentAmount.toString());
  };

  const cancelEdit = () => {
    setEditingFee(null);
    setEditAmount('');
  };

  const fees = madrasaSettings?.fees || {};
  const feeEntries = Object.entries(fees);
  const totalFees = Object.values(fees).reduce((sum, amount) => sum + amount, 0);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">ফি ম্যানেজমেন্ট</h1>

        {/* Success Message Removed - Handled by Toast */}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {typeof error === 'string' ? error : 'অপারেশন ব্যর্থ হয়েছে'}
          </div>
        )}

        {/* Add New Fee Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">নতুন ফি যোগ করুন</h2>
          <form onSubmit={handleAddFee} className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                ফি এর নাম
              </label>
              <input
                type="text"
                value={newFeeName}
                onChange={(e) => setNewFeeName(e.target.value)}
                placeholder="উদাহরণ: transportFee"
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                disabled={loading}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                পরিমাণ (৳)
              </label>
              <input
                type="number"
                min="0"
                value={newFeeAmount}
                onChange={(e) => setNewFeeAmount(e.target.value)}
                placeholder="পরিমাণ"
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !newFeeName.trim() || !newFeeAmount}
              className="bg-[#2B7752] hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
              যোগ করুন
            </button>
          </form>
        </div>

        {/* Existing Fees List */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">বর্তমান ফি তালিকা</h2>

          {feeEntries.length === 0 ? (
            <p className="text-gray-500 text-center py-8">কোন ফি যোগ করা হয়নি</p>
          ) : (
            <div className="space-y-3">
              {feeEntries.map(([feeName, amount]) => (
                <div key={feeName} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-bold text-gray-700">{feeName}</p>
                  </div>

                  {editingFee === feeName ? (
                    <>
                      <input
                        type="number"
                        min="0"
                        value={editAmount}
                        onChange={(e) => setEditAmount(e.target.value)}
                        className="w-32 px-3 py-2 border border-gray-300 rounded-lg"
                        autoFocus
                      />
                      <span className="text-gray-600 font-bold">৳</span>
                      <button
                        onClick={() => handleUpdateFee(feeName)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                        disabled={loading}
                      >
                        <Save className="w-4 h-4" />
                        সংরক্ষণ
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
                      >
                        বাতিল
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="text-xl font-bold text-[#2B7752] w-32 text-right">
                        {toBanglaNumber(amount)} ৳
                      </p>
                      <button
                        onClick={() => startEdit(feeName, amount)}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
                        disabled={loading}
                        title="সম্পাদনা করুন"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(feeName)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                        disabled={loading}
                        title="মুছে ফেলুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Fee Summary */}
        {feeEntries.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800">ফি সারসংক্ষেপ</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {feeEntries.map(([feeName, amount]) => (
                <div key={feeName} className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 truncate">{feeName}</p>
                  <p className="text-lg font-bold text-[#2B7752]">{toBanglaNumber(amount)} ৳</p>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-700">সর্বমোট:</span>
                <span className="text-2xl font-bold text-[#2B7752]">
                  {toBanglaNumber(totalFees)} ৳
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="ফি মুছুন"
        message={`আপনি কি নিশ্চিত আপনি এই ফি মুছে ফেলতে চান?`}
        confirmText="মুছে ফেলুন"
        cancelText="বাতিল"
      />
    </div>
  );
}