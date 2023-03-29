import { Link } from 'react-router-dom';
import './BreadCrumbs.scss';

export type BreadCrumbsPropsType = {
  links:Array<{
    link:string,
    name:string,
  }>
}

const BreadCrumbs = (props:BreadCrumbsPropsType) => {
  const {links} = props;
  const extendedLinks = links.map((link,index)=>{
    return <Link key={index} to={link.link}>{link.name}</Link>
  })

  return (
    <div className="bread-crumbs">
      {extendedLinks}
    </div>
  )

}

export default BreadCrumbs;