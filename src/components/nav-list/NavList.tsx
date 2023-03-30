import './NavList.scss';
import burgerUrl from '../../assets/images/burger.svg';
import { useState } from 'react';

export type NavListProps = {
  isVertical: boolean,
  withBurger?:boolean,
  links:Array<{
    href:string,
    text:string,
  }>,
  mode: 'white' | 'dark',
}

const NavList = (props:NavListProps) => {
  const { isVertical, links, mode , withBurger = false} = props;
  const [navListClass,setNavListClass] = useState('');
  const items = links.map((link,index)=>{
    return( 
      <li className='nav-list__item' key={index}>
        <a href={link.href}>{link.text}</a>
      </li>
    )
  })

  const handleBurger = () => {
    console.log('inside');
    if (navListClass.length === 0) {
      setNavListClass('nav-list__items_visible')
    } else setNavListClass('');
  }

  return (
    <nav className={`nav-list ${withBurger ? 'nav-list_burger' : ''} ${isVertical? 'nav-list_vertival' : ''} ${mode==='dark'? 'nav-list_dark' : 'nav-list_white'}`}>
      {withBurger && <div className="nav-list__burger" onPointerDown={handleBurger}>
        <img src={burgerUrl} alt="menu image" /></div>}
      <ul className={`nav-list__items ${isVertical? 'nav-list__items_vertival' : ''} ${navListClass}`}>
        {items}
      </ul>
    </nav>
  )
}

export default NavList;