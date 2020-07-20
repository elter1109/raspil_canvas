import React, { useRef, useEffect } from 'react';
import Konva from 'konva';
import { Stage, Layer, Image, Group, Arrow, Line, Text } from 'react-konva';
import useImage from 'use-image';

import Spinner from '../Spinner/Spinner';

import classes from './RaspilKanvas.module.scss';

const METRIC_SIZE = 20;

// function Kromka({
//   x,
//   y,
//   newWidth,
//   newLength,
//   straightKromka,
//   decorKromka1mm,
//   decorKromka2mm,
//   decorKromka04mm,
// }) {
//   const {top, bottom, left, right} = straightKromka;
//   const [image] = useImage(path);
//   const distance = 33;
 

//   let top, topText, bottom, bottomText, right, rightText, left, leftText;
//   if (thickTop) {
//     top = 7;
//     topText = '2.0';
//   } else if (thinkTop) {
//     top = 3;
//     topText = '0.4';
//   } else {
//     top = '';
//     topText = '0.0';
//   }
//   if (thickBottom) {
//     bottom = 7;
//     bottomText = '2.0';
//   } else if (thinkBottom) {
//     bottom = 3;
//     bottomText = '0.4';
//   } else {
//     bottom = '';
//     bottomText = '0.0';
//   }
//   if (thickRight) {
//     right = 7;
//     rightText = '2.0';
//   } else if (thinkRight) {
//     right = 3;
//     rightText = '0.4';
//   } else {
//     right = '';
//     rightText = '0.0';
//   }
//   if (thickLeft) {
//     left = 7;
//     leftText = '2.0';
//   } else if (thinkLeft) {
//     left = 3;
//     leftText = '0.4';
//   } else {
//     left = '';
//     leftText = '0.0';
//   }
//   return (
//     <React.Fragment>
//       <Group x={x} y={y - distance}>
//         <Image
//           image={image}
//           height={top}
//           x={0}
//           y={0}
//           width={newWidth}
//           shadowBlur={10}
//           shadowOffset={{ x: 10, y: 10 }}
//           shadowOpacity={0.3}
//         />
//         <Text
//           text={topText}
//           padding={10}
//           x={newWidth / 2 - 10}
//           y={0}
//           fontStyle='bold'
//         />
//       </Group>

//       <Group x={x} y={y + newHeight + distance}>
//         <Image
//           image={image}
//           height={bottom}
//           x={0}
//           y={0}
//           width={newWidth}
//           shadowBlur={10}
//           shadowOffset={{ x: 10, y: 10 }}
//           shadowOpacity={0.3}
//         />
//         <Text
//           text={bottomText}
//           padding={10}
//           x={newWidth / 2 - 10}
//           y={0}
//           fontStyle='bold'
//         />
//       </Group>

//       <Group x={x + newWidth + distance} y={y}>
//         <Image
//           image={image}
//           height={newHeight}
//           x={0}
//           y={0}
//           width={right}
//           shadowBlur={10}
//           shadowOffset={{ x: 10, y: 10 }}
//           shadowOpacity={0.3}
//         />
//         <Text
//           text={rightText}
//           padding={10}
//           x={0}
//           y={newHeight / 2 - 10}
//           fontStyle='bold'
//         />
//       </Group>

//       <Group x={x - distance} y={y}>
//         <Image
//           image={image}
//           height={newHeight}
//           x={0}
//           y={0}
//           width={left}
//           shadowBlur={10}
//           shadowOffset={{ x: 10, y: 10 }}
//           shadowOpacity={0.3}
//         />
//         <Text
//           text={leftText}
//           padding={10}
//           x={0}
//           y={newHeight / 2 - 10}
//           fontStyle='bold'
//         />
//       </Group>
//     </React.Fragment>
//   );
// }

function Metric({ size, newLength, newWidth, x, y, vertical }) {
  let xGroup,
    yGroup,
    arrowPoints,
    line1Points,
    line2Points,
    xText,
    yText,
    rotationText;
  if (vertical) {
    xGroup = x + newLength;
    yGroup = y;
    arrowPoints = [METRIC_SIZE / 2, 0, METRIC_SIZE / 2, newWidth];
    line1Points = [0, 0, METRIC_SIZE, 0];
    line2Points = [0, newWidth, METRIC_SIZE, newWidth];
    xText = METRIC_SIZE;
    yText = newWidth / 2 + 20;
    rotationText = -90;
  } else {
    xGroup = x;
    yGroup = y + newWidth;
    arrowPoints = [0, METRIC_SIZE / 2, newLength, METRIC_SIZE / 2];
    line1Points = [0, 0, 0, METRIC_SIZE];
    line2Points = [newLength, 0, newLength, METRIC_SIZE];
    xText = newLength / 2 - 20;
    yText = METRIC_SIZE;
    rotationText = 0;
  }

  return (
    <Group x={xGroup} y={yGroup}>
      <Arrow
        points={arrowPoints}
        stroke='black'
        strokeWidth={1}
        fill='black'
        pointerLength={5}
        pointerWidth={5}
        pointerAtBeginning
      />
      <Line points={line1Points} stroke='black' strokeWidth={1} />
      <Line points={line2Points} stroke='black' strokeWidth={1} />
      <Text
        text={`${size}мм`}
        padding={2}
        x={xText}
        y={yText}
        rotation={rotationText}
      />
    </Group>
  );
}

function TextureImage ({ path, newWidth, newLength, x, y }) {
  const myRef = useRef(null);
  const [image, status] = useImage(path);
  useEffect(() => {
    if (image) {
      myRef.current.cache();
    }
  }, [image]);
  return (
    <Image
      image={image}
      width={newLength}
      height={newWidth}
      x={x}
      y={y}
      filters={[Konva.Filters.Contrast]}
      contrast={18}
      ref={myRef}
      shadowBlur={20}
      shadowOffset={{ x: 10, y: 10 }}
      shadowOpacity={0.5}
    />
  );
};

export default function RaspilKanvas({ data, spravka }) {
  const {
    length,
    width,
  } = data;

  function calcProportion(value1, value2) {
    const newMaxValue = Math.max(value1, value2);
    const newMinValue = Math.min(value1, value2);
    const proportion = +(newMaxValue / newMinValue).toFixed(1);
    return proportion;
  }

  let newLength, newWidth;
  const STAGE_SIZE = 320;
  const proportion = calcProportion(length, width);
  console.log({ proportion });

  if (length < width) {
    newWidth = STAGE_SIZE - 120;
    newLength = ~~(newWidth / proportion);
  } else if (length > width) {
    newLength = STAGE_SIZE - 120;
    newWidth = ~~(newLength / proportion);
  } else {
    newLength = STAGE_SIZE - 120;
    newWidth = STAGE_SIZE - 120;
  }
  const x = Math.round((STAGE_SIZE - newLength) / 2);
  const y = Math.round((STAGE_SIZE - newWidth) / 2);

  return (
    <div className={classes.CanvFigures}>
      <Stage height={STAGE_SIZE} width={STAGE_SIZE}>
        <Layer>
          <TextureImage
            path={spravka.decors[data.plate.value].src}
            newLength={newLength}
            newWidth={newWidth}
            x={x}
            y={y}
          />
          <Metric
            size={width}
            newLength={newLength}
            newWidth={newWidth}
            x={x}
            y={y}
            vertical
          />
          <Metric
            size={length}
            newLength={newLength}
            newWidth={newWidth}
            x={x}
            y={y}
          />
          {/* <Kromka
            x={x}
            y={y}
            decorKromka2mm={spravka.decors[data.kromka2mm.value].src}
            decorKromka04mm={spravka.decors[data.kromka04mm.value].src}
            decorKromka1mm={spravka.decors[data.kromka1mm.value].src}
            newWidth={newWidth}
            newLength={newLength}
            straightKromka={data.straightKromka}
          /> */}
        </Layer>
      </Stage>
    </div>
  );
}
