const createElement = (arr) =>{
  const htmlElements = arr.map((el) =>`<span class="btn">${el}</span>`);
  return htmlElements.join(" ");
}


const LoadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data))
};
const removeActive = () => {
  const lessonButton = document.querySelectorAll(".lesson-btn")
 lessonButton.forEach((btn) => btn.classList.remove("active"));
}
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active");
      displayLevelWord(data.data)
    })
};
// {
//     "id": 106,
//     "level": 2,
//     "word": "Sleep",
//     "meaning": "ঘুমানো",
//     "pronunciation": "স্লিপ"
// }
  
const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const detail = await res.json();
  displayWordDetails(detail.data);
}
const displayWordDetails = (word) =>{
  console.log(word);
  const detailBox = document.getElementById("details-container");
  detailBox.innerHTML = `
   <div>
      <h2 class="font-bold text-2xl">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.meaning})</h2>
        <h2 class="font-semi-bold text-2xxl">${word.pronunciation}</h2>
        <h2 class="font-semi-bold text-2xxl">আগ্রহী</h2>
      </div>
      <div>
        <h2 class="font-semi-bold text-2xl">Example</h2>
        <h2 class="font-semi-bold text-2xxl">${word.sentence}</h2>
      </div>
      <div>
        <h2 class="font-semi-bold text-2xl">সমার্থক শব্দ গুলো</h2>
        <div>${createElement(word.synonyms)}</div> 
      </div>
  
  `
  document.getElementById("my_modal_5").showModal();
}
const displayLevelWord = (words) =>{
  const wordCounter = document.getElementById('word-counter');
    wordCounter.innerHTML = "";
    if(words == 0){
      wordCounter.innerHTML = `
            <div class="col-span-full text-center rounded-xl py-10 space-y-4 font-bangla">
                <img class="mx-auto" src="./assets/alert-error.png"/>
                <p class="text-xl font-semibold text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class="text-4xl font-bold">নেক্সট Lesson এ যান</h2>
            </div>
      `;
      return;
    }
    words.forEach((word) => {
      console.log(word)
      const card = document.createElement("div");
      card.innerHTML = `
       <div class="bg-white rounded-lg shadow-sm text-center py-15 px-10 space-y-4">
                <h2 class="font-bold text-2xl">${word.word ? word.word : "word পাওয়া যায় নি"}</h4>
                <h4 class="font-semibold">Meaning /Pronounciation</h2>
                <h2 class="font-bold text-2xl font-bangla">${word.meaning ? word.meaning : "meaning পাওয়া যায় নি"} /${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায় নি"}</h2>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF70]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF70]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>`
      wordCounter.append(card)
    })
}
  
const displayLesson = (lessons) => {
  const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";
    for(let lesson of lessons){
      const btnDiv = document.createElement("div");
      btnDiv.innerHTML = `
          <button id="lesson-btn-${lesson.level_no}" onclick=" loadLevelWord('${lesson.level_no}')" class="btn btn-outline btn-primary lesson-btn">
          <i class="fa-solid fa-circle-question"></i> Lesson ${lesson.level_no}
          </button>`;
      levelContainer.append(btnDiv);
    }
}
LoadLesson();