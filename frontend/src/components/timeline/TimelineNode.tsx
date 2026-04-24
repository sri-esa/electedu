
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { TimelineNode as TimelineNodeType } from '../../types';

interface TimelineNodeProps {
  node: TimelineNodeType;
  isExpanded: boolean;
  onToggle: () => void;
  delay: number;
}

export function TimelineNode({ node, isExpanded, onToggle, delay }: TimelineNodeProps) {
  const isCritical = ['node_polling', 'node_counting'].includes(node.id) || node.label.includes('Voting') || node.label.includes('Counting');

  return (
    <div 
      className="relative flex flex-col items-center mr-16 md:mr-24 shrink-0 group"
      role="listitem"
    >
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: delay / 1000, type: 'spring', stiffness: 200, damping: 20 }}
        onClick={onToggle}
        aria-expanded={isExpanded}
        className={`relative z-10 flex flex-col items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-civic-navy focus:ring-civic-accent rounded-full
          ${isExpanded ? 'scale-110' : 'hover:scale-105'} transition-transform`}
      >
        <div 
          className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg border-2 transition-colors
            ${isExpanded 
              ? 'bg-civic-card border-saffron shadow-saffron/20' 
              : isCritical 
                ? 'bg-civic-card border-amber-500 hover:border-saffron' 
                : 'bg-civic-card border-civic-border hover:border-gray-400'
            }
          `}
        >
          <span aria-hidden="true">{node.icon}</span>
        </div>
        
        <div className="absolute top-14 mt-2 w-32 text-center">
          <p className={`text-xs font-semibold leading-tight ${isExpanded ? 'text-white' : 'text-gray-300'}`}>
            {node.label}
          </p>
          <p className="text-[10px] text-gray-500 mt-1">{formatDate(node.date)}</p>
        </div>
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 10, height: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-28 left-1/2 -translate-x-1/2 w-[300px] md:w-[350px] z-20 origin-top"
          >
            <div className="bg-civic-card border border-civic-border rounded-xl shadow-2xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-civic-accent" tabIndex={-1}>
              <div className="p-4 border-b border-civic-border flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-white">{node.label}</h3>
                  <p className="text-sm text-saffron font-medium">{formatDate(node.date)}</p>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggle();
                  }}
                  className="p-1 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-400 hover:text-white rounded focus:outline-none focus:ring-2 focus:ring-civic-accent -mr-2 -mt-2"
                  aria-label="Close details"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 bg-civic-navy/50">
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {node.description}
                </p>
                <div className="bg-civic-elevated p-3 rounded-lg border border-civic-border">
                  <p className="text-xs text-gray-400 leading-relaxed whitespace-pre-wrap">
                    {node.expandedContent}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function formatDate(dateStr: string) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch (e) {
    return dateStr;
  }
}
