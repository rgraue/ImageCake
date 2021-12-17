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
     render () {
        this.data.mesh(this.body);
     }

     write (file) {
        fs.writeFileSync(file, PNG.sync.write(this.data._png))
     }
}

module.exports = Cake;