import React, { useEffect, useState } from "react";
import { API_ENDPOINT } from "../config/constants";
import FavoriteComponent from "./FavoriteComponent";
import {
  useArticlesDispatch,
  useArticlesState,
} from "../context/articles/context";
import { Article, Sport, Team } from "../context/types";
import {
  usePreferencesDispatch,
  usePreferencesState,
} from "../context/preferences/context";
import { fetchArticles } from "../context/articles/actions";
import { fetchPreferences } from "../context/preferences/actions";
import ReadMoreDialog from "./ReadMoreDialog";

// interface Article {
//   id: number;
//   title: string;
//   thumbnail: string;
//   sport: {
//     id: number;
//     name: string;
//   };
//   date: string;
//   summary: string;
// }

const ArticleList: React.FC = () => {
  // const [articles, setArticles] = useState<Article[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [sports, setSports] = useState<Sport[]>([]);
  const [teams, setTeams] = useState<Team[]>([]); // Add teams state
  const authToken = localStorage.getItem('authToken')

  // useEffect(() => {
  //   const fetchArticles = async () => {
  //     try {
  //       const response = await fetch(`${API_ENDPOINT}/articles`);
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok.");
  //       }
  //       const data = await response.json();
  //       setArticles(data);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching articles:", error);
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchArticles();
  // }, []);

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
  const d1 = useArticlesDispatch();
  const d2 = usePreferencesDispatch();
  useEffect(() => {
    fetchArticles(d1);
    if(authToken)
    fetchPreferences(d2);
  }, [d1, d2, authToken]);

  const state: any = useArticlesState();
  const { articles, isLoading} = state;

  const prefState: any = usePreferencesState();
  const { preferences} = prefState;
  const {favoriteSports, favoriteTeams} = preferences;
  const [filteredArticles, setFilteredArticles] = useState<string[]>([]);
  // const [refresh, setRefresh] = useState<number>(0);

  // const handleRefresh = ()=> {
  //   setRefresh(refresh^1);
  // }
  // useEffect(()=> { console.log("refresh updated..")}, [refresh])

  useEffect(()=> {
    console.log("article filetering started .. !\n")
    const f = articles.filter((article: Article) => {
    const articleTeams = article.teams.map((team) => team.name);
      if (selectedSport === "YourNews") {
        // console.log(favoriteSports, " +  ", favoriteTeams , " came form ->  " , prefState);
        return (
          articleTeams.some((team) => favoriteTeams.includes(team)) ||
          favoriteSports.includes(article.sport.name)
          );
        }
        return article.sport.name === selectedSport;
      })
      setFilteredArticles(f);
    }, [preferences, selectedSport]);

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
    // useEffect(()=>{
    //   console.log("state changed..!");
    //   console.log(favoriteSports);
    // });
    // useEffect(()=>{
    //   console.log("state changed.. for articles  !");

    // }, [articles]);
    // useEffect(()=>{
    //   console.log("state changed.. for selected stuff  !");

    // }, [selectedSport]);
    
    
    
    const handleCloseDialog = () => {
      setSelectedArticle(null);
    };

  return (
    <div className="p-5 ">
      <h2 className="text-2xl font-semibold mb-4">Trending News</h2>
        {/* <button onClick={handleRefresh}>refresh</button> */}
      <div className="flex article-list-container ">
        <div className="w-full md:w-3/4 bg-gray-100">
          <div className="mb-4">
            <select
              className="ml-2 border border-gray-300 rounded-md p-1"
              onChange={(e) => setSelectedSport(e.target.value)}
            >
              <option value="">Select Sport</option>
              {authToken && <option value="YourNews">YOur news</option>}
              
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
              {filteredArticles.map((article: any)=> (
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
                    <button
                    className="text-blue-500 underline mt-2 cursor-pointer"
                    onClick={() => handleReadMore(article.id)}
                  >
                    Read More
                  </button>
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
        <FavoriteComponent sports={sports} teams={teams} />{" "}
        <ReadMoreDialog
            isOpen={selectedArticle !== null}
            onClose={handleCloseDialog}
            selectedArticle={selectedArticle}
          />
      </div>
    </div>
  );
};

export default ArticleList;
