import { useState } from "react";
import { BoxState } from "../types/type";

export default function ColorMatrix() {
  const [boxes, setBoxes] = useState<BoxState[]>(
    Array(9)
      .fill(null)
      .map((_, i) => ({
        id: i,
        clicked: false,
        clickOrder: null,
        isOrange: false,
      }))
  );
  const [clickCounter, setClickCounter] = useState(1);

  const handleBoxClick = (id: number) => {
    if (!boxes[id].clicked) {
      const newBoxes = [...boxes];
      newBoxes[id] = {
        ...newBoxes[id],
        clicked: true,
        clickOrder: clickCounter,
      };

      setClickCounter((prev) => prev + 1);
      setBoxes(newBoxes);

      if (clickCounter === 9) {
        turnBoxesOrange();
      }
    }
    return;
  };

  const turnBoxesOrange = () => {
    const clickedBoxes = boxes
      .filter((box) => box.clickOrder !== null)
      .sort((a, b) => (a.clickOrder || 0) - (b.clickOrder || 0));

    // Turn each box orange one by one, including the last one
    clickedBoxes.forEach((box, index) => {
      setTimeout(() => {
        setBoxes((prevBoxes) => {
          const newBoxes = [...prevBoxes];
          newBoxes[box.id] = {
            ...newBoxes[box.id],
            isOrange: true,
          };
          return newBoxes;
        });
      }, index * 500);
    });
  };

  const getBoxColor = (box: BoxState) => {
    if (box.isOrange) return "bg-orange-500";
    if (box.clicked) return "bg-green-500";
    return "bg-gray-200";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Color Matrix</h1>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {boxes.map((box) => (
          <div
            key={box.id}
            onClick={() => handleBoxClick(box.id)}
            className={`w-20 h-20 rounded-lg cursor-pointer transition-colors duration-300 ${getBoxColor(
              box
            )}`}
          ></div>
        ))}
      </div>
    </div>
  );
}
