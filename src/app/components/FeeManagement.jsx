"use client";
import { useState } from "react";
import {
  DollarSign,
  User,
  Calendar,
  Check,
  X,
  Printer,
  Mail,
  Search,
  ChevronDown,
  Download,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FeeManagement = () => {
  const [activeTab, setActiveTab] = useState("collected");

  const feesData = {
    collected: [
      {
        id: 1,
        student: "Alice",
        amount: 500,
        month: "January",
        status: "Paid",
        receipt: "R001",
      },
      {
        id: 2,
        student: "Bob",
        amount: 500,
        month: "January",
        status: "Paid",
        receipt: "R002",
      },
    ],
    pending: [
      {
        id: 3,
        student: "Charlie",
        amount: 500,
        month: "January",
        status: "Unpaid",
      },
      {
        id: 4,
        student: "David",
        amount: 500,
        month: "January",
        status: "Unpaid",
      },
    ],
    defaulters: [
      {
        id: 5,
        student: "Eve",
        amount: 1000,
        month: "December, January",
        status: "Unpaid",
      },
    ],
  };

  const renderFeeRow = (fee) => (
    <tr key={fee.id} className="border-b">
      <td className="p-4">
        <input type="checkbox" />
      </td>
      <td className="p-4">{fee.student}</td>
      <td className="p-4">{fee.amount}</td>
      <td className="p-4">{fee.month}</td>
      <td className="p-4">
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            fee.status === "Paid"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {fee.status}
        </span>
      </td>
      <td className="p-4">
        {fee.receipt && (
          <Button variant="ghost" size="sm">
            <Printer className="w-4 h-4 mr-2" />
            {fee.receipt}
          </Button>
        )}
      </td>
      <td className="p-4">
        {fee.status === "Unpaid" && (
          <Button variant="ghost" size="sm">
            <Mail className="w-4 h-4 mr-2" /> Reminder
          </Button>
        )}
        {fee.status === "Paid" && <Button variant="ghost" size="sm">View</Button>}
      </td>
    </tr>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Fee Management</h1>

      <div className="flex mb-6">
        <Button
          onClick={() => setActiveTab("collected")}
          variant={activeTab === "collected" ? "solid" : "outline"}
          className="mr-2"
        >
          Collected Fees
        </Button>
        <Button
          onClick={() => setActiveTab("pending")}
          variant={activeTab === "pending" ? "solid" : "outline"}
          className="mr-2"
        >
          Pending Fees
        </Button>
        <Button
          onClick={() => setActiveTab("defaulters")}
          variant={activeTab === "defaulters" ? "solid" : "outline"}
        >
          Defaulters
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Input placeholder="Search by name" className="w-64" />
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="january">January</SelectItem>
                <SelectItem value="february">February</SelectItem>
                <SelectItem value="march">March</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost">
              <Search className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" /> Import
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" /> Export
            </Button>
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">
                <input type="checkbox" />
              </th>
              <th className="p-4 text-left">Student</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Month</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Receipt</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>{feesData[activeTab].map(renderFeeRow)}</tbody>
        </table>

        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-600">
            Showing 1 to {feesData[activeTab].length} of{" "}
            {feesData[activeTab].length} entries
          </div>
          <div className="flex space-x-1">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              1
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeManagement;
