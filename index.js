const IPFS = require('ipfs')
const PNG = require('pngjs').PNG;
const map = require('./data/map.json')
const Cake = require('./modules/cake')
// COMPLEXITY = num of element files to read from
const COMPLEXITY = 2;

let origin = getOriginJSON();
getIMG(origin)

/**
 * Retrieves img elements and combines to create single img.
 * @param {object} origin JSON containing ipfs URIs to elements
 */
async function getIMG (origin) {
    const node = await IPFS.create();
    let data = [];
    try {
        // iterate trhough origin JSON and add png data to array of all elements
        for (let i =0; i<5; i++){
            let pic = new PNG();
            const stream = await node.cat(origin[i]); // Create stream to ipfs CID
            for await (let chunk of stream){
                pic = PNG.sync.read(chunk);
            }
            data.push(pic)
        }
        node.stop()

        // Creates Cake and renders img to out.png
        let cake = new Cake(data[0],data[1],data[2],data[3],data[4])
        cake.render();
        cake.write('imgs/out.png')
        console.log("cake baked!")
    } catch (error){
        console.log(error)
    }
    

}

/**
 * Randomly creates JSON of origin elements.
 * @returns JSON of Layer files to use
 */
function getOriginJSON () {
    let result = {};
    result[0] = map.backgrounds[Math.floor((Math.random() * COMPLEXITY))]
    result[1] = map.bodies[Math.floor((Math.random() * COMPLEXITY))]
    result[2] = map.heads[Math.floor((Math.random() * COMPLEXITY))]
    result[3] = map.hats[Math.floor((Math.random() * COMPLEXITY))]
    result[4] = map.glasses[Math.floor((Math.random() * COMPLEXITY))]
    return result;
}

