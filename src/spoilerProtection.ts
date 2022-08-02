// console.log('RUNNING')

const style = `
.spoiler-protection-blur-div {
  -webkit-filter: blur(10px);
  -moz-filter: blur(10px);
  -o-filter: blur(10px);
  -ms-filter: blur(10px);
  filter: blur(10px);
}`;

const spoilerKeywords = ['death', 'dies', 'final moment']

function waitForEl(findElement: () => Element | null) {
  // console.log('WAITING')
  let tries = 0
  return new Promise<void>((resolve, reject) => {
    const intervalId = setInterval(() => {
      if (findElement()) {
        console.log('found', findElement())
        clearInterval(intervalId);
        resolve();
      }
      tries++
      if (tries >= 50) clearInterval(intervalId)
    }, 100);
  });
}

function blurElement(el: Element) {
  if (!el) return
  el.classList.add('spoiler-protection-blur-div')
  el.addEventListener('click', () => {
    el.classList.remove('spoiler-protection-blur-div')
  })
}

function unBlurElement(el: Element) {
  if (!el) return
  el.classList.remove('spoiler-protection-blur-div')
}

async function google() {
  console.log('google')
  const searchBox = document.querySelector('[role="listbox"]')
  console.log(searchBox)
  document.addEventListener('keyup', async () => {
    console.log('keypress')
    blurElement(searchBox)
    await setTimeout(()=> {}, 50)
    // const searchSuggestions = document.querySelector('[role="presentation"]').querySelectorAll('[role="option"]');
    // const searchBox = window.location.pathname === '/webhp' ? document.querySelector('[role="presentation"]') : document.querySelector('[role="presentation"]')
    const searchSuggestions = searchBox.querySelectorAll('li[role="presentation"]');
    for (const searchSuggestion of searchSuggestions) {
      const text = searchSuggestion.getElementsByTagName('span')[0].textContent
      if (spoilerKeywords.some((keyword) => text.includes(keyword))) {
        console.log('found')
        searchSuggestion.remove()
      }
    }
    setTimeout(()=> unBlurElement(searchBox), 50)
  })
}

async function youtube() {
  const findElement = (()=>{
    return document.getElementById('primary').querySelector('[section-identifier="comment-item-section"]')
  })
  await waitForEl(findElement)
  // console.log('DONE WAITING')
  const commentSection = findElement()
  blurElement(commentSection)
}

function main() {
  let hostFound = true

  const href = window.location.href
  if (href.match(/^https:\/\/www\.google\.[a-z]+\/($|search|webhp|imghp)/)) {
    google();
  }  else if (href.startsWith('https://www.youtube.com/watch')) {
      youtube();
  } else {
    hostFound = false;
  }

  if (hostFound){
    const styleSheet = document.createElement("style")
    styleSheet.innerText = style
    document.head.appendChild(styleSheet)
  }
}

main()
