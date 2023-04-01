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

  for (const e of data) {
    // console.log(e);
    const div = document.createElement("div");
    div.classList.add("p-3", "border", "col-lg-3", "m-3", "p-0");
    div.innerHTML = `

    <div class='main-card'>
    <img src="${e.image}" alt="" class="img-fluid rounded-3 border" />
    <h5>Features</h5>
    <ol>
      <li>${e.features}</li>
    </ol>
    <hr />
    <div class="card-details d-flex justify-content-between align-items-center w-100 px-3">
      <div>
        <h5>${e.name}</h5>
        
        <p><i class="bi bi-calendar-check-fill"></i> ${e.published_in}</p>
      </div>
      <i onclick="loadDetails('${e.id}')" class="bi bi-arrow-right-circle-fill" data-bs-toggle="modal"
      data-bs-target="#staticBackdrop"></i>
    </div>
    </div>
    `;
    container.appendChild(div);
  }
};

const loadDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((detail) => displayDetails(detail.data));
};

const displayDetails = (details) => {
  console.log(details);
  const container = document.getElementById("show-details");
  const div = document.createElement("div");
  div.innerHTML = `
  <div>
  <p>${details.description}</p>
  </div>
  `;
  container.appendChild(div);
};
