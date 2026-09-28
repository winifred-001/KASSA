"use client";
 
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, ChevronDown, Download, MoreHorizontal, Plus, CheckCircle2, X, Menu,Bell } from "lucide-react";
import Link from "next/link";
import KassaSidebar from "@/components/KassaSidebar";
 
type Customer = {
  name: string;
  phone: string;
  email: string;
  purchases: number;
  lastPurchase: string;
  status: "Active" | "Inactive";
};
 
const customers: Customer[] = [
  { name: "Mary Adeyemi", phone: "0803 421 7782", email: "mary.adeyemi@email.com", purchases: 24, lastPurchase: "Today, 9:14 AM", status: "Active" },
  { name: "Chuka Nwosu", phone: "0814 552 1093", email: "chuka.nwosu@email.com", purchases: 17, lastPurchase: "Yesterday, 4:26 PM", status: "Active" },
  { name: "Grace Umeh", phone: "0806 218 4501", email: "grace.umeh@email.com", purchases: 12, lastPurchase: "Aug 18, 11:52 AM", status: "Active" },
];
 
function CustomersPageContent() {
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState("All Customers");
  const [selectedbranches, setSelectedbranches] = useState("All Branches");
  const [selectedNewestfirst, setSelectedNewestfirst] = useState("Newest first");
 
  useEffect(() => {
    if (searchParams.get("added") === "true") {
      setShowToast(true);
      router.replace("/customers");
    }
  }, [searchParams, router]);
  6
  useEffect(() => {
    if (!showToast) return;
    const timer = setTimeout(() => setShowToast(false), 4000);
    return () => clearTimeout(timer);
  }, [showToast]);
 
  const filtered = customers.filter((c) =>
    `${c.name} ${c.phone} ${c.email}`.toLowerCase().includes(query.toLowerCase())
  );
  const [selectedBranch, setSelectedBranch] = useState("Main branch");

// Get the selected branch from localStorage
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

  window.addEventListener("branchChanged", handleBranchChange);

  return () => {
    window.removeEventListener("branchChanged", handleBranchChange);
  };
}, []);

  function FilterDropdown({
    selected,
    options,
    onSelect,
  }: {
    selected: string;
    options: string[];
    onSelect: (value: string) => void;
  }) {
    const [open, setOpen] = useState(false);
   
    return (
      <div className="relative shrink-0">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-1 whitespace-nowrap rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50"
        >
          {selected}
          <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
   
        {open && (
          <div className="absolute left-0 top-full z-50 mt-2 w-48 rounded-lg border border-gray-200 bg-white p-1 shadow-lg">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onSelect(option);
                  setOpen(false);
                }}
                className="w-full rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50">
      <KassaSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
 
      <main className="min-h-screen lg:ml-[198px]">
         {/* Header */}
                <header className="flex min-h-[80px] items-center justify-between gap-4 border-b border-[#E5E7EB] bg-white px-4 py-4 sm:px-6 lg:px-8">
                  <div className="flex min-w-0 items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSidebarOpen(true)}
                      className="shrink-0 rounded-md p-1.5 text-[#374151] transition hover:bg-[#F3F4F6] lg:hidden"
                      aria-label="Open menu"
                    >
                      <Menu size={22} />
                    </button>
        
                    <h1 className="truncate text-[18px] font-bold text-[#182033] sm:text-[20px] lg:text-[21px]">
                      Customers
                    </h1>
                  </div>
        
                  <div className="flex shrink-0 items-center gap-3 sm:gap-5">
                    {/* Branch display - no dropdown */}
                    <div className="hidden w-[130px] sm:block sm:w-[150px] lg:w-[162px]">
                      <div className="flex h-[34px] w-full items-center justify-between rounded-[9px] border border-[#D8DCE3] bg-white px-3 text-[12px] text-[#374151] sm:text-[13px]">
                        <span className="truncate">{selectedBranch}</span>
                      </div>
                    </div>
                    <button className="relative flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#F8F9FA]">
                      <Bell size={17} className="text-[#98A1AE]" />
        
                      <span className="absolute right-[8px] top-[6px] h-[7px] w-[7px] rounded-full bg-[#E54848]" />
                    </button>
        
                    <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#E5F5F0] text-[12px] font-semibold text-[#08745F]">
                      AO
                    </div>
                  </div>
                </header>
       
 
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 mt-2 px-8 mt-4">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">Manage customers</h2>
            <p className="text-gray-500 text-sm sm:text-base">View, search and manage your customer records.</p>
          </div>
          <Link
            href="/customers/add"
            className="flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shrink-0"
          >
            <Plus size={16} />
            Add customer
          </Link>
        </div>
 
        {/* Summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 px-8">
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
            <p className="text-sm text-gray-500 mb-2">Total customers</p>
            <div className="flex items-baseline gap-2 flex-wrap">
              <p className="text-xl sm:text-2xl font-semibold text-gray-900">1,248</p>
              <span className="text-xs text-emerald-600">↑ 8.4% this month</span>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
            <p className="text-sm text-gray-500 mb-2">Active customers</p>
            <div className="flex items-baseline gap-2 flex-wrap">
              <p className="text-xl sm:text-2xl font-semibold text-gray-900">936</p>
              <span className="text-xs text-gray-400">75% of total records</span>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
            <p className="text-sm text-gray-500 mb-2">New this month</p>
            <div className="flex items-baseline gap-2 flex-wrap">
              <p className="text-xl sm:text-2xl font-semibold text-gray-900">86</p>
              <span className="text-xs text-emerald-600">↑ 14 from last month</span>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
            <p className="text-sm text-gray-500 mb-2">Customers with purchases</p>
            <div className="flex items-baseline gap-2 flex-wrap">
              <p className="text-xl sm:text-2xl font-semibold text-gray-900">782</p>
              <span className="text-xs text-gray-400">Last 30 days</span>
            </div>
          </div>
        </div>
 
        {/* Search + filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4 px-8">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, phone or email"
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>
             
          <div className="-mx-4 flex items-center gap-3 overflow-visible px-4 sm:mx-0 sm:px-0">
            <FilterDropdown
                selected={selectedCustomers}
                options={["All Customers", "VIP", "Regular", "New"]}
                onSelect={setSelectedCustomers}
              />

              <FilterDropdown
                selected={selectedbranches}
                options={["All Branches", "Main branch", "Branch 1", "Branch 2"]}
                onSelect={setSelectedbranches}
              />

              <FilterDropdown
                selected={selectedNewestfirst}
                options={["Last 7 days", "Last 30 days", "This month", "This year"]}
                onSelect={setSelectedNewestfirst}
              />
            <button className="flex shrink-0 items-center gap-2 px-4 py-2.5 text-sm text-emerald-700 font-medium hover:text-emerald-800">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>
 
        {/* Customers table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto mx-8">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs text-gray-500 uppercase tracking-wide">
                <th className="px-6 py-4 font-medium whitespace-nowrap">Customer</th>
                <th className="px-6 py-4 font-medium whitespace-nowrap">Phone</th>
                <th className="px-6 py-4 font-medium whitespace-nowrap">Email</th>
                <th className="px-6 py-4 font-medium whitespace-nowrap">Purchases</th>
                <th className="px-6 py-4 font-medium whitespace-nowrap">Last Purchase</th>
                <th className="px-6 py-4 font-medium whitespace-nowrap">Status</th>
                <th className="px-6 py-4 font-medium whitespace-nowrap"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.email} className="border-b border-gray-50 last:border-0">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{c.name}</td>
                  <td className="px-6 py-4 text-gray-700 whitespace-nowrap">{c.phone}</td>
                  <td className="px-6 py-4 text-gray-700 whitespace-nowrap">{c.email}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{c.purchases}</td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{c.lastPurchase}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
 
      {showToast && (
        <div className="fixed bottom-6 right-6 flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-white px-5 py-4 shadow-lg">
          <CheckCircle2 className="text-[#0F4C3A]" size={20} />
          <div>
            <p className="text-[13px] font-semibold text-[#182033]">
              Customer added successfully
            </p>
            <p className="text-[12px] text-[#98A1AE]">
              The customer record has been saved.
            </p>
          </div>
          <button onClick={() => setShowToast(false)}>
            <X size={14} className="text-[#98A1AE]" />
          </button>
        </div>
      )}
    </div>
  );
}
 
export default function CustomersPage() {
  return (
    <Suspense fallback={null}>
      <CustomersPageContent />
    </Suspense>
  );
}
 