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
        for (let y = 0; y < top.height; y++) {
            for (let x = 0; x < top.width; x++){
                let idx = (x + y) << 2 ;
        
                bottom.data[idx] = top.data[idx];
                bottom.data[idx + 1] = top.data[idx + 1];
                bottom.data[idx + 2] = top.data[idx + 2];

                //bottom.data[idx + 3] = top.data[idx + 3] >> 1;
            }
        }
    }

    // Write () {
    //     return this._png.sync.;
    // }

     toString () {
        return "" + _png.data;
    }
};

module.exports = Layer;
