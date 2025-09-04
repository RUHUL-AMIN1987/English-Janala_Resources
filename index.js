const LoadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data))
};
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data))
};
// {
//     "id": 106,
//     "level": 2,
//     "word": "Sleep",
//     "meaning": "ঘুমানো",
//     "pronunciation": "স্লিপ"
// }
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
                <h2 class="font-bold text-2xl">${word.word ? word.word : "word পাওয়া যায় নি"}</h2>
                <p class="font-semibold">${word.meaning ? word.meaning : "meaning পাওয়া যায় নি"  } /${word.pronunciation}</p>
               
               <div class="flex justify-between items-center">
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF70]"><i class="fa-solid fa-circle-info"></i></button>
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
          <button onclick="loadLevelWord('${lesson.level_no}')" class="btn btn-outline btn-primary">
          <i class="fa-solid fa-circle-question"></i> Lesson ${lesson.level_no}
          </button>`;
      levelContainer.append(btnDiv);
    }
}
LoadLesson();