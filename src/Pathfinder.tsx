import React, { Component } from "react";
import Maze from './Maze'

type MyState = {
  maze: any;
  startCol: number;
  startRow: number;
  directions: string[];
}

class Pathfinder extends Component {
  state: MyState = {
    maze: [
      [0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 1, 1, 0, 0],
      [0, 1, 0, 1, "x"],
      [0, 1, 1, 1, 0],
    ],
    startCol: 1,
    startRow: 0,
    directions: []
  };

  findDirection = (prev: number[], curr: number[]) => {
    const pCol = prev[0];
    const pRow = prev[1];
    const cCol = curr[0];
    const cRow = curr[1];
    if (pCol === cCol && pRow < cRow) return '👇 Down';
    if (pCol === cCol && pRow > cRow) return '👆 Up';
    if (pCol > cCol && pRow === cRow) return '👈 Left';
    if (pCol < cCol && pRow === cRow) return '👉 Right';
  };

  movesCount!: number;
  maze!: number[] | string[];
  coordinates: number[] = [];
  perform!: ((col: number, row: number) => void);

  solveMaze = (maze: number[] | string[]) => {
    const { startCol, startRow, directions } = this.state;
    this.movesCount = 0;
    this.maze = maze;
    this.coordinates = [startCol, startRow];

    this.perform = (col: number, row: number) => {
      if (this.maze[col][row] === 1) {
        console.log(
          this.movesCount ?
          this.findDirection(this.coordinates, [col, row]) :
          '🎉 Start'
        );
        this.movesCount++;
        this.coordinates = [col, row];
        this.maze[col][row] = "/";
        this.setState({
          directions: [...directions, `${col}-${row}`]
        });

        if (col < this.maze.length - 1) this.perform(col + 1, row);
        if (col > 0) this.perform(col - 1, row);
        if (row < this.maze.length - 1) this.perform(col, row + 1);
        if (row > 0) this.perform(col, row - 1);
      } else if (this.maze[col][row] === "x") {
        console.log(
          `${this.findDirection(this.coordinates, [col, row])} 🎉\n
          Finished in ${this.movesCount} moves!\n
          ---------------------
        `);
      }
    };
    this.perform(startCol, startRow);
  };

  render() {
    const { maze, startCol, startRow, directions } = this.state;
    return (
      <div className='page'>
        Solve the Maze!
        <Maze
          maze={maze}
          startCol={startCol}
          startRow={startRow}
          solveMaze={this.solveMaze}
          directions={directions}
        />
        <button
          onClick={() => this.solveMaze(maze)}
          className='btn'
        >
            Go
        </button>
      </div>
    );
  };
};

export default Pathfinder;
