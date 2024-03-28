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
    ctx.lineWidth = 1; // how thick the line is
    ctx.strokeStyle = '#fff'; // #cb4f00
    ctx.beginPath();

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
      ctx.stroke();

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
    height = isEven ? height : -height;
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.arc(x + width / 2, height, width / 2, Math.PI, 0, isEven);
    ctx.lineTo(x + width, 0);
  };

  const drawProgression = (normalizedData: Array<number>, canvas: HTMLCanvasElement, actual: number, duration: number): void => {
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
    ctx.lineWidth = 2.5; // how thick the line is
    ctx.strokeStyle = '#cb4f00'; // #cb4f00
    ctx.beginPath();

    // draw the line segments
    const width = canvas.offsetWidth / normalizedData.length;

    for (let i = 0; i < normalizedData.length; i++) {
      const x = width * i;
      let height = normalizedData[i] * canvas.offsetHeight - padding;
      if (height < 0) {
        height = 0;
      } else if (height > canvas.offsetHeight / 2) {
        height = height - canvas.offsetHeight / 2;
      }

      drawLineSegment(ctx, x, height, width, Boolean((i + 1) % 2));
    }

    ctx.stroke();

    // Now that we have all colored in orange, we delete the part that is not supposed to be colored
    const shouldBeColoredUptoX = Math.floor((actual * (canvas.offsetWidth)) / duration);
    ctx.clearRect(shouldBeColoredUptoX, -(canvas.height/2), canvas.offsetWidth-shouldBeColoredUptoX, canvas.height);
  };

  return { drawCanvas, drawProgression };
}
