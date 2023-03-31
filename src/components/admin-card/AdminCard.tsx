import { Link } from 'react-router-dom';
import { CardTypeProps } from '../card/Card';
import './AdminCard.scss';

const AdminCard = (props:CardTypeProps) => {
  const {barcode,title,description,price} = props;

  return (
    <article className='admin-card'>
      <Link to={`/admin/${barcode}`}>
        <h3 className='admin-card__header'>Описание: {title} {description}</h3>
        <div className="admin-card__barcode">Штрихкод: {barcode}</div>
        <div className="admin-card__price">Цена: {price}</div>
      </Link>
    </article>
  )

}

export default AdminCard;