import Image from 'react-bootstrap/Image';
import yellowstone from '../assets/yellowstone.jpg'

export const Home = () => {
    return (
        <div className="home row">
            <h2 className="ejido" >Ejido de San Marcos Guerrero</h2>
            <h3 className="comisario" >Comisariado Ejidal: Mario Vazquez Agaton</h3>
            <h4 className="transicion" >2024-2027</h4>
            <Image className="caballos" src={yellowstone} fluid />;
        </div>
    )
}
