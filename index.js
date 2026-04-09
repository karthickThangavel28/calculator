const { useState } = React;

function CalculatorApp() {
  const [display, setDisplay] = useState("");
  const [history, setHistory] = useState([]);

  const appendValue = (value) => {
    if (value === "+/-") {
      if (!display) return;
      if (display.startsWith("-")) {
        setDisplay(display.slice(1));
      } else {
        setDisplay(`-${display}`);
      }
      return;
    }

    setDisplay((prev) => prev + value);
  };

  const clearAll = () => setDisplay("");

  const clearOne = () => setDisplay((prev) => prev.slice(0, -1));

  const evaluateExpression = () => {
    if (!display.trim()) return;

    try {
      const result = Function(`"use strict"; return (${display})`)();

      if (typeof result !== "number" || Number.isNaN(result) || !Number.isFinite(result)) {
        throw new Error("Invalid result");
      }

      const entry = `${display} = ${result}`;
      setHistory((prev) => [...prev, entry]);
      setDisplay(String(result));
    } catch {
      setDisplay("invalid");
      setTimeout(() => setDisplay(""), 1500);
    }
  };

  const buttons = [
    { label: "AC", onClick: clearAll, kind: "symbol" },
    { label: "←", onClick: clearOne, kind: "symbol" },
    { label: "+/-", onClick: () => appendValue("+/-"), kind: "symbol" },
    { label: "/", onClick: () => appendValue("/"), kind: "symbol" },
    { label: "7", onClick: () => appendValue("7") },
    { label: "8", onClick: () => appendValue("8") },
    { label: "9", onClick: () => appendValue("9") },
    { label: "*", onClick: () => appendValue("*"), kind: "symbol" },
    { label: "4", onClick: () => appendValue("4") },
    { label: "5", onClick: () => appendValue("5") },
    { label: "6", onClick: () => appendValue("6") },
    { label: "-", onClick: () => appendValue("-"), kind: "symbol" },
    { label: "1", onClick: () => appendValue("1") },
    { label: "2", onClick: () => appendValue("2") },
    { label: "3", onClick: () => appendValue("3") },
    { label: "+", onClick: () => appendValue("+"), kind: "symbol" },
    { label: "%", onClick: () => appendValue("%"), kind: "symbol" },
    { label: "0", onClick: () => appendValue("0") },
    { label: ".", onClick: () => appendValue(".") },
    { label: "=", onClick: evaluateExpression, kind: "active" }
  ];

  return (
    <div className="con">
      <div className="cal">
        <div className="header">
          <p>CALCULATOR</p>
        </div>

        <input type="text" value={display} readOnly />

        {buttons.map((button) => (
          <button
            key={button.label}
            className={button.kind || ""}
            onClick={button.onClick}
          >
            {button.label}
          </button>
        ))}
      </div>

      <div className="all-his">
        <div id="history">
          <h1>history</h1>
          <ul id="display">
            {history.map((entry, idx) => (
              <li key={`${entry}-${idx}`}>{entry}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<CalculatorApp />);
