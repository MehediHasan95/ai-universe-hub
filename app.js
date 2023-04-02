const loadAllData = (limit) => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => {
      if (data.data.tools.length) {
        displayData(data.data.tools, limit);
        loadingSpinner("d-none");
      } else {
        loadingSpinner("block");
      }
    });
};
loadAllData(0);

document.getElementById("see-more").addEventListener("click", function () {
  loadAllData(100);
});

const displayData = (data, limit) => {
  const showAll = document.getElementById("see-more");

  if (limit < 6) {
    data = data.slice(0, 6);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }
  const container = document.getElementById("data-container");
  container.textContent = "";

  data.forEach((elements) => {
    const div = document.createElement("div");
    div.classList.add("p-3", "border", "col-lg-3", "m-3", "p-0");
    const { id, image, name, published_in, features } = elements;

    div.innerHTML = `
    <div class='main-card'>
    <img src="${image}" alt="" class="img-fluid rounded-3 border" />
    <h5>Features</h5>
    <ol>
      ${features.map((e) => `<li>${e}</li>`).join("")}
    </ol>
    <hr />
    <div class="card-details d-flex justify-content-between align-items-center w-100 px-3">
      <div>
        <h5>${name}</h5>
        <p><i class="bi bi-calendar-check-fill"></i> ${published_in}</p>
      </div>
      <i onclick="loadDetails('${id}')" class="bi bi-arrow-right-circle-fill fs-2" data-bs-toggle="modal"
      data-bs-target="#staticBackdrop"></i>
    </div>
    </div>
    `;
    container.appendChild(div);
  });

  // sort
  document.getElementById("sort").addEventListener("click", function () {
    const sortedValue = data.sort(function (a, b) {
      return new Date(a.published_in) - new Date(b.published_in);
    });
    console.log(sortedValue);
  });
};

const loadDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((detail) => displayDetails(detail.data));
};

const displayDetails = (details) => {
  const container = document.getElementById("show-details");
  container.textContent = "";
  const div = document.createElement("div");

  const {
    description,
    pricing,
    image_link,
    features,
    integrations,
    input_output_examples,
    accuracy,
  } = details;

  let singleFeatures = [];
  for (const e in features) {
    singleFeatures.push(features[e]);
  }

  div.innerHTML = `
  <div class="row">
  <div class="col-lg-6">
  <div class="p-3 m-2 border custom-bg rounded-3">
  <p class="fs-4 fw-bold">${description}</p>
  <div class="d-flex justify-content-evenly">
 ${
   pricing
     ? `${pricing
         .map(
           (e) =>
             `<div class="py-3 text-center w-25 m-2 bg-white rounded-3 border">${e.price} <br/> ${e.plan}</div>`
         )
         .join("")}`
     : `<div class="py-3 text-center w-25 m-2 bg-white rounded-3 border">Free of <br/>Cost/ </br> Basic</div>
     <div class="py-3 text-center w-25 m-2 bg-white rounded-3 border">Free of <br/>Cost/ </br> Pro</div>
     <div class="py-3 text-center w-25 m-2 bg-white rounded-3 border">Free of <br/>Cost/ </br> Enterprise</div>
     `
 }
  </div>
  <div class="d-flex justify-content-evenly">
      <ul>
      <p class="fw-bold">Features</p>
       ${singleFeatures.map((e) => `<li>${e.feature_name}</li>`).join("")}
      </ul>
      <div>
      <ul>
      <p class="fw-bold">Integrations</p>
       ${
         integrations
           ? ` ${integrations.map((e) => `<li>${e}</li>`).join("")}`
           : `<p class="text-center text-danger">No data found</p>`
       }
      </ul>
      </div>
  </div>
  </div>

  </div>
  <div class="col-lg-6">
 <div class="p-2 m-2 rounded-3 border">
 <div class="img-container">
 <img src="${image_link[0]}" alt="" class="img-fluid rounded-3 border" />


 ${
   accuracy.score
     ? `<span class="bg-danger text-white rounded-3 p-2 accuracy">${accuracy.score}% accuracy</span>  `
     : ""
 }

</div>
${
  input_output_examples
    ? ` <p class="text-center">${input_output_examples[0].input}</p>`
    : `<p class="text-center text-danger">No! Not Yet! take a break!!!</p>`
}
${
  input_output_examples
    ? ` <p class="text-center">${input_output_examples[0].output}</p>`
    : `<p class="text-center text-danger">No! Not Yet! take a break!!!</p>`
}
</div>
 </div>
  </div>
  `;
  container.appendChild(div);
};

// spinner
const loadingSpinner = (toggle) => {
  const spinner = document.getElementById("spinner");
  spinner.setAttribute("class", toggle);
};
