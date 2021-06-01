import { useState, useEffect } from 'react';

import './App.css';
import Node from './components/Node';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const App = () => {
  const [grid, setGrid] = useState([]);
  const [isMousePressed, setIsMousePressed] = useState(false);

  useEffect(() => {
    const grid = getInitialGrid();
    setGrid(grid);
  }, []);

  const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setIsMousePressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!isMousePressed) return;

    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setIsMousePressed(false);
  };

  // const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
  //   for (let i = 0; i <= visitedNodesInOrder.length; i++) {
  //     if (i === visitedNodesInOrder.length) {
  //       setTimeout(() => {
  //         animateShortestPath(nodesInShortestPathOrder);
  //       }, 10 * i);
  //       return;
  //     }
  //     setTimeout(() => {
  //       const node = visitedNodesInOrder[i];
  //       document.getElementById(`node-${node.row}-${node.col}`).className =
  //         'node node-visited';
  //     }, 10 * i);
  //   }
  // };

  // const animateShortestPath = (nodesInShortestPathOrder) => {
  //   for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
  //     setTimeout(() => {
  //       const node = nodesInShortestPathOrder[i];
  //       document.getElementById(`node-${node.row}-${node.col}`).className =
  //         'node node-shortest-path';
  //     }, 50 * i);
  //   }
  // };

  // const visualizeDijkstra = () => {
  //   const { grid } = this.state;
  //   const startNode = grid[START_NODE_ROW][START_NODE_COL];
  //   const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
  //   const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
  //   const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
  //   this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  // };

  return (
    <div className='App'>
      <button onClick={() => this.visualizeDijkstra()}>
        Visualize Dijkstra's Algorithm
      </button>
      <div className='grid'>
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const { row, col, isFinish, isStart, isWall } = node;
                return (
                  <Node
                    key={nodeIdx}
                    col={col}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    mouseIsPressed={isMousePressed}
                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                    onMouseUp={() => handleMouseUp()}
                    row={row}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
