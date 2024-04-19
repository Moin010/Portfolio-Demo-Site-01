let allDemoBlogs;
async function getBlogInfo() {
  let importedBlogs = await fetch("../data/blog-page-blogs.json");
  allDemoBlogs = await importedBlogs.json();
  return allDemoBlogs;
}
// blog page pagination start

let array = [];
let arrayLength = 0;
let activePageDisplaiedBlogs = 6; //products per page
let startIndex = 1;
let endIndex = 0;
let currentIndex = 1;
let maxIndex = 0;

// set and remove active class
function heilightIndexButton() {
  startIndex = (currentIndex - 1) * activePageDisplaiedBlogs + 1;
  endIndex = startIndex + activePageDisplaiedBlogs - 1;
  if (endIndex > arrayLength) {
    endIndex = arrayLength;
  }

  $(".index-button-area button").removeClass("active");
  $(`.index-button-area button[index="${currentIndex}"]`).addClass("active");
  displayBlogs();
}

// add blogs in dom

function displayBlogs() {
  $(".all-blog-container .single-dynamic-blog").remove();
  let firstBlog = startIndex - 1;
  let lastBlog = endIndex;

  for (let i = firstBlog; i < lastBlog; i++) {
    let blogCard = array[i];

    // console.log(productCard);

    let injectBlogs = `
    
    <div class="single-dynamic-blog">
    <div class="dynamic-blog-cover-image">
      <embed src="${blogCard.blogImg}" type="" />
    </div>
    <div class="dynamic-blog-details">
      <div class="dynamic-blog-writer-with-date">
        <div class="dynamic-blog-writer">
          <p>${blogCard.authorName}</p>
        </div>
        <div class="dynamic-blog-date">
          <p>• ${blogCard.publishDate}</p>
        </div>
      </div>
      <div class="dynamic-blog-header-with-arrow">
        <div class="dynamic-blog-header">
          <h3>${blogCard.name}</h3>
        </div>
        <div class="dynamic-blog-link-arrow">
          <embed src="../img/blog-link-arrow.svg" type="" />
        </div>
      </div>
      <div class="dynamic-blog-preview-details">
        <p>
        ${blogCard.summary}
        </p>
      </div>
      <div class="dynamic-blog-tag-area">
        <div class="blog-tag ${blogCard.tag1}">
          <p>${blogCard.tag1}</p>
        </div>
        <div class="blog-tag ${blogCard.tag2}">
          <p>${blogCard.tag2}</p>
        </div>
        <div class="blog-tag ${blogCard.tag3}">
          <p>${blogCard.tag3}</p>
        </div>
      </div>
    </div>
  </div>

    `;

    $(".all-blog-container").append(injectBlogs);
  }
}

// reseting the variables for the calculations

async function preLoadCalculations() {
  let allDemoBlogs = await getBlogInfo();

  array = allDemoBlogs;

  arrayLength = array.length;
  maxIndex = arrayLength / activePageDisplaiedBlogs;

  if (arrayLength % activePageDisplaiedBlogs > 0) {
    maxIndex++;
  }
  return [array, arrayLength, maxIndex];
}

// use buttons to travers pagination
function prevPage() {
  if (currentIndex > 1) {
    currentIndex--;
    displayIndexButtons();
    heilightIndexButton();
  }
}
function nextPage() {
  if (currentIndex < maxIndex) {
    currentIndex++;
    displayIndexButtons();
    heilightIndexButton();
  }
}
function indexPageMove(index) {
  currentIndex = parseInt(index);
  displayIndexButtons();
  heilightIndexButton();
}

// display pagination buttons

async function displayIndexButtons() {
  let calculatedVals = await preLoadCalculations();

  maxIndex = calculatedVals[2];

  $(".pagination-buttons-area button").remove();
  $(".index-button-area").remove();
  $(".pagination-buttons-area").append(
    ` 
      <button onclick="prevPage()">
        <embed src="../img/left-arrow.svg" type="" /> Previous
      </button>
      <div class="index-button-area">

    `
  );

  if (maxIndex > 7) {
    let totalTravers = currentIndex + 1;

    maxIndex = calculatedVals[2];

    if (totalTravers > maxIndex) {
      totalTravers = maxIndex;
    }

    if (currentIndex > 3) {
      // $(".index-buttons").append(`<button>..</button>`);

      if (currentIndex < maxIndex - 3) {
        for (let i = currentIndex - 2; i <= totalTravers - 1; i++) {
          $(".index-button-area").append(
            `<button onclick="indexPageMove(${i})" index="${i}">${i}</button>`
          );
        }
      } else {
        for (let i = maxIndex - 7; i <= maxIndex - 3; i++) {
          $(".index-button-area").append(
            `<button onclick="indexPageMove(${i})" index="${i}">${i}</button>`
          );
        }
      }

      if (currentIndex < maxIndex - 3) {
        $(".index-button-area").append(`<button >..</button>`);
      }

      for (let i = maxIndex - 2; i <= maxIndex; i++) {
        $(".index-button-area").append(
          `<button onclick="indexPageMove(${i})" index="${i}">${i}</button>`
        );
      }
    } else {
      for (let i = 1; i <= 3; i++) {
        $(".index-button-area").append(
          `<button onclick="indexPageMove(${i})" index="${i}">${i}</button>`
        );
      }
      $(".index-button-area").append(`<button >..</button>`);
      for (let i = maxIndex - 2; i <= maxIndex; i++) {
        $(".index-button-area").append(
          `<button onclick="indexPageMove(${i})" index="${i}">${i}</button>`
        );
      }
    }
  } else {
    for (let i = 1; i <= maxIndex; i++) {
      $(".index-button-area").append(
        `
         <button onclick="indexPageMove(${i})" index="${i}">${i}</button>
        `
      );
    }
  }

  $(".pagination-buttons-area").append(
    `
    </div>

    <button onclick="nextPage()">
      Next <embed src="../img/right-arrow.svg" type="" />
    </button>

    `
  );

  // scroll to top after pagination
  scrollTo(0, 850);
  heilightIndexButton();
}

displayIndexButtons();

// blog page pagination end
