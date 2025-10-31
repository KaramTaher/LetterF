export default function StartBox({onStart}) {
    return (
        <div className="
                inline-flex flex-col items-center justify-center
                rounded-2xl border border-white/70 bg-white/80 backdrop-blur-sm
                shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                px-6 py-5 md:px-7 md:py-6
                animate-[fadeIn_0.9s_ease-out_2.9s_forwards] opacity-0">

                <span className="text-base md:text-lg font-bold text-slate-800">
                  Let’s Learn the Letter F | F هيا نتعلم الحرف 
                </span>

                <div className="mt-3 flex gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">Ages 4–6</span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700">5 mins</span>
                </div>

                <button className="
                  mt-4 inline-flex items-center gap-2 rounded-xl
                  bg-emerald-500 px-5 py-2.5 font-bold text-white
                  shadow-md hover:bg-emerald-600 active:scale-95 transition" onClick={onStart}>
                  Start
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <path d="M8 5l8 7-8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <p className="text-sm text-gray-500 mt-4">Fida Qashou</p>
              </div>
    )
}