import React, { useState } from "react";
import { useArticlesState } from "../context/articles/context";
import ReadMoreDialog from "./ReadMoreDialog";
import { API_ENDPOINT } from "../config/constants";
import { Article } from "../context/types";

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
  sports: Sport[];
  teams: Team[];
}

const FavoriteComponent: React.FC<FavoriteComponentProps> = ({
  sports,
  teams,
}) => {
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const state: any = useArticlesState();
  const { articles, isLoading} = state;

  let filteredArticles = articles.filter((article: Article) => {
    let bul = false;
    if (selectedSport) {
      bul ||= (article.sport.name === selectedSport);
    }
    if (selectedTeam) {
      const teamPlaysSport = teams.find(
        (team) => team.name === selectedTeam
      )?.plays;
      bul ||= (article.sport.name === teamPlaysSport);
    }
    return bul;
  });
  if (!selectedSport && !selectedTeam) {
    filteredArticles = filteredArticles.slice(0, 5);
    console.log(articles.length);
  }

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const handleReadMore = async (articleId: number) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/articles/${articleId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      setSelectedArticle(data);
    } catch (error) {
      console.error("Error fetching article content:", error);
    }
  };

  const handleCloseDialog = () => {
    setSelectedArticle(null);
  };

  return (
    <div className="flex flex-col w-full p-4 border-l bg-gray-300 md:w-1/4">
      <h2 className="text-xl font-semibold mb-4">Favorites</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
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
              {filteredArticles.map((article: Article) => (
                <li
                  key={article.id}
                  className="bg-white rounded-lg shadow-md p-4 mb-4"
                >
                  <p className="text-lg font-medium">{article.title}</p>
                  <p className="text-gray-600">{article.summary}</p>
                  <button
                    className="text-blue-500 underline mt-2 cursor-pointer"
                    onClick={() => handleReadMore(article.id)}
                  >
                    Read More
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <ReadMoreDialog
            isOpen={selectedArticle !== null}
            onClose={handleCloseDialog}
            selectedArticle={selectedArticle}
          />
        </>
      )}
    </div>
  );
};

export default FavoriteComponent;
