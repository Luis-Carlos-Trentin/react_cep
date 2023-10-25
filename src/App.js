import {useState} from 'react';
import { FiSearch } from 'react-icons/fi';
import './style.css'
import api from './services/api';


function App() {
  const [input, setInput]= useState('');
  const [cep, setCep]= useState({});

async function buscarcep(){
   if(input === ''){
    alert("Preencha o CEP.")
    return;
     }
      try{
      const response = await api.get(`${input}/json`)
      setCep(response.data);
      setInput('');
     }catch{
    alert('Erro, CEP não localizado.')
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
    
{
  Object.keys(cep.logradouro).length > 0 &&(
<span>Rua: {cep.logradouro} </span>
  )
}

{
  Object.keys(cep.complemento).length > 0 &&(
    <span>Complemento: {cep.complemento}</span> 
  )
}

{
  Object.keys(cep.bairro).length > 0 &&(
 <span>Bairro: {cep.bairro}</span>
  )
} 
     
      <span>Cidade: {cep.localidade} - {cep.uf}</span>
  </main>
)}
     

    </div>
  );
}

export default App;
