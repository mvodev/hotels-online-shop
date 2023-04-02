import { Link } from 'react-router-dom';
import './Logo.scss';

export type LogoPropsType = {
  mode: 'white' | 'dark',
  small?: boolean
}

const Logo = (props:LogoPropsType) => {
  const { mode, small = false } = props; 
  return (
    <Link to={'/admin'}>
      <div className={`logo ${mode==='dark' ? 'logo_color_dark' : 'logo_color_white'} ${small ? 'logo_small' : 'logo_common'}`}>
      </div>
    </Link>
  )
}

export default Logo;