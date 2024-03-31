import { useState, useCallback } from "react";
import { AppProvider } from "@/context";
import StepSection from "@/components/stepSection";
import StepUI from "@/components/stepUI";

export default function App() {
  const [state, setState] = useState({
    step: 0,
    data: [
      {
        name: "",
        email: "",
        phoneNo: "",
        completed: false,
      },
      {
        plan: "Arcade",
        price: 9,
        expiry: false, // Input not checked, defaults to monthly
        completed: true,
      },
      {
        addOns: [],
        completed: true,
      },
      {
        completed: true
      }
    ],
  });
  const [checkForError, setCheckForError] = useState(false);

  const handleNextStep = useCallback(function() {
    const currentForm = state.data[state.step];
    if(Object.values(currentForm).filter((e) => typeof e !== "boolean").every(Boolean)) {
      setState(prev => ({ ...prev, step: ++prev.step }));
    } else {
      setCheckForError(true);
    }
  }, []);
  
  return (
    <AppProvider.Provider value={{ state, setState, checkForError }}>
      <main className="max-w-3xl mx-auto grid md:grid-cols-6 items-stretch md:gap-16 rounded-lg md:shadow-lg md:bg-white md:p-4 md:my-16">
        <StepSection />
        <section className="md:col-span-4 md:mr-16 bg-magnolia flex flex-col justify-between">
          <StepUI />
          { state.step < 4 && (
            <div className="p-4 flex-ac justify-between bg-white">
              { state.step <= 0 ? <div /> : (
              <button
                type="button"
                className="coolGray hover:text-gray-800 text-xs py-3 px-5"
                onClick={() => setState(prev => ({ ...prev, step: --prev.step }))}
              >
                <strong>Go Back</strong>
              </button> )}
              <button
                type="button"
                className={"text-xs py-3 px-5 rounded magnolia hover:opacity-70" + (state.step >= 3 ? " bg-purplish" : " bg-marine")}
                onClick={handleNextStep}
              >
                <strong>Next Step</strong>
              </button>
            </div>
          )}
        </section>
      </main>
      <div className="text-center text-sm py-3 bg-marine magnolia">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank"  className="text-red-600 hover:underline">Frontend Mentor</a>. 
        Coded by <a href="#" className="text-red-600 hover:underline">Victor Ojile</a>.
      </div>
    </AppProvider.Provider>
  );
}
