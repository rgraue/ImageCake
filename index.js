const IPFS = require('ipfs')
const PNG = require('pngjs').PNG;
const map = require('./data/map.json')
const Cake = require('./modules/cake')
// COMPLEXITY = num of element files to read from.
const COMPLEXITY = 2;
const args = process.argv.slice(2);

function main () {
    if (args.length === 0){
        let origin = getLocalOrigin();
        console.log(origin);
    } else {
        let format = args[0];
        if (format === 'ipfs'){
            // ipfs file storage
            let origin = getIPFSOrigin();
            createIPFS(origin);
        } else {
            let origin = getLocalOrigin();
            console.log(origin);
        }
    }
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

/**
 * Randomly creates list of elements to used. Elements are stored locally in data folder
 * @returns List of orgin locations for elements
 */
function getLocalOrigin () {
    let result = {};
    result[0] = 'data/backgrounds/background' + Math.floor((Math.random()*COMPLEXITY)) + '.png';
    result[1] = 'data/bodies/body' + Math.floor((Math.random()*COMPLEXITY)) + '.png';
    result[2] = 'data/heads/head' + Math.floor((Math.random()*COMPLEXITY)) + '.png';
    result[3] = 'data/hats/hats' + Math.floor((Math.random()*COMPLEXITY)) + '.png';
    result[4] = 'data/glasses/glasses' + Math.floor((Math.random() * COMPLEXITY)) + '.png';
    return result;
}

if (require.main === module){
    main();
}

