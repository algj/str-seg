/**
 * Extracts segments from a string based on provided start and end markers.
 *
 * @param {string} string The input string from which segments will be extracted.
 * @param {Record<string, string | { from: string | RegExp, to: string | RegExp, reverse: boolean }>} segmentBy An object specifying the segments to extract, with keys representing segment names and values representing start and end markers. Note - 'reverse' scans using 'to' first. String can be used with '#>#' in the middle or '#<#' if in reverse.
 * @returns {Record<string, string[]>} A record where keys are segment names and values are arrays of extracted segments.
 *
 * @example
 * // Extract segments from a string
 * const string = '<p id="title">Hey there!</p><p>Hey</p><p>Hello</p>';
 * const segments = strseg(string, {
 *   title: { from: '<p id="title">', to: '</p>' },
 *   p: '<p>#>#</p>'
 * });
 * console.log(segments.title[0]) // "Hey there!"
 * console.log(segments.p[1]) // "Hello"
 */
export declare function strseg(string: string, segmentBy: Record<string, {
    from: string | RegExp;
    to: string | RegExp;
    reverse?: boolean;
} | string>): Record<string, string[]>;
//# sourceMappingURL=index.d.ts.map