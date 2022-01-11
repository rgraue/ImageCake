const { flushSync } = require('react-dom');
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
      console.log(this.hat._png)
      centerOffset = (fullWidth - this.hat._png.width) / 2;
      yOffset -= Math.floor(this.hat._png.height - this.hat._png.height / 2);
      this.data.mesh(this.hat, centerOffset, yOffset);

      // GLASSES
      centerOffset = Math.floor((fullWidth - this.glasses._png.width) / 2);
      let glassesYOffset = Math.floor(fullHeight - (this.body._png.height + this.head._png.height / 6));
      this.data.mesh(this.glasses, centerOffset, glassesYOffset);

      this.writeFile()
   }

   writeFile (){
      fs.writeFileSync('./public/out.png', PNG.sync.write(this.data._png))
   }
     /**
      * writes to file in RLE compression
      * @param {String} file file to write to
      */
   genRLE () {
      let rle = '';
      let n = 0;
      let chunk = '';
      //Iterate through png data
      for (let y = 0; y < this.data._png.height; y++){
         for (let x = 0; x < this.data._png.width; x++){
            let index = (this.data._png.width * y + x) << 2;
            // Create hex value of current pixel (#rgb)
            let current = '#' +   this.data._png.data[index].toString(16) + 
                                 this.data._png.data[index + 1].toString(16) + 
                                 this.data._png.data[index + 2].toString(16)
            if (chunk === ''){ // starting fence post catch.
               chunk = current;
            }
            if (current === chunk){ // If the same pixel val occurs again, incriment n
               n++;
            } else {                // If different pixel val, then add rle val of previous pixel val to result.
               rle += n + chunk;
               n = 1;
               chunk = current;
            } 
         }
      }
      return rle;
   }

   /**
    * Generates an svg of the cake image data
    * @returns string of svg content
    */
   genSVG () {
      let rle = this.genRLE();
      let svg = '<svg xmlns="http://www.w3.org/2000/svg">'
      svg += this.genRects(rle);
      svg += '</svg>';
      fs.writeFileSync('./public/out.svg', svg);
      return svg;
   }

   /**
    * Generates the rect elements for and svg.
    * Each <rect/> is 1px tall and has a width of however many pixels in the row have the same #hex color val.
    * @param {String} data Custom rle string of cake image data.
    * @returns String of rects to insert into overlying svg
    */
   genRects (data) {
      let result = '';
      let currWidth = 0;
      let currRow = 0;
      let pieces = this.genPieces(data);
      // Iterate through individual pieces generated in rle.
      for (let i = 0; i < pieces.length; i++){
         let chunk = pieces[i].split('#');
         let width = Number(chunk[0]);       // width/number of pixels with same val.
         let color = chunk[1];               // hex color val.
         if (width + currWidth >= this.data._png.width){ // if chunk width + current x pos will go past border boundary
            result += '<rect width="'+(128 - currWidth)+'" height="1" x="'+currWidth+'" y="'+currRow +'" fill="#' + color + '"/>';
            pieces[i] = (width - (128 - currWidth)) + '#' + color;
            currWidth = 0;
            currRow++;
            i--;
         } else {
            result += '<rect width="'+width+'" height="1" x="'+currWidth+'" y ="' + currRow + '" fill="#' + color + '"/>';
            currWidth += width;
         }
      }
      console.log(currRow);
      return result;
   }

   /**
    * Seperates the rle string into its seperate parts of width and hex color val.
    * @param {String} data Custom rle of png data.
    * @returns Array of individual pieces/chunks
    */
   genPieces (data) {
      let result = [];
      let chunk = '';
      for (let i = 0; i < data.length; i ++){
         if (data[i] === '#'){
            chunk += data.substring(i, i + 7); // substring of color val
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