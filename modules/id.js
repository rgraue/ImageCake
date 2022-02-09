/**
 * Supports the Origin capability of Image Cake.
 * Encoded strings hold the paramaters for a viable origin array.
 * Max Origin Element number is 64
 */
class ID{
    constructor  () {
        this.complexity = 4;        // Number of variations of each element. 
        this.data = {};
    }

    genOrigin (s = undefined){
        if (s === undefined) {              // if no origin. Generate new
            let result = []
            // randomly populates array within complexity limits
            for (let i = 0; i < 6; i++){
                result.push(Math.floor(Math.random()*this.complexity));
            }
            let s = this.encode(result); // create encoded string
            this.data['s'] = s;
            this.data['arr'] = result;
            return this.data;

        } else {                                // if origin given
            let arr = this.decode(s);
            console.log(arr);
            // ensure viable origin array.
            // length of 6
            // nothing larger then complexity
            // nothing smaller then 0
            if (arr.length === 6 && Math.max(...arr) < this.complexity && Math.min(...arr) >= 0){
                this.data['arr'] = arr;
                this.data['s'] = s;
            } else {
                this.data['error'] = "Invalid Origin"
            }
            return this.data;
        }
    }
    // turns array of numbers into id string
    encode (arr) {
        //let prefix = '';
        let result = '';
        for (let i in arr){
            let prefix = '';
            prefix += Buffer.from(''+(i-arr[i] << 8)).toString('base64');
            prefix.replaceAll(prefix, 'r');
            let bin = arr[i].toString(2).padStart(6, prefix);
            result+=Buffer.from(bin).toString('base64');
        }
        return result;
    }
    // decodes id string into array[6] of numbers
    decode (s) {
        let result= [];
        for (let i = 0; i < 6; i++){
            let chunk = s.substring(i*8, i*8 + 8);
            let padded = Buffer.from(chunk,'base64').toString()
            let prefix = padded.split('1',1)

            let bin = padded.replace(prefix, '0')                   //BUGBUG always makes array of 0's if wrong id or no id

            let num = parseInt(bin, 2)
            result[i] = num;
        }
        return result;
    }

}

module.exports = ID;