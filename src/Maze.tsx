import React from "react";

interface Props {
  maze: any,
  startCol: number,
  startRow: number,
  solveMaze: (maze: any) => void
  directions: string[]
}

const Maze: React.FC<Props> = ({ maze, startCol, startRow, directions }) => {

  return maze ? (
    <div
      className="maze"
      style={{
        gridTemplateColumns: `repeat(${maze.length}, 0fr)`,
      }}
    >
      {maze.map((path: any, i: number) => (
        <div
          key={i}
        >
          {path.map((cell: string | number, j: number) => (
            <div
              className={`cell
                ${
                  i === startCol && j === startRow
                    ? "start"
                    : cell === 0
                    ? "zero"
                    : cell === 1
                    ? "one"
                    : directions.includes(`${i}-${j}`)
                    ? 'finish'
                    : "finish"
                }`}
              key={`${i}${j}`}
            />
          ))}
        </div>
      ))}
    </div>
  ) : <></>;
};

export default Maze;
