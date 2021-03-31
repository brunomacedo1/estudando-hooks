/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react';
import Accordion from './components/Accordion/Accordion';
import Search from './components/Search/Search';
import Dropdown from './components/Dropdown/Dropdown'
import Translate from './components/Translate/Translate';

const items = [
  { title: 'O que é o React?',
    content: 'React é um framework front-end para Javascript.'
  },
  { title: 'Por que usar React?',
    content: 'React é a lib favorita dos Js devs.'
  },
  { title: 'Como usar o React',
    content: 'Você usa o React criando componentes.'
  },
];

const options = [
  {
    label: 'A cor Vermelha',
    value: 'red',
  },
  {
    label: 'A cor Verde',
    value: 'green',
  },
  {
    label: 'Um tom de Azul',
    value: 'blue',
  },
];

export default () => {
  return (
    <div style={{display: "flex", flexDirection:"column"}}>
      <Translate/>
    </div>
  );
}