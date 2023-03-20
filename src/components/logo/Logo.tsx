import './Logo.scss';

export type LogoPropsType = {
  mode: 'white' | 'dark'
}

const Logo = (props:LogoPropsType) => {
  const { mode } = props; 
  return (
    <div className={`logo ${mode==='dark' ? 'logo_color_dark' : 'logo_color_white'}`}>
    </div>
  )
}

export default Logo;