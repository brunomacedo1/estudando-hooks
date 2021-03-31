import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Search = (props) => {
  const [term, setTerm] = useState('baleias');
  //Debounced indica o cancelamento de um timer. ex: clearTimeOut.
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);

  //useEffect criado para controlar as requisições a partir do cancelamento
  //do setTimeOut.
  //Toda vez que o usuário digita é mudado o state 'term' e consequentemente
  //esse useEffect irá tentar atualizar o state debouncedTerm, no entanto
  // toda vez que o usuário digita é criado um setTimeOut, e o mesmo é cancelado caso
  // o usuário digite novamente, até que se passe um tempo de 1 segundo para não ser cancelado
  // Só ai que o 'debouncedTerm' é atualizado e a requisição é feita, pois o segundo useEffect é baseado
  //na mudança do state 'debouncedTerm'
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    }
  }, [term]);

  //Hook que permite utilizar funções auxiliares dentro de um function componente
  useEffect(() => {
    //Requisição para api da wikipedia.
    const search = async () => {
      const { data } = await axios.get('https://en.wikipedia.org/w/api.php',{
       params: {
         action: 'query',
         list: 'search',
         origin: '*',
         format: 'json',
         srsearch: debouncedTerm, 
        },
      });
      //Setando o state com hooks.
      setResults(data.query.search)
    };
    if (debouncedTerm){
      search();
    }

    //Solução utilizando apenas um useEffect();
    // //If: Condição indica que é a primeira vez que o app renderiza.
    // //Else o app está re-renderizando.
    // if (term && !results.length) {
    //   search();
    // } else {
    //   //Timeout de 0,5segundos para requisção.
    //   const timeoutID = setTimeout(() =>{
    //     if (term) {
    //       search();
    //       }
    //   }, 1000)

    //   //CleanUp function que é executada toda vez que o app é re-renderizado.
    //   return () => {
    //     clearTimeout(timeoutID);
    //   }
    // }

  },[debouncedTerm]);

  // Mapeando o resultado da requisição, e criando os 
  // itens com o titulo e sumário do objeto, e link para página no wiki.
  const renderedResults = results.map((result) => {
    return (
      <div className="item" key={result.pageid}>
        <div className="right floated content">
          <a 
            className="ui button" 
            href={`https://en.wikipedia.org?curid=${result.pageid}`} 
            target="blank"
          >Go</a>
          </div>
        <div className="content">
          <div className="header">{result.title}</div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
        </div>
      </div>
    );
  });


  //Retorna o componente Search
  return (
    <div>
      <div className="ui form">
        <div className="ui field">
          <label htmlFor="">Pesquisa</label>
          <input 
            value={term} 
            onChange={ (e) =>  setTerm(e.target.value)}
            className="ui input"
            type="text" 
            />
        </div>
      </div>
      <div className="ui celled list">{renderedResults}</div>
    </div>
  )
}

export default Search;
