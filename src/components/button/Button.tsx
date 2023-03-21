import './Button.scss';
import deleteUrl from '../../assets/images/delete.svg';
import cartUrl from '../../assets/images/cart.svg';
import catalogUrl from '../../assets/images/catalog.svg';
import downloadUrl from '../../assets/images/download.svg';

export type ButtonProps = {
  buttonType: 'common' | 'download' | 'download-wide' | 'cart' | 'delete'
  text?:string,
  href?:string,
}

const Button = (props:ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { buttonType='common', text, href='mock-ddress-change-me.pdf' } = props;
  let imgSrc = '';
  let alt = '';
  let buttonBody = <></>;
  if (buttonType === 'delete') {
    imgSrc = deleteUrl;
    alt = 'trash image';
  } else if (buttonType === 'cart') {
    alt = 'cart image';
    imgSrc = cartUrl;
  } else if (buttonType === 'download') {
    alt = 'catalog image';
    imgSrc = catalogUrl;
  } else if (buttonType === 'download-wide') {
    alt = 'download image';
    imgSrc = downloadUrl;
  }
  if (buttonType === 'common'){
    buttonBody = <>
      <span>{text}</span>
    </>
  } else if (buttonType === 'download' || buttonType === 'download-wide') {
    buttonBody = <>
      <a href={href} download>
        <span>{text}</span>
        <img src={imgSrc} alt={alt}/>
      </a>
    </>
  } 
  else {
    buttonBody = <>
      <span>{text}</span>
      <img src={imgSrc} alt={alt}/>
    </>
  }
  return (
    <button className={`button button_${buttonType}`}>
      {buttonBody}
    </button>
  )
}

export default Button;