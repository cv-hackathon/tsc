import { useHistory } from 'react-router-dom';

export function useNavigate() {
  const history = useHistory()
  
  return path => {
    if (path) {
      history.push(`/home/${path}`)
      return;
    }
    history.push("/home")
  }
}