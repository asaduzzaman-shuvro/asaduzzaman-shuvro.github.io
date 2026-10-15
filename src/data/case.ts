// Brand names with a fixed case. Uppercase headings (`.display`, `.mono-label`) would turn
// "iOS" into "IOS", so components render these words in a `normal-case` span.
const FIXED_CASE = /\b(iOS|iPadOS|macOS|watchOS|tvOS|visionOS|iPhone|iPad)\b/;

/** Split text into plain runs and fixed-case brand words (odd indexes). */
export const splitFixedCase = (text: string) => text.split(FIXED_CASE);
