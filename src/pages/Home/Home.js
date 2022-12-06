import { useEffect, useState } from 'react';

import { NavBar, Featured, List } from '../../components';

import axios from "axios";

import './styles.scss';

const Home = ( { type } ) => {
    const blockName = 'home';

    const [ lists, setlists ] = useState( [] );
    const [ genre, setGenre ] = useState( null );

    useEffect( () => {
        const getRandomList =  async () => {
            try {
                const res = await axios.get(
                    `lists${type ? "?type=" + type : ""}${
                      genre ? "&genre=" + genre : ""
                }`, 
                {
                    headers: {
                        token: 'Bearer ' + JSON.parse( localStorage.getItem( "user" ) ).accessToken
                    }
                } );

                setlists( res.data );
            } catch( err ) {
                console.log( err );
            }
        };

        getRandomList();

    }, [ type, genre ] );

    return (
        <div className={blockName}>
          <NavBar />
          <Featured type={type} setGenre={setGenre} />
            { 
              lists.map( ( list, index ) => (
                <List key={index} list={list} />
              ) ) 
            }
        </div>
    );
};

export default Home;