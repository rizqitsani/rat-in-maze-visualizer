import { useState, useEffect } from 'react';

import './App.css';
import Input from './components/Input/Input';
import Node from './components/Node/Node';

import AStar from './helper/AStar';

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
  const [mousePosition, setMousePosition] = useState({ x: 1, y: 4 });
  const [cheesePosition, setCheesePosition] = useState({ x: 2, y: 6 });
  const [grid, setGrid] = useState([]);
  const [isMousePressed, setIsMousePressed] = useState(false);

  useEffect(() => {
    const getInitialGrid = () => {
      const grid = [];
      for (let row = 0; row < 10; row++) {
        const currentRow = [];
        for (let col = 0; col < 10; col++) {
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
        isStart: row === mousePosition.x - 1 && col === mousePosition.y - 1,
        isFinish: row === cheesePosition.x - 1 && col === cheesePosition.y - 1,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
      };
    };

    const grid = getInitialGrid();
    setGrid(grid);
  }, [mousePosition, cheesePosition]);

  const handleMouseXChange = (event) => {
    setMousePosition((prevState) => {
      return {
        ...prevState,
        x: event.target.value ? parseInt(event.target.value) : 0,
      };
    });
  };

  const handleMouseYChange = (event) => {
    setMousePosition((prevState) => {
      return {
        ...prevState,
        y: event.target.value ? parseInt(event.target.value) : 0,
      };
    });
  };

  const handleCheeseXChange = (event) => {
    setCheesePosition((prevState) => {
      return {
        ...prevState,
        x: event.target.value ? parseInt(event.target.value) : 0,
      };
    });
  };

  const handleCheeseYChange = (event) => {
    setCheesePosition((prevState) => {
      return {
        ...prevState,
        y: event.target.value ? parseInt(event.target.value) : 0,
      };
    });
  };

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

  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  };

  const visualizeAStar = () => {
    if (grid.length === 0) return;

    const startNode = grid[mousePosition.x - 1][mousePosition.y - 1];
    const finishNode = grid[cheesePosition.x - 1][cheesePosition.y - 1];

    const algorithm = new AStar();

    algorithm.elMap = grid;

    const [visitedNodesInOrder, nodesInShortestPathOrder] = algorithm.search(
      startNode,
      finishNode
    );

    // // const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  return (
    <div className='App'>
      <div className='flex py-6 mx-auto'>
        <div className='flex items-center space-x-4 mr-20'>
          <label>&#128001;</label>
          <Input
            value={mousePosition.x}
            onChange={(e) => handleMouseXChange(e)}
          />
          <Input
            value={mousePosition.y}
            onChange={(e) => handleMouseYChange(e)}
          />
        </div>
        <div className='space-x-4'>
          <button
            className='px-4 py-2 text-sm font-medium text-white bg-lightblue-600 border border-transparent rounded-md shadow-sm hover:bg-lightblue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lightblue-500'
            onClick={() => visualizeAStar()}
          >
            Visualize A* Search
          </button>
          <button
            className='px-4 py-2 text-sm font-medium text-lightblue-600 border-2 border-lightblue-600 rounded-md shadow-sm hover:text-white hover:bg-lightblue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lightblue-500'
            onClick={() => visualizeAStar()}
          >
            Reset
          </button>
        </div>
        <div className='flex items-center space-x-4 ml-20'>
          <label>&#129472;</label>
          <Input
            value={cheesePosition.x}
            onChange={(e) => handleCheeseXChange(e)}
          />
          <Input
            value={cheesePosition.y}
            onChange={(e) => handleCheeseYChange(e)}
          />
        </div>
      </div>
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
