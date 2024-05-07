# strseg

Extracts segments from a string based on provided start and end markers.

## Installation

```bash
npm install strseg
```

## Usage

### Example:

```typescript
import { strseg } from 'strseg'
// let { strseg } = require('strseg');

const string = '<p id="title">Hey there!</p><p>Hey</p><p>Hello</p>'
const segments = strseg(string, {
  title: { from: '<p id="title">', to: '</p>' },
  p: '<p>#>#</p>',
  p_all: { from: /<p\b[^>]*>/, to: '</p>' } // we can use RegEx to target all <p> tags!
})

console.log(segments.title[0]) // "Hey there!"
console.log(segments.p[1]) // "Hello"
```

### `strseg(string, segmentBy)`

- `string`: `string` - The input string from which segments will be extracted.
- `segmentBy`: `Record<string, string | { from: string | RegExp, to: string | RegExp, reverse: boolean }>` - An object specifying the segments to extract, with keys representing segment names and values representing start and end markers. Note - 'reverse' scans using 'to' first. String can be used with '#>#' in the middle or '#<#' if in reverse.

Returns a record where keys are segment names and values are arrays of extracted segments.

## License

BSD 2-Clause License
