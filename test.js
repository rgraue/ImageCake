const IPFS = require('ipfs')
const PNG = require('pngjs').PNG;
const map = require('./public/map.json')
const Cake = require('./modules/imageCake')
const fs = require('fs')
const ID = require('./modules/id')
// COMPLEXITY = num of element files to read from
const COMPLEXITY = 2;
//const args = process.argv.slice(2);

/**
 * Entry point. Creates a single image dpeending on local or IPFS data.
 */
function main () {
   let id = new ID();
   let cake = new Cake();
   let s = id.encode([0,0,0,0,0,0])
   //console.log(s)
   //console.log(id.decode(s))
   let testCake = cake.generateCake(s);
   console.log(testCake.origin);

}


/**
 * Retrieves img elements and combines to create single img.
 * @param {object} origin JSON containing ipfs URIs to elements
 */
async function createIPFS (origin) {
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
        generateCake(data);
    } catch (error){
        console.log(error)
    }
}

/**
 * Randomly creates JSON of origin elements stored in IPFS.
 * @returns JSON of Layer files to use
 */
function getIPFSOrigin () {
    let result = {};
    result[0] = map.backgrounds[Math.floor((Math.random() * COMPLEXITY))]
    result[1] = map.bodies[Math.floor((Math.random() * COMPLEXITY))]
    result[2] = map.heads[Math.floor((Math.random() * COMPLEXITY))]
    result[3] = map.hats[Math.floor((Math.random() * COMPLEXITY))]
    result[4] = map.glasses[Math.floor((Math.random() * COMPLEXITY))]
    return result;
}

// Sets entry point as main()
if (require.main === module){
    main();
}

