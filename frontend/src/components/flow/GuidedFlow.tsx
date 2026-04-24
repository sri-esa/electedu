
import { useSettingsStore } from '../../store/settings.store';
import { FlowStep } from './FlowStep';
import type { GuidedFlowStep } from '../../types';

// Hardcoded steps for 'first_time_voter'
const FIRST_TIME_VOTER_STEPS: GuidedFlowStep[] = [
  {
    stepNumber: 1,
    title: "Are you on the voter list?",
    content: "Before you can vote, your name must be on the electoral roll in your constituency.",
    actionLabel: "I've checked my registration →",
    isComplete: false,
  },
  {
    stepNumber: 2,
    title: "Where do you vote?",
    content: "Every voter is assigned a specific polling booth — usually within 2km of your registered address.",
    actionLabel: "I know my booth →",
    isComplete: false,
  },
  {
    stepNumber: 3,
    title: "What to carry on voting day",
    content: "Bring one valid ID. Your Voter ID (EPIC) is preferred, but 12 other IDs are also accepted.",
    actionLabel: "Got it, I'm ready →",
    isComplete: false,
  },
  {
    stepNumber: 4,
    title: "Inside the polling booth",
    content: "The EVM is straightforward. Here's exactly what happens:",
    actionLabel: "I understand the EVM →",
    isComplete: false,
  },
  {
    stepNumber: 5,
    title: "You're ready to vote!",
    content: "You now know everything you need to cast your first vote confidently.",
    actionLabel: "Ask more questions →",
    isComplete: false,
  }
];

export function GuidedFlow() {
  const { guidedFlowStep, advanceGuidedStep, setAppState } = useSettingsStore();
  
  const totalSteps = FIRST_TIME_VOTER_STEPS.length;
  const currentStepData = FIRST_TIME_VOTER_STEPS[guidedFlowStep - 1];

  const handleNext = () => {
    if (guidedFlowStep < totalSteps) {
      advanceGuidedStep();
    } else {
      setAppState('FREE_QUESTION');
    }
  };

  const progressPercentage = ((guidedFlowStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="flex-1 flex flex-col bg-civic-navy overflow-y-auto">
      {/* Progress Bar Header */}
      <div className="sticky top-0 z-10 bg-civic-navy/90 backdrop-blur border-b border-civic-border p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              First Time Voter Guide
            </span>
            <span className={`text-xs font-bold ${guidedFlowStep === totalSteps ? 'text-saffron' : 'text-civic-accent'}`}>
              Step {guidedFlowStep} of {totalSteps}
            </span>
          </div>
          <div className="h-1.5 w-full bg-civic-card rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ease-out ${guidedFlowStep === totalSteps ? 'bg-saffron' : 'bg-civic-accent'}`}
              style={{ width: `${progressPercentage}%` }}
              role="progressbar"
              aria-valuenow={progressPercentage}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Flow progress"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 md:p-8 flex flex-col items-center">
        {currentStepData && (
          <FlowStep 
            step={currentStepData} 
            onNext={handleNext}
          />
        )}
      </div>
    </div>
  );
}
