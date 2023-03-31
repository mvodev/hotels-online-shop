import './Button.scss';
import deleteUrl from '../../assets/images/delete.svg';
import cartUrl from '../../assets/images/cart.svg';
import catalogUrl from '../../assets/images/catalog.svg';
import catalogBlackUrl from '../../assets/images/catalog-black.svg';
import downloadUrl from '../../assets/images/download.svg';
import loupeBlackUrl from '../../assets/images/loupe-black.svg';
import plusIconUrl from '../../assets/images/plus.svg';

export type ButtonProps = {
  buttonType: 'common'                  | 
              'download'                | 
              'download-wide'           |
              'download-small'          |
              'download-without-frames' |
              'download-extra-wide'     |
              'cart'                    | 
              'cart-wide'               |
              'delete'                  |
              'search'                  |
              'add'
  text?:string,
  href?:string,
}

const Button = (props:ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { buttonType='common', text, href='mock-ddress-change-me.pdf',...rest } = props;
  let imgSrc = '';
  let alt = '';
  let title:string|undefined = ''
  let buttonBody = <></>;
  if (buttonType === 'delete') {
    imgSrc = deleteUrl;
    alt = 'trash image';
    title = 'Удалить'
  } else if (buttonType === 'cart' || buttonType === 'cart-wide') {
      alt = 'cart image';
      imgSrc = cartUrl;
      title = text;
  } else if (buttonType === 'add') {
      alt = 'add image';
      title = 'Добавить'
      imgSrc = plusIconUrl;
  } else if (buttonType === 'download') {
      alt = 'catalog image';
      imgSrc = catalogUrl;
  } else if (buttonType === 'search') {
      alt = 'loupe image';
      imgSrc = loupeBlackUrl;
      title = text;
  } else if (buttonType === 'download-without-frames') {
      alt = 'catalog image';
      imgSrc = catalogBlackUrl;
      title = text;
  } else if (buttonType === 'download-small') {
      alt = 'download image';
      imgSrc = downloadUrl;
      title = text;
  }else if (buttonType === 'download-wide' || buttonType === 'download-extra-wide') {
      alt = 'download image';
      imgSrc = downloadUrl;
      title = text;
  }
  if (buttonType === 'common'){
    title = text;
    buttonBody = <>
      <span>{text}</span>
    </>
  } else if (buttonType === 'download' || buttonType === 'download-wide') {
    title = text;
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
    <button title={title} className={`button button_${buttonType}`} {...rest} >
      {buttonBody}
    </button>
  )
}

export default Button;