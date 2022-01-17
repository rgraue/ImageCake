import ImageCake from '../../modules/imageCake'

export default function handler(req, res){
    let cake = new ImageCake();
    let svg;
    if (req.method === 'GET'){
        svg = cake.generateCake();
        res.status(200).json({payload : svg});
    } else if (req.method === 'POST'){
        let body = JSON.parse(req.body);
        console.log(body);
        svg = cake.generateCake(body.origin);
        res.status(200).json({payload:svg});
    } else {
        res.status(200).json({payload:{error:"No Requrest Method Identified"}});
    }
}
