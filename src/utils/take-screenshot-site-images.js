// import session      from "./session";
import axios        from "axios";
import { parser }   from "html-metadata-parser"

const getSiteImages = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "GET",
            headers:{
                "Access-Control-Allow-Origin": "*",
            }
        })
            .then((response) => {
                return response.text()
            })
            .then((urlRes) => {
                const parser    = new DOMParser();
                const doc       = parser.parseFromString(urlRes, "text/html");
                resolve(doc.images.map((image) => image.src))
            })
            .catch((error) => {
                resolve([])
            })
    })

}

export const getAllSiteImages = (url) => {
    return new Promise((resolve, reject) => {
        parser(url)
            .then((res) => {
                const { images } = res;
                if (images.length > 0) {
                    resolve(images.map((image) => image.src))
                }
                else {
                    getSiteImages(url)
                        .then((siteImages) => {
                            resolve(siteImages)
                        })
                }
            })
            .catch((error) => {
                getSiteImages(url)
                    .then((siteImages) => {
                        resolve(siteImages)
                    })
            });
    })
}

export const takeScreenshotOfGivenPage = (pageURL) => {
    return new Promise((resolve, reject) => {
        axios({ 
            method: "POST",
            url: `${process.env.NEXT_PUBLIC_SCREENSHOT_URL}/take-screenshot`,
            data: {
                url: pageURL,
                storageKey: `common/screenshots/${new Date().getTime()}.jpg`
            }
        })
            .then((res) => {
                if (res.data) {
                    resolve(res.data.screenshotUrl)
                }
                else {
                    resolve({ status: 400, message: "An error occured while taking screenshot of the page." });
                }
            })
            .catch((error) => {
                resolve({ status: 400, message: "An error occured while taking screenshot of the page." });
            });
    });
}