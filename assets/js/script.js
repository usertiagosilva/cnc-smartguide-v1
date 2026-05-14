let problems = [];

async function loadProblems() {

  try {

    const response = await fetch("data/problems.json");

    problems = await response.json();

    console.log("Base de dados carregada:", problems);

  } catch (error) {

    console.error("Erro ao carregar JSON:", error);

  }

}

loadProblems();

function searchProblem() {

  const input = document
    .getElementById("problemInput")
    .value
    .toLowerCase();

  const selectedMachine = document
    .getElementById("machine")
    .options[
      document.getElementById("machine").selectedIndex
    ].text;

  const result = document
    .getElementById("result");

  const foundProblem = problems.find(problem => {

    const machineMatch =
      problem.machine === selectedMachine;

    const keywordMatch =
      problem.keywords.some(keyword =>
        input.includes(keyword.toLowerCase())
      );

    return machineMatch && keywordMatch;

  });

  if(foundProblem){

    let priorityClass = "medium";
    let priorityText = "⚠️ Prioridade Média";

    if(foundProblem.priority === "high"){

      priorityClass = "high";
      priorityText = "🔴 Prioridade Alta";

    }

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

      <p class="priority ${priorityClass}">
        ${priorityText}
      </p>

      <div class="steps">
        ${actionsHTML}
      </div>

    `;

  }

  else{

    result.innerHTML = `

      <h2 class="result-title">
        Nenhuma solução encontrada
      </h2>

      <p>
        Tente pesquisar outro termo ou consulte a Liderança.
      </p>

    `;

  }

}