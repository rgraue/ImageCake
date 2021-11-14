let png = require('pngjs').PNG;
let fs = require('fs');
const Layer = require('./modules/layer')

let pngData = png.sync.read(fs.readFileSync('imgs/background.png'));

let base = new Layer(pngData, 0);

console.log(base);

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