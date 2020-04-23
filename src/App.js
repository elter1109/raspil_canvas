import React, {useState} from 'react';
import { StylesProvider } from '@material-ui/core/styles';


import RaspilKanvas from './RaspilKanvas/RaspilKanvas';

import classes from './App.module.scss';


export default function App() {
  const [state, setState] = useState({
    lengthDetail: {
      value: 1500,
      type: 'lengthDetail',
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
      type: 'widthDetail',
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
      value: 'H1348_egger',
      valid: true,
      touched: false,
      type: 'decorPlate',
      rules: {
        isSelect: true,
      },
    },
    decorKromka2mm: {
      label: 'Декор кромки 2мм',
      value: 'dub_rehau',
      valid: true,
      touched: false,
      type: 'decorKromka2mm',
      rules: {
        isSelect: true,
      },
    },
    decorKromka04mm: {
      label: 'Декор кромки 0.4мм',
      value: 'dub_rehau',
      valid: true,
      touched: false,
      type: 'decorKromka04mm',
      rules: {
        isSelect: true,
      },
    },
    validForm: false,
  });
 
  return (
    <StylesProvider injectFirst>
      <div className={classes.App}>
        <div className={classes.Kanvas}>
        <RaspilKanvas
            values={state}
            textureDetail='129.jpg'
            textureKromka='126.jpg'
            thickLeft
            thinkTop
            thickBottom
            thickRight
          />
        </div>
      </div>
    </StylesProvider>
  );
}
