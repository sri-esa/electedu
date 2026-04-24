
import { motion } from 'framer-motion';
import type { GuidedFlowStep } from '../../types';
import { useSettingsStore } from '../../store/settings.store';
import { Check, MapPin, Briefcase, Monitor, PartyPopper } from 'lucide-react';

interface FlowStepProps {
  step: GuidedFlowStep;
  onNext: () => void;
}

export function FlowStep({ step, onNext }: FlowStepProps) {
  const { setAppState } = useSettingsStore();

  const getStepIcon = (num: number) => {
    switch(num) {
      case 1: return <Check className="w-12 h-12 text-saffron" />;
      case 2: return <MapPin className="w-12 h-12 text-saffron" />;
      case 3: return <Briefcase className="w-12 h-12 text-saffron" />;
      case 4: return <Monitor className="w-12 h-12 text-saffron" />;
      case 5: return <PartyPopper className="w-12 h-12 text-saffron" />;
      default: return null;
    }
  };

  const getStepExtraContent = (num: number) => {
    switch(num) {
      case 1:
        return (
          <div className="bg-civic-elevated p-4 rounded-lg mt-6 border border-civic-border">
            <h4 className="text-white font-medium mb-2">Check online at voterportal.eci.gov.in</h4>
            <ul className="text-sm text-gray-300 space-y-2 list-disc list-inside">
              <li>Enter your name + date of birth OR your EPIC number</li>
              <li>Your name should appear with your polling booth</li>
            </ul>
          </div>
        );
      case 2:
        return (
          <div className="bg-civic-elevated p-4 rounded-lg mt-6 border border-civic-border">
            <h4 className="text-white font-medium mb-2">How to find it:</h4>
            <ul className="text-sm text-gray-300 space-y-2 list-disc list-inside">
              <li>Download: ECI Voter Helpline App</li>
              <li>OR visit: voterportal.eci.gov.in → Know Your Polling Station</li>
              <li>Your booth number is also on your EPIC card</li>
            </ul>
          </div>
        );
      case 3:
        return (
          <div className="bg-civic-elevated p-4 rounded-lg mt-6 border border-civic-border">
            <details className="group">
              <summary className="text-white font-medium cursor-pointer list-none flex justify-between items-center min-h-[44px] focus:outline-none focus:ring-2 focus:ring-civic-accent rounded">
                <span>View all 12 accepted alternative IDs</span>
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <ul className="text-sm text-gray-300 space-y-1 mt-4 ml-2 border-l-2 border-civic-border pl-4">
                <li>Aadhaar Card</li>
                <li>Driving Licence</li>
                <li>PAN Card</li>
                <li>Indian Passport</li>
                <li>Passbooks with photograph (Bank/Post Office)</li>
                <li>MGNREGA Job Card</li>
                <li>Health Smart Card (Ministry of Labour)</li>
                <li>Pension document with photograph</li>
                <li>Official Identity Card (MPs/MLAs/MLCs)</li>
                <li>Service ID Card (Central/State Govt/PSU)</li>
                <li>Smart Card (RGI under NPR)</li>
                <li>Unique Disability ID (UDID)</li>
              </ul>
            </details>
          </div>
        );
      case 4:
        return (
          <div className="bg-civic-elevated p-4 rounded-lg mt-6 border border-civic-border">
            <ol className="text-sm text-gray-300 space-y-3 list-decimal list-inside">
              <li>Show your ID to the polling officer</li>
              <li>Sign in the register (or thumb impression)</li>
              <li>Blue ink mark applied to your finger</li>
              <li>Enter the voting compartment</li>
              <li>Press your candidate's button</li>
              <li>Blue light + beep confirms your vote</li>
              <li>Watch the VVPAT slip for 7 seconds</li>
            </ol>
            <div className="mt-4 pt-4 border-t border-civic-border">
              <button 
                onClick={() => setAppState('FREE_QUESTION')} // Simplified trigger for chat
                className="text-civic-accent hover:text-civic-accent-light text-sm font-medium min-h-[44px] focus:outline-none focus:ring-2 focus:ring-civic-accent rounded px-2 -ml-2"
              >
                Ask how EVMs work in chat →
              </button>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="bg-civic-elevated p-4 rounded-lg mt-6 border border-civic-border">
            <ul className="text-sm text-white space-y-3">
              <li className="flex items-center space-x-2"><span>✅</span> <span>Registration checked</span></li>
              <li className="flex items-center space-x-2"><span>✅</span> <span>Booth location known</span></li>
              <li className="flex items-center space-x-2"><span>✅</span> <span>ID documents ready</span></li>
              <li className="flex items-center space-x-2"><span>✅</span> <span>Voting process understood</span></li>
            </ul>
          </div>
        );
      default: return null;
    }
  };

  return (
    <motion.div
      key={step.stepNumber}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-2xl w-full"
    >
      <div className="bg-civic-card rounded-2xl p-6 md:p-10 shadow-xl border border-civic-border">
        <div className="flex items-center justify-between mb-8">
          <div className="p-4 bg-civic-navy rounded-full border border-civic-border inline-block">
            {getStepIcon(step.stepNumber)}
          </div>
          <span className="px-3 py-1 bg-civic-elevated text-saffron text-xs font-bold rounded-full border border-civic-border">
            STEP {step.stepNumber}
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
          {step.title}
        </h2>
        
        <p className="text-gray-400 text-lg leading-relaxed">
          {step.content}
        </p>

        {getStepExtraContent(step.stepNumber)}

        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-end">
          {step.stepNumber > 1 && (
            <button 
              onClick={() => {
                const store = useSettingsStore.getState();
                if(store.guidedFlowStep > 1) {
                  store.setGuidedFlow('first_time_voter', store.guidedFlowStep - 1);
                }
              }}
              className="px-6 py-3 min-h-[44px] text-gray-400 hover:text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-civic-accent order-2 sm:order-1"
            >
              Back
            </button>
          )}
          <button
            onClick={onNext}
            className="w-full sm:w-auto px-8 py-3 min-h-[44px] bg-civic-accent hover:bg-civic-accent-light text-white font-bold rounded-lg shadow-lg transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-civic-card focus:ring-civic-accent order-1 sm:order-2"
          >
            {step.actionLabel}
          </button>
        </div>
        
        {step.stepNumber === 5 && (
          <div className="mt-4 text-center border-t border-civic-border pt-4 order-3 w-full">
             <button
              onClick={() => alert("Share functionality coming soon!")}
              className="text-gray-400 hover:text-white min-h-[44px] px-4 rounded focus:outline-none focus:ring-2 focus:ring-civic-accent transition-colors"
            >
              Share ElectEdu with friends
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
