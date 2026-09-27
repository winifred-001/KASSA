"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Check, Menu,Bell } from "lucide-react";
import KassaSidebar from "@/components/KassaSidebar";

const steps = ["Sale", "Payment", "Receipt"] as const;

const saleStatusItems = [
  { label: "Sale confirmed", state: "done" },
  { label: "Payment processing", state: "active" },
  { label: "Receipt", state: "pending" },
] as const;

export default function ProcessingPaymentPage() {
  const [dots, setDots] = useState(0);
  const [seconds, setSeconds] = useState(5);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

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

  // Countdown + redirect
  useEffect(() => {
    if (seconds <= 0) {
      router.push("/sales/success");
      return;
    }

    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds, router]);

  // Loading dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((d) => (d + 1) % 4);
    }, 500);

    return () => clearInterval(interval);
  }, []);

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
                Add Product
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

        <p className="text-sm sm:text-base text-gray-500 mb-8 px-8 mt-4">
          We&apos;re verifying your payment. Please don&apos;t close this screen.
        </p>

        {/* Stepper */}
        <div className="flex items-center justify-center gap-3 mb-10 max-w-md mx-auto px-8 ">
          {steps.map((step, i) => {
            const isDone = i === 0;
            const isActive = i === 1;

            return (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
                      isDone
                        ? "bg-emerald-700 text-white"
                        : isActive
                        ? "bg-emerald-700 text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {isDone ? <Check size={14} /> : i + 1}
                  </div>

                  <span
                    className={`text-xs font-medium ${
                      isActive
                        ? "text-emerald-700"
                        : isDone
                        ? "text-gray-700"
                        : "text-gray-400"
                    }`}
                  >
                    {step}
                  </span>
                </div>

                {i < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 -mt-5 ${
                      i === 0 ? "bg-emerald-700" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-4xl px-8">
          {/* Processing card */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 sm:p-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full border-4 border-gray-100 border-t-amber-500 animate-spin mb-6" />

            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Processing payment{".".repeat(dots)}
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              We&apos;re verifying your payment with the payment provider.
            </p>

            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
              Amount
            </p>

            <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-5">
              ₦24,500.00
            </p>

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-50 border border-emerald-100 mb-6">
              <span className="w-5 h-5 shrink-0 rounded-full bg-emerald-700 text-white text-[10px] font-bold flex items-center justify-center">
                N
              </span>

              <div className="text-left">
                <p className="text-sm font-medium text-emerald-800">
                  Bank Transfer
                </p>

                <p className="text-xs text-emerald-600">
                  Payment method already selected
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-400 bg-gray-50 px-4 py-2 rounded-lg">
              Redirecting in {seconds} seconds...
            </p>
          </div>

          {/* Sale status panel */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">
              Sale status
            </h3>

            <div className="space-y-4 mb-6">
              {saleStatusItems.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span
                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                      item.state === "done"
                        ? "bg-emerald-600"
                        : item.state === "active"
                        ? "bg-amber-500"
                        : "bg-gray-200"
                    }`}
                  />

                  <span
                    className={`text-sm ${
                      item.state === "pending"
                        ? "text-gray-400"
                        : "text-gray-700"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Customer</p>
                <p className="text-sm font-semibold text-gray-900">
                  Walk-in customer
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Transaction</p>
                <p className="text-sm font-semibold text-amber-600">
                  Pending verification
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Amount</p>
                <p className="text-sm font-semibold text-gray-900">
                  ₦24,500
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-10">
          Kassa • Secure Payment
        </p>
      </main>
    </div>
  );
}