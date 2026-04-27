/**
 * useTimeline Hook — Fetches timeline data, manages selected node state
 */
import { useState, useEffect } from 'react';
import { useSettingsStore } from '../store/settings.store';
import { fetchTimeline } from '../utils/api';
import type { TimelineNode, Country } from '../types';

// Fallback static data just in case
const FALLBACK_NODES: TimelineNode[] = [
  {
    id: "node_schedule",
    label: "Schedule Announced",
    date: "2024-03-16",
    description: "The Election Commission of India announces the election schedule.",
    expandedContent: "Dates for nominations, polling, and counting are released. Model Code of Conduct comes into force immediately.",
    icon: "📋",
    color: "blue-500",
    position: 1
  },
  {
    id: "node_mcc",
    label: "MCC Begins",
    date: "2024-03-16",
    description: "Model Code of Conduct comes into force.",
    expandedContent: "Government cannot announce new welfare schemes or use government vehicles for campaigns.",
    icon: "📜",
    color: "amber-500",
    position: 2
  },
  {
    id: "node_polling",
    label: "Phase 1 Voting",
    date: "2024-04-19",
    description: "First phase of polling begins across 102 constituencies.",
    expandedContent: "Voters cast their vote using EVMs. VVPAT slips provide paper audit trail.",
    icon: "🗳️",
    color: "saffron",
    position: 3
  },
  {
    id: "node_counting",
    label: "Results Declared",
    date: "2024-06-04",
    description: "Counting of votes and declaration of results.",
    expandedContent: "Votes from EVMs and postal ballots are counted under strict security. Winners are declared by the Returning Officer.",
    icon: "📣",
    color: "green-500",
    position: 11
  }
];

/**
 * @description Custom hook to fetch and manage timeline node states for a specific election
 * @param {Country | string} country - The country code for the timeline
 * @param {string} year - The election year
 * @returns {object} Timeline state (nodes, selectedNodeId, selectNode, isLoading, error)
 * @throws {Error} Never throws, falls back to static data on failure
 */
export function useTimeline(country: Country | string, year: string) {
  const { setAppState } = useSettingsStore();
  const [nodes, setNodes] = useState<TimelineNode[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    async function load() {
      try {
        const data = await fetchTimeline(country as Country, parseInt(year, 10));
        if (isMounted) {
          setNodes(data.nodes || FALLBACK_NODES);
          setError(null);
        }
      } catch (err) {
        console.error("Timeline error:", err);
        if (isMounted) {
          setNodes(FALLBACK_NODES); // Graceful degradation
          // Optionally trigger offline fallback globally:
          // setAppState('OFFLINE_FALLBACK');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [country, year, setAppState]);

  const selectNode = (id: string | null) => {
    setSelectedNodeId(id);
  };

  return { nodes, selectedNodeId, selectNode, isLoading, error };
}
