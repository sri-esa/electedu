import { useEffect, useState } from 'react';
import { TimelineNode } from './TimelineNode';
import { useTimeline } from '../../hooks/useTimeline';

export function ElectionTimeline() {
  const { nodes, selectedNodeId, selectNode, isLoading, error } = useTimeline('india', '2024');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-civic-navy p-4">
        <div className="animate-pulse flex space-x-4">
          <div className="w-12 h-12 bg-civic-card rounded-full"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-civic-card rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-civic-card rounded"></div>
              <div className="h-4 bg-civic-card rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-civic-navy p-4 text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold text-white mb-2">Could not load timeline</h2>
        <p className="text-gray-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-civic-navy overflow-hidden">
      <div className="p-6 md:p-8 shrink-0">
        <h1 className="text-2xl md:text-[2.5rem] font-bold text-white tracking-tight">Election Timeline</h1>
        <div className="flex items-center space-x-3 mt-2">
          <span className="text-gray-400">Showing key events for:</span>
          <select 
            className="bg-civic-card text-white border border-civic-border rounded-md px-3 py-1.5 text-sm min-h-[44px] focus:outline-none focus:ring-2 focus:ring-civic-accent"
            aria-label="Select election year"
          >
            <option value="2024">2024 Lok Sabha</option>
            <option value="2019" disabled>2019 (Coming soon)</option>
          </select>
        </div>
      </div>

      <div 
        className="flex-1 overflow-x-auto overflow-y-auto custom-scrollbar px-6 md:px-8 pb-12 relative"
        role="list"
        aria-label="Timeline of election events"
      >
        <div className="min-w-max min-h-[300px] flex items-start pt-20">
          <div className="relative flex items-start w-full">
            {/* Connecting Track */}
            <div className="absolute top-[24px] left-0 right-0 h-0.5 bg-civic-border -z-10" />

            {nodes.map((node, index) => (
              <TimelineNode 
                key={node.id} 
                node={node} 
                isExpanded={selectedNodeId === node.id}
                onToggle={() => selectNode(selectedNodeId === node.id ? null : node.id)}
                delay={mounted ? index * 100 : 0}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
