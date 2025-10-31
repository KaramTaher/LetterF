import CurvedCard from './CurvedCard.jsx'
import sampleImage from '/assets/F-Char.webp';
import StartBox from './StartBox.jsx';

export default function Home({ onStart }) {
  return (
    <div className='w-full min-h-[100dvh] relative flex flex-col items-center '>
      <CurvedCard position="right" />

      <CurvedCard position="left" />

      <div className="relative mx-auto max-w-md text-center flex flex-col items-center space-y-5 ">

        <h1 className="
                text-3xl md:text-4xl font-extrabold tracking-wide
                bg-gradient-to-r from-emerald-500 via-sky-500 to-blue-600
                bg-clip-text text-transparent drop-shadow-sm pt-24
                animate-[fadeIn_0.9s_ease-out_2.5s_forwards] opacity-0">
          F Adventures! | هيا نبدأ المغامرة!
        </h1>

        <p className="text-sm font-semibold text-slate-600/80 tracking-wide
                animate-[fadeIn_0.9s_ease-out_2.7s_forwards] opacity-0">
          Play • Learn • Repeat | العب • تعلم • كرر
        </p>

        <StartBox onStart={onStart} />

        <img src={sampleImage} alt="" className='mt-10 w-72 h-72 xl:w-96 xl:h-96 lg:w-96 lg:h-96
            md:w-80 md:h-80 
            opacity-0 '
          style={{
            animation: `opacityChar 1s ease-out 2.5s forwards,
                            MoveN 1.5s ease-in-out 3.5s infinite alternate`,
          }} fetchPriority="high" />
      </div>



    </div>
  )
}
// End of Home.jsx