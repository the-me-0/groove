export const useWaveParser = () => {
  /**
   * Filters the AudioBuffer retrieved from an external source
   * @param {AudioBuffer} audioBuffer the AudioBuffer from drawAudio()
   * @param samples the number of samples to retrieve from the audioBuffer
   * @returns {Array} an array of floating point numbers
   */
  const filterData = (audioBuffer: AudioBuffer, samples: number): Array<number> => {
    const rawData = audioBuffer.getChannelData(0); // We only need to work with one channel of data
    const blockSize = Math.floor(rawData.length / samples); // the number of samples in each subdivision
    const filteredData = [];
    for (let i = 0; i < samples; i++) {
      let blockStart = blockSize * i; // the location of the first sample in the block
      let sum = 0;
      for (let j = 0; j < blockSize; j++) {
        sum = sum + Math.abs(rawData[blockStart + j]); // find the sum of all the samples in the block
      }
      filteredData.push(sum / blockSize); // divide the sum by the block size to get the average
    }
    return filteredData;
  };

  /**
   * Normalizes the audio data to make a cleaner illustration
   * @param {Array} filteredData the data from filterData()
   * @returns {Array} an normalized array of floating point numbers
   */
  const normalizeData = (filteredData: Array<number>): Array<number> => {
    const maxValue = Math.max(...filteredData);
    const multiplier = Math.pow(maxValue, -1);

    // Boost the presence of the low volumes to make visualization a bit smoother
    const lightweightBooster = (n: number) => {
      if (n === 0) {
        return 4/3;
      } else {
        // Varies from 0 to 1, the more n is small compared to maxValue, the more this value will be close to 1
        const boostMultiplier = ((1/(n/maxValue))/maxValue);
        // We multiply the base 1/10 by the boostMultiplier to make the boost more or less important depending on "n" compared to maxValue.
        return 1 + (boostMultiplier * (1/10));
      }
    };
    return filteredData.map(n => n * multiplier * lightweightBooster(n));
  }

  const parseWaveData = async (arrayBuffer: ArrayBuffer, samples: number = 150): Promise<Array<number>> => {
    // Set up audio context
    const audioContext = new window.AudioContext();

    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    const filteredAudioBuffer = filterData(audioBuffer, samples);
    return normalizeData(filteredAudioBuffer);
  }

  return { parseWaveData };
}
