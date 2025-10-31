import { useState } from 'react'
import './App.css'
import Home from './Components/Home';
import Quistions from './Components/Quistions';
import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {
  const [page, setPage] = useState("home");
  const [leaving, setLeaving] = useState(false);
  const ANIM_MS = 1000;

  function handlePageChange(newPage) {
    setLeaving(true);
    setTimeout(() => {
      setPage(newPage);
      setLeaving(false);
    }, ANIM_MS);
  }

  return (
    <>
      <main className='min-h-[dvh] w-full  '>
        {page === "home" ? (
        <div
          className={`${
            leaving
              ? "animate-[exitUp_1s_ease-in_forwards]"
              : "animate-[enterUp_1s_ease-out_forwards]"
          } w-full`}
        >
          <Home onStart={() => handlePageChange("quiz")} />
        </div>
      ) : (
        <div
          className={`${
            leaving
              ? "animate-[exitUp_1s_ease-in_forwards]"
              : "animate-[enterUp_1s_ease-out_forwards]"
          } w-full`}
        >
          <Quistions onBack={() => handlePageChange("home")} />
        </div>
      )}
    </main>
    <SpeedInsights />
    </>
  )
}

export default App
