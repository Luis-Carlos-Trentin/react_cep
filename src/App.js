import {useState} from 'react';
import { FiSearch } from 'react-icons/fi';
import './style.css'
import api from './services/api';

function App() {
  const [input, setInput]= useState('');
  const [cep, setCep]= useState({});

async function buscarcep(){
   if(input === ''){
    alert("oi")
    return;
     }
      try{
      const response = await api.get(`${input}/json`)
      setCep(response.data);
      setInput('');
     }catch{
      alert('erro')
      setInput('');
      }
}


  return (
    <div className="container">

      <h1 className="title">Buscador CEP</h1>

      <di className="containerinput">

          <input
          type="text"
          placeholder="Digite seu cep..."
          value={input}
          onChange={(e)=>{setInput(e.target.value)}}
          />
         
         <button className="buttonSeach" onClick={buscarcep}>
         <FiSearch size={25} color='#fff'/>
         </button>

      </di>

{Object.keys(cep).length > 0 && (
 <main className='main'>
      <h2>CEP: {cep.cep}</h2>
      <span>Rua: {cep.logradouro} </span>
      <span>Complemento: {cep.complemento}</span> 
      <span>Bairro: {cep.bairro}</span>
      <span>Cidade: {cep.localidade} - {cep.uf}</span>
  </main>
)}
     

    </div>
  );
}

export default App;
