export default class DataManager {

    static desc(a, b, orderBy, refine) {
        let ordBy = orderBy.toLowerCase();
        const ai = !refine ? this.getPokemonId(a.url) : this.getPokemonId(a.pokemon.url);
        const bi = !refine ? this.getPokemonId(b.url) : this.getPokemonId(b.pokemon.url);
        const ao = !refine ? a[ordBy] : a.pokemon[ordBy];
        const bo = !refine ? b[ordBy] : b.pokemon[ordBy];
        if (ordBy === "id") {
            return ai - bi;
        } else {
            if (bo < ao) {
                return -1;
            }
            if (bo > ao) {
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

    static getSorting(order, orderBy, refine) {
        return order === 'desc' ? (a, b) => this.desc(a, b, orderBy, refine) : (a, b) => -this.desc(a, b, orderBy, refine);
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