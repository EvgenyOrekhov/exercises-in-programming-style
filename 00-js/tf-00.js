#!/usr/bin/env node
/*jslint node, maxlen: 80 */

"use strict";

const fs = require("fs");

function tf(text, stopWords = "", limit = 25) {
    const stopWordsArray = stopWords.split(",");

    const frequencies = text
        .toLowerCase()
        .split(/[\W_]+/)
        .filter((word) => (word.length > 1 && !stopWordsArray.includes(word)))
        .reduce(
            function (acc, word) {
                acc[word] = acc[word] === undefined
                    ? 1
                    : acc[word] + 1;

                return acc;
            },
            {}
        );

    return Object
        .entries(frequencies)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(function ([word, frequency]) {
            return `${word}  -  ${frequency}`;
        })
        .join("\n");
}

console.log(
    tf(
        fs.readFileSync(process.argv[2], "utf8"),
        fs.readFileSync("../stop_words.txt", "utf8")
    )
);
