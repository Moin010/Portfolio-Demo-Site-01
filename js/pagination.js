let allDemoProduct;
// all demo product array
async function getProductInfo() {
  let importedProduct = await fetch("../data/blog-page-blogs.json");
  allDemoProduct = await importedProduct.json();
  return allDemoProduct;
}
// blog page pagination start

let array = [];
let arrayLength = 0;
let activePageDisplaiedProduct = 6; //products per page
let startIndex = 1;
let endIndex = 0;
let currentIndex = 1;
let maxIndex = 0;

// set and remove active class
function heilightIndexButton() {
  startIndex = (currentIndex - 1) * activePageDisplaiedProduct + 1;
  endIndex = startIndex + activePageDisplaiedProduct - 1;
  if (endIndex > arrayLength) {
    endIndex = arrayLength;
  }

  $(".index-buttons button").removeClass("active");
  $(`.index-buttons button[index="${currentIndex}"]`).addClass("active");
  displayProducts();
}

// add products in dom

function displayProducts() {
  $(".all-blog-container .single-dynamic-blog").remove();
  let firstProduct = startIndex - 1;
  let lastProduct = endIndex;

  for (let i = firstProduct; i < lastProduct; i++) {
    let productCard = array[i];

    // console.log(productCard);

    let injectProduct = `
    
    <div class="single-dynamic-blog">
    <div class="dynamic-blog-cover-image">
      <embed src="../img/blog-img-2.jpg" type="" />
    </div>
    <div class="dynamic-blog-details">
      <div class="dynamic-blog-writer-with-date">
        <div class="dynamic-blog-writer">
          <p>Demi WIlkinson</p>
        </div>
        <div class="dynamic-blog-date">
          <p>• 16 Jan 2022</p>
        </div>
      </div>
      <div class="dynamic-blog-header-with-arrow">
        <div class="dynamic-blog-header">
          <h3>PM mental models</h3>
        </div>
        <div class="dynamic-blog-link-arrow">
          <embed src="../img/blog-link-arrow.svg" type="" />
        </div>
      </div>
      <div class="dynamic-blog-preview-details">
        <p>
          Mental models are simple expressions of complex processes or
          relationships.
        </p>
      </div>
      <div class="dynamic-blog-tag-area">
        <div class="blog-tag product">
          <p>product</p>
        </div>
        <div class="blog-tag research">
          <p>Research</p>
        </div>
        <div class="blog-tag frameworks">
          <p>Frameworks</p>
        </div>
      </div>
    </div>
  </div>

    `;

    $(".all-blog-container").append(injectProduct);
  }
}

// reseting the variables for the calculations

async function preLoadCalculations(changedArray) {
  let allDemoProduct = await getProductInfo();

  array = allDemoProduct;

  arrayLength = array.length;
  maxIndex = arrayLength / activePageDisplaiedProduct;
  // console.log(maxIndex);

  if (arrayLength % activePageDisplaiedProduct > 0) {
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
    blogPageLoaderDisplay();
  }
}
function nextPage() {
  if (currentIndex < maxIndex) {
    currentIndex++;
    displayIndexButtons();
    heilightIndexButton();
    blogPageLoaderDisplay();
  }
}
function indexPageMove(index) {
  currentIndex = parseInt(index);
  displayIndexButtons();
  heilightIndexButton();
  blogPageLoaderDisplay();
}

// display pagination buttons

async function displayIndexButtons() {
  let calculatedVals = await preLoadCalculations();

  maxIndex = calculatedVals[2];

  $(".index-buttons button").remove();
  $(".index-buttons").append(
    `<button onclick="prevPage()"><img src="img/left-arrow.png" alt="" /></button>`
  );

  if (maxIndex > 4) {
    let totalTravers = currentIndex + 1;

    maxIndex = calculatedVals[2];

    if (totalTravers > maxIndex) {
      totalTravers = maxIndex;
    }

    if (currentIndex > 3) {
      // $(".index-buttons").append(`<button>..</button>`);
      if (currentIndex < maxIndex) {
        for (let i = currentIndex - 2; i <= totalTravers; i++) {
          $(".index-buttons").append(
            `<button onclick="indexPageMove(${i})" index="${i}">${i}</button>`
          );
        }
      }

      if (currentIndex >= maxIndex) {
        for (let i = currentIndex - 3; i <= totalTravers; i++) {
          $(".index-buttons").append(
            `<button onclick="indexPageMove(${i})" index="${i}">${i}</button>`
          );
        }
      }
    } else {
      totalTravers = 4;
      for (let i = 1; i <= totalTravers; i++) {
        $(".index-buttons").append(
          `<button onclick="indexPageMove(${i})" index="${i}">${i}</button>`
        );
      }
    }
  } else {
    for (let i = 1; i <= maxIndex; i++) {
      $(".index-buttons").append(
        `<button onclick="indexPageMove(${i})" index="${i}">${i}</button>`
      );
    }
  }

  $(".index-buttons").append(
    `<button onclick="nextPage()"><img src="img/right-arrow.png" alt="" /></button>`
  );

  // scroll to top after pagination
  scrollTo(0, 250);
  heilightIndexButton();
}

displayIndexButtons();

// blog page pagination end
