import { useState, useEffect } from 'react';
import styles from './Pokemon.module.css';


const SearchPokemon = () => {
    const [searchInput, setSearchInput] = useState('');
    const [pokemonName, setPokemonName] = useState('');
    const [img, setImg] = useState('');
    const [msgError, setMsgError] = useState('')
    let timeout;

    const getPokemons = () => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput.toLocaleLowerCase()}/`)
            .then(response => {

                setTimeout(() => {
                    if (!response.ok) {
                      timeout = setMsgError('No se ha podido encontrar el pokémon.')
                      throw new Error('La solicitud no se ha podido realizar');
                    }
                  }, 2000) 

                return response.json()
            })

            .then(data => {
                clearTimeout(timeout)
                const { name, sprites: { other } } = data;
                const image = other.dream_world.front_default;

                setPokemonName(name);
                setImg(image);
                setMsg('');

            })
    }


    useEffect(() => {
        getPokemons(searchInput);

        if (!searchInput) {
            setPokemonName('');
            setImg('');
            setMsgError('');
        }
    }, [searchInput]);


    return (
        <>
            <h1>Pokémon</h1>

            <form className={styles.formulario}>
                <input type='text' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder='Ingresa el nombre del pokemon' />
                <button type='submit' onClick={() => setSearchInput('')}>Borrar</button>
            </form>
            {pokemonName &&
                <ul>
                    <li style={{ listStyleType: "none" }}>
                        <h2>{pokemonName.toUpperCase()}</h2>
                        <img src={img} alt={pokemonName} width='300' />
                    </li>
                </ul>
            }
            {!pokemonName &&
                <h2>{msgError}</h2>
            }
        </>
    )

}

export default SearchPokemon;
