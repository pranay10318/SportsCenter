import React, { useEffect, useState } from "react";
import { API_ENDPOINT } from "../config/constants";

interface Match {
  id: number;
  name: string;
  location: string;
  sportName: string;
  endsAt: string;
  isRunning: boolean;
  teams: Team[];
  score: Record<string, string>;
}

interface Team {
  id: number;
  name: string;
}

const LiveMatches: React.FC = () => {
  const [liveMatches, setLiveMatches] = useState<Match[]>([]);

  useEffect(() => {
    const fetchLiveMatches = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/matches`);
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data: { matches: Match[] } = await response.json();

        // Filter live matches based on the isRunning property
        const liveMatchesData = data.matches.filter((match) => match.isRunning);

        // Fetch details for each live match
        const liveMatchesDetails = await Promise.all(
          liveMatchesData.map(async (match) => {
            const matchDetailsResponse = await fetch(
              `${API_ENDPOINT}/matches/${match.id}`
            );
            if (!matchDetailsResponse.ok) {
              throw new Error("Network response for match details was not ok.");
            }
            return matchDetailsResponse.json();
          })
        );

        setLiveMatches(liveMatchesDetails);
      } catch (error) {
        console.error("Error fetching live matches:", error);
      }
    };

    fetchLiveMatches();
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-4">Live Matches</h2>
      <div className="overflow-x-auto">
        <div className="flex">
          {liveMatches.map((match) => (
            <div
              key={match.id}
              className="shadow-md p-4 mr-4 bg-gray-100 border border-10 border-black-900"
              style={{ minWidth: "300px" }}
            >
              <p className="text-xl font-semibold">{match.sportName}</p>
              <p className="text-lg font-medium">{match.name}</p>
              <div className="flex justify-between">
                <p>{match.teams[0].name}</p> <p>{match.score[match.teams[0].name]}</p>
              </div>
              <div className="flex justify-between">
                <p>{match.teams[1].name}</p> <p>{match.score[match.teams[1].name]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveMatches;
