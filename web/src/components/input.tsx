import React, { useState, useEffect } from "react";
import Figure from "./figure";
import fetchMovieData from "../pages/api/fetchMovieData";

const Input = () => {
  const [title, setTitle] = useState<string>("");
  const [overview, setOverview] = useState<string>("");
  const [releaseDate, setReleaseDate] = useState<string>("");

  const [guessedChars, setGuessedChars] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState<number>(0);

  const handleKeyUp = (e: { key: string }) => {
    const newTitle = title.toLowerCase().replace(/\s/g, "").split("");
    const pressedKey = e.key.toLowerCase();

    console.log("the guessed characters:", guessedChars);
    console.log("you guessed:", pressedKey);
    console.log("newTitle:", newTitle);

    if (guessedChars.includes(pressedKey)) {
      console.log("already guessed");
    } else if (newTitle.includes(pressedKey)) {
      console.log("correct");
    } else {
      console.log("wrong");
      setMistakes(mistakes + 1);
      console.log("mistakes made : " + mistakes);
    }
    setGuessedChars((prevGuessedChars) => prevGuessedChars.concat(pressedKey));
  };

  useEffect(() => {
    fetchMovieData().then((filteredData) => {
      setTitle(filteredData[0].title.toLowerCase().replace(/\s/g, ""));
      setOverview(filteredData[0].overview);
      setReleaseDate(filteredData[0].release_date);
    });

    console.log("amogus");
  }, []);

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);

    // cleanup
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [title, guessedChars]);

  const maskedTitle = (title: string) => {
    return title
      .split("")
      .map((char) => {
        if (guessedChars.includes(char)) {
          return char;
        } else {
          return "_";
        }
      })
      .join(" ");
  };

  const checkGameStatus = () => {
    // check if won
    if (maskedTitle(title) === title) {
      console.log("won");
    } else if (mistakes >= 6) {
      console.log("lost");
    } else {
      console.log("playing");
    }
  };

  checkGameStatus();

  return (
    <div>
      <Figure wrongGuesses={mistakes} />
      <p>{maskedTitle(title)}</p>
      <p>overview : {overview}</p>
      <p>release date : {releaseDate}</p>
    </div>
  );
};

export default Input;
