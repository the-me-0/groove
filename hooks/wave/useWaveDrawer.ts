export const useWaveDrawer = () => {
  const dpr = window.devicePixelRatio || 1;
  const padding = 25;

  /**
   * Draws the audio file into a canvas element.
   * @param {Array} normalizedData The filtered array returned from filterData()
   * @param canvas The canvas element to draw on
   * @returns {Array} a normalized array of data
   */
  const drawCanvas = (normalizedData: Array<number>, canvas: HTMLCanvasElement): void => {
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = (canvas.offsetHeight + padding * 2) * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error('Canvas context not found');
      return;
    }
    // clear the current state
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.scale(dpr, dpr);
    ctx.translate(0, canvas.offsetHeight / 2 + padding); // set Y = 0 to be in the middle of the canvas

    // draw the line segments
    const width = canvas.offsetWidth / normalizedData.length;
    let index = 0;

    const drawLineSegmentWrapper = () => {
      const x = width * index;
      let height = normalizedData[index] * canvas.offsetHeight - padding;
      if (height < 0) {
        height = 0;
      } else if (height > canvas.offsetHeight / 2) {
        height = height - canvas.offsetHeight / 2;
      }

      drawLineSegment(ctx, x, height, width, Boolean((index + 1) % 2));

      if (index < normalizedData.length) {
        index++;
        requestAnimationFrame(drawLineSegmentWrapper);
      }
    }

    drawLineSegmentWrapper();
  };

  /**
   * A utility function for drawing our line segments
   * @param {AudioContext} ctx the audio context
   * @param {number} x  the x coordinate of the beginning of the line segment
   * @param {number} height the desired height of the line segment
   * @param {number} width the desired width of the line segment
   * @param {boolean} isEven whether or not the segmented is even-numbered
   */
  const drawLineSegment = (ctx: CanvasRenderingContext2D, x: number, height: number, width: number, isEven: boolean) => {
    ctx.lineWidth = 1; // how thick the line is
    ctx.strokeStyle = '#fff'; // #cb4f00
    ctx.beginPath();
    height = isEven ? height : -height;
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.arc(x + width / 2, height, width / 2, Math.PI, 0, isEven);
    ctx.lineTo(x + width, 0);
    ctx.stroke();
  };

  // const drawProgression = (actual: number, duration: number, canvas: HTMLCanvasElement) => {
  //   canvas.width = canvas.offsetWidth * dpr;
  //   canvas.height = (canvas.offsetHeight + padding * 2) * dpr;
  //   const ctx = canvas.getContext("2d");
  //   if (!ctx) {
  //     console.error('Canvas context not found');
  //     return;
  //   }
  //
  //   // clear the current state
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  //
  //   ctx.scale(dpr, dpr);
  //   ctx.translate(0, canvas.offsetHeight / 2 + padding); // set Y = 0 to be in the middle of the canvas
  //
  //   const width = (actual * canvas.offsetWidth) / duration;
  //   ctx.lineWidth = 5;
  //   ctx.strokeStyle = '#cb4f00';
  //   ctx.beginPath();
  //   ctx.moveTo(0, 0);
  //   ctx.lineTo(width, 0);
  //   ctx.stroke();
  // }


  const drawProgression = (normalizedData: Array<number>, actual: number, duration: number, canvas: HTMLCanvasElement): void => {
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = (canvas.offsetHeight + padding * 2) * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error('Canvas context not found');
      return;
    }
    // clear the current state
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.scale(dpr, dpr);
    ctx.translate(0, canvas.offsetHeight / 2 + padding); // set Y = 0 to be in the middle of the canvas

    // width of each loop
    const width = canvas.offsetWidth / normalizedData.length;

    let x = 0;

    // let's say we have 8 segments to go up to the height, 2 segments to do a quarter circle.
    // then reverse to return to 0.
    // Which makes 20 segments for each value in the normalizedData array
    const maxSegmentNumber = normalizedData.length * 20;

    // The ratio of segments to draw, according to song progression
    const segmentsToDraw = Math.round((actual * maxSegmentNumber) / duration);
    // The number of data points needed to reach this number
    const dataPointsToRead = Math.ceil(segmentsToDraw/20);

    // We prepare the stroke
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#cb4f00';
    ctx.beginPath();
    ctx.moveTo(0, 0);

    for (let dataPointIndex = 0; dataPointIndex < dataPointsToRead; dataPointIndex++) {
      let height = normalizedData[dataPointIndex] * canvas.offsetHeight - padding;
      if (height < 0) {
        height = 0;
      } else if (height > canvas.offsetHeight / 2) {
        height = height - canvas.offsetHeight / 2;
      }

      // If we are even, then make the next loop go downwards
      const isEven = Boolean((dataPointIndex + 1) % 2);

      // We have 20 possible segments for each datapoint
      for (let segmentIndex = 0; segmentIndex < 20; segmentIndex++) {
        // If the segment is part of the ones to draw, then draw it
        if (((dataPointIndex * 20) + (segmentIndex + 1)) <= segmentsToDraw) {
          drawSegment(ctx, isEven, segmentIndex, height, x, width);
        }
      }
      x += width;
    }

    // We draw the segments
    ctx.stroke();
  }

  const drawSegment = (ctx: CanvasRenderingContext2D, isEven: boolean, segmentIndex: number, height: number, currentX: number, width: number) => {
    height = isEven ? height : -height;
    const segmentSize = height/8;

    if (segmentIndex < 8) {
      // We draw a part of line
      ctx.lineTo(currentX, segmentSize * (segmentIndex+1));
    } else if (segmentIndex < 12) {
      // We draw a part of half circle
      const startAngleForEven = segmentIndex === 8 ? Math.PI : segmentIndex === 9 ? Math.PI-(Math.PI/4) : segmentIndex === 10 ? Math.PI/2 : Math.PI/4;
      const startAngleForOdd = segmentIndex === 8 ? Math.PI/4 : segmentIndex === 9 ? Math.PI/2 : segmentIndex === 10 ? Math.PI-(Math.PI/4) : Math.PI;
      if (isEven) {
        ctx.arc(currentX + width / 2, height, width / 2, startAngleForEven, startAngleForEven-(Math.PI/4), true);
      } else {
        ctx.arc(currentX + width / 2, height, width / 2, Math.PI+startAngleForOdd, Math.PI+startAngleForOdd+(Math.PI/4));
      }

    } else if (segmentIndex < 20) {
      // We draw a part of line (the other side)
      ctx.lineTo(currentX + width, segmentSize * (segmentIndex - 11));
    }
  }

  return { drawCanvas, drawProgression };
}
