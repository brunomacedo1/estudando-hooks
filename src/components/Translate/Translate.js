import React, { useState }from 'react';
import Convert from '../Convert/Convert';
import Dropdown from '../Dropdown/Dropdown';
const options = [ 
  {
    label: 'Afrikaans',
    value: 'af'
  },
  {
    label: 'Arabic',
    value: 'ar'
  },
  {
    label: 'Hindi',
    value: 'hi'
  },
]

const Translate = () => {
  const [ language, setLanguage ] = useState(options[0])
  const [ text, setText] = useState('');

  return(
    <div className="ui form">
      <div className="ui center aligned container" style={{padding: "20px"}}>
        <div className="field">
        <label></label>
        <input 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        type="text"
        placeholder="Escreva o que deseja traduzir"
        />
        </div>
      </div>
      <Dropdown
      label="Selecione uma Língua"
      selected={language} 
      onSelectedChange={setLanguage} 
      options={options}
      />
      <div className="ui center aligned container" style={{padding: "20px"}}>
        <Convert text={text} language={language}/>
      </div>
    </div> 
  );
};

export default Translate;