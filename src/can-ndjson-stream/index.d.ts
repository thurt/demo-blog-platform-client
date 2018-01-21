declare module 'can-ndjson-stream' {
  export = ndjsonStream
  function ndjsonStream(r: ReadableStream): ReadableStream
}
