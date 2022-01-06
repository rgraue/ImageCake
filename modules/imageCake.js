//const PNG = require('pngjs').PNG;
import PNG from 'pngjs';
import Cake from './cake';
import fs from 'fs';
//const fs = require('fs')

class ImageCake {
    cunstructor () {
        this.COMPLEXITY = 2;
    }

    generateCake () {
        let origin = this.#getLocalOrigin();
        let data = this.#createLocal(origin);
        let cake = new Cake(data[0],data[1],data[2],data[3],data[4]);
        cake.render();
        return cake.genSVG();
    }
    /**
     * Randomly creates list of elements to used. Elements are stored locally in data folder
     * @returns List of orgin locations for elements
     */
    #getLocalOrigin () {
        let result = {};
        result[0] = '../data/backgrounds/background' + Math.floor((Math.random()*COMPLEXITY)) + '.png';
        result[1] = '../data/bodies/body' + Math.floor((Math.random()*COMPLEXITY)) + '.png';
        result[2] = '../data/heads/head' + Math.floor((Math.random()*COMPLEXITY)) + '.png';
        result[3] = '../data/hats/hat' + Math.floor((Math.random()*COMPLEXITY)) + '.png';
        result[4] = '../data/glasses/glasses' + Math.floor((Math.random() * COMPLEXITY)) + '.png';
        return result;
    }

    /**
     * Creates a layered image using local imgs
     * @param {object} origin object containing png elements
     */
    #createLocal (origin) {
        let data = [];
        for (let i = 0; i < 5; i++){
            data.push(PNG.sync.read(fs.readFileSync(origin[i])));
        }
    }
}

export default ImageCake;

