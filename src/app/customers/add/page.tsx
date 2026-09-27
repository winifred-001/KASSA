"use client";
 
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, Loader2, CheckCircle2, X } from "lucide-react";
import KassaSidebar from "@/components/KassaSidebar";
 
export default function AddCustomerPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Branch selected from the dashboard
        const [selectedBranch, setSelectedBranch] = useState("Main branch");
      
        // Get the selected branch from the dashboard
        useEffect(() => {
          const savedBranch = localStorage.getItem("selectedBranch");
      
          if (savedBranch) {
            setSelectedBranch(savedBranch);
          }
        }, []);
      
        // Listen for branch changes
        useEffect(() => {
          const handleBranchChange = () => {
            const savedBranch = localStorage.getItem("selectedBranch");
      
            if (savedBranch) {
              setSelectedBranch(savedBranch);
            }
          };
      
          window.addEventListener("storage", handleBranchChange);
      
          return () => {
            window.removeEventListener("storage", handleBranchChange);
          };
        }, []);
  
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    customerType: "Regular customer",
    address: "",
    notes: "",
  });
 
  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };
 
  const handleSave = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // remove once real API is wired up
 
    setSaving(false);
    setShowToast(true);
 
    setTimeout(() => {
      router.push("/customers?added=true");
    }, 1200);
  };
 
  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50">
      <KassaSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
 
      <div className="lg:ml-[198px]">
        {/* Header */}
        <header className="flex h-[80px] items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="shrink-0 rounded-md p-1.5 text-gray-600 transition hover:bg-gray-100 lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Add Customer</h1>
          </div>
 
          <div className="flex items-center gap-3 sm:gap-4">
            <button className="hidden sm:flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-700">
              Main branch
              <span className="text-gray-400">▾</span>
            </button>
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-800">
              AO
            </div>
          </div>
        </header>
 
        <main className="p-4 sm:p-6 lg:p-8">
          <p className="text-gray-500 mb-6 text-sm sm:text-base">
            Create a customer record to keep their information and purchase history organised.
          </p>
 
          <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-8 max-w-4xl">
            <h2 className="text-lg font-bold text-emerald-800 mb-1">Customer information</h2>
            <p className="text-sm text-gray-500 mb-6">Fields marked with * are required.</p>
 
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-8">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Full name <span className="text-red-500">*</span>
                </label>
                <input
                  value={form.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  placeholder="Enter customer's full name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Phone number <span className="text-red-500">*</span>
                </label>
                <input
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Email address
                </label>
                <input
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="Enter email address"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Customer type
                </label>
                <select
                  value={form.customerType}
                  onChange={(e) => handleChange("customerType", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  <option>Regular customer</option>
                  <option>Wholesale customer</option>
                  <option>Corporate account</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Address
                </label>
                <textarea
                  value={form.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  placeholder="Enter customer's address"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 resize-none"
                />
              </div>
            </div>
 
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-base font-bold text-emerald-800 mb-1">Optional details</h3>
              <p className="text-sm text-gray-500 mb-4">
                Add more information if it will help you serve this customer better.
              </p>
 
              <label className="block text-sm font-semibold text-gray-800 mb-2">Notes</label>
              <textarea
                value={form.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                placeholder="Add a note about this customer"
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 resize-none"
              />
            </div>
 
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-8">
              <button
                type="button"
                onClick={() => router.push("/customers")}
                className="px-6 py-3 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-3 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {saving && <Loader2 size={14} className="animate-spin" />}
                {saving ? "Saving..." : "Save Customer"}
              </button>
            </div>
          </div>
        </main>
 
        <footer className="pb-8 text-center text-xs text-gray-400">
          Kassa • Secure Payment
        </footer>
      </div>
 
      {showToast && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:w-auto flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-lg z-[60]">
          <CheckCircle2 className="text-emerald-700" size={20} />
          <div>
            <p className="text-[13px] font-semibold text-gray-900">
              Customer added successfully
            </p>
            <p className="text-[12px] text-gray-500">
              The customer record has been saved.
            </p>
          </div>
          <button onClick={() => setShowToast(false)}>
            <X size={14} className="text-gray-400" />
          </button>
        </div>
      )}
    </div>
  );
}
 