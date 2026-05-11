function searchProblem() {

  const input = document
    .getElementById("problemInput")
    .value
    .toLowerCase();

  const machine = document
    .getElementById("machine")
    .value;

  const result = document
    .getElementById("result");

  // SPINDLE TNL 12.1

  if (input.includes("spindle") && machine === "romi") {

    result.innerHTML = `

      <h2 class="result-title">
        TNL 12.1 - Alarme de Spindle
      </h2>

      <p class="priority medium">
        ⚠️ Prioridade Média
      </p>

      <div class="steps">

        <div class="step-item">
          Verificar carga do spindle principal
        </div>

        <div class="step-item">
          Conferir refrigeração da máquina
        </div>

        <div class="step-item">
          Validar pressão pneumática
        </div>

        <div class="step-item">
          Reiniciar equipamento
        </div>

      </div>

    `;

  }

  // EIXO TNL 20

  else if (input.includes("eixo") && machine === "fanuc") {

    result.innerHTML = `

      <h2 class="result-title">
        TNL 20 - Falha de Referência do Eixo
      </h2>

      <p class="priority high">
        🔴 Prioridade Alta
      </p>

      <div class="steps">

        <div class="step-item">
          Conferir sensor de referência
        </div>

        <div class="step-item">
          Validar fim de curso
        </div>

        <div class="step-item">
          Reiniciar servo drive
        </div>

        <div class="step-item">
          Caso persista, consultar Liderança
        </div>

      </div>

    `;

  }

  // SEM RESULTADO

  else {

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