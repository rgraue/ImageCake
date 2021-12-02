let png = require('pngjs').PNG;
let fs = require('fs');
let Layer = require('./modules/layer')

let pngData = png.sync.read(fs.readFileSync('imgs/Cowboy.png'));
let base = new Layer(pngData, 0);



pngData = png.sync.read(fs.readFileSync('imgs/fish.png'));
let fish = new Layer(pngData, 1);

base.Mesh(fish);


fs.writeFileSync('imgs/out.png', png.sync.write(base._png));

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