import './NavList.scss';

export type NavListProps = {
  isVertical: boolean,
  links:Array<{
    href:string,
    text:string,
  }>,
  mode: 'white' | 'dark',
}

const NavList = (props:NavListProps) => {
  const {isVertical,links,mode} = props;
  const items = links.map((link,index)=>{
    return( 
      <li className='nav-list__item' key={index}>
        <a href={link.href}>{link.text}</a>
      </li>
    )
  })

  return (
    <nav className={`nav-list ${isVertical? 'nav-list_vertival' : ''} ${mode==='dark'? 'nav-list_dark' : 'nav-list_white'}`}>
      <ul className={`nav-list__items ${isVertical? 'nav-list__items_vertival' : ''}`}>
        {items}
      </ul>
    </nav>
  )
}

export default NavList;