import ImageCake from '../../modules/imageCake'

export default function handler(req, res){
    let cake = new ImageCake();
    let svg = cake.generateCake();
    res.status(200).json({payload : svg});
}
