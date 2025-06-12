import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const stakeOptions = [0.1, 0.2, 0.5, 1, 2, 5];
const colors = ["Red", "Blue", "Green"];

const Header = () => (
  <header className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-4 shadow-xl text-center text-2xl font-bold">
    🎨 Color Betting Game
  </header>
);

const ColorCard = ({ color, selected, onSelect, winPercent, coinCount }) => (
  <div
    className={`cursor-pointer p-4 rounded-2xl shadow-md transition-all text-white text-center font-semibold text-lg ${
      color === "Red"
        ? "bg-red-500"
        : color === "Blue"
        ? "bg-blue-500"
        : "bg-green-500"
    } ${selected ? "ring-4 ring-yellow-300" : "hover:opacity-90"}`}
    onClick={() => onSelect(color)}
  >
    {color}
    <div className="text-sm font-normal mt-2">
      {winPercent}% wins<br />
      {coinCount} coins
    </div>
  </div>
);

const GamePage = () => {
  const [round, setRound] = useState(1);
  const [timer, setTimer] = useState(120);
  const [selectedColor, setSelectedColor] = useState(null);
  const [stake, setStake] = useState(0.1);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setRound((r) => r + 1);
          return 120;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between text-gray-600 text-sm mb-4">
        <div>👥 Online Users: 23</div>
        <div>🎯 Round #{round}</div>
        <div>
          ⏳ Time Left: {Math.floor(timer / 60)}:
          {String(timer % 60).padStart(2, "0")}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {colors.map((color) => (
          <ColorCard
            key={color}
            color={color}
            selected={selectedColor === color}
            onSelect={setSelectedColor}
            winPercent={Math.floor(Math.random() * 100)}
            coinCount={Math.floor(Math.random() * 100)}
          />
        ))}
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-2">Stake Amount:</label>
        <div className="flex gap-2 flex-wrap">
          {stakeOptions.map((s) => (
            <button
              key={s}
              onClick={() => setStake(s)}
              className={`px-4 py-2 rounded-full border ${
                stake === s
                  ? "bg-yellow-300 text-black font-bold"
                  : "bg-white hover:bg-gray-200"
              }`}
            >
              {s} 💰
            </button>
          ))}
        </div>
      </div>

      <button
        disabled={!selectedColor}
        className={`w-full py-3 text-lg font-bold rounded-xl transition-all ${
          selectedColor
            ? "bg-indigo-600 hover:bg-indigo-700 text-white"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        {selectedColor
          ? `Submit (${stake} on ${selectedColor})`
          : "Select a color to play"}
      </button>
    </div>
  );
};

const RulesPage = () => (
  <div className="max-w-3xl p-6 mx-auto text-gray-700">
    <h2 className="text-2xl font-bold mb-4">📄 How to Play</h2>
    <ul className="list-disc ml-5 space-y-2">
      <li>Select one of the three colors: Red, Blue, or Green.</li>
      <li>Choose a stake amount: 0.1 to 5 coins.</li>
      <li>Each round lasts 2 minutes. A winning color is randomly chosen.</li>
      <li>If your color wins, you earn 2x your stake!</li>
      <li>Keep track of your game and betting history.</li>
    </ul>
    <div className="mt-4 p-3 bg-yellow-100 border-l-4 border-yellow-500">
      🎯 Tip: Bet smart. This is a game of chance. Play responsibly!
    </div>
  </div>
);

const HistoryPage = () => (
  <div className="max-w-3xl p-6 mx-auto text-gray-700">
    <h2 className="text-2xl font-bold mb-4">📜 History</h2>
    <p className="mb-2 font-semibold">
      (This section can be expanded with tabs and actual history data.)
    </p>
    <ul className="space-y-2">
      <li>🎲 Round 14 - Winning Color: Blue - Your Stake: 0.5 - Win</li>
      <li>🎲 Round 13 - Winning Color: Red - Your Stake: 1 - Loss</li>
    </ul>
  </div>
);

export default function App() {
  return (
    <Router>
      <Header />
      <nav className="bg-gray-100 text-center p-2 space-x-4">
        <Link to="/" className="text-indigo-600 font-semibold">
          Game
        </Link>
        <Link to="/how-to-play" className="text-indigo-600 font-semibold">
          How to Play
        </Link>
        <Link to="/history" className="text-indigo-600 font-semibold">
          History
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<GamePage />} />
        <Route path="/how-to-play" element={<RulesPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </Router>
  );
}
