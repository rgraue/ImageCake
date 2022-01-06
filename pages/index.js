import Head from 'next/head';
import CakeDisplay from './components/cakeDisplay'

function index () {
    return (
    <body>
        <h1>Image Cake</h1>
        <CakeDisplay />
    </body>
    )
}

export default index;