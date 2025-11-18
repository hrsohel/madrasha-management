"use client"
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ClientOnly from "@/app/components/ClientOnly";
import { useReactToPrint } from "react-to-print";

const FeeManagement = () => {
  const initialState = {
    studentName: "",
    feeType: "",
    feeAmount: 0,
    discount: 0,
    fine: 0,
    totalAmount: 0,
    paidAmount: 0,
    dueAmount: 0,
    date: "",
    status: "",
    paymentMethod: "",
    transactionId: "",
    receivedBy: "",
    notes: "",
  };

  const [formState, setFormState] = useState(initialState);
  const componentRef = useRef();

  useEffect(() => {
    const { feeAmount, discount, fine, paidAmount } = formState;
    const calculatedTotal = feeAmount - discount + fine;
    const calculatedDue = calculatedTotal - paidAmount;
    setFormState(prevState => ({
      ...prevState,
      totalAmount: calculatedTotal,
      dueAmount: calculatedDue,
    }));
  }, [formState.feeAmount, formState.discount, formState.fine, formState.paidAmount]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormState(prevState => ({ ...prevState, [id]: value }));
  };

  const handleSelectChange = (id, value) => {
    setFormState(prevState => ({ ...prevState, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
  };

  const handleReset = () => {
    setFormState(initialState);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div ref={componentRef} className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6">Fee Management</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-2">
              Student Name
            </label>
            <Input
              type="text"
              id="studentName"
              placeholder="Enter student name"
              value={formState.studentName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="feeType" className="block text-sm font-medium text-gray-700 mb-2">
              Fee Type
            </label>
            <ClientOnly>
              <Select onValueChange={(value) => handleSelectChange("feeType", value)} value={formState.feeType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select fee type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly Fee</SelectItem>
                  <SelectItem value="yearly">Yearly Fee</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </ClientOnly>
          </div>
          <div className="mb-4">
            <label htmlFor="feeAmount" className="block text-sm font-medium text-gray-700 mb-2">
              Fee Amount
            </label>
            <Input
              type="number"
              id="feeAmount"
              placeholder="Enter fee amount"
              value={formState.feeAmount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-2">
              Discount
            </label>
            <Input
              type="number"
              id="discount"
              placeholder="Enter discount amount"
              value={formState.discount}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fine" className="block text-sm font-medium text-gray-700 mb-2">
              Fine
            </label>
            <Input
              type="number"
              id="fine"
              placeholder="Enter fine amount"
              value={formState.fine}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700 mb-2">
              Total Amount
            </label>
            <Input
              type="number"
              id="totalAmount"
              placeholder="Total amount"
              value={formState.totalAmount}
              disabled
            />
          </div>
          <div className="mb-4">
            <label htmlFor="paidAmount" className="block text-sm font-medium text-gray-700 mb-2">
              Paid Amount
            </label>
            <Input
              type="number"
              id="paidAmount"
              placeholder="Enter paid amount"
              value={formState.paidAmount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="dueAmount" className="block text-sm font-medium text-gray-700 mb-2">
              Due Amount
            </label>
            <Input
              type="number"
              id="dueAmount"
              placeholder="Due amount"
              value={formState.dueAmount}
              disabled
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <Input
              type="date"
              id="date"
              value={formState.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <ClientOnly>
              <Select onValueChange={(value) => handleSelectChange("status", value)} value={formState.status} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </ClientOnly>
          </div>
          <div className="mb-4">
            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <ClientOnly>
              <Select onValueChange={(value) => handleSelectChange("paymentMethod", value)} value={formState.paymentMethod} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="bank">Bank</SelectItem>
                  <SelectItem value="mobile_banking">Mobile Banking</SelectItem>
                </SelectContent>
              </Select>
            </ClientOnly>
          </div>
          {formState.paymentMethod && formState.paymentMethod !== 'cash' && (
            <div className="mb-4">
              <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700 mb-2">
                Transaction ID
              </label>
              <Input
                type="text"
                id="transactionId"
                placeholder="Enter transaction ID"
                value={formState.transactionId}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="receivedBy" className="block text-sm font-medium text-gray-700 mb-2">
              Received By
            </label>
            <Input
              type="text"
              id="receivedBy"
              placeholder="Enter receiver's name"
              value={formState.receivedBy}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              id="notes"
              rows="4"
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Enter any notes here..."
              value={formState.notes}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="flex gap-4 no-print">
            <Button type="submit">Submit</Button>
            <Button type="button" variant="outline" onClick={handleReset}>
              Reset
            </Button>
            <Button type="button" variant="outline" onClick={handlePrint}>
              Print
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeeManagement;