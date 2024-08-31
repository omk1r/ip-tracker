import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Map from './component/Map';

function App() {
  const [ipAddress, setIpAddress] = useState('');
  const [Location, setLocation] = useState({});
  const [isFetched, setIsFetched] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const API = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 546); // Adjust the width threshold as needed
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize the state on mount

    fetchIPDetails();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchIPDetails = async () => {
    try {
      setIsFetched(false);
      setLocation({});
      const response = await axios.get(
        `https://geo.ipify.org/api/v2/country,city?`,
        {
          params: {
            apiKey: API,
            ipAddress: ipAddress,
          },
        }
      );
      setLocation(response.data);
      console.log(response.data);
      setIsFetched(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-500 relative">
      <div>
        <img
          src={
            isMobile
              ? '/src/assets/images/pattern-bg-mobile.png'
              : '/src/assets/images/pattern-bg-desktop.png'
          }
          alt="Background pattern"
          className="w-full relative"
        />
      </div>
      <div className="absolute top-2 flex flex-col justify-center items-center w-full text-white z-20">
        <span className="text-3xl font-semibold mt-4">IP Address Tracker</span>
        <div className="relative w-[90%] sm:w-2/3 max-w-md mt-6 mb-6">
          <input
            type="search"
            id="default-search"
            className="block w-full p-3 ps-4 text-gray-900 border border-gray-300 rounded-xl bg-white focus:ring-blue-500 focus:border-blue-500 text-[18px]"
            placeholder="Search for any IP address or domain"
            required
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
          />
          <button
            type="submit"
            className="text-white absolute end-0 bottom-0 bg-VeryDarkGray hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-xl text-sm px-4 py-5"
            onClick={() => fetchIPDetails()}
          >
            <img src="/src/assets/images/icon-arrow.svg" alt="Search" />
          </button>
        </div>
        {isFetched && Location.location && (
          <div className="bg-white py-6 w-[90%] lg:w-3/4 flex md:flex-row flex-col rounded-lg mt-4 font-bold text-center">
            <div className="md:w-1/4 w-full mt-4 sm:border-r-2 px-8">
              <span className="text-DarkGray block text-sm tracking-widest sm:mb-2">
                IP ADDRESS
              </span>
              <span className="text-VeryDarkGray text-2xl">{Location.ip}</span>
            </div>
            <div className="md:w-1/4 w-full mt-4 sm:border-r-2 px-8">
              <span className="text-DarkGray block text-sm tracking-widest sm:mb-2">
                LOCATION
              </span>
              <span className="text-VeryDarkGray text-2xl">
                {Location.location.city}
              </span>
            </div>
            <div className="md:w-1/4 w-full mt-4 sm:border-r-2 px-8">
              <span className="text-DarkGray block text-sm tracking-widest sm:mb-2">
                TIMEZONE
              </span>
              <span className="text-VeryDarkGray text-2xl">
                UTC{Location.location.timezone}
              </span>
            </div>
            <div className="md:w-1/4 w-full mt-4 sm:border-r-2 px-8">
              <span className="text-DarkGray block text-sm tracking-widest sm:mb-2">
                ISP
              </span>
              <span className="text-VeryDarkGray text-2xl">{Location.isp}</span>
            </div>
          </div>
        )}
      </div>
      <div className="relative bottom-0 left-0 right-0 z-10">
        {isFetched && Location.location && (
          <Map lat={Location.location.lat} lng={Location.location.lng} />
        )}
      </div>
    </div>
  );
}

export default App;
