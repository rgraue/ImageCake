const IPFS = require('ipfs')
const PNG = require('pngjs').PNG;
let fs = require('fs')
const Layer = require('./modules/layer')

let x = getNode();
printPromise(x);

async function getNode () {
    const node = await IPFS.create();
    let pic = new PNG();
    try {
        const stream = await node.cat('QmXdd8iPmrbqcAY48icYBezdBV7n3WuZi5DjuTkXKvShRc');
        for await (let chunk of stream){
            pic = PNG.sync.read(chunk);
        }
        return pic;
    } catch (error){
        console.log(error)
    }
    

}

async function printPromise (x) {
    try {
        let pic = await x;
        console.log(pic)
        fs.writeFileSync('imgs/out.png', PNG.sync.write(pic))
    }catch (error){
        console.log(error)
    }
} 

// let pngData = png.sync.read(fs.readFileSync('imgs/RedBack.png'));
// let base = new Layer(pngData, 0);



// pngData = png.sync.read(fs.readFileSync('imgs/PinkFace.png'));
// let fish = new Layer(pngData, 1);

// base.Mesh(fish,20,20);


// fs.writeFileSync('imgs/out.png', png.sync.write(base._png));

// pngData.pack().pipe(fs.createWriteStream('./imgs/out.png'));


// open file stream of png
// fs.createReadStream('imgs/background.png').pipe(
//     new png({
//         filterType : 4,
//     })
// ).on('parsed', function (){
//     // DO STUFF HERE
//     // packs png into stream and Writes to file stream
//     this.pack().pipe(fs.createWriteStream('imgs/out.png'));
// });