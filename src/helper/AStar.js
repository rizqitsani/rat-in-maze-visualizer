/**
 * Assuming cara mengetahui kotak-kotak dengan atribut data-search, warna bisa menyesuaikan data-search:
 * - -2   = path ke tujuan
 * - -1   = kosong yang telah dicari oleh algo
 * -  0   = kosong
 * -  1   = tembok
 * -  2   = tikus
 * -  3   = keju
 */

/**
 * Pencarian menggunakan elemen-elemen yang telah diubah menjadi
 * array 2 dimensi.
 */
class AStarSearch {
    /**
     * properties
     */
    #elMap = [] // array 2D (kayak map biasa)
    #found = false
    #route = [] // array 1D, isinya elemen

    /**
     * getter dan setter
     */
    get elMap() {
      return this.elMap
    }

    get found() {
      return this.found
    }

    get route() {
      return this.route
    }

    set elMap(map) {
      if (!Array.isArray(map)) {
          throw "Map bukan array!"
      }
      this.elMap = elMap
    }

    search() {
      if (!this.found) {
          this.#search()
      }
    }

    reset() {

    }

    drawRoute() {

    }

    static #drawSearched(el) {

    }


    #search() {

    }
}
