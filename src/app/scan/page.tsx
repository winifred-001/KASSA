"use client";

import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Zap, Keyboard, Camera, Minus, Plus, CheckCircle2, Menu,Bell } from "lucide-react";
import KassaSidebar from "@/components/KassaSidebar";
import Link from "next/link";

type SaleItem = {
  name: string;
  qty: number;
  price: number;
  justAdded?: boolean;
};

const initialSale: SaleItem[] = [
  { name: "Paracetamol 500mg", qty: 2, price: 1700 },
  { name: "Vitamin C 1000mg", qty: 1, price: 1500 },
];

const scannedProduct = {
  name: "Amoxicillin 250mg",
  sku: "AMX-250",
  category: "Antibiotics",
  price: 2100,
  stockLeft: 8,
};

export default function ScanProductPage() {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [sale, setSale] = useState<SaleItem[]>(initialSale);
  const [added, setAdded] = useState(false);
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

  const handleAddToSale = () => {
    setSale((prev) => [
      ...prev,
      { name: scannedProduct.name, qty: quantity, price: scannedProduct.price, justAdded: true },
    ]);
    setAdded(true);
    router.push("/sales/new");
  };

  const total = sale.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50">
      <KassaSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="min-h-screen lg:ml-[198px] ">
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
                      Scan product
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
      

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-emerald-700 font-medium mt-4 mb-4 px-3"
        >
          <ArrowLeft size={14} />
          Back to home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-3 ">
          {/* Scanner viewport */}
          <div className="lg:col-span-2 bg-[#0B1220] rounded-xl p-5 sm:p-8 flex flex-col items-center justify-between min-h-[380px] sm:min-h-[520px]">
            <div className="relative w-full max-w-md flex-1 flex items-center justify-center">
              {/* corner brackets */}
              <div className="absolute top-8 left-0 w-8 h-8 border-t-2 border-l-2 border-emerald-400 rounded-tl-md" />
              <div className="absolute top-8 right-0 w-8 h-8 border-t-2 border-r-2 border-emerald-400 rounded-tr-md" />
              <div className="absolute bottom-8 left-0 w-8 h-8 border-b-2 border-l-2 border-emerald-400 rounded-bl-md" />
              <div className="absolute bottom-8 right-0 w-8 h-8 border-b-2 border-r-2 border-emerald-400 rounded-br-md" />

              <div className="flex items-center gap-[3px]">
                {Array.from({ length: 28 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white"
                    style={{
                      width: i % 3 === 0 ? "4px" : "2px",
                      height: "56px",
                    }}
                  />
                ))}
              </div>
              <div className="absolute w-full h-0.5 bg-emerald-400" />
            </div>

            <div className="text-center mb-4">
              <p className="text-white text-sm">Position the barcode within the frame</p>
              <p className="text-gray-400 text-xs mt-1">Scanning happens automatically</p>
            </div>

            <div className="flex items-center gap-4 sm:gap-6">
              <button className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 shrink-0">
                <Zap size={18} />
              </button>

              <Link href={"/scan/product-code"}
                className="flex flex-col items-center gap-1 text-white">
                <span className="w-11 h-11 rounded-full bg-emerald-700 flex items-center justify-center">
                  <Keyboard size={18} />
                </span>
                <span className="text-xs text-gray-300">Enter code manually</span>
              </Link>
              <button className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20">
                <Camera size={18} />
              </button>
            </div>
          </div>

          {/* Result + current sale */}
          <div className="space-y-4">
            {added && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 size={16} className="text-emerald-700" />
                  <span className="text-sm font-semibold text-emerald-800">PRODUCT FOUND</span>
                </div>

                <div className="bg-white rounded-lg p-3">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 rounded-md bg-gray-100 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm truncate">{scannedProduct.name}</p>
                      <p className="text-xs text-gray-500">
                        SKU: {scannedProduct.sku} · {scannedProduct.category}
                      </p>
                      <p className="text-emerald-700 font-semibold mt-1">
                        ₦{scannedProduct.price.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
                    <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">
                      {scannedProduct.stockLeft} left in stock
                    </span>
                    <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-2 py-1">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-medium w-4 text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleAddToSale}
              className="w-full bg-emerald-800 hover:bg-emerald-900 text-white py-3 rounded-xl text-sm font-semibold transition-colors"
            >
              Add to sale — ₦{(scannedProduct.price * quantity).toLocaleString()}
            </button>

            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-900">Current sale</h3>
                <span className="text-sm text-emerald-700 font-medium">{sale.length} items</span>
              </div>

              <div className="space-y-3 mb-4">
                {sale.map((item, i) => (
                  <div key={i} className="flex items-center justify-between gap-3 text-sm">
                    <div className="min-w-0">
                      <span className={`truncate block ${item.justAdded ? "text-gray-400" : "text-gray-700"}`}>
                        {item.name} × {item.qty}
                      </span>
                      {item.justAdded && (
                        <span className="text-xs text-emerald-600">just added</span>
                      )}
                    </div>
                    <span className={`shrink-0 ${item.justAdded ? "text-gray-400" : "text-gray-900 font-medium"}`}>
                      ₦{item.price.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-gray-100 pt-4 mb-4">
                <span className="font-semibold text-gray-900">Sale total</span>
                <span className="text-xl font-bold text-emerald-700">
                  ₦{total.toLocaleString()}
                </span>
              </div>
              
              <Link href={"/sales/payment"}
                onClick={handleAddToSale}
                className=" flex items-center justify-center w-full bg-emerald-800 hover:bg-emerald-900 text-white py-2.5 rounded-lg text-sm font-medium mb-2 transition-colors"
              >
                Proceed to payment
              </Link>
              <button className="w-full text-center text-emerald-700 text-sm font-medium py-1">
                Scan another item
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}