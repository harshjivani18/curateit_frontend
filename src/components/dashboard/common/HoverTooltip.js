import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { Tooltip } from 'react-basics';
import styles from './HoverTooltip.module.css';

export function HoverTooltip({ tooltip }) {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [position, setPosition] = useState({ x: -1000, y: -1000 });

  // console.log("width", width)
  // console.log("height", height)

  useEffect(() => {
    const handler = e => {
      setPosition({ x: e.clientX, y: e.clientY});
    };

    document.addEventListener('mousemove', handler);

    return () => {
      document.removeEventListener('mousemove', handler);
    };
  }, []);

  useLayoutEffect(() => {
    setWidth(Number(ref.current.offsetWidth));
    setHeight(Number(ref.current.offsetHeight));
  }, []);


  return (
    <div className={styles.tooltip} style={{ left: position.x - width / 2, top: position.y - height }} ref={ref}>
      {/* <Tooltip position="top" action="none" label={tooltip} /> */}
      <Tooltip position="top" action="none" label={tooltip}>
        {tooltip}
      </Tooltip>
    </div>
  );
}

export default HoverTooltip;
