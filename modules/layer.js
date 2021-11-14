class Layer {
    _png = null;
    _level = 0;
    constructor(png, level  = 0){
        this._png = png;
        this._level = level;

    }

     toString () {
        return "" + _png.data;
    }
};

module.exports = Layer;
