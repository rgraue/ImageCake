let png = require('pngjs').PNG;
let fs = require('fs');

// open file stream of png
fs.createReadStream('imgs/Cowboy.png').pipe(
    new png({
        filterType : 4,
    })
).on('parsed', function (){
    for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
            var idx = (this.width * y + x) << 2;

            // invert color
            this.data[idx] = 255 - this.data[idx];
            this.data[idx+1] = 255 - this.data[idx+1];
            this.data[idx+2] = 255 - this.data[idx+2];

            // and reduce opacity
            this.data[idx+3] = this.data[idx+3] >> 1;
        }
    }
    // packs png into stream and Writes to file stream
    this.pack().pipe(fs.createWriteStream('imgs/out.png'));
});