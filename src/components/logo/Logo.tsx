import { Link } from 'react-router-dom';
import './Logo.scss';

export type LogoPropsType = {
  mode: 'white' | 'dark',
  small?: boolean
}

const Logo = (props:LogoPropsType) => {
  const { mode, small = false } = props;
  const className = `logo logo__img ${mode==='dark' ? 'logo__img_color_dark' : 'logo__img_color_white'} ${small ? 'logo_small' : 'logo_common'}`; 
  return (
    <Link className={className} to={'/admin'}>
      <div className={className}>
      </div>
    </Link>
  )
}

export default Logo;