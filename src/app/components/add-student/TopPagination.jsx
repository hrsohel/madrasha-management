import React from 'react'

export default function TopPagination() {
  return (
    <div>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-green-700">
            নতুন শিক্ষার্থী ভর্তি ফর্ম পূরণ করুন
          </h2>
        </div>
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center w-full max-w-2xl">
            {["১", "২", "৩", "৪", "৫"].map((step, index) => (
              <div key={step} className="flex items-center w-full">
                <div
                  className={`w-10 h-8 rounded-full flex items-center justify-center text-[#14AE5C] font-bold text-lg border-2 border-[#14AE5C]
                    }`}
                >
                  {step}
                </div>
                {index < 4 && (
                  <div
                    className={`h-1 w-full ${step <= 1 ? 'bg-green-600' : 'bg-[#EBFFEE]'
                      }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}
