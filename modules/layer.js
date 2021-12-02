// Layer class to represent a layer of a total image
class Layer {
    constructor(png, level  = 0){
        this._png = png;
        this._level = level;

    }

    // meshes two images togther. The lower level is set as the base.
    // The top is placed 'on top' of the base
    Mesh (rhs) {
        //sets the base and top
        let top = rhs._png;
        let bottom = this._png;

        //flips the top and bottom depending on level
        if (this._level > rhs._level){
            top = this._png;
            bottom = rhs._png;
        }

        // offset to move top image over and down. starts at top left (0,0)
        let xOffest = 100;
        let yOffset = 100;
        
        // iterates through the top image buffer.
        for (let y = 0; y<top.height;y++){
            for (let x = 0; x<top.width;x++){
                let indexB = ((bottom.width * (y+ yOffset)  + x) + xOffest)<< 2; // Bottom index
                let indexT = (top.width * y + x) << 2; // Top index

                // determines whether part of images is transparent
                if ((top.data[indexT] !== 0xee && top.data[indexT] !== 0xee &&
                        top.data[indexT + 2] !== 0xee) 
                        && 
                    (top.data[indexT] !== 0xff && top.data[indexT] !== 0xff &&
                        top.data[indexT + 2] !== 0xff)){

                    // if not transaprent replace base pixel data with top pixel data (rgba)
                    bottom.data[indexB] = top.data[indexT];
                    bottom.data[indexB + 1] = top.data[indexT + 1];
                    bottom.data[indexB + 2] = top.data[indexT + 2];
                    bottom.data[indexB + 3] = top.data[indexT + 3];
                }
            }
        }
    }

     toString () {
        return "" + _png.data;
    }
};

module.exports = Layer;
