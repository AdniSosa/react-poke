import { useState, useEffect } from 'react';
import styles from './Pokemon.module.css';


const SearchPokemon = () => {
    const [letter, setLetter] = useState('');
    const [pokemonName, setPokemonName] = useState('');
    const [img, setImg] = useState('');
    const [msg, setMsg] = useState('')
    let timeout;

    const getPokemons = () => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${letter.toLocaleLowerCase()}/`)
            .then(response => {

                setTimeout(() => {
                    if (!response.ok) {
                      timeout = setMsg('No se ha podido encontrar el pokemon.')
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
        getPokemons(letter);

        if (!letter) {
            setPokemonName('');
            setImg('');
            setMsg('');
        }
    }, [letter]);


    return (
        <>
            <h1>Pokemon</h1>

            <form className={styles.formulario}>
                <input type='text' value={letter} onChange={(e) => setLetter(e.target.value)} placeholder='Ingresa el nombre del pokemon' />
                <button type='submit' onClick={() => setLetter('')}>Borrar</button>
            </form>
            {pokemonName &&
                <ul>
                    <li style={{ listStyleType: "none" }}>
                        <h2>{pokemonName.toUpperCase()}</h2>
                        <img src={img} alt={pokemonName} width='300' />
                    </li>
                </ul>
            }
            {msg &&
                <h2>{msg}</h2>
            }
        </>
    )

}

export default SearchPokemon;
