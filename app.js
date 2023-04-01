const loadAllData = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => displayData(data.data.tools));
};
loadAllData();

const displayData = (data) => {
  console.log(data);
  const container = document.getElementById("data-container");
  for (const e of data) {
    console.log(e);
    const div = document.createElement("div");
    div.classList.add("card", "col-lg-3", "m-3", "p-3");
    div.innerHTML = `
    <img src="${e.image}" alt="" class="img-fluid rounded-3 border" />
  <h5>Features</h5>
  <ol>
    <li>${e.features}</li>
  </ol>
  <hr />
  <div class="d-flex justify-content-between align-items-center">
    <div>
      <h5>${e.name}</h5>
      <p>${e.published_in}</p>
    </div>
    <p>Details</p>
  </div>
    `;
    container.appendChild(div);
  }
};
