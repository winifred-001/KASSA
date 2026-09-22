"use client";

import { useRouter } from "next/navigation";
import { useState,useEffect} from "react";
import { Upload, Loader2, Menu,Bell} from "lucide-react";
import KassaSidebar from "@/components/KassaSidebar";

export default function AddCustomerPage() {
  const router = useRouter();

  const [saving, setSaving] = useState(false);
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
    name: "",
    sku: "",
    category: "",
    brand: "",
    unit: "",
    description: "",
    sellingPrice: "",
    costPrice: "",
    currentStock: "",
    lowStockThreshold: "",
    notes: "",
  });

  const handleChange = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    ); // remove once real API is wired up

    setSaving(false);
    router.push("/customers");
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
                      Add Customer
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
      
       
        <p className="text-gray-500 mb-6 px-3 mt-4">
          Add a new product to your catalogue.
        </p>

        <div className="grid grid-cols-3 gap-6 px-3">
          {/* Form */}
          <div className="col-span-2 bg-white rounded-xl border border-gray-200 p-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-5">
                Product information
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Product name{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    value={form.name}
                    onChange={(e) =>
                      handleChange("name", e.target.value)
                    }
                    placeholder="e.g. Amoxicillin 500mg"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Product code / SKU{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <input
                      value={form.sku}
                      onChange={(e) =>
                        handleChange("sku", e.target.value)
                      }
                      placeholder="e.g. AMX-500-001"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Category{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <select
                      value={form.category}
                      onChange={(e) =>
                        handleChange(
                          "category",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 text-gray-500"
                    >
                      <option value="">
                        Select category
                      </option>
                      <option value="Medicine">
                        Medicine
                      </option>
                      <option value="Supplements">
                        Supplements
                      </option>
                      <option value="Wellness">
                        Wellness
                      </option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Brand
                    </label>

                    <input
                      value={form.brand}
                      onChange={(e) =>
                        handleChange("brand", e.target.value)
                      }
                      placeholder="Enter brand"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Unit
                    </label>

                    <input
                      value={form.unit}
                      onChange={(e) =>
                        handleChange("unit", e.target.value)
                      }
                      placeholder="Piece"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Description
                  </label>

                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      handleChange(
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Add a short product description..."
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-5">
                Pricing & stock
              </h2>

              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Selling price{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                        ₦
                      </span>

                      <input
                        value={form.sellingPrice}
                        onChange={(e) =>
                          handleChange(
                            "sellingPrice",
                            e.target.value
                          )
                        }
                        placeholder="0.00"
                        className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Cost price
                    </label>

                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                        ₦
                      </span>

                      <input
                        value={form.costPrice}
                        onChange={(e) =>
                          handleChange(
                            "costPrice",
                            e.target.value
                          )
                        }
                        placeholder="0.00"
                        className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Current stock{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <input
                      value={form.currentStock}
                      onChange={(e) =>
                        handleChange(
                          "currentStock",
                          e.target.value
                        )
                      }
                      placeholder="0"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Low-stock threshold{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <input
                      value={form.lowStockThreshold}
                      onChange={(e) =>
                        handleChange(
                          "lowStockThreshold",
                          e.target.value
                        )
                      }
                      placeholder="e.g. 10"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Product image
              </h2>

              <label className="flex flex-col items-center justify-center gap-1 border-2 border-dashed border-gray-200 rounded-lg py-10 cursor-pointer hover:border-emerald-400 transition-colors">
                <Upload
                  size={18}
                  className="text-gray-400 mb-1"
                />

                <span className="text-sm font-medium text-emerald-700">
                  Upload product image
                </span>

                <span className="text-xs text-gray-400">
                  Optional · JPG or PNG
                </span>

                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  className="hidden"
                />
              </label>
            </div>

            <div className="col-span-3 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6 px-3">
            <button
              type="button"
              onClick={() => router.push("/customers")}
              className="px-5 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {saving && (
                <Loader2
                  size={14}
                  className="animate-spin"
                />
              )}

              {saving ? "Saving..." : "Save Customer"}
            </button>
            </div>
          </div>

          {/* Save panel */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 h-fit">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Save product
            </h2>

            <p className="text-sm text-gray-500 mb-5">
              Required fields are marked with *
            </p>

            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Notes
            </label>

            <textarea
              value={form.notes}
              onChange={(e) =>
                handleChange("notes", e.target.value)
              }
              placeholder="Add a note about this customer"
              rows={2}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 resize-none"
            />
            
          </div>

        </div>
      </main>
    </div>
  );
}