import React, { useState } from "react";

interface Article {
  id: number;
  title: string;
  thumbnail: string;
  sport: {
    id: number;
    name: string;
  };
  date: string;
  summary: string;
}

interface Team {
  id: number;
  name: string;
  plays: string;
}
interface Sport {
  id: number;
  name: string;
}

interface FavoriteComponentProps {
  articles: Article[];
  sports: Sport[];
  teams: Team[];
}

const FavoriteComponent: React.FC<FavoriteComponentProps> = ({
  articles,
  sports,
  teams,
}) => {
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");

  let filteredArticles = articles.filter((article) => {
    if (selectedSport) {
      return article.sport.name === selectedSport;
    }
    if (selectedTeam) {
      const teamPlaysSport = teams.find(
        (team) => team.name === selectedTeam
      )?.plays;
      return article.sport.name === teamPlaysSport;
    }
    return true;
  });
  if (!selectedSport && !selectedTeam) {
    filteredArticles = filteredArticles.slice(0, 5);
    console.log(articles.length);
  }

  return (
    <div className="flex flex-col w-full p-4 border-l bg-gray-300 md:w-1/4">
      <h2 className="text-xl font-semibold mb-4">Favorites</h2>
      <div className="mb-4">
        <select
          className="ml-2 border border-gray-300 rounded-md p-1"
          value={selectedSport}
          onChange={(e) => setSelectedSport(e.target.value)}
        >
          <option value="">Select Sport</option>
          {sports.map((sport) => (
            <option key={sport.id} value={sport.name}>
              {sport.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          className="ml-2 border border-gray-300 rounded-md p-1"
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
        >
          <option value="">Select Team</option>
          {teams.map((team) => (
            <option key={team.id} value={team.name}>
              {team.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4">
        <ul>
          {filteredArticles.map((article) => (
            <li
              key={article.id}
              className="bg-white rounded-lg shadow-md p-4 mb-4"
            >
              <p className="text-lg font-medium">{article.title}</p>
              <p className="text-gray-600">{article.summary}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FavoriteComponent;
