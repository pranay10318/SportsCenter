import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { API_ENDPOINT } from "../config/constants";
// import { PreferenceContext } from "../context/preference";
import { usePreferencesDispatch } from "../context/preferences/context";
import { updatePreferences } from "../context/preferences/actions";

interface Team {
  id: number;
  name: string;
  plays: string;
}
interface Sport {
  id: number;
  name: string;
}

const PreferencesDialog: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [favoriteSports, setFavoriteSports] = useState<string[]>([]);
  const [favoriteTeams, setFavoriteTeams] = useState<string[]>([]);
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const authToken = localStorage.getItem("authToken");

  // const { setPreferences } = useContext(PreferenceContext);
  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/sports`);
        if (response.ok) {
          const data = await response.json();
          const dataArr = data.sports;
          const sports = dataArr.map((sport: Sport) => sport.name);
          setFavoriteSports(sports);
        }
      } catch (error) {
        console.error("Error fetching favorite sports:", error);
      }
    };
    fetchSports();

    const fetchPreferences = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          const preferences = data.preferences;

          if (preferences && preferences.favoriteSports) {
            setSelectedSports(preferences.favoriteSports);
          }

          if (preferences && preferences.favoriteTeams) {
            setSelectedTeams(preferences.favoriteTeams);
          }

          console.log(preferences);
        }
      } catch (error) {
        console.error("Error fetching preferences:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPreferences();

    const fetchTeams = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/teams`);
        if (response.ok) {
          const data = await response.json();
          const teams = data.map((team: Team) => team.name);
          setFavoriteTeams(teams);
        }
      } catch (error) {
        console.error("Error fetching favorite teams:", error);
      }
    };
    fetchTeams();
  }, [isOpen, loading, authToken]);

  // const openModal = () => {
  //   setIsOpen(true);
  // };

  const closeModal = () => {
    setIsOpen(false);
  };
  const dispatch = usePreferencesDispatch();
  // const preferences:any = usePreferencesState();
  const handleSavePreferences = async () => {
    const updatedPreferences = {
      favoriteSports: selectedSports,
      favoriteTeams: selectedTeams,
    };
  
    try {
      updatePreferences(dispatch, updatedPreferences); // Dispatch the action
  
      // The rest of your code remains the same
      closeModal();
  
    } catch (error) {
      console.error("Error updating preferences:", error);
    }
  };
  

  const handleSportCheckboxChange = (sport: string) => {
    setSelectedSports((prevSelectedSports) => {
      if (prevSelectedSports.includes(sport)) {
        return prevSelectedSports.filter((s) => s !== sport);
      } else {
        return [...prevSelectedSports, sport];
      }
    });
  };

  const handleTeamCheckboxChange = (team: string) => {
    setSelectedTeams((prevSelectedTeams) => {
      if (prevSelectedTeams.includes(team)) {
        return prevSelectedTeams.filter((t) => t !== team);
      } else {
        return [...prevSelectedTeams, team];
      }
    });
  };

  return (
    <>
      {/* <button onClick={openModal}>Open Preferences</button> */}

      <Transition appear show={isOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
            </Transition.Child>

            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Preferences
                </h3>
                <div className="mt-4 flex flex-wrap">
                  <div className="mr-4">
                    <h4 className="text-md font-medium leading-6 text-gray-700">
                      Favorite Sports
                    </h4>
                    <div className="flex flex-wrap space-x-2">
                      {favoriteSports.map((sport) => (
                        <label
                          key={sport}
                          className="flex items-center mr-4 mb-2"
                        >
                          <input
                            type="checkbox"
                            value={sport}
                            checked={selectedSports.includes(sport)}
                            onChange={() => handleSportCheckboxChange(sport)}
                            className="form-checkbox h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                          />
                          <span className="ml-2">{sport}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-md font-medium leading-6 text-gray-700">
                      Favorite Teams
                    </h4>
                    <div className="flex flex-wrap space-x-2">
                      {favoriteTeams.map((team) => (
                        <label
                          key={team}
                          className="flex items-center mr-4 mb-2"
                        >
                          <input
                            type="checkbox"
                            value={team}
                            checked={selectedTeams.includes(team)}
                            onChange={() => handleTeamCheckboxChange(team)}
                            className="form-checkbox h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                          />
                          <span className="ml-2">{team}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    onClick={handleSavePreferences}
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  >
                    Save
                  </button>
                  <button
                    onClick={closeModal}
                    className="inline-flex justify-center px-4 py-2 ml-2 text-sm font-medium text-gray-700 bg-gray-200 border border-transparent rounded-md hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default PreferencesDialog;
