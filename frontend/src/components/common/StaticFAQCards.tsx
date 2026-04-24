
import type { FAQItem } from '../../types';

// Fallback hardcoded data if JSON fails to load offline
const FALLBACK_FAQS: FAQItem[] = [
  {
    id: "faq_1",
    question: "What ID do I need to vote in India?",
    answer: "Your Voter ID (EPIC) is preferred. If you don't have it, you can use one of 12 other approved IDs such as Aadhaar Card, PAN Card, Driving Licence, or Indian Passport, provided your name is on the electoral roll.",
    category: "Voting Day"
  },
  {
    id: "faq_2",
    question: "How do I check if my name is on the voter list?",
    answer: "You can check your name on the electoral roll by visiting voterportal.eci.gov.in, using the Voter Helpline App, or calling the toll-free number 1950.",
    category: "Registration"
  },
  {
    id: "faq_3",
    question: "What is the Model Code of Conduct (MCC)?",
    answer: "The MCC is a set of guidelines issued by the ECI for political parties and candidates. It starts the day election dates are announced and prohibits the ruling government from making announcements that could influence voters.",
    category: "Rules"
  },
  {
    id: "faq_4",
    question: "Can EVMs be manipulated or hacked?",
    answer: "No. EVMs are standalone machines with no internet or wireless connectivity (like Wi-Fi or Bluetooth). The software is burned into one-time programmable chips, and they are sealed and guarded with strict protocols.",
    category: "EVMs"
  }
];

export function StaticFAQCards() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Common Election Questions</h2>
        <p className="text-gray-400">Curated answers from official sources</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {FALLBACK_FAQS.map((faq) => (
          <div 
            key={faq.id}
            className="bg-civic-card border border-civic-border rounded-xl p-5 hover:border-gray-500 transition-colors focus-within:ring-2 focus-within:ring-civic-accent focus-within:border-transparent"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-saffron bg-saffron/10 px-2 py-1 rounded">
                {faq.category}
              </span>
            </div>
            
            <h3 className="text-white font-bold text-lg mb-3 leading-tight">
              {faq.question}
            </h3>
            
            <details className="group">
              <summary className="text-gray-300 text-sm cursor-pointer list-none line-clamp-2 group-open:line-clamp-none min-h-[44px] focus:outline-none rounded">
                <span className="group-open:hidden">{faq.answer}</span>
                <span className="hidden group-open:inline">{faq.answer}</span>
                <span className="text-civic-accent ml-2 text-xs font-semibold group-open:hidden block mt-1 hover:underline">
                  Read more →
                </span>
              </summary>
              <div className="mt-4 pt-4 border-t border-civic-border flex justify-end">
                 <span className="text-[11px] text-gray-500 flex items-center">
                   <span className="mr-1">📖</span> Source: ECI Guidelines
                 </span>
              </div>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}
