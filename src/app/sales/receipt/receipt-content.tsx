"use client";

import { useState,useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Wifi, MessageSquare, Mail, Download, Printer, Bell,Menu } from "lucide-react";
import KassaSidebar from "@/components/KassaSidebar";

const receiptItems = [
  { name: "Paracetamol 500mg", qty: 2, amount: 1700 },
  { name: "Amoxicillin 250mg", qty: 1, amount: 2100 },
  { name: "Vitamin C 1000mg", qty: 1, amount: 1500 },
  { name: "Blood pressure monitor", qty: 1, amount: 18500 },
  { name: "Nitrile gloves (box)", qty: 1, amount: 700 },
];

export default function ReceiptContent() {
  const router = useRouter();
  const params = useSearchParams();
  const total = Number(params.get("total") ?? 24500);
  const method = params.get("method") ?? "Transfer";

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

  const methodLabel: Record<string, string> = {
    Transfer: "Bank transfer",
    POS: "POS",
    Cash: "Cash",
    "USSD / Card": "USSD / Card",
  };

  const subtotal = receiptItems.reduce((sum, i) => sum + i.amount, 0);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <KassaSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="lg:ml-[198px] ">
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
                Receipt
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
        <button
          onClick={() => router.push(`/sales/success?total=${total}&method=${method}`)}
          className="text-sm text-emerald-700 font-medium mb-4 mt-4 px-8"
        >
          ← Back to payment summary
        </button>

        {/* Stepper */}
        <div className="flex items-center justify-center gap-3 mb-8 max-w-md mx-auto px-8">
          {["Sale", "Payment", "Receipt"].map((step, i) => (
            <div key={step} className="flex items-center flex-1">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold bg-emerald-700 text-white">
                ✓
              </div>
              {i < 2 && <div className="flex-1 h-0.5 mx-2 bg-emerald-700" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-4xl px-8">
          {/* Receipt */}
          <div className="col-span-2 bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 font-semibold flex items-center justify-center mb-2">
                AP
              </div>
              <h2 className="font-semibold text-gray-900">Adebola Pharmacy</h2>
              <p className="text-xs text-gray-400">Main branch — Wuse II, Abuja</p>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-5 border-b border-gray-100 pb-5">
              <span className="text-gray-500">Receipt no.</span>
              <span className="text-right font-medium text-gray-900">HFA-00214738</span>
              <span className="text-gray-500">Date & time</span>
              <span className="text-right font-medium text-gray-900">19 Aug 2026, 10:42 AM</span>
              <span className="text-gray-500">Served by</span>
              <span className="text-right font-medium text-gray-900">Ifeoma Bassey</span>
              <span className="text-gray-500">Customer</span>
              <span className="text-right font-medium text-gray-900">Walk-in customer</span>
            </div>

            <table className="w-full text-sm mb-5">
              <thead>
                <tr className="text-left text-xs text-gray-500 uppercase tracking-wide">
                  <th className="pb-2 font-medium">Item</th>
                  <th className="pb-2 font-medium text-center">Qty</th>
                  <th className="pb-2 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {receiptItems.map((item) => (
                  <tr key={item.name} className="border-t border-gray-50">
                    <td className="py-2 text-gray-900">{item.name}</td>
                    <td className="py-2 text-center text-gray-700">{item.qty}</td>
                    <td className="py-2 text-right font-medium text-gray-900">
                      ₦{item.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="border-t border-gray-100 pt-4 space-y-1.5 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-gray-900">₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Discount</span>
                <span className="text-gray-900">₦0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Payment method</span>
                <span className="text-gray-900">{methodLabel[method] ?? method}</span>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-gray-100 pt-4">
              <span className="font-semibold text-gray-900">Total paid</span>
              <span className="text-xl font-bold text-emerald-700">
                ₦{total.toLocaleString()}.00
              </span>
            </div>
          </div>

          {/* Share receipt */}
          <div className="space-y-4 ">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Share receipt</h3>

              <button className="w-full flex items-center gap-2 justify-center bg-emerald-700 hover:bg-emerald-800 text-white py-2.5 rounded-lg text-sm font-medium transition-colors mb-3">
                <Wifi size={16} />
                Send via WhatsApp
              </button>
              <button className="w-full flex items-center gap-2 justify-center border border-gray-200 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 mb-3">
                <MessageSquare size={16} />
                Send via SMS
              </button>
              <button className="w-full flex items-center gap-2 justify-center border border-gray-200 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 mb-4">
                <Mail size={16} />
                Email receipt
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center gap-2 justify-center border border-gray-200 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <Download size={16} />
                  Download PDF
                </button>
                <button className="flex items-center gap-2 justify-center border border-gray-200 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <Printer size={16} />
                  Print
                </button>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5">
              <p className="text-sm font-semibold text-emerald-800 mb-1">
                Ready for the next customer?
              </p>
              <p className="text-sm text-emerald-700 mb-4">
                This sale is fully reconciled and saved to your transaction history.
              </p>
              <button
                onClick={() => router.push("/sales/new")}
                className="w-full bg-emerald-800 hover:bg-emerald-900 text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                Start new sale
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}