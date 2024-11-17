import NavigationBar from '../navigationBar/NavigationBar.jsx';
import useTokenValidation from '../../hooks/useTokenValidation';
const Chatbot = () => {
    useTokenValidation();
    return(
        <>
        <NavigationBar />
        <div>Chatbot</div>
        <p> Theme Color: #201E43
#134B70
#508C9B
#EEEEEE</p>
        </>
    )
}

export default Chatbot; 