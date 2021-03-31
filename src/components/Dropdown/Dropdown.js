import React, { useEffect, useState, useRef } from 'react';

const Dropdown = ({label, options, selected, onSelectedChange}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  
  useEffect(() => {
    const onBodyClick = event => {
      if (ref.current && ref.current.contains(event.target)){
        return;
      }
      setOpen(false)
    };

    document.body.addEventListener('click', onBodyClick)

    return () => {
      document.body.removeEventListener('click', onBodyClick)
    };
    
  }, []);


  const renderedOptions = options.map((option) =>{
    if(option.value === selected.value) {
      //Não renderiza nada
      return null;
    }
    return (
      <div 
        key={option.value} 
        className="item"
        onClick={() => {
          onSelectedChange(option);
        }}
      >
        {option.label}
      </div>
    );
  });

  return (
    <div className="ui center aligned container" style={{padding: "20px"}}>
    <div ref={ref} className="ui form">
      <div className="field">
        <label htmlFor="" className="label">{label}</label>
        <div 
          onClick={() => {
            setOpen(!open)
          }} 
          className={`ui selection dropdown ${open ? 'visible active' : ''}`}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div className={`menu ${open ? 'visible transition' : ''}`}>
            {renderedOptions}
          </div>
        </div>
      </div>
    </div>
    {/* <div><p style={{color: `${selected.value}`}}>Texto</p></div> */}
    </div>
  );
}

export default Dropdown;