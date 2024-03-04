import { ReadableOptions } from 'node:stream';
import fs from 'fs';
import { NextResponse } from 'next/server';

/**
 * Return a NextResponse with the stream from the disk
 * @param {string} path - The location of the file
 * @param {string} fileName - The name of the file to stream ; used in the return headers
 * @param {ReadableOptions} options - The streamable options for the stream (ie how big are the chunks, start, end, etc).
 * @returns {ReadableStream} A readable stream of the file
 */
export async function streamFile(path: string, fileName: string, options?: ReadableOptions): Promise<NextResponse> {
  let fileSize = 0;
  try {
    const stats = fs.statSync(path);
    fileSize = stats.size;
  } catch (error) {
    return new NextResponse(`Resource ${path} does not exist.`, { status: 404 });
  }

  const fileStream = createStream(path, options);

  return new NextResponse(fileStream, {
    status: 200,
    headers: new Headers({
      'content-disposition': `attachment; filename=${fileName}.gz`,
      'content-type': `application/octet-stream`,
      'content-length': fileSize + '',
      'cache-control': 'public, max-age=31536000, immutable',
    }),
  });
}

/**
 * Return a NextResponse with the stream from the disk
 * @param {string} path - The location of the file
 * @param {Headers} headers - The headers for the incoming request ; used to check the Accept-Encoding and return optimized stream
 * @param {string} fileName - The name of the file to stream ; used in the return headers
 * @param {ReadableOptions} options - The streamable options for the stream (ie how big are the chunks, start, end, etc).
 * @returns {ReadableStream} A readable stream of the file
 */
export async function streamFileOptimized(path: string, headers: Headers, fileName: string, options?: ReadableOptions): Promise<NextResponse> {
  const acceptEncodingHeader = headers.get('Accept-Encoding');
  if (!acceptEncodingHeader || !acceptEncodingHeader.includes('gzip')) {
    return streamFile(path, fileName, options);
  }

  let fileSize = 0;
  try {
    const stats = fs.statSync(path);
    fileSize = stats.size;
  } catch (error) {
    return new NextResponse(`Resource ${path} does not exist.`, { status: 404 });
  }

  const fileStream = createCompressedStream(path, options);

  return new NextResponse(fileStream, {
    status: 200,
    headers: new Headers({
      'content-disposition': `attachment; filename=${fileName}.gz`,
      'content-type': `application/octet-stream`,
      'content-length': fileSize + '',
      'cache-control': 'public, max-age=31536000, immutable',
      'Content-Encoding': 'gzip',
    }),
  });
}

const createCompressedStream = (path: string, options?: ReadableOptions): ReadableStream => {
  const sourceStream = fs.createReadStream(path, options);

  const uncompressedStream = new ReadableStream({
    start(controller) {
      sourceStream.on("data", (chunk: Buffer) => controller.enqueue(new Uint8Array(chunk)));
      sourceStream.on("end", () => controller.close());
      sourceStream.on("error", (error: NodeJS.ErrnoException) => controller.error(error));
    },
    cancel() {
      sourceStream.destroy();
    },
  });

  return uncompressedStream.pipeThrough(
    new CompressionStream("gzip")
  );
}

const createStream = (path: string, options?: ReadableOptions): ReadableStream => {
  const sourceStream = fs.createReadStream(path, options);

  return new ReadableStream({
    start(controller) {
      sourceStream.on("data", (chunk: Buffer) => controller.enqueue(new Uint8Array(chunk)));
      sourceStream.on("end", () => controller.close());
      sourceStream.on("error", (error: NodeJS.ErrnoException) => controller.error(error));
    },
    cancel() {
      sourceStream.destroy();
    },
  });
}

// const source = fs.createReadStream(path, options);
// const gzip = zlib.createGzip();
// const stagingDestination = fs.createWriteStream(path + '.gz');
// const pipe = promisify(pipeline);
//
// await pipe(source, gzip, stagingDestination); // write the gzip file
