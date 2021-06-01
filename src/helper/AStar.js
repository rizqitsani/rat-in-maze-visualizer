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
class AStarSearch {
    /**
     * properties, statis buat constant
     * ! DO. NOT. CHANGE.
     */
    static _NOT_FOUND_VAL = -3
    static _ROUTE_VAL     = -2
    static _SEARCHED_VAL  = -1
    static _EMPTY_VAL     =  0
    static _WALL_VAL      =  1
    static _MOUSE_VAL     =  2
    static _MOUSE_VAL     =  3
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
     * @var TinyQueue
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

    constructor() {
      this._init()
    }

    _init() {
      this._elMap = [[]]
      this._route = []
      this._found = false
      this._pqueue = new TinyQueue([], this._comparePqueue)
      this._mouse = null
      this._cheese = null
    }

    /**
     * getter dan setter
     */
    get found() {
      return this.found
    }

    get route() {
      return this.route
    }

    get elMap() {
      return this.elMap
    }

    set elMap(map) {
      if (!Array.isArray(map)) {
          throw "Map bukan array"
      }
      this.elMap = elMap

      elMap.forEach((row, idy) => {
        row.forEach((el, idx) => {
          el = {
            el: el,
            dist: 0,
            position: {
              x: idx,
              y: idy,
            },
          }
        })
      });
    }

    reset() {
      elMap.forEach(row => {
        row.forEach(node => {
          node.el.setAttribute("data-search", 0)
        })
      });
      
      this._init()
    }
    
    /**
     * 
     * @param {*} mouse titik awal
     * @param {*} cheest titik akhir
     */
    search(mouse) {
      this._checkXYCoordinate(mouse)

      this.mouse = elMap[mouse.y][mouse.x]
      this._pqueue.push()

      this._search()
      if (this._found) {
        this.drawRoute()
      }

      /**
       * Kalau tidak ada rute, otomatis digambar oleh
       * si _search
       */
    }

    _search() {

    }

    drawRoute() {
      route.forEach(node => {
        node.el.setAttribute("data-search", -2)
      });
    }

    static drawNotFound(el) {
      el.setAttribute("data-search", -3)
    }

    static drawSearched(el) {
      el.setAttribute("data-search", -1)
    }

    _getLeft(position) {
      if (position.x - 1 >= 0) {
        return this._elMap[position.y][position.x - 1]
      }

      return null
    }

    _getRight(position) {
      if (position.x + 1 >= this._elMap[0].length) {
        return this._elMap[position.y][position.x - 1]
      }

      return null
    }

    _getAbove(position) {
      if (position.y - 1 >= 0) {
        return this._elMap[position.y - 1][position.x]
      }

      return null
    }

    _getBelow(position) {
      if (position.x + 1 >= this._elMap.length) {
        return this._elMap[position.y + 1][position.x]
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

    _calcDistFunc(node) {
      return node.dist + this._manhattanDistance(node)
    }

    _manhattanDistance(node) {
      // TODO
      return Math.sqrt(
        Math.pow((node))
      )
    }

    _checkXYCoordinate(position) {
      if (!position.x || !position.y) {
        throw "Posisi harus obyek yang memiliki key x dan y"
      }

      if (this._elMap.length == 0) {
        throw "Map masih kosong"
      }

      if (position.x < 0) {
        throw "Posisi x harus lebih dari 0"
      }

      if (position.y < 0) {
        throw "Posisi y harus lebih dari 0"
      }

      if (position.x > this._elMap[0].length) {
        throw "Posisi x harus kurang dari banyak kolom"
      }

      if (position.y > this._elMap.length) {
        throw "Posisi y harus kurang dari banyak baris"
      }
    }

    _checkNode(node) {
      if (!node.el || !node.dist || !node.position) {
        throw "Struktur node tidak valid"
      }
    }
}
