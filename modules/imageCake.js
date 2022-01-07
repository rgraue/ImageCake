//const PNG = require('pngjs').PNG;
const PNG = require('pngjs').PNG;
import Cake from './cake';
import fs from 'fs';
//const fs = require('fs')
const COMPLEXITY = 2;
class ImageCake {
    

    generateCake () {
        let cake;
        let origin = this.#getLocalOrigin();
        let data = this.#createLocal(origin);
        if (!data){
            console.log("not data")
        } else {
            cake = new Cake(data[0],data[1],data[2],data[3],data[4]);
        }
        cake.render();
        return cake.genSVG();
    }
    /**
     * Randomly creates list of elements to used. Elements are stored locally in data folder
     * @returns List of orgin locations for elements
     */
    #getLocalOrigin () {
        let result = {};
        result[0] = './public/backgrounds/background' + Math.floor((Math.random()*COMPLEXITY)) + '.png';
        result[1] = './public/bodies/body' + Math.floor((Math.random()*COMPLEXITY)) + '.png';
        result[2] = './public/heads/head' + Math.floor((Math.random()*COMPLEXITY)) + '.png';
        result[3] = './public/hats/hat' + Math.floor((Math.random()*COMPLEXITY)) + '.png';
        result[4] = './public/glasses/glasses' + Math.floor((Math.random() * COMPLEXITY)) + '.png';
        return result;
    }

    /**
     * Creates a layered image using local imgs
     * @param {object} origin object containing png elements
     */
    #createLocal (origin) {
        let data = [];
        //let temp = new PNG();
        for (let i = 0; i < 5; i++){
            let buffer = fs.readFileSync(origin[i]);
            let png = PNG.sync.read(buffer);
            data.push(png);
        }
        return data;
    }
}

export default ImageCake;

