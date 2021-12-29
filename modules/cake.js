const Layer = require('./layer');
const fs = require('fs');
const PNG = require('pngjs').PNG;

//Cake class. Cake is made of layers (png) to become one Cake (Layered Cake)
class Cake {
   constructor (back=undefined,body=undefined,head=undefined,hat=undefined,glasses=undefined) {
      this.data = new Layer(back);
      this.body = new Layer(body,1);
      this.head = new Layer(head,2);
      this.hat = new Layer(hat,3); 
      this.glasses = new Layer(glasses,4);
   }
   /**
   * Renders image by overlaying each asset ontop of base (this.data)
   */
   render () {
      // background limits
      let fullWidth = this.data._png.width;
      let fullHeight = this.data._png.width;
      
      // BODY
      // offset for body.
      // yOffset will persist as person grows
      let centerOffset = (fullWidth - this.body._png.width) / 2;
      let yOffset = fullHeight - this.body._png.height;
      this.data.mesh(this.body, centerOffset, yOffset);

      //HEAD
      centerOffset = (fullWidth - this.head._png.width) / 2;
      yOffset -= Math.floor(this.head._png.height - this.head._png.height / 2);                      //BUGBUG for head fitment
      this.data.mesh(this.head, centerOffset, yOffset);

      // HAT
      centerOffset = (fullWidth - this.hat._png.width) / 2;
      yOffset -= Math.floor(this.hat._png.height - this.hat._png.height / 2);
      this.data.mesh(this.hat, centerOffset, yOffset);

      // GLASSES
      centerOffset = Math.floor((fullWidth - this.glasses._png.width) / 2);
      let glassesYOffset = Math.floor(fullHeight - (this.body._png.height + this.head._png.height / 6));
      this.data.mesh(this.glasses, centerOffset, glassesYOffset);
   }

   /**
   * Writes to given file
   * @param {*string} file File to write to
   */
   write (file) {
      fs.writeFileSync(file, PNG.sync.write(this.data._png))
   }

   writeSVG (file) {
      let result = '<'
   }

     /**
      * writes to file in RLE compression
      * @param {stirng} file file to write to
      */
   genRLE () {
      console.log("rle");
      let rle = '';
      let n = 0;
      let chunk = '';
      for (let y = 0; y < this.data._png.height; y++){
         for (let x = 0; x < this.data._png.width; x++){
            let index = (this.data._png.width * y + x) << 2;
            let current = '#' +   this.data._png.data[index].toString(16) + 
                                 this.data._png.data[index + 1].toString(16) + 
                                 this.data._png.data[index + 2].toString(16)
            if (chunk === ''){
               chunk = current;
            }
            if (current === chunk){
               n++;
            } else {
               rle += n + chunk;
               n = 1;
               chunk = current;
            } 
         }
      }
      return rle;
   }

   genSVG () {
      let rle = this.genRLE();
      let svg = '<svg width="128" height="128">'
      svg += this.genRects(rle);
      svg += '</svg>';
      return svg;

   }

   genRects (data) {
      let result = '';
      let currWidth = 0;
      let currRow = 0;
      let pieces = this.genPieces(data);
      for (let i = 0; i < pieces.length; i++){
         let chunk = pieces[i].split('#');
         let width = chunk[0];
         let color = chunk[1];
         if (width > this.data._png.width){ // if width is greater then img width (128px)
            result += '<rect width="128" height = "1" x="'+currWidth+'" y="'+currRow +'" fill="#' + color + '">';
            pieces[i] = width + '#' + height;
            i--;
         } 
         /**
          * TODO
          * if smaller then img width
          * if goes over and wraps around
          */
      }
   }

   genPieces (data) {
      let result = [];
      let chunk = '';
      for (let i = 0; i < data.length; i ++){
         if (data[i] === '#'){
            chunk += data.substring(i, i + 7);
            result.push(chunk);
            chunk = '';
            i += 6;
         } else {
            chunk += data[i];
         }
      }
      return result;
   }
}

module.exports = Cake;