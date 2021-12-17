// Layer class to represent a layer of a total image
class Layer {
    constructor(png, level  = 0){
        this._png = png;
        this._level = level;

    }

    /**
     * Meshes two layer together. The lowest level becomes the base for the new layer
     * @param {Layer} rhs Layer to mesh together.
     * @param {Number} xOffset X-axis offset for top Layer
     * @param {Number} yOffset Y-axis offset for top Layer
     */
    mesh (rhs, xOffset = 0, yOffset = 0) {
        //sets the base and top
        let top = rhs._png;
        let bottom = this._png;

        //flips the top and bottom depending on level
        if (this._level > rhs._level){
            top = this._png;
            bottom = rhs._png;
        }
       
        // iterates through the top image buffer.
        for (let y = 0; y<top.height;y++){
            for (let x = 0; x<top.width;x++){
                let indexB = ((bottom.width * (y+ yOffset)  + x) + xOffset)<< 2; // Bottom index
                let indexT = (top.width * y + x) << 2; // Top index

                // determines whether part of images is transparent
                if ((top.data[indexT] !== 0x000 && top.data[indexT] !== 0x000 &&
                        top.data[indexT + 2] !== 0x000)){

                    // if not transaprent replace base pixel data with top pixel data (rgba)
                    bottom.data[indexB] = top.data[indexT];
                    bottom.data[indexB + 1] = top.data[indexT + 1];
                    bottom.data[indexB + 2] = top.data[indexT + 2];
                    bottom.data[indexB + 3] = top.data[indexT + 3];
                }
            }
        }
    }

    setPNG (x) {
        this._png = x;
    }

     toString () {
        return "" + _png.data;
    }
};

module.exports = Layer;
