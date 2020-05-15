import React, { useState, useEffect } from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import RaspilSelect from './RaspilSelect/RaspilSelect';
import RaspilKanvas from './RaspilKanvas/RaspilKanvas';

import classes from './App.module.scss';

export default function App() {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    lengthDetail: {
      value: 1500,
      name: 'lengthDetail',
      label: 'Длина, мм',
      valid: true,
      rules: {
        isNumber: true,
        max: 2800,
      },
      touched: false,
    },
    widthDetail: {
      value: 1500,
      name: 'widthDetail',
      label: 'Ширина, мм',
      valid: true,
      rules: {
        isNumber: true,
        max: 2000,
      },
      touched: false,
    },
    decorPlate: {
      label: 'Декор плиты',
      value: 'H1555_egger',
      valid: true,
      touched: false,
      name: 'decorPlate',
      rules: {
        isSelect: true,
      },
    },
    decorKromka2mm: {
      label: 'Декор кромки 2мм',
      value: 'klen_rehau',
      valid: true,
      touched: false,
      name: 'decorKromka2mm',
      rules: {
        isSelect: true,
      },
    },
    decorKromka04mm: {
      label: 'Декор кромки 0.4мм',
      value: 'dub_rehau',
      valid: true,
      touched: false,
      name: 'decorKromka04mm',
      rules: {
        isSelect: true,
      },
    },
    validForm: false,
  });
  useEffect(() => {
    (async () => {
      const url = 'https://raspil.firebaseio.com/spravka.json';
      const response = await fetch(url, {
        method: 'GET',
      });
      const newResult = await response.json();
      setData((data) => {
        return {
          ...data,
          decorArray: newResult.decorArray,
          decorKromka2mmArray: newResult.decorKromka2mmArray,
        };
      });
      setLoading(false);
    })();
  }, []);

  //PATCH добавили на сервер кромку
  async function sendKromka() {
    const url = 'https://raspil.firebaseio.com/spravka.json';
    const data = {
      decorKromka2mmArray: [
        {
          label: 'Rehau klen',
          value: 'klen_rehau',
          src:
            'https://firebasestorage.googleapis.com/v0/b/raspil.appspot.com/o/decorPlate%2Fshato.jpg?alt=media&token=17450706-c90a-4315-b4db-41b2ae5549ea',
        },
        {
          label: 'Rehau вишня',
          value: 'vishnya_rehau',
          src:
            'https://firebasestorage.googleapis.com/v0/b/raspil.appspot.com/o/decorPlate%2Fvishnya.jpg?alt=media&token=e2e5b313-f133-4b2b-b84d-3a54e09e2eb1',
        },
        {
          label: 'Rehau_шато',
          value: 'shato_rehau',
          src:
            'https://firebasestorage.googleapis.com/v0/b/raspil.appspot.com/o/decorPlate%2Fklen.jpg?alt=media&token=2f8a3da7-f17e-43f5-bcc3-bdc371537edb',
        },
        {
          label: 'Rehau венге',
          value: 'venge_rehau',
          src:
            'https://firebasestorage.googleapis.com/v0/b/raspil.appspot.com/o/decorPlate%2Fvenge.jpg?alt=media&token=3aa251b4-a072-4c5f-bccf-e2a0c0a9a62d',
        },
      ],
    };
    const result = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    console.log(result);
  }
  let render;
  if (!loading) {
    render = (
      <>
        <div className={classes.select}>
          <RaspilSelect
            data={data.decorArray}
            label={state.decorPlate.label}
            helperText='Выберите декор плиты'
            value={state.decorPlate.value}
            handleSelectChange={handleSelectChange}
            name={state.decorPlate.name}
          />
          <RaspilSelect
            data={data.decorKromka2mmArray}
            label={state.decorKromka2mm.label}
            helperText='Выберите декор кромки 2мм'
            value={state.decorKromka2mm.value}
            handleSelectChange={handleSelectChange}
            name={state.decorKromka2mm.name}
          />
        </div>
        <div className={classes.Kanvas}>
          <RaspilKanvas
            values={state}
            modelServer={data}
            thinkTop
            thinkLeft
            thinkBottom
            thinkRight
          />
        </div>
      </>
    );
  } else {
    render = <h1>Loading...</h1>;
  }
  return (
    <StylesProvider injectFirst>
      <div className={classes.App}>
        {render}
        {/* <button onClick={sendKromka}>Отправить</button> */}
      </div>
    </StylesProvider>
  );

  function handleSelectChange(event, type) {
    setState({
      ...state,
      [type]: {
        ...state[type],
        value: event.target.value,
      },
    });
  }
}
