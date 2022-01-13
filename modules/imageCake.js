//const PNG = require('pngjs').PNG;
const PNG = require('pngjs').PNG;
import Cake from './cake';
import fs from 'fs';
import ID from './id' 

class ImageCake {
    // Creates a Image Cake svg
    generateCake (s=undefined) {
        let id = new ID();
        let cake;
        let origin;
        if (s !== undefined){
            origin = id.genOrigin(s);
        } else {
            origin = id.genOrigin();
        }
        if (origin.error){
            console.error(origin.error)
            return {error : origin.error}
        } else {
            let map = this.mapOrigin(origin.arr) // maps origin to respective file
            let data = this.createLocal(map); // retrieves all png data
            if (!data){
                console.error("No PNG Data")
                return 
            } else {
                cake = new Cake(data[0],data[1],data[2],data[3],data[4]);
            }
            cake.render();
            return  {
                        svg : cake.genSVG(),
                        origin : origin.s
                    }
        }
        
    }
    /**
     * Maps the given origin array to the respective file.
     * @returns List of orgin locations for elements
     */
    mapOrigin (arr) {
        let result = {};
        result[0] = './public/backgrounds/background' + arr[0] + '.png';
        result[1] = './public/bodies/body' + arr[1] + '.png';
        result[2] = './public/heads/head' + arr[2] + '.png';
        result[3] = './public/hats/hat' + arr[3] + '.png';
        result[4] = './public/glasses/glasses' + arr[4] + '.png';
        return result;
    }

    /**
     * Creates a array of PNG objects of given array of files
     * @param {Array} origin object containing png elements
     */
    createLocal (origin) {
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

