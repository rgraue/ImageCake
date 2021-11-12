let png = require('pngjs').PNG;
let fs = require('fs');

// open file stream of png
fs.createReadStream('imgs/Cowboy.png').pipe(
    new png({
        filterType : 4,
    })
).on('parsed', function (){
    // DO STUFF HERE
    // packs png into stream and Writes to file stream
    this.pack().pipe(fs.createWriteStream('imgs/out.png'));
});