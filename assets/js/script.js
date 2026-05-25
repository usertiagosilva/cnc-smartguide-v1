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

    /* REMOVE SELEÇÃO ANTERIOR */

    machineCards.forEach(c =>
      c.classList.remove("active")
    );

    /* ADICIONA CARD ATIVO */

    card.classList.add("active");

    /* PEGA NOME DA MÁQUINA */

    selectedMachine =
      card.dataset.machine;

    console.log(
      "Máquina selecionada:",
      selectedMachine
    );

    /* CARREGA PROBLEMAS */

    loadProblemOptions();

    /* LIMPA RESULTADO */

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

  /* LIMPA SELECT */

  problemSelect.innerHTML = `

    <option value="">
      Selecione o problema
    </option>

  `;

  /* FILTRA PROBLEMAS */

  const filteredProblems =
    problems.filter(problem =>
      problem.machine === selectedMachine
    );

  /* ADICIONA OPTIONS */

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

    result.innerHTML = `

      <h2 class="result-title">
        ${foundProblem.problem}
      </h2>

      <div class="steps">
        ${actionsHTML}
      </div>

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