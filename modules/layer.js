class Layer {
    constructor(png, level  = 0){
        this._png = png;
        this._level = level;

    }

    Mesh (rhs) {
        let top = rhs._png;
        let bottom = this._png;
        if (this._level > rhs._level){
            top = this._png;
            bottom = rhs._png;
        }
        // overlap here
    }

    // Write () {
    //     return this._png.sync.;
    // }

     toString () {
        return "" + _png.data;
    }
};

module.exports = Layer;
