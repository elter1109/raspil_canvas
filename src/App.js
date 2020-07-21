import React from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import RaspilKanvas from './RaspilKanvas/RaspilKanvas';

import classes from './App.module.scss';

const data = {
  length: 2600,
  width: 600,
  quantity: 6,
  plate: {
    type: 'mm0810',
    value: 'h1555',
    quantity: 3.12,
    price: 1100,
    sum: 3432,
  },
  kromka2mm: {
    value: 'reh1615',
    quantity: 0,
    price: 32,
    sum: 998,
  },
  kromka04mm: {
    value: 'reh1555',
    quantity: 0,
    price: 0,
    sum: 0,
  },
  straightKromka: {
    top: '2mm',
    bottom: '2mm',
    left: '',
    right: '04mm',
  },
  packing: false,
  totalSum: 4430,
};
// const data = {
//   length: 2600,
//   width: 200,
//   quantity: 6,
//   plate: {
//     type: 'mdf',
//     value: 'hg605',
//     quantity: 3.12,
//     price: 1100,
//     sum: 3432,
//   },
//   kromka2mm: null,
//   kromka04mm: null,
//   straightKromka: {
//     top: '',
//     bottom: '',
//     left: '',
//     right: '',
//   },
//   kromka1mm: {
//     value: 'no_kromka',
//     quantity: 0,
//     price: 0,
//     sum: 0,
//   },
//   packing: false,
//   totalSum: 4430,
// };

// spravka redux
const spravka = {
  decors: {
    h1348: {
      id: 'h1348',
      label: 'Кремона шампань H1348 (Egger)',
      src:
        'https://firebasestorage.googleapis.com/v0/b/raspil.appspot.com/o/decorPlate%2Fklen.jpg?alt=media&token=2f8a3da7-f17e-43f5-bcc3-bdc371537edb',
    },
    h3304: {
      id: 'h3304',
      label: 'Дуб шато H3304 (Egger)',
      src:
        'https://firebasestorage.googleapis.com/v0/b/raspil.appspot.com/o/decorPlate%2Fshato.jpg?alt=media&token=17450706-c90a-4315-b4db-41b2ae5549ea',
    },
    h1555: {
      id: 'h1555',
      label: 'Венге H1555 (Egger)',
      src:
        'https://firebasestorage.googleapis.com/v0/b/raspil.appspot.com/o/decorPlate%2Fvenge.jpg?alt=media&token=3aa251b4-a072-4c5f-bccf-e2a0c0a9a62d',
    },
    h1615: {
      id: 'h1615',
      label: 'Вишня H1615 (Egger)',
      src:
        'https://firebasestorage.googleapis.com/v0/b/raspil.appspot.com/o/decorPlate%2Fvishnya.jpg?alt=media&token=e2e5b313-f133-4b2b-b84d-3a54e09e2eb1',
    },
    reh1348: {
      id: 'reh1348',
      label: 'Rehau дуб средний (Rehau)',
      src:
        'https://firebasestorage.googleapis.com/v0/b/raspil.appspot.com/o/decorPlate%2Fklen.jpg?alt=media&token=2f8a3da7-f17e-43f5-bcc3-bdc371537edb',
    },
    reh3304: {
      id: 'reh3304',
      label: 'Rehau дуб шато (Rehau)',
      src:
        'https://firebasestorage.googleapis.com/v0/b/raspil.appspot.com/o/decorPlate%2Fshato.jpg?alt=media&token=17450706-c90a-4315-b4db-41b2ae5549ea',
    },
    reh1555: {
      id: 'reh1555',
      label: 'Rehau венге (Rehau)',
      src:
        'https://firebasestorage.googleapis.com/v0/b/raspil.appspot.com/o/decorPlate%2Fvenge.jpg?alt=media&token=3aa251b4-a072-4c5f-bccf-e2a0c0a9a62d',
    },
    reh1615: {
      id: 'reh1615',
      label: 'Rehau вишня (Rehau)',
      src:
        'https://firebasestorage.googleapis.com/v0/b/raspil.appspot.com/o/decorPlate%2Fvishnya.jpg?alt=media&token=e2e5b313-f133-4b2b-b84d-3a54e09e2eb1',
    },
    reh097: {
      id: 'reh097',
      label: '097 кремовый',
      src:
        'https://firebasestorage.googleapis.com/v0/b/raspil.appspot.com/o/decorPlate%2Fklen.jpg?alt=media&token=2f8a3da7-f17e-43f5-bcc3-bdc371537edb',
    },
    reh605: {
      id: 'reh605',
      label: '605 кремовый',
      src:
        'https://firebasestorage.googleapis.com/v0/b/raspil.appspot.com/o/decorPlate%2Fklen.jpg?alt=media&token=2f8a3da7-f17e-43f5-bcc3-bdc371537edb',
    },
    hg606: {
      id: 'hg606',
      label: '606HG cветло-бежевый',
      src:
        'https://firebasestorage.googleapis.com/v0/b/raspil.appspot.com/o/decorPlate%2Fklen.jpg?alt=media&token=2f8a3da7-f17e-43f5-bcc3-bdc371537edb',
    },
    klen: {
      id: 'klen',
      label: 'Оргалит Клен',
      src:
        'https://firebasestorage.googleapis.com/v0/b/raspil.appspot.com/o/decorPlate%2Fklen.jpg?alt=media&token=2f8a3da7-f17e-43f5-bcc3-bdc371537edb',
    },
    venge: {
      id: 'venge',
      label: 'Оргалит Венге',
      src:
        'https://firebasestorage.googleapis.com/v0/b/raspil.appspot.com/o/decorPlate%2Fvenge.jpg?alt=media&token=3aa251b4-a072-4c5f-bccf-e2a0c0a9a62d',
    },
    hg605: {
      id: 'hg605',
      label: '605HG кремовый',
      src:
        'https://firebasestorage.googleapis.com/v0/b/raspil.appspot.com/o/decorPlate%2Fklen.jpg?alt=media&token=2f8a3da7-f17e-43f5-bcc3-bdc371537edb',
    },
    mm16: {
      label: 'ДСП 16мм',
    },
    mm25: {
      label: 'ДСП 25мм',
    },
    mm0810: {
      label: 'ДСП 08-10мм',
    },
    orgalit: {
      label: 'ОРГАЛИТ',
    },
    mdf: {
      label: 'МДФ',
    },
    kromka2mm: {
      label: 'Кромка 2мм',
    },
    kromka04mm: {
      label: 'Кромка 0,4mm',
    },
    kromka1mm: {
      label: 'Кромка 1мм',
    },
  },
  types: {
    mm16: [
      { decor: 'h1348', price: 550, availableForOrder: true },
      { decor: 'h3304', price: 620, availableForOrder: false },
      { decor: 'h1555', price: 670, availableForOrder: true },
      { decor: 'h1615', price: 690, availableForOrder: false },
    ],
    mm25: [
      { decor: 'h1348', price: 1100, availableForOrder: true },
      { decor: 'h1555', price: 950, availableForOrder: true },
      { decor: 'h1615', price: 1000, availableForOrder: false },
    ],
    mm0810: [
      { decor: 'h1348', price: 520, availableForOrder: true },
      { decor: 'h1555', price: 580, availableForOrder: true },
    ],
    orgalit: [
      {
        decor: 'klen',
        price: 230,
        availableForOrder: true,
      },
      {
        decor: 'venge',
        price: 200,
        availableForOrder: true,
      },
    ],
    mdf: [
      { decor: 'hg605', price: 1800, availableForOrder: true },
      { decor: 'hg606', price: 1900, availableForOrder: true },
    ],

    kromka2mm_mm25: [
      { decor: 'reh1348', price: 45 },
      { decor: 'reh3304', price: 48 },
      { decor: 'reh097', price: 49 },
      { decor: 'no_kromka', price: 0 },
    ],
    kromka04mm_mm25: [
      { decor: 'reh1348', price: 25 },
      { decor: 'reh1615', price: 22 },
      { decor: 'reh097', price: 24 },
      { decor: 'no_kromka', price: 0 },
    ],
    kromka2mm_mm16: [
      { decor: 'reh1348', price: 22 },
      { decor: 'reh3304', price: 20 },
      { decor: 'reh1555', price: 19 },
      { decor: 'reh1615', price: 18 },
      { decor: 'reh097', price: 21 },
      { decor: 'no_kromka', price: 0 },
    ],
    kromka04mm_mm16: [
      { decor: 'reh1348', price: 15 },
      { decor: 'reh3304', price: 16 },
      { decor: 'reh1555', price: 18 },
      { decor: 'reh1615', price: 19 },
      { decor: 'reh097', price: 17 },
      { decor: 'no_kromka', price: 0 },
    ],
    kromka1mm_mdf: [
      { decor: 'reh605', price: 30 },
      { decor: 'no_kromka', price: 0 },
    ],
  },
};
export default function App() {
  return (
    <StylesProvider injectFirst>
      <div className={classes.App}>
        <RaspilKanvas data={data} spravka={spravka} />
      </div>
    </StylesProvider>
  );
}
