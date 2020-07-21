import React, { useRef, useEffect } from 'react';
// import Konva from 'konva';
import { Stage, Layer, Image, Group, Arrow, Line, Text } from 'react-konva';
import useImage from 'use-image';

import classes from './RaspilKanvas.module.scss';

const METRIC_SIZE = 20;
const DISTANCE = 40;
const STAGE_SIZE = 336;
const PADDING = 130;

function Kromka({
  x,
  y,
  newWidth,
  newLength,
  straightKromka,
  srcKromka1mm,
  srcKromka2mm,
  srcKromka04mm,
}) {
  const renderComponent = Object.entries(straightKromka).map((el, id) => {
    const [side, thickness] = el;

    if (thickness !== '') {
      const positionX = {
        top: 0,
        bottom: 0,
        left: -DISTANCE,
        right: newLength + DISTANCE,
      };
      const posititonY = {
        top: -DISTANCE,
        bottom: newWidth + DISTANCE,
        left: 0,
        right: 0,
      };
      const positionXtext = {
        top: newLength / 2 - 10,
        bottom: newLength / 2 - 10,
        left: -DISTANCE,
        right: newLength + DISTANCE,
      };
      const posititonYtext = {
        top: -DISTANCE,
        bottom: newWidth + DISTANCE,
        left: newWidth / 2 + 20,
        right: newWidth / 2 + 20,
      };
      const rotationText = {
        top: 0,
        bottom: 0,
        left: -90,
        right: -90,
      };

      const definedSize = {
        newWidth: {
          top: {
            '2mm': 7,
            '04mm': 3,
            '1mm': 5,
          },
          bottom: {
            '2mm': 7,
            '04mm': 3,
            '1mm': 5,
          },
          left: {
            '2mm': newWidth,
            '04mm': newWidth,
            '1mm': newWidth,
          },
          right: {
            '2mm': newWidth,
            '04mm': newWidth,
            '1mm': newWidth,
          },
        },
        newLength: {
          top: {
            '2mm': newLength,
            '04mm': newLength,
            '1mm': newLength,
          },
          bottom: {
            '2mm': newLength,
            '04mm': newLength,
            '1mm': newLength,
          },
          left: {
            '2mm': 7,
            '04mm': 3,
            '1mm': 5,
          },
          right: {
            '2mm': 7,
            '04mm': 3,
            '1mm': 5,
          },
        },
      };

      return (
        <Group key={id}>
          <RenderImage
            path={
              thickness === '2mm'
                ? srcKromka2mm
                : thickness === '04mm'
                ? srcKromka04mm
                : srcKromka1mm
            }
            newWidth={definedSize.newWidth[side][thickness]}
            newLength={definedSize.newLength[side][thickness]}
            x={x + positionX[side]}
            y={y + posititonY[side]}
          />
          <Text
            text={thickness}
            padding={10}
            x={x + positionXtext[side]}
            y={y + posititonYtext[side]}
            rotation={rotationText[side]}
            fontStyle='bold'
          />
        </Group>
      );
    } else {
      return null;
    }
  });

  return <>{renderComponent}</>;
}

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

function RenderImage({ path, newWidth, newLength, x, y }) {
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
      /* filters={[Konva.Filters.Contrast]} */
      contrast={18}
      ref={myRef}
      shadowBlur={12}
      shadowOffset={{ x: 10, y: 10 }}
      shadowOpacity={0.3}
    />
  );
}

export default function RaspilKanvas({ data, spravka }) {
  const {
    length,
    width,
    plate: { type: typePlate, value: valuePlate },
  } = data;
  console.table(data);

  function calcProportion(value1, value2) {
    const newMaxValue = Math.max(value1, value2);
    const newMinValue = Math.min(value1, value2);
    const proportion = +(newMaxValue / newMinValue).toFixed(1);
    return proportion;
  }

  let newLength, newWidth;

  const proportion = calcProportion(length, width);

  if (length < width) {
    newWidth = STAGE_SIZE - PADDING;
    newLength = ~~(newWidth / proportion);
  } else if (length > width) {
    newLength = STAGE_SIZE - PADDING;
    newWidth = ~~(newLength / proportion);
  } else {
    newLength = STAGE_SIZE - PADDING;
    newWidth = STAGE_SIZE - PADDING;
  }
  const x = Math.round((STAGE_SIZE - newLength) / 2);
  const y = Math.round((STAGE_SIZE - newWidth) / 2);

  const srcKromka2mm =
    data.kromka2mm && data.kromka2mm.value !== 'no_kromka'
      ? spravka.decors[data.kromka2mm.value].src
      : undefined;
  const srcKromka04mm =
    data.kromka04mm && data.kromka04mm.value !== 'no_kromka'
      ? spravka.decors[data.kromka04mm.value].src
      : undefined;
  const srcKromka1mm =
    data.kromka1mm && data.kromka1mm.value !== 'no_kromka'
      ? spravka.decors[data.kromka1mm.value].src
      : undefined;

  return (
    <div className={classes.CanvFigures}>
      <Stage height={STAGE_SIZE} width={STAGE_SIZE}>
        <Layer>
          <RenderImage
            path={spravka.decors[valuePlate].src}
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
          {typePlate !== 'orgalit' ? (
            <Kromka
              x={x}
              y={y}
              srcKromka2mm={srcKromka2mm}
              srcKromka04mm={srcKromka04mm}
              srcKromka1mm={srcKromka1mm}
              newWidth={newWidth}
              newLength={newLength}
              straightKromka={data.straightKromka ?? undefined}
            />
          ) : null}
        </Layer>
      </Stage>
    </div>
  );
}
