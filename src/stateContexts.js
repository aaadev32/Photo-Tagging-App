import { createContext } from "react";

const difficulty = localStorage.getItem("difficulty");
const DifficultyContext = createContext(difficulty);

export { DifficultyContext };