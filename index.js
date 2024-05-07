"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strseg = void 0;
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
function strseg(string, segmentBy) {
    if (typeof segmentBy !== "object") {
        throw `strseg: segmentBy argument must be a record, such as {key: '<p>#>#</p>'`;
    }
    let recordReturn = {};
    let stringReverse;
    for (let segmentKey of Object.keys(segmentBy)) {
        let segmentByItem = segmentBy[segmentKey];
        if (typeof segmentByItem == "string") {
            if (segmentByItem.includes("#>#")) {
                let splt = segmentByItem.split("#>#");
                if (splt.length != 2) {
                    throw `strseg: Segment "${segmentKey}" has more than 1 "#>#", use {from: string | RegExp, to: string | RegExp} instead:\n"${segmentByItem}".`;
                }
                segmentByItem = { from: splt[0], to: splt[1], reverse: false };
            }
            else if (segmentByItem.includes("#<#")) {
                let splt = segmentByItem.split("#<#");
                if (splt.length != 2) {
                    throw `strseg: Segment "${segmentKey}" has more than 1 "#<#", use {from: string | RegExp, to: string | RegExp} instead:\n"${segmentByItem}"`;
                }
                segmentByItem = { from: splt[0], to: splt[1], reverse: true };
            }
            else {
                throw `strseg: Segment "${segmentKey}" is invalid, missing "#>#" or "#<#":\n"${segmentByItem}"`;
            }
        }
        if (typeof segmentByItem == "string") {
            throw `strseg: Segment "${segmentKey}" received a string when it should not be possible, that's a bug.`;
        }
        stringReverse !== null && stringReverse !== void 0 ? stringReverse : (stringReverse = string.split("").reverse().join(""));
        let content = [];
        recordReturn[segmentKey] = content;
        let { from, to, reverse } = segmentByItem;
        // g flag removes the "index", plus we only need to find the first occurance!
        if (from instanceof RegExp)
            from = new RegExp(from.source, from.flags.replace('g', ''));
        if (to instanceof RegExp)
            to = new RegExp(to.source, to.flags.replace('g', ''));
        if (reverse) {
            [from, to] = [to, from];
        }
        let startIndex = 0;
        let useStr = (reverse ? stringReverse : string);
        while (true) {
            let fromIndex;
            if (from instanceof RegExp) {
                const match = useStr.substring(startIndex).match(from);
                if (!match)
                    break;
                fromIndex = match.index + match[0].length + startIndex;
            }
            else {
                fromIndex = useStr.indexOf(from, startIndex);
                if (fromIndex === -1)
                    break;
            }
            let toIndex;
            if (to instanceof RegExp) {
                const match = useStr.substring(fromIndex + (from instanceof RegExp ? 0 : from.length)).match(to);
                if (!match)
                    break;
                toIndex = fromIndex + match.index;
            }
            else {
                toIndex = useStr.indexOf(to, fromIndex + (from instanceof RegExp ? 0 : from.length));
                if (toIndex === -1)
                    break;
            }
            const extractedContent = useStr.substring(fromIndex + (from instanceof RegExp ? 0 : from.length), toIndex);
            if (reverse) {
                content.unshift(extractedContent.split("").reverse().join(""));
            }
            else {
                content.push(extractedContent);
            }
            startIndex = toIndex + (to instanceof RegExp ? 0 : to.length);
        }
    }
    return recordReturn;
}
exports.strseg = strseg;
