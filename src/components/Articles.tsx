import React, { useEffect, useState } from "react";
import { API_ENDPOINT } from "../config/constants";
import FavoriteComponent from "./FavoriteComponent";

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

const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [sports, setSports] = useState<{ id: number; name: string }[]>([]);
  const [teams, setTeams] = useState<
    { id: number; name: string; plays: string }[]
  >([]); // Add teams state

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/articles`);
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        setArticles(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/sports`);
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        setSports(data.sports);
      } catch (error) {
        console.error("Error fetching sports:", error);
      }
    };

    fetchSports();
  }, []);
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/teams`);
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []); // Fetch teams data

  const filteredArticles = selectedSport
    ? articles.filter((article) => article.sport.name === selectedSport)
    : articles;

  return (
    <div className="p-5 ">
    <h2 className="text-2xl font-semibold mb-4">Trending News</h2>
    <div className="flex article-list-container ">
      <div className="w-full md:w-3/4 bg-gray-100">
        <div className="mb-4">
          <select
            className="ml-2 border border-gray-300 rounded-md p-1"
            onChange={(e) => setSelectedSport(e.target.value)}
          >
            <option value="">All Sports</option>
            {sports.map((sport) => (
              <option key={sport.id} value={sport.name}>
                {sport.name}
              </option>
            ))}
          </select>
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-lg shadow-md p-4 mb-4 flex flex-col md:flex-row"
              >
                <div className="w-full md:w-2/3 md:pr-4">
                  <p className="text-lg font-medium">{article.title}</p>
                  <p className="text-gray-600">{article.summary}</p>
                  <p className="text-gray-400 mt-2">
                    Date: {new Date(article.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="w-full md:w-1/3 mt-4 md:mt-0">
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <FavoriteComponent articles={articles} sports={sports} teams={teams} />{" "}
      {/* Add FavoriteComponent */}
    </div>
    </div>
  );
};

export default ArticleList;
