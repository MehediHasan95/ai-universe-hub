const loadAllData = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => displayData(data.data.tools));
};
loadAllData();

document.getElementById("see-more").addEventListener("click", function () {
  more = data.length;
});

const displayData = (data) => {
  const container = document.getElementById("data-container");

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
      <i onclick="loadDetails('${id}')" class="bi bi-arrow-right-circle-fill" data-bs-toggle="modal"
      data-bs-target="#staticBackdrop"></i>
    </div>
    </div>
    `;
    container.appendChild(div);
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
  } = details;

  console.log(features);

  let singleFeatures = [];
  for (const e in features) {
    singleFeatures.push(features[e]);
  }

  div.innerHTML = `
  <div class="d-flex justify-content-between">
  <div class="w-50 m-2 rounded-3 p-2 border custom-bg">
  <p>${description}</p>
  <div class="d-flex justify-content-evenly">
  ${pricing
    .map(
      (e) =>
        `<div class="py-3 text-center w-25 m-2 bg-white rounded-3">${e.price} ${e.plan}</div>`
    )
    .join("")}
  </div>
  <div class="d-flex justify-content-evenly">
      <ul>
      <p class="fw-bold">Features</p>
       ${singleFeatures.map((e) => `<li>${e.feature_name}</li>`).join("")}
      </ul>
      <div>
      <ul>
      <p class="fw-bold">Integrations</p>
        ${integrations.map((e) => `<li>${e}</li>`).join("")}
      </ul>
      </div>
  </div>

  </div>
  <div class="w-50 m-2 p-2 rounded-3 border">
  <img src="${image_link[0]}" alt="" class="img-fluid rounded-3 border" />
  <p class="text-center">${input_output_examples[0].input}</p>
  <p class="text-center">${input_output_examples[0].output}</p>
  </div>
  </div>
  `;
  container.appendChild(div);
};
