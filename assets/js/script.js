let problems = [];

let selectedMachine = "";

const problemSelect =
  document.getElementById("problemSelect");

const result =
  document.getElementById("result");

const machineCards =
  document.querySelectorAll(".machine-card");

/* CARREGA JSON */

async function loadProblems(){

  try{

    const response =
      await fetch("data/problems.json");

    problems =
      await response.json();

    console.log(
      "Base carregada:",
      problems
    );

  }

  catch(error){

    console.error(
      "Erro ao carregar JSON:",
      error
    );

  }

}

loadProblems();

/* SELEÇÃO DA MÁQUINA */

machineCards.forEach(card => {

  card.addEventListener("click", () => {

    machineCards.forEach(c =>
      c.classList.remove("active")
    );

    card.classList.add("active");

    selectedMachine =
      card.dataset.machine;

    console.log(
      "Máquina selecionada:",
      selectedMachine
    );

    loadProblemOptions();

    result.innerHTML = `

      <div class="empty-state">

        <i class="fa-solid fa-circle-info"></i>

        <p>
          Selecione um problema para visualizar a solução.
        </p>

      </div>

    `;

  });

});

/* CARREGA PROBLEMAS DA MÁQUINA */

function loadProblemOptions(){

  problemSelect.innerHTML = `

    <option value="">
      Selecione o problema
    </option>

  `;

  const filteredProblems =
    problems.filter(problem =>
      problem.machine === selectedMachine
    );

  filteredProblems.forEach(problem => {

    const option =
      document.createElement("option");

    option.value =
      problem.problem;

    option.textContent =
      problem.problem;

    problemSelect.appendChild(option);

  });

}

/* MOSTRA SOLUÇÃO */

function showSolution(){

  const selectedProblem =
    problemSelect.value;

  /* VALIDA MÁQUINA */

  if(!selectedMachine){

    result.innerHTML = `

      <div class="empty-state">

        <i class="fa-solid fa-triangle-exclamation"></i>

        <p>
          Selecione uma máquina.
        </p>

      </div>

    `;

    return;

  }

  /* VALIDA PROBLEMA */

  if(!selectedProblem){

    result.innerHTML = `

      <div class="empty-state">

        <i class="fa-solid fa-triangle-exclamation"></i>

        <p>
          Selecione um problema.
        </p>

      </div>

    `;

    return;

  }

  /* PROCURA PROBLEMA */

  const foundProblem =
    problems.find(problem =>

      problem.machine === selectedMachine &&

      problem.problem === selectedProblem

    );

  /* SE ENCONTRAR */

  if(foundProblem){

    let actionsHTML = "";

    foundProblem.actions.forEach(action => {

      actionsHTML += `

        <div class="step-item">
          ${action}
        </div>

      `;

    });

    /* BOTÃO PDF */

    let pdfButton = "";

    if(foundProblem.pdf){

      pdfButton = `

        <a
          href="${foundProblem.pdf}"
          target="_blank"
          class="pdf-button"
        >

          <i class="fa-solid fa-file-pdf"></i>

          Abrir Procedimento Completo

        </a>

      `;

    }

    result.innerHTML = `

      <h2 class="result-title">
        ${foundProblem.problem}
      </h2>

      <div class="steps">
        ${actionsHTML}
      </div>

      ${pdfButton}

    `;

  }

  /* NÃO ENCONTRADO */

  else{

    result.innerHTML = `

      <div class="empty-state">

        <i class="fa-solid fa-circle-xmark"></i>

        <p>
          Problema não encontrado.
        </p>

      </div>

    `;

  }

}