import { useRef, useState } from 'react';

import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons';

import ListItem from "../ListItem/ListItem";

import './styles.scss';

export default function List( { list } ) {

  const [ slideNumber, setSlideNumber ] = useState( 0 );
  const [ isMoved, setIsMoved ] = useState( false );
  const [ clickLimit, setClickLimit ] = useState( window.innerWidth / 230 );

  const listRef = useRef();

  const handleClick = direction => {
      let slideToLeft = direction === "left",
          distance = listRef.current.getBoundingClientRect().x - 50;

      setIsMoved( true );

      if ( slideToLeft && slideNumber > 0 ) {
          listRef.current.style.transform = `translateX( ${ -230 + distance }px )`;

          setSlideNumber( slideToLeft ? slideNumber - 1 : slideNumber - 1 );
      } else if ( !slideToLeft && slideNumber < 10 - clickLimit ) {
          listRef.current.style.transform = `translateX( ${ 230 + distance }px )`;

          setSlideNumber( slideToLeft ? slideNumber - 1 : slideNumber + 1 );
      }
  };

  return (
    <div className="list">
      <span className="listTitle">{list.title}</span>
      <div className="wrapper">
        <ArrowBackIosOutlined 
          className='slideArrow left' 
          onClick={ () => { handleClick( "left" ) } }
          style={ { display: !isMoved && "none" }}
        />
        <div className="container" ref={listRef}>
          {
            list.content.map( (item, i) => (
               <ListItem index={i} key={i} item={item} />
             ) )
          }
        </div>
        <ArrowForwardIosOutlined className='slideArrow right' onClick={ () => { handleClick( "right" ) } }/>
      </div>
    </div>
  )
}
