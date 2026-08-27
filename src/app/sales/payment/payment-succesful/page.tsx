
import { Bell, Check, Landmark } from "lucide-react";
import KassaSidebar from "@/components/KassaSidebar";

const STEPS = [
  { label: "Sale", done: true },
  { label: "Payment", done: true },
  { label: "Receipt", done: true, current: true },
];

function naira(amount: number) {
  return `₦${amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export default function PaymentSuccessfulPage() {
  const amount = 24500;
  const customerName = "Walk-in customer";
  const paymentMethod = "Bank Transfer";
  const branch = "Main branch";

  return (
    <div className="min-h-screen bg-[#F5F6F8]">
      <KassaSidebar/>
      <div className="flex-1">
    <>
      <header className="flex h-[80px] items-center justify-between border-b border-[#E5E7EB] bg-white px-[32px] py-[32px]">
        <h1 className="px-[250px]  text-[21px] font-bold text-[#182033]">
          Payment Successful
        </h1>

        <div className="flex items-center gap-5">
          <button className="flex h-9 items-center gap-1 rounded-md border border-[#E5E7EB] px-3 text-[13px] text-[#182033]">
            {branch}
            <span className="text-[#98A1AE]">▾</span>
          </button>

          <button className="relative flex h-[36px] w-[36px] items-center justify-center rounded-full">
            <Bell size={17} className="text-[#98A1AE]" />
            <span className="absolute right-[8px] top-[6px] h-[7px] w-[7px] rounded-full bg-[#E54848]" />
          </button>

          <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#0F4C3A] text-[13px] font-semibold text-white">
            AO
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center gap-3 px-[32px] pt-[24px]">
        {STEPS.map((step, i) => (
          <div key={step.label} className="flex items-center ">
            <div className="flex flex-col items-center gap-1.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0F4C3A] text-white">
                <Check size={13} strokeWidth={3} />
              </div>
              <span
                className={`text-[12px] ${
                  step.current ? "font-medium text-[#182033]" : "text-[#98A1AE]"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="mx-3 mb-5 h-px w-[100px]  bg-[#0F4C3A]" />
            )}
          </div>
        ))}
      </div>

      
      <section className="flex items-start justify-center gap-6 px-[32px]  pb-[40px] pt-[32px]">
        <div className="flex-1 h-[500px] max-w-[560px] rounded-2xl border border-[#E5E7EB] bg-white p-10 px-[64px] text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#0F4C3A]">
            <Check className="text-white" size={30} strokeWidth={3} />
          </div>

          <h2 className="text-[19px] font-semibold text-[#182033]">
            Payment successful
          </h2>
          <p className="mx-auto mt-1.5 max-w-xs text-[13px] text-[#98A1AE]">
            The payment has been verified and the sale is complete.
          </p>

          <p className="mt-8 text-[11px] font-medium uppercase tracking-wide text-[#98A1AE]">
            Amount paid
          </p>
          <p className="mt-1 text-[28px] font-semibold text-[#182033]">
            {naira(amount)}
          </p>

          <div className="mx-auto mt-6 flex max-w-xs items-center gap-3 rounded-xl border border-[#E5E7EB] bg-[#F8F9FA] px-4 py-3 text-left">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#0F4C3A] text-white">
              <Landmark size={15} />
            </div>
            <div>
              <p className="text-[13px] font-medium text-[#182033]">
                {paymentMethod}
              </p>
              <p className="text-[12px] text-[#98A1AE]">
                Payment verified • Transaction complete
              </p>
            </div>
          </div>

          <button className="mt-8 w-full max-w-xs rounded-lg bg-[#0F4C3A] py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-[#0C3D2F]">
            View Receipt
          </button>
        </div>

        <div className="h-[500px] w-[280px] flex-shrink-0 item-center justify-center rounded-2xl border border-[#E5E7EB] bg-white p-6">
          <h3 className="text-[14px] font-semibold text-[#182033]">
            Sale status
          </h3>

          <div className="mt-4 space-y-3 text-[13px] text-[#182033]">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#0F4C3A]" />
              Sale confirmed
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#0F4C3A]" />
              Payment successful
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#F5A623]" />
              Receipt ready
            </div>
          </div>

          <dl className="mt-6 space-y-4 border-t border-[#E5E7EB] pt-5">
            <div>
              <dt className="text-[11px] text-[#98A1AE]">Customer</dt>
              <dd className="text-[13px] font-medium text-[#182033]">
                {customerName}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] text-[#98A1AE]">Transaction</dt>
              <dd className="text-[13px] font-medium text-[#182033]">
                Payment verified
              </dd>
            </div>
            <div>
              <dt className="text-[11px] text-[#98A1AE]">Amount</dt>
              <dd className="text-[13px] font-medium text-[#182033]">
                ₦{amount.toLocaleString("en-NG")}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <footer className="pb-6 text-center text-[11px] text-[#98A1AE]">
        Kassa • Secure Payment
      </footer>
    </>
    </div>
    </div>
  );
}
