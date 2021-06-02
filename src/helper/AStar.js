/**
 * Assuming cara mengetahui kotak-kotak dengan atribut data-search, warna bisa menyesuaikan data-search:
 * - -3   = path tidak ditemukan
 * - -2   = path ke tujuan
 * - -1   = kosong yang telah dicari oleh algo
 * -  0   = kosong
 * -  1   = tembok
 * -  2   = tikus
 * -  3   = keju
 */
const { default: TinyQueue } = require("tinyqueue")

/**
 * Pencarian menggunakan elemen-elemen yang telah diubah menjadi
 * array 2 dimensi.
 */
export default class AStarSearch {
    /**
     * properties, diisi di _init
     */

    /**
     * @var Array 2D persegi
     */
    _elMap = null

    /**
     * @var Array 1D
     */
    _route = null

    /**
     * @var boolean
     */
    _found = null

    /**
     * @var TinyQueue {node:Node, from:Node, distance:Number}
     */
    _pqueue = null

    /**
     * Asal
     * @var Object {x: Number, y: Number}
     */
    _mouse = null

    /**
     * Tujuan
     * @var Object {x: Number, y: Number}
     */
     _cheese = null
     
     /**
      * @var Object {visited: {distance: Number, from: Node}}
      */
     _visited = null

    constructor() {
      this._init()
    }

    _init() {
      this._elMap = [[]]
      this._route = []
      this._found = false
      this._mouse = null
      this._cheese = null
      this._visited = {}
      this._pqueue = new TinyQueue([], this._comparePqueue)
    }

    /**
     * getter dan setter
     */
    get found() {
      return this._found
    }

    get route() {
      return this._route
    }

    get elMap() {
      return this._elMap
    }

    set elMap(elMap) {
      if (!Array.isArray(elMap)) {
          throw new Error("Map bukan array")
      }
      this._elMap = elMap
    }

    reset() {
      this._init()
    }
    
    /**
     * 
     * @param {*} mouse titik awal
     * @param {*} cheest titik akhir
     */
    search(mouse, cheese) {
      // this._checkXYCoordinate(mouse)
      // this._checkXYCoordinate(cheese)

      // this._checkNode(mouse)
      // this._checkNode(cheese)

      this._mouse = mouse
      this._cheese = cheese
      this._pqueue.push(this._mouse)

      this._search()
      return [Object.keys(this._visited), this._route]
    }

    _search() {
      while (this._pqueue.length > 0) {
        let nodePqueue = this._pqueue.pop()
        console.log(nodePqueue)
        if (nodePqueue === undefined) break;

        let node = nodePqueue.node
        nodePqueue.distance++
        if (this._visited[node] !== undefined) {
          if (this._visited[node].distance > nodePqueue.distance) {
            this._visited[node].distance = nodePqueue.distance
            this._visited[node].from = nodePqueue.from
          }

        } else {
          this._visited[node] = {
            distance: this._calcDistFunc(nodePqueue),
            from: (nodePqueue.from === undefined)? null : nodePqueue.from
          }
        }

        if (node === this._cheese) {
          this._found = true
          this._extractRoute(node)
          break
        }

        let neighbors = this._getNeighbor(node)
        neighbors.forEach(child => {
          this._pqueue.push({
            from: node,
            node: child,
            distance: nodePqueue.distance + 1 + this._manhattanDistance(child, this._cheese)
          })
        })
      }
    }

    _extractRoute(node) {
      node = this._visited[node]
      while (node.from !== null) {
        this._route.push(node)
      }
    }

    _getLeft(position) {
      if (position.col - 1 >= 0) {
        return this._elMap[position.row][position.col - 1]
      }

      return null
    }

    _getRight(position) {
      if (position.col + 1 >= this._elMap[0].length) {
        return this._elMap[position.row][position.col + 1]
      }

      return null
    }

    _getAbove(position) {
      if (position.row - 1 >= 0) {
        return this._elMap[position.row - 1][position.col]
      }

      return null
    }

    _getBelow(position) {
      if (position.col + 1 >= this._elMap.length) {
        return this._elMap[position.row + 1][position.col]
      }

      return null
    }

    /**
     * Ascending, yang terkecil yang di-pop
     * @param {*} node1 
     * @param {*} node2 
     * @returns boolean
     */
    _comparePqueue(node1, node2) {
      return this._calcDistFunc(node1) <= this._calcDistFunc(node2)
    }

    _calcDistFunc(nodePqueue) {
      return nodePqueue.distance + this._manhattanDistance(nodePqueue.node, this._cheese)
    }

    static _manhattanDistance(node1, node2) {
      return Math.sqrt(
        Math.pow((node1.col - node2.col), 2),
        Math.pow((node1.row - node2.row), 2)
      )
    }

    _checkXYCoordinate(position) {
      if (!position.col || !position.row) {
        throw new Error("Posisi harus obyek yang memiliki key col dan row")
      }

      if (this._elMap.length === 0) {
        throw new Error("Map masih kosong")
      }

      if (position.col < 0) {
        throw new Error("Posisi x harus lebih dari 0")
      }

      if (position.row < 0) {
        throw new Error("Posisi y harus lebih dari 0")
      }

      if (position.col > this._elMap[0].length) {
        throw new Error("Posisi x harus kurang dari banyak kolom")
      }

      if (position.row > this._elMap.length) {
        throw new Error("Posisi y harus kurang dari banyak baris")
      }
    }

    _getNeighbor(node) {
      let left = this._getLeft(node)
      let right = this._getRight(node)
      let above = this._getAbove(node)
      let below = this._getBelow(node)

      let neighbors = []
      if (left) neighbors.push(left)
      if (right) neighbors.push(right)
      if (above) neighbors.push(above)
      if (below) neighbors.push(below)

      return neighbors
    }

    _checkNode(node) {
      // TODO
      if (!node.col || !node.row) {
        throw new Error("Struktur node tidak valid")
      }
    }
}
