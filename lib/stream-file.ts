import { ReadableOptions } from 'node:stream';
import fs from 'fs';
import { createGzip } from 'node:zlib';

/**
 * Return a stream from the disk
 * @param {string} filePath - The location of the file
 * @param {boolean} gzip - Pipe the stream through a gzip compression stream or not
 * @param {ReadableOptions} options - The streamable options for the stream (ie how big are the chunks, start, end, etc).
 * @returns {ReadableStream} A readable stream of the file
 */
export default function streamFile(
  filePath: string,
  gzip: boolean,
  options?: ReadableOptions
): ReadableStream<Uint8Array> {
  const downloadStream = fs.createReadStream(filePath, options);

  if (!gzip) {
    return new ReadableStream({
      start(controller) {
        downloadStream.on('data', (chunk: Buffer) =>
          controller.enqueue(new Uint8Array(chunk))
        );
        downloadStream.on('end', () => controller.close());
        downloadStream.on('error', (error: NodeJS.ErrnoException) =>
          controller.error(error)
        );
      },
      cancel() {
        downloadStream.destroy();
      },
    });
  } else {
    const gzipStream = createGzip();

    return new ReadableStream({
      start(controller) {
        downloadStream.pipe(gzipStream);

        gzipStream.on('data', (chunk: Buffer) =>
          controller.enqueue(new Uint8Array(chunk))
        );
        gzipStream.on('end', () => controller.close());
        gzipStream.on('error', (error: NodeJS.ErrnoException) =>
          controller.error(error)
        );
      },
      cancel() {
        downloadStream.destroy();
        gzipStream.destroy();
      },
    });
  }
}