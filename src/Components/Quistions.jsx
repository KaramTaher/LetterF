import { useEffect, useState } from "react";
import SoundButton from "./SoundButton.jsx";

export default function Questions({ onBack }) {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const [leaving, setLeaving] = useState(false);
  const [dir, setDir] = useState(1);
  const ANIM_MS = 400;

  useEffect(() => {
    fetch("/data/questions.json")
      .then((res) => res.json())
      .then((data) => {
        const first = data[0];
        const rest = shuffle(data.slice(1));

        const all = [first, ...rest].map((q) => ({
          ...q,
          options: shuffle(q.options),
        }));

        setQuestions(all);
      });
  }, []);

  if (!questions.length) return <p className="text-center mt-20">Loading...</p>;

  const q = questions[index];
  const isCorrect = choice === q.answer;

  const handleSelect = (opt) => {
    if (choice) return;
    setChoice(opt);
    if (opt === q.answer) setScore((prev) => prev + 1);
  };

  const goNext = () => {
    if (index === questions.length - 1) {
      setFinished(true);
      return;
    }
    setDir(1);
    setLeaving(true);
    setTimeout(() => {
      setIndex((i) => i + 1);
      setChoice(null);
      setLeaving(false);
    }, ANIM_MS);
  };

  const goPrev = () => {
    if (index === 0) return;
    setDir(-1);
    setLeaving(true);
    setTimeout(() => {
      setIndex((i) => i - 1);
      setChoice(null);
      setLeaving(false);
    }, ANIM_MS);
  };

  const handleRestart = () => {
    setIndex(0);
    setChoice(null);
    setScore(0);
    setFinished(false);
    setQuestions((prev) =>
      shuffle(prev).map((q) => ({ ...q, options: shuffle(q.options) }))
    );
  };

  if (finished) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-100 via-amber-50 to-rose-50 p-6">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg p-8 w-full max-w-xl text-center">
          <h1 className="text-3xl font-extrabold text-sky-600">🎉 Great Job!</h1>
          <p className="mt-4 text-lg font-semibold text-slate-700">
            Your score: <span className="text-emerald-600">{score}</span> / {questions.length}
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={handleRestart}
              className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-6 py-2 rounded-xl"
            >
              Restart
            </button>
            <button
              onClick={onBack}
              className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-6 py-2 rounded-xl"
            >
              Back
            </button>
            
          </div>
          <p className="text-sm text-gray-500 mt-4">Fida Qashou</p>
        </div>
      </div>
    );
  }

  const cardAnimClass = leaving
    ? dir === 1
      ? "animate-[exitToLeft_0.4s_ease-in_forwards]"
      : "animate-[exitToRight_0.4s_ease-in_forwards]"
    : dir === 1
      ? "animate-[enterFromRight_0.4s_ease-out_forwards]"
      : "animate-[enterFromLeft_0.4s_ease-out_forwards]";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-100 via-amber-50 to-rose-50 p-4">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg p-8 w-full max-w-xl text-center">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-sky-600">Question {index + 1}</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={goPrev}
              disabled={index === 0 || leaving}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold disabled:opacity-40"
            >
              Prev
            </button>
            <p className="text-sm text-slate-600">
              Score: <span className="font-bold text-emerald-600">{score}</span>
            </p>
          </div>
        </div>

        {/* <h2 className="text-xl font-bold text-slate-800">{q.question}</h2> */}
        {/* <button className="p-3 rounded-full bg-white shadow-md">
          <FontAwesomeIcon icon={faVolumeDown} size="xl" className="text-[#00A36C]" />
        </button> */}
        <SoundButton src={q.audio} levelKey={index} />



        <div
          className={`p-4 ${cardAnimClass}`}
          key={`${index}-${dir}`}
        >
          <div className="mt-1">
            <h2 className="text-4xl font-extrabold text-slate-800">{q.word}</h2>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 justify-items-center sm:grid-cols-2">
            {q.options.map((opt) => {
              const correct = choice && opt === q.answer;
              const wrong = choice && opt === choice && opt !== q.answer;
              return (
                <button
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  disabled={!!choice || leaving}
                  className={`w-40 min-h-14 rounded-xl font-bold shadow-md transition active:scale-95
                    ${correct
                      ? "bg-emerald-500 text-white"
                      : wrong
                        ? "bg-rose-500 text-white"
                        : "bg-white hover:bg-slate-50 text-slate-800"
                    }`}
                >
                  {(
                    q.type === "word-to-word" ? <span className="text-2xl font-semibold text-[#0094FF] px-4 py-1 bg-[#E8F6FF] rounded-xl shadow-sm">
                      {opt}
                    </span> :
                      <img src={opt} alt="" className="w-full h-[7rem] object-contain p-2" />
                  )}



                </button>
              );
            })}
          </div>

          <p className="mt-4 font-semibold min-h-6">
            {choice && (isCorrect ? "✅ Correct! | احسنت" : "❌ Try again! | حاول مرة أخرى")}
          </p>
        </div>

        <button
          onClick={goNext}
          disabled={leaving}
          className=" bg-sky-600 hover:bg-sky-700 text-white font-bold px-6 py-2 rounded-xl disabled:opacity-50"
        >
          {index === questions.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
