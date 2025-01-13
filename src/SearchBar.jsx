import React,{useState} from 'react';
import electricImg from './assets/electric.jpg'
import bugImg from './assets/bug.jpg';
import darkImg from './assets/dark.jpg';
import dargonImg from './assets/dragon.jpg';
import fightImg from './assets/fight.jpg';
import fireImg from './assets/fire.jpg';
import flyingImg from './assets/flying.jpg';
import ghostImg from './assets/ghost.jpg';
import grassImg from './assets/grass.jpg';
import normalImg from './assets/normal.jpg';
import poisonImg from './assets/poison.jpg';
import psychicImg from './assets/psychic.jpg';
import steelImg from './assets/steel.jpg';
import waterImg from './assets/water.jpg';
import fairyImg from './assets/fairy.jpg';
import iceImg from './assets/ice.jpg';
import ditto from './assets/ditto.jpg';
import audioP from './assets/dittoCry.ogg'
import ground from './assets/ground.jpg';
import pokeball from './assets/pokeball.png';
import rockImg from './assets/rock.jpg';


const typeToImage = {
    electric: electricImg,
    bug: bugImg,
    dark: darkImg,
    dragon: dargonImg,
    fight: fightImg,
    fire: fireImg,
    flying: flyingImg,
    ghost: ghostImg,
    grass: grassImg,
    normal: normalImg,
    poison: poisonImg,
    psychic: psychicImg,
    steel: steelImg,
    water: waterImg,
    fairy: fairyImg,
    ice: iceImg,
    ground : ground,
    rock: rockImg,
  };

function SearchBar(){
    const [pokemonName, setPokemonName] = useState("Ditto");
    const [height, setHeight] = useState("0\'12\"");
    const [weight,setWeight] = useState("8.8 lbs.");
    const [frontImage, setFrontImage] = useState(ditto);
    const [imageTypes, setImageTypes] = useState(<img src={normalImg} style={{height:25, margin:3,}}></img>);
    const [number,setNumber] =useState(`•132`);
    const [description, setDescription] = useState("It can reconstitute its entire cellular structure to change into what it sees, but it returns to normal when it relaxes.");
    const [audio, setAudio] = useState(audioP);
    const[value, setValue]=useState("");


    async function fetchData(event){
        try{
        setValue()
        const name =event.target.value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

        if(!response.ok){
            throw new Error("Could not fetch ressource");
        }
        else{
            const resp2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}/`);
            const dexData = await resp2.json();
            const data = await response.json();
            setFrontImage(data.sprites.front_default);
            //TypeImage.src = `/assets/${data.types.type.name}.jpg`;
            const inches = ((data.height/10)*39.3701);
            let extra = (inches%12)<10?("0"+(inches%12).toFixed(0).toString()):(inches%12).toFixed(0);
            const feet = Math.floor(inches/12);
            setHeight(`${feet}'${extra}"`);
            setPokemonName((data.name).charAt(0).toUpperCase()+(data.name).substring(1));
            setWeight(`${(data.weight/(0.4536*10)).toFixed(1)} lbs.`);
            const txt = dexData.flavor_text_entries.filter((element)=>{if((element.language.name==="en")&&(element.version.name==="white-2")){
                return element;  }});
            setDescription(txt[0].flavor_text);
            setImageTypes(data.types.map((element)=><img src={typeToImage[element.type.name]} key={element.type.name} style={{height:25, margin:3,}} ></img>));
            setNumber(`•${data.id}`);
            setAudio(data.cries.latest);

            
                
        }   
    }
catch(Error){
    console.error(Error);
}
    
}

function reset(){
    setValue("");

    
}


    return(
        <>
        <header>
            <div className="headiv">
                <h1>MyOnlinePokedex</h1>
        <div>
            <input placeholder="Enter a Pokemon" className="txt" onChange={fetchData} value={value}></input>
            <br></br>
            <button className="reset" src='./assets/button.png' onClick={reset}>reset</button>
            </div>
            </div>
        </header>
        <div>
            <div className="main">
                <p id="number" style={{fontWeight:'bold'}} >{number}</p>
                <p id="PokemonName" style={{fontWeight:'bold'}}>{pokemonName}</p>
                <div id="types">
                    {imageTypes}
                </div>
                <pre id="Height" style={{fontFamily:'Courier New', fontWeight:'bold'}}>HT               {height}</pre>
                <pre id="Weight" style={{fontFamily:'Courier New', fontWeight:'bold'}}>WT               {weight}</pre>
            </div>

            <div className="imgDiv">
                <img className="PokemonImg" src={frontImage} style={{transform: 'scaleX(-1)'}}></img>
                <img className="pokeBall" src={pokeball}></img>
                <div className="parag">
                    <p id="Description">{description} </p>
                </div>
            </div>
            {audio &&(
            <audio controls 
                   controlsList="noplaybackrate nodownload"
                   onLoadedData={(event)=>event.target.volume=0.3} 
                   key={audio} //adding a key forces the audio to re-render
                   className="cry" >
                <source src={audio} type="audio/ogg"></source>
            </audio>
            )}
        </div>
        </>

    );

}

export default SearchBar;