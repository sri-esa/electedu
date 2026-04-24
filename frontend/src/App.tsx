
import { useSettingsStore } from './store/settings.store';
import { AppShell } from './components/layout/AppShell';
import { OnboardingScreen } from './components/OnboardingScreen';
import { ChatInterface } from './components/chat/ChatInterface';
import { ElectionTimeline } from './components/timeline/ElectionTimeline';
import { GuidedFlow } from './components/flow/GuidedFlow';
import { StaticFAQCards } from './components/common/StaticFAQCards';
import { QuizWidget } from './components/common/QuizWidget';
import { useOfflineDetection } from './hooks/useOfflineDetection';

export default function App() {
  const { appState } = useSettingsStore();
  
  // Register offline detection listener globally
  useOfflineDetection();

  function renderMainContent() {
    switch (appState) {
      case 'ONBOARDING':
        return <OnboardingScreen />;
      case 'GUIDED_FLOW':
        return <GuidedFlow />;
      case 'FREE_QUESTION':
        return <ChatInterface />;
      case 'TIMELINE_EXPLORATION':
        return <ElectionTimeline />;
      case 'QUIZ_IN_PROGRESS':
      case 'QUIZ_COMPLETE':
        return <QuizWidget />;
      case 'OFFLINE_FALLBACK':
        return (
          <div className="flex-1 overflow-auto bg-civic-navy p-4 md:p-8">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-red-500/10 border border-red-500/30 text-red-200 p-4 rounded-lg flex items-center space-x-3">
                <span className="text-xl">⚠️</span>
                <span>You are offline. Showing curated answers from official sources.</span>
              </div>
              <StaticFAQCards />
            </div>
          </div>
        );
      default:
        return <OnboardingScreen />;
    }
  }

  return (
    <AppShell>
      <main 
        id="main-content"
        role="main"
        aria-label="ElectEdu main content"
        className="flex-1 overflow-auto flex flex-col min-w-0"
      >
        {renderMainContent()}
      </main>
    </AppShell>
  );
}
