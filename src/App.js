import "./App.css";
import { useState } from "react";
import { evaluate } from "mathjs";

function App() {
  const calcButtons = [
    ["(", ")", " ^ ", " AC "],
    ["7", "8", "9", " / "],
    ["4", "5", "6", " * "],
    ["1", "2", "3", " - "],
    ["0", ".", " = ", " + "],
  ];
  const [windowValue, setWindowValue] = useState("");

  const handleClick = (value) => {
    setWindowValue(windowValue + value);
    if (value === " = ") {
      setWindowValue(evaluate(windowValue));
    }
    if (value === " AC ") {
      setWindowValue("");
    }
  };
  const handleKeyDown = (e) => {
    let key = e.key;
    console.log(key);      
    if (key === `=` || key === `Enter`) {
        setWindowValue(evaluate(windowValue));
      }
      if (key === `Backspace`) {
        setWindowValue("");
      }
    const regex =
      /[0-9]|[+]|[-]|[(]|[)]|[*]|[/]|[\^]|\./;
    if (!regex.test(key)) {
      e.preventDefault();
    } else {
      setWindowValue(windowValue + key);
    }
  };

  return (
    <div className="calculator">
      <div className="window">
        <input
          className="input"
          name="input"
          onKeyDown={(e) => handleKeyDown(e)}
          value={windowValue}
        />
      </div>
      <div className="buttons">
        {calcButtons.flat().map((calcButtons, index) => {
          return (
            <Button
              key={index}
              label={calcButtons}
              click={() => handleClick(calcButtons)}
            />
          );
        })}
      </div>
    </div>
  );
}

const Button = (props) => {
  return (
    <div>
      <button onClick={props.click}>{props.label}</button>
    </div>
  );
};
export default App;
