import "./App.css";
import { useEffect, useMemo, useState } from "react";
import Start from "./components/Start";
import Timer from "./components/Timer";
import Trivia from "./components/Trivia";
import { data } from "./data";

function App() {
  const [username, setUsername] = useState(null);
  const [timeOut, setTimeOut] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [earned, setEarned] = useState("$ 0");


  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "Point: 100" },
        { id: 2, amount: "Point: 200" },
        { id: 3, amount: "Point: 300" },
        { id: 4, amount: "Point: 500" },
        { id: 5, amount: "Point: 1,000" },
        { id: 6, amount: "Point: 2,000" },
        { id: 7, amount: "Point: 4,000" },
        { id: 8, amount: "Point: 8,000" },
        { id: 9, amount: "Point: 16,000" },
        { id: 10, amount: "Point: 32,000" },
        { id: 11, amount: "Point: 64,000" },
        { id: 12, amount: "Point: 125,000" },
        { id: 13, amount: "Point: 250,000" },
        { id: 14, amount: "Point: 500,000" },
        { id: 15, amount: "Point: 1,000,000" },
      ].reverse(),
    []
  );

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [questionNumber, moneyPyramid]);

  return (
    <div className="app">
      {!username ? (
        <Start setUsername={setUsername} />
      ) : (
        <>
          <div className="main">
            {timeOut ? (
              <h1 className="endText">You earned: {earned}</h1>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer
                      setTimeOut={setTimeOut}
                      questionNumber={questionNumber}
                    />
                  </div>
                </div>
                <div className="bottom">
                  <Trivia
                    data={data}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                    setTimeOut={setTimeOut}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="moneyList">
              {moneyPyramid.map((m) => (
                <li
                  className={
                    questionNumber === m.id
                      ? "moneyListItem active"
                      : "moneyListItem"
                  }
                >
                  <span className="moneyListItemNumber">{m.id}</span>
                  <span className="moneyListItemAmount">{m.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
