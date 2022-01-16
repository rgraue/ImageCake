import ImageCake from '../../modules/imageCake'

export default function handler(req, res){
    if (req.method === 'GET'){
        let cake = new ImageCake();
        let svg = cake.generateCake();
        res.status(200).json({payload : svg});
    } else {
        res.status(200).json({payload:{error:"No Requrest Method Identified"}});
    }
}
