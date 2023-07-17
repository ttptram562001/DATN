import  { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../contexts/AuthContext';

function Logout(props) {
  const { logoutUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const logout = async () => {
    try {
      const logoutData = await logoutUser();
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  logout();
}

export default Logout;