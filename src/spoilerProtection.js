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
const spoilerKeywords = ['death', 'dies', 'dead', 'died', 'die', 'kills', 'fight', 'final moment'];
function waitForEl(findElement) {
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
function googleHideSearchSuggestions() {
    return __awaiter(this, void 0, void 0, function* () {
        let searchBox = document.querySelector('[role="listbox"]');
        document.addEventListener('keydown', () => __awaiter(this, void 0, void 0, function* () {
            if (!searchBox)
                searchBox = document.querySelector('[role="listbox"]');
            blurElement(searchBox);
        }));
        document.addEventListener('keyup', () => __awaiter(this, void 0, void 0, function* () {
            if (!searchBox)
                searchBox = document.querySelector('[role="listbox"]');
            const searchSuggestions = searchBox.querySelectorAll('li[role="presentation"]');
            for (const searchSuggestion of searchSuggestions) {
                const text = searchSuggestion.getElementsByTagName('span')[0].textContent;
                if (spoilerKeywords.some((keyword) => text.includes(keyword))) {
                    searchSuggestion.remove();
                }
            }
            // setTimeout(()=> unBlurElement(searchBox), 50)
            unBlurElement(searchBox);
        }));
    });
}
function youtubeHideSearchSuggestions() {
    return __awaiter(this, void 0, void 0, function* () {
        let searchBox = document.getElementsByClassName('gstl_50 sbdd_a')[0];
        document.addEventListener('keydown', () => __awaiter(this, void 0, void 0, function* () {
            if (!searchBox)
                searchBox = document.getElementsByClassName('gstl_50 sbdd_a')[0];
            blurElement(searchBox);
        }));
        document.addEventListener('keyup', () => __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!searchBox)
                searchBox = document.getElementsByClassName('gstl_50 sbdd_a')[0];
            // await setTimeout(()=> {}, 500)
            const searchSuggestions = searchBox.querySelectorAll('li[role="presentation"]');
            for (const searchSuggestion of searchSuggestions) {
                const text = (_a = searchSuggestion.getElementsByClassName('sbqs_c')[0]) === null || _a === void 0 ? void 0 : _a.textContent;
                if (text && spoilerKeywords.some((keyword) => text.includes(keyword))) {
                    console.log('found');
                    searchSuggestion.remove();
                }
            }
            // setTimeout(()=> unBlurElement(searchBox), 500)
            unBlurElement(searchBox);
        }));
    });
}
function youtubeBlurCommentSection() {
    return __awaiter(this, void 0, void 0, function* () {
        const findElement = (() => {
            return document.getElementById('primary').querySelector('[section-identifier="comment-item-section"]'); // ?? document.querySelector('[section-identifier="comment-item-section"]')
        });
        yield waitForEl(findElement);
        const commentSection = findElement();
        blurElement(commentSection);
    });
}
function main() {
    let hostFound = true;
    const href = window.location.href;
    if (href.match(/^https:\/\/www\.google\.[a-z]+\/($|search|webhp|imghp)/)) {
        googleHideSearchSuggestions();
    }
    else if (href.startsWith('https://www.youtube.com/')) {
        youtubeHideSearchSuggestions();
        if (window.location.pathname.startsWith('/watch'))
            youtubeBlurCommentSection();
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
//# sourceMappingURL=spoilerProtection.js.map