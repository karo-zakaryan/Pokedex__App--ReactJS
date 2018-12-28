export default class DataManager {

    static desc(a, b, orderBy) {
        let ordBy = orderBy.toLowerCase();
        const ai = this.getPokemonId(a.url);
        const bi = this.getPokemonId(b.url);

        if (ordBy === "id") {
            return ai - bi;
        } else {
            if (b[ordBy] < a[ordBy]) {
                return -1;
            }
            if (b[ordBy] > a[ordBy]) {
                return 1;
            }
            return 0;
        }
    }

    static stableSort(array, cmp) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = cmp(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map(el => el[0]);
    }

    static getSorting(order, orderBy) {
        return order === 'desc' ? (a, b) => this.desc(a, b, orderBy) : (a, b) => -this.desc(a, b, orderBy);
    }

    static getPokemonId(url) {
        return url.match(/\/\d+\/$/g)[0].replace(/\//g, '');
    }

    static getPokemonImg(id) {
        try {
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
        } catch (e) {
            console.log(e);
        }
    }

    static capitalize(s) {
        if (typeof s !== 'string') return '';
        return s.charAt(0).toUpperCase() + s.slice(1);
    }
}