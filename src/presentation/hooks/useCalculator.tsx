import { useState } from "react"

export const useCalculator = () => {

  const [number, setNumber] = useState('0') // manejando un string

  // Borrar valores
  const clean = () => {
    setNumber('0');
  }

  // Borrar el ultimo numero ingresado
  const deleteOperation = () => {

    let currentSign = '';
    let temporalNumber = number;

    if (number.includes('-')) { 
      currentSign = '-';
      temporalNumber = number.substring(1);
    }

    if (temporalNumber.length > 1) { 
      // return setNumber( currentSign + temporalNumber.substring(0, temporalNumber.length-1) );
      return setNumber( currentSign + temporalNumber.slice(0, -1) );
    }

    setNumber('0');
  }

  const buildNumber = ( numberString: string ) => {

    // Validaciones
    if(number.includes('.') && numberString === '.') return;

    if(number.startsWith('0') || number.startsWith('-0')) {

      // punto decimal
      if ( numberString === '.' ) {
        return setNumber( number + numberString )
      }
      // Evaluar si es otro cero y no hay punto
      if ( numberString === '0' && number.includes('.') ) {
        return setNumber( number + numberString );
      }
      // Evaluar si es diferente de cero, no hay punto, y es el primer numero
      if ( numberString !== '0' && !number.includes('.') ) {
        return setNumber( numberString );
      }
      // evitar 00000 al principio
      if ( numberString === '0' && !number.includes('.') ) {
        return;
      }
      return setNumber( number + numberString );
    }

    setNumber( number + numberString);
  }

  const toggleSign = () => {

    if( number.includes('-') ){
      return setNumber( number.replace('-','') );
    }
    setNumber('-' + number );
  }

  
  return {
    // Properties
    number,
    // Methods
    buildNumber,
    toggleSign,
    clean,
    deleteOperation
  }
}