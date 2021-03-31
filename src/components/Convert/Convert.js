import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Convert = ({ language, text }) => {
  
  const [debouncedText, setDebouncedText] = useState(text);
  const [results, setResults] = useState('');

  
  useEffect(() => {
    const timerID = setTimeout(() => {
      setDebouncedText(text);
    }, 800);

    return () => {
      clearTimeout(timerID);
    };
  }, [text]);

  useEffect(() => {
    const convert = async () => {
      const { data } = await axios.post('https://translation.googleapis.com/language/translate/v2', 
        {}, 
        {
        params: {
          q: debouncedText,
          target: language.value,
          key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'
        },
      });
      setResults(data.data.translations[0].translatedText)
    };

    if(debouncedText && language){
      convert();
    }

  }, [language, debouncedText])

  return (
    <div>
      <h3>Texto Traduzido:</h3>
      <div>
        <p>{results}</p>
      </div>
    </div>
  );
};

export default Convert;