import { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  const [data, setData] = useState("");
  const [query, setQuery] = useState();
  const [search, setSearch] = useState("Robert Lewandowski");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);

      try {
        const result = await axios(
          `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${search}`
        );
        setData(result.data.player[0]);
      } catch (error) {
        setIsError(true);
      }
    };

    fetchData();
    console.log(data);
  }, [search]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center bg-blue-400 lg:w-screen w-full lg:mx-auto lg:p-20 p-8">
        <h1 className="lg:text-[50px] text-[32px] text-gray-200 font-bold lg:w-1/2 mb-12">
          <span className="text-violet-800">The Ultimate</span> Football Players
          Database
        </h1>
        <input
          className="bg-white lg:w-1/2 w-80 lg:p-6 px-8 py-4 mb-6 rounded-lg focus:outline-none"
          placeholder="Search Name"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="bg-blue-700 hover:bg-blue-600 hover:scale-105 text-white lg:px-16 px-28 py-4 rounded-xl"
          onClick={() => setSearch(query)}
        >
          Search
        </button>
      </div>

      {isError && (
        <div className="text-2xl bg-red-300 p-6 rounded-lg m-4">
          Ahh merde, something went wrong...
          <span className="font-bold">
            try full, correct name of the player
          </span>
        </div>
      )}

      {/* Results */}
      <div className="flex lg:flex-row flex-col justify-between mt-10 lg:w-[80%] w-92">
        <div className="flex m-4 items-center lg:w-1/2">
          <p className="first-letter:text-4xl first-letter:font-bold text-xl">
            {data.strDescriptionEN}
          </p>
        </div>
        <div className="flex flex-col justify-evenly">
          <div>
            <img src={data.strCutout} className="h-38" />
          </div>
          <div className="flex flex-col">
            <ul className="m-4">
              <li className="text-xl font-bold">
                Name: <span className="font-normal">{data.strPlayer}</span>
              </li>
              <li className="text-xl font-bold">
                DOB: <span className="font-normal">{data.dateBorn}</span>
              </li>
              <li className="text-xl font-bold">
                Manager's name:{'&apos;'}
                <span className="font-normal">{data.strAgent}</span>
              </li>
              <li className="text-xl font-bold">
                Height: <span className="font-normal">{data.strHeight}</span>
              </li>
              <li className="text-xl font-bold">
                Weight: <span className="font-normal">{data.strWeight}</span>
              </li>
              <li className="text-xl font-bold">
                Nationality:{" "}
                <span className="font-normal">{data.strNationality}</span>
              </li>
              <li className="text-xl font-bold">
                Foot: <span className="font-normal">{data.strSide}</span>
              </li>
              <li className="text-xl font-bold">
                Position:{" "}
                <span className="font-normal">{data.strPosition}</span>
              </li>
            </ul>
          </div>
          
        </div>
      </div>

      {/* Footer */}
      <footer className="h-20 w-full bg-blue-400 text-center">
        <h1 className="text-2xl mt-6">
          Created by <a className="text-2xl font-bold cursor-pointer" href="https://www.piotrmaciejewski.com" target="_blank" rel="noreferrer">Piotr</a>
        </h1>
      </footer>
    </div>
  );
}
