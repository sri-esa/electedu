import { useState } from 'react';
import { useSettingsStore } from '../../store/settings.store';
import type { QuizQuestion } from '../../types';

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    question: "What is the minimum age to vote in India?",
    options: ["16", "18", "21", "25"],
    correctIndex: 1,
    explanation: "The voting age was reduced from 21 to 18 years by the 61st Constitutional Amendment Act in 1988."
  },
  {
    id: "q2",
    question: "What does MCC stand for?",
    options: ["Model Code of Conduct", "Maximum Campaign Cap", "Member of Constitutional Committee", "Minimum Candidate Count"],
    correctIndex: 0,
    explanation: "The Model Code of Conduct is a set of guidelines issued by the ECI for political parties and candidates."
  },
  {
    id: "q3",
    question: "How many phases were in the 2024 Lok Sabha election?",
    options: ["5", "6", "7", "9"],
    correctIndex: 2,
    explanation: "The 2024 General Election was conducted in 7 phases to manage logistics and security deployment."
  },
  {
    id: "q4",
    question: "VVPAT stands for:",
    options: [
      "Voter Verified Paper Audit Trail",
      "Verified Voter Paper and Tracking",
      "Voter Verifiable Public Audit Terminal",
      "Vote Validity Paper and Tracking"
    ],
    correctIndex: 0,
    explanation: "VVPAT prints a paper slip allowing voters to verify that their vote was cast correctly."
  },
  {
    id: "q5",
    question: "Which body conducts general elections in India?",
    options: ["Supreme Court", "Parliament", "Election Commission of India", "Prime Minister's Office"],
    correctIndex: 2,
    explanation: "The ECI is an independent constitutional body responsible for conducting elections."
  }
];

export function QuizWidget() {
  const { setAppState, appState } = useSettingsStore();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const question = QUIZ_QUESTIONS[currentIdx];
  const isComplete = appState === 'QUIZ_COMPLETE';

  const handleSelect = (idx: number) => {
    if (!hasSubmitted) setSelectedIdx(idx);
  };

  const handleSubmit = () => {
    if (selectedIdx === null) return;
    
    if (selectedIdx === question.correctIndex) {
      setScore(s => s + 1);
    }
    setHasSubmitted(true);
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelectedIdx(null);
      setHasSubmitted(false);
    } else {
      setAppState('QUIZ_COMPLETE');
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setSelectedIdx(null);
    setHasSubmitted(false);
    setScore(0);
    setAppState('QUIZ_IN_PROGRESS');
  };

  if (isComplete) {
    let msg = "Keep learning! 📚";
    if (score >= 3) msg = "Great progress! 🌟";
    if (score === 5) msg = "Election expert! 🏆";

    return (
      <div className="flex-1 flex items-center justify-center bg-civic-navy p-4">
        <div className="bg-civic-card max-w-md w-full rounded-2xl p-8 text-center border border-civic-border shadow-2xl animate-fade-in">
          <div className="text-6xl mb-6">🎯</div>
          <h2 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h2>
          <p className="text-xl text-gray-300 mb-6">You scored <span className="text-saffron font-bold">{score}</span> out of {QUIZ_QUESTIONS.length}</p>
          <div className="text-lg text-civic-accent-light font-medium mb-8 bg-civic-elevated py-3 rounded-lg">{msg}</div>
          
          <div className="space-y-3">
            <button
              onClick={resetQuiz}
              className="w-full py-3 min-h-[44px] bg-civic-elevated hover:bg-civic-border text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-civic-accent"
            >
              Retake Quiz
            </button>
            <button
              onClick={() => setAppState('FREE_QUESTION')}
              className="w-full py-3 min-h-[44px] bg-civic-accent hover:bg-civic-accent-light text-white font-bold rounded-lg transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-civic-card focus:ring-civic-accent"
            >
              Continue Learning →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center py-8 px-4 bg-civic-navy overflow-y-auto">
      <div className="w-full max-w-2xl mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-gray-400 font-semibold uppercase tracking-wider text-xs">Knowledge Check</h2>
          <span className="text-sm font-medium text-white">Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}</span>
        </div>
        <div className="w-full h-1.5 bg-civic-card rounded-full overflow-hidden">
          <div 
            className="h-full bg-civic-accent transition-all duration-300" 
            style={{ width: `${((currentIdx) / QUIZ_QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-civic-card w-full max-w-2xl rounded-2xl p-6 md:p-8 shadow-xl border border-civic-border">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-8 leading-snug">
          {question.question}
        </h3>

        <div className="space-y-3 mb-8">
          {question.options.map((opt, idx) => {
            const isSelected = selectedIdx === idx;
            const isCorrect = idx === question.correctIndex;
            
            let btnClass = "w-full text-left p-4 min-h-[56px] rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-civic-accent ";
            
            if (!hasSubmitted) {
              btnClass += isSelected 
                ? "bg-civic-elevated border-civic-accent text-white" 
                : "bg-civic-navy border-civic-border text-gray-300 hover:border-gray-500 hover:bg-civic-elevated";
            } else {
              if (isCorrect) {
                btnClass += "bg-green-900/30 border-green-500 text-white";
              } else if (isSelected && !isCorrect) {
                btnClass += "bg-red-900/30 border-red-500 text-white";
              } else {
                btnClass += "bg-civic-navy border-civic-border text-gray-500 opacity-50";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={hasSubmitted}
                className={btnClass}
                aria-pressed={isSelected}
              >
                <div className="flex items-center justify-between">
                  <span>{opt}</span>
                  {hasSubmitted && isCorrect && <span className="text-green-500 font-bold">✓</span>}
                  {hasSubmitted && isSelected && !isCorrect && <span className="text-red-500 font-bold">✗</span>}
                </div>
              </button>
            );
          })}
        </div>

        {hasSubmitted && (
          <div className={`p-4 rounded-lg mb-8 animate-fade-in ${selectedIdx === question.correctIndex ? 'bg-green-900/20 border border-green-800/50' : 'bg-red-900/20 border border-red-800/50'}`}>
            <p className="font-bold mb-1 flex items-center">
              {selectedIdx === question.correctIndex 
                ? <span className="text-green-400 mr-2">✅ Correct!</span> 
                : <span className="text-red-400 mr-2">The answer is: {question.options[question.correctIndex]}</span>
              }
            </p>
            <p className="text-gray-300 text-sm">{question.explanation}</p>
          </div>
        )}

        <div className="flex justify-end pt-4 border-t border-civic-border">
          {!hasSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={selectedIdx === null}
              className="px-8 py-3 min-h-[44px] bg-civic-accent text-white font-bold rounded-lg disabled:opacity-50 disabled:bg-civic-elevated transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-civic-card focus:ring-civic-accent"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-8 py-3 min-h-[44px] bg-civic-accent text-white font-bold rounded-lg hover:bg-civic-accent-light transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-civic-card focus:ring-civic-accent"
            >
              Next Question →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
