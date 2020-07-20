import React, { useRef, useEffect } from 'react';
import reservPhoto from '../reservPhoto/klen.jpg';
import Konva from 'konva';
import {
  Stage,
  Layer,
  Image,
  Group,
  Arrow,
  Line,
  Label,
  Text,
} from 'react-konva';
import useImage from 'use-image';
import classes from './RaspilKanvas.module.scss';

const METRIC_SIZE = 20;

const TextureKromka = ({
  x,
  y,
  newWidth,
  newHeight,
  thickTop,
  thickRight,
  thickLeft,
  thickBottom,
  thinkTop,
  thinkLeft,
  thinkBottom,
  thinkRight,
  path,
}) => {
  const [image] = useImage(path);
  const distance = 33;

  let top, topText, bottom, bottomText, right, rightText, left, leftText;
  if (thickTop) {
    top = 7;
    topText = '2.0';
  } else if (thinkTop) {
    top = 3;
    topText = '0.4';
  } else {
    top = '';
    topText = '0.0';
  }
  if (thickBottom) {
    bottom = 7;
    bottomText = '2.0';
  } else if (thinkBottom) {
    bottom = 3;
    bottomText = '0.4';
  } else {
    bottom = '';
    bottomText = '0.0';
  }
  if (thickRight) {
    right = 7;
    rightText = '2.0';
  } else if (thinkRight) {
    right = 3;
    rightText = '0.4';
  } else {
    right = '';
    rightText = '0.0';
  }
  if (thickLeft) {
    left = 7;
    leftText = '2.0';
  } else if (thinkLeft) {
    left = 3;
    leftText = '0.4';
  } else {
    left = '';
    leftText = '0.0';
  }
  return (
    <React.Fragment>
      <Group x={x} y={y - distance}>
        <Image
          image={image}
          height={top}
          x={0}
          y={0}
          width={newWidth}
          shadowBlur={10}
          shadowOffset={{ x: 10, y: 10 }}
          shadowOpacity={0.3}
        />
        <Text
          text={topText}
          padding={10}
          x={newWidth / 2 - 10}
          y={0}
          fontStyle='bold'
        />
      </Group>

      <Group x={x} y={y + newHeight + distance}>
        <Image
          image={image}
          height={bottom}
          x={0}
          y={0}
          width={newWidth}
          shadowBlur={10}
          shadowOffset={{ x: 10, y: 10 }}
          shadowOpacity={0.3}
        />
        <Text
          text={bottomText}
          padding={10}
          x={newWidth / 2 - 10}
          y={0}
          fontStyle='bold'
        />
      </Group>

      <Group x={x + newWidth + distance} y={y}>
        <Image
          image={image}
          height={newHeight}
          x={0}
          y={0}
          width={right}
          shadowBlur={10}
          shadowOffset={{ x: 10, y: 10 }}
          shadowOpacity={0.3}
        />
        <Text
          text={rightText}
          padding={10}
          x={0}
          y={newHeight / 2 - 10}
          fontStyle='bold'
        />
      </Group>

      <Group x={x - distance} y={y}>
        <Image
          image={image}
          height={newHeight}
          x={0}
          y={0}
          width={left}
          shadowBlur={10}
          shadowOffset={{ x: 10, y: 10 }}
          shadowOpacity={0.3}
        />
        <Text
          text={leftText}
          padding={10}
          x={0}
          y={newHeight / 2 - 10}
          fontStyle='bold'
        />
      </Group>
    </React.Fragment>
  );
};

function Metric({ size, newLength, newWidth, x, y, vertical }) {
  console.log({ size }, { newLength }, { newWidth }, { x }, { y });
  let xGroup, yGroup;
  if (vertical) {
    xGroup = x + newLength;
    yGroup = y;
  } else {
    xGroup = x;
    yGroup = y - newWidth;
  }

  return (
    <Group x={xGroup} y={yGroup}>
      <Arrow
        points={[METRIC_SIZE / 2, 0, METRIC_SIZE / 2, newWidth]}
        stroke='black'
        strokeWidth={1}
        fill='black'
        pointerLength={5}
        pointerWidth={5}
        pointerAtBeginning
      />
      <Line points={[0, 0, METRIC_SIZE, 0]} stroke='black' strokeWidth={1} />
      <Line
        points={[0, newWidth, METRIC_SIZE, newWidth]}
        stroke='black'
        strokeWidth={1}
      />

      <Text
        text={`${size}мм`}
        padding={2}
        x={METRIC_SIZE}
        y={newWidth / 2 + 20}
        rotation={-90}
      />
    </Group>
  );
}
// function HorizontalMetric({ length, newLength, newWidth, x, y }) {
//   return (
//     <Group x={x} y={y + newHeight}>
//       <Arrow
//         points={[0, METRIC_SIZE / 2, newWidth, METRIC_SIZE / 2]}
//         stroke='black'
//         strokeWidth={1}
//         pointerLength={5}
//         pointerWidth={5}
//         fill='black'
//         pointerAtBeginning
//       />
//       <Line points={[0, 0, 0, METRIC_SIZE]} stroke='black' strokeWidth={1} />
//       <Line
//         points={[newWidth, 0, newWidth, METRIC_SIZE]}
//         stroke='black'
//         strokeWidth={1}
//       />
//       <Label x={newWidth / 2 - 20} y={METRIC_SIZE / 3} shadowColor='black'>
//         <Text text={`${width} мм`} padding={8} />
//       </Label>
//     </Group>
//   );
// }

const TextureImage = ({ path, newWidth, newLength, x, y }) => {
  const myRef = useRef(null);
  const [image] = useImage(path);
  // const reserv = <img src={reservPhoto} alt='reserv'/>

  console.log({ image });
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

export default function RaspilKanvas({ values, spravka }) {
  const {
    length,
    width,
    plate: { value: decorPlate },
    // kromka2mm: { value: decorKromka2mm },
    // kromka04mm: { value: decorKromka04mm },
    // kromka1mm: { value: decorKromka1mm },
  } = values;

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
            path={spravka.decors[decorPlate].src}
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
          {/*
          <HorizontalMetric
            width={width}
            newWidth={newWidth}
            newHeight={newHeight}
            x={x}
            y={y}
          />
          <TextureKromka
            x={x}
            y={y}
            newWidth={newWidth}
            newHeight={newHeight}
            path={searchDekor(decorKromka2mmValue, decorKromka2mmArray)}
            thickTop={thickTop}
            thickRight={thickRight}
            thickLeft={thickLeft}
            thickBottom={thickBottom}
            thinkTop={thinkTop}
            thinkLeft={thinkLeft}
            thinkBottom={thinkBottom}
            thinkRight={thinkRight}
          /> */}
        </Layer>
      </Stage>
    </div>
  );
}
