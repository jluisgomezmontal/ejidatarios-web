import Image from 'react-bootstrap/Image';
import comisaria from '../assets/comisaria.jpg'

export const Home = () => {
    return (
        <div className="home row mi_dark">
            <h3 className="ejido" >Ejido de San Marcos Guerrero</h3>
            <h4 className="comisario" >Comisariado Ejidal: Mario Vazquez Agaton</h4>
            <h4 className="transicion" >2024-2027</h4>
            <Image className="caballos" src={comisaria} fluid />
        </div>
    )
}
