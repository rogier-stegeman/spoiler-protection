// console.log('RUNNING')
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const style = `
.spoiler-protection-blur-div {
  -webkit-filter: blur(10px);
  -moz-filter: blur(10px);
  -o-filter: blur(10px);
  -ms-filter: blur(10px);
  filter: blur(10px);
}`;
const spoilerKeywords = ['death', 'dies', 'final moment'];
function waitForEl(findElement) {
    // console.log('WAITING')
    let tries = 0;
    return new Promise((resolve, reject) => {
        const intervalId = setInterval(() => {
            if (findElement()) {
                console.log('found', findElement());
                clearInterval(intervalId);
                resolve();
            }
            tries++;
            if (tries >= 50)
                clearInterval(intervalId);
        }, 100);
    });
}
function blurElement(el) {
    if (!el)
        return;
    el.classList.add('spoiler-protection-blur-div');
    el.addEventListener('click', () => {
        el.classList.remove('spoiler-protection-blur-div');
    });
}
function unBlurElement(el) {
    if (!el)
        return;
    el.classList.remove('spoiler-protection-blur-div');
}
function google() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('google');
        const searchBox = document.querySelector('[role="listbox"]');
        console.log(searchBox);
        document.addEventListener('keyup', () => __awaiter(this, void 0, void 0, function* () {
            console.log('keypress');
            blurElement(searchBox);
            yield setTimeout(() => { }, 50);
            // const searchSuggestions = document.querySelector('[role="presentation"]').querySelectorAll('[role="option"]');
            // const searchBox = window.location.pathname === '/webhp' ? document.querySelector('[role="presentation"]') : document.querySelector('[role="presentation"]')
            const searchSuggestions = searchBox.querySelectorAll('li[role="presentation"]');
            for (const searchSuggestion of searchSuggestions) {
                const text = searchSuggestion.getElementsByTagName('span')[0].textContent;
                if (spoilerKeywords.some((keyword) => text.includes(keyword))) {
                    console.log('found');
                    searchSuggestion.remove();
                }
            }
            setTimeout(() => unBlurElement(searchBox), 50);
        }));
    });
}
function youtube() {
    return __awaiter(this, void 0, void 0, function* () {
        const findElement = (() => {
            return document.getElementById('primary').querySelector('[section-identifier="comment-item-section"]');
        });
        yield waitForEl(findElement);
        // console.log('DONE WAITING')
        const commentSection = findElement();
        blurElement(commentSection);
    });
}
function main() {
    let hostFound = true;
    const href = window.location.href;
    if (href.match(/^https:\/\/www\.google\.[a-z]+\/($|search|webhp|imghp)/)) {
        google();
    }
    else if (href.startsWith('https://www.youtube.com/watch')) {
        youtube();
    }
    else {
        hostFound = false;
    }
    if (hostFound) {
        const styleSheet = document.createElement("style");
        styleSheet.innerText = style;
        document.head.appendChild(styleSheet);
    }
}
main();
//# sourceMappingURL=spoiler.js.map