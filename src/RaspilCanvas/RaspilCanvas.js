import React from 'react';
import {
  Stage,
  Layer,
  Image,
  Group,
  Arrow,
  Line,
  Text,
  Rect,
} from 'react-konva';
import useImage from 'use-image';

import classes from './RaspilCanvas.module.scss';

const METRIC_SIZE = 20;
const DISTANCE = 40;
const STAGE_SIZE = 330;
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
      const defineSize = (size, side, thickness, flag) => {
        let newValue;
        const newSize = {
          '2mm': 7,
          '04mm': 3,
          '1mm': 5,
        };
        if (flag === 'newWidth' && (side === 'top' || side === 'bottom')) {
          newValue = newSize[thickness];
        } else if (
          flag === 'newWidth' &&
          (side === 'left' || side === 'right')
        ) {
          newValue = size;
        } else if (
          flag === 'newLength' &&
          (side === 'top' || side === 'bottom')
        ) {
          newValue = size;
        } else if (
          flag === 'newLength' &&
          (side === 'left' || side === 'right')
        ) {
          newValue = newSize[thickness];
        }
        return newValue;
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
            newWidth={defineSize(newWidth, side, thickness, 'newWidth')}
            newLength={defineSize(newLength, side, thickness, 'newLength')}
            x={x + positionX[side]}
            y={y + posititonY[side]}
            position={side}
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

function RenderImage({ path, newWidth, newLength, x, y, position }) {
  let render;
  const [image, status] = useImage(path);

  //render NotLoading
  const newPositionTextLoading =
    position === 'top' || position === 'bottom'
      ? 'topBottom'
      : position === 'left' || position === 'right'
      ? 'leftRight'
      : 'center';

  const positionTextLoading = {
    topBottom: {
      x: x + (newLength / 2 - 50),
      y: y,
      rotation: 0,
    },
    leftRight: {
      x: x,
      y: y + (newWidth / 2 + 40),
      rotation: -90,
    },
    center: {
      x: x + (newLength / 2 - 50),
      y: y + (newWidth / 2 - 5),
      rotation: 0,
    },
  };

  if (status === 'loaded') {
    render = (
      <Image
        image={image}
        width={newLength}
        height={newWidth}
        x={x}
        y={y}
        contrast={18}
        shadowBlur={12}
        shadowOffset={{ x: 10, y: 10 }}
        shadowOpacity={0.3}
      />
    );
  } else {
    render = (
      <>
        {position === 'center' ? (
          <Rect
            x={x}
            y={y}
            width={newLength}
            height={newWidth}
            fill={'grey'}
            opacity={0.5}
          />
        ) : null}
        <Text
          fill={'#3f51b5'}
          text={
            status === 'loading'
              ? 'Идет загрузка декора...'
              : 'Декор не загрузился'
          }
          x={positionTextLoading[newPositionTextLoading].x}
          y={positionTextLoading[newPositionTextLoading].y}
          rotation={positionTextLoading[newPositionTextLoading].rotation}
        />
      </>
    );
  }
  return render;
}

export default function RaspilKanvas({ data, spravka }) {
  const {
    length,
    width,
    plate: { type: typePlate, value: valuePlate },
  } = data;

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
    !!data.kromka04mm && data.kromka04mm.value !== 'no_kromka'
      ? spravka.decors[data.kromka04mm.value].src
      : undefined;

  const srcKromka1mm =
    data.kromka1mm && data.kromka1mm.value !== 'no_kromka'
      ? spravka.decors[data.kromka1mm.value].src
      : undefined;

  return (
    <Stage height={STAGE_SIZE} width={STAGE_SIZE} className={classes.stage}>
      <Layer>
        <RenderImage
          path={spravka.decors[valuePlate].src}
          newLength={newLength}
          newWidth={newWidth}
          x={x}
          y={y}
          position={'center'}
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
  );
}
