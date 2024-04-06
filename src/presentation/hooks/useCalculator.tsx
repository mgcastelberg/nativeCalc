import { useRef, useState } from "react"

enum Operator {
  add,
  substract,
  multiply,
  divide
}

export const useCalculator = () => {

  const [number, setNumber] = useState('0') // manejando un string
  const [prevNumber, setprevNumber] = useState('0')

  const lastOperation = useRef<Operator>();

  // Borrar valores
  const clean = () => {
    setNumber('0');
    setprevNumber('0');
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

  const toggleSign = () => {

    if( number.includes('-') ){
      return setNumber( number.replace('-','') );
    }
    setNumber('-' + number );
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

  const setLastNumber = () => {
    if ( number.endsWith('.') ) {
      setprevNumber( number.slice(0,-1) );
    } else {
      setprevNumber( number );
    }
    setNumber('0');
  }

  const addOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.add;
  }

  const substractOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.substract;
  }

  const multiplyOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.multiply;
  }

  const divideOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.divide;
  }

  

  return {
    // Properties
    number,
    prevNumber,
    // Methods
    buildNumber,
    toggleSign,
    clean,
    deleteOperation,
    addOperation,
    substractOperation,
    multiplyOperation,
    divideOperation
  }
}
