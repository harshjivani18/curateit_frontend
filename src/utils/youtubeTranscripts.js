
async function getRawTranscript(link) {
    // Get Transcript
    const transcriptPageResponse = await fetch(link); // default 0
    const transcriptPageXml = await transcriptPageResponse.text();

    // Parse Transcript
    const parser = new DOMParser();
    const jQueryParse = parser.parseFromString(transcriptPageXml, "text/html");
    const textNodes = jQueryParse.childNodes[1].childNodes[1].childNodes[0].childNodes;

    return Array.from(textNodes).map(i => {
        return {
            start: i.getAttribute("start"),
            duration: i.getAttribute("dur"),
            text: i.textContent
        };
    });

}

export async function getTranscriptHTML(link) {

    const rawTranscript = await getRawTranscript(link);

    const scriptObjArr = [], timeUpperLimit = 60, charInitLimit = 300, charUpperLimit = 500;
    let loop = 0, chars = [], charCount = 0, timeSum = 0, tempObj = {}, remaining = {};

    // Sum-up to either total 60 seconds or 300 chars.
    Array.from(rawTranscript).forEach((obj, i, arr) => {

        // Check Remaining Text from Prev Loop
        if (remaining.start && remaining.text) {
            tempObj.start = remaining.start;
            chars.push(remaining.text);
            remaining = {}; // Once used, reset to {}
        }

        // Initial Loop: Set Start Time
        if (loop === 0) {
            tempObj.start = (remaining.start) ? remaining.start : obj.start;
        }

        loop++;

        const startSeconds = Math.round(tempObj.start);
        const seconds = Math.round(obj.start);
        timeSum = (seconds - startSeconds);
        charCount += obj.text.length;
        chars.push(obj.text);

        if (i === arr.length - 1) {
            tempObj.text = chars.join(" ").replace(/\n/g, " ");
            scriptObjArr.push(tempObj);
            resetNums();
            return;
        }

        if (timeSum > timeUpperLimit) {
            tempObj.text = chars.join(" ").replace(/\n/g, " ");
            scriptObjArr.push(tempObj);
            resetNums();
            return;
        }

        if (charCount > charInitLimit) {

            if (charCount < charUpperLimit) {
                if (obj.text.includes(".")) {

                    const splitStr = obj.text.split(".");

                    // Case: the last letter is . => Process regulary
                    if (splitStr[splitStr.length - 1].replace(/\s+/g, "") === "") {
                        tempObj.text = chars.join(" ").replace(/\n/g, " ");
                        scriptObjArr.push(tempObj);
                        resetNums();
                        return;
                    }

                    // Case: . is in the middle
                    // 1. Get the (length - 2) str, then get indexOf + str.length + 1, then substring(0,x)
                    // 2. Create remaining { text: str.substring(x), start: obj.start } => use the next loop
                    const lastText = splitStr[splitStr.length - 2];
                    const substrIndex = obj.text.indexOf(lastText) + lastText.length + 1;
                    const textToUse = obj.text.substring(0, substrIndex);
                    remaining.text = obj.text.substring(substrIndex);
                    remaining.start = obj.start;

                    // Replcae arr element
                    chars.splice(chars.length - 1, 1, textToUse)
                    tempObj.text = chars.join(" ").replace(/\n/g, " ");
                    scriptObjArr.push(tempObj);
                    resetNums();
                    return;

                } else {
                    // Move onto next loop to find .
                    return;
                }
            }

            tempObj.text = chars.join(" ").replace(/\n/g, " ");
            scriptObjArr.push(tempObj);
            resetNums();
            return;

        }

    })

    return Array.from(scriptObjArr).map(obj => {
        const t = Math.round(obj.start);
        const hhmmss = convertIntToHms(t);
        return {
            time: hhmmss,
            text: obj.text
        }
    });

    function resetNums() {
        loop = 0; chars = []; charCount = 0; timeSum = 0; tempObj = {};
    }

}

function convertIntToHms(num) {
    const h = (num < 3600) ? 14 : 12;
    return (new Date(num * 1000).toISOString().substring(h, 19)).toString();
}