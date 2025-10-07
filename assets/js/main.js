document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("colorGrid");
  const totalPairs = 9; // 9 botones → 4 pares + 1 extra
  const colors = generateColorPairs(totalPairs);
  let selected = [];
  colors.forEach((color, index) => {
    const btn = document.createElement("button");
    btn.classList.add("color-btn");
    btn.style.backgroundColor = color;
    btn.dataset.color = color;
    btn.dataset.index = index;
    grid.appendChild(btn);
    btn.addEventListener("click", () => handleClick(btn));
  });
  function handleClick(btn) {
    if (btn.classList.contains("hidden") || selected.includes(btn)) return;
    selected.push(btn);
    btn.style.opacity = "0.5";
    if (selected.length === 2) {
      const [first, second] = selected;
      if (first.dataset.color === second.dataset.color) {
        setTimeout(() => {
          first.classList.add("hidden");
          second.classList.add("hidden");
          selected = [];
          checkWin();
        }, 500);
      } else {
        setTimeout(() => {
          first.style.opacity = "1";
          second.style.opacity = "1";
          selected = [];
        }, 800);
      }
    }
  }
    function checkWin() {
        const allButtons = document.querySelectorAll(".color-btn");
        const hiddenButtons = document.querySelectorAll(".color-btn.hidden");
        const visibles = allButtons.length - hiddenButtons.length;
        if (visibles === 1) {
            setTimeout(() => {
            showEndMessage();
            }, 500);
        }
    }
    function showEndMessage() {
        const grid = document.getElementById("colorGrid");
        grid.innerHTML = `
            <div style="grid-column: span 3; text-align: center;">
            <h2>🎉 ¡Felicidades!</h2>
            <p>Has emparejado todos los colores posibles.</p>
            <button id="restartBtn" class="btn">Reiniciar juego</button>
            </div>
        `;
        document.getElementById("restartBtn").addEventListener("click", () => {
            location.reload();
        });
    }
  function generateColorPairs(n) {
    const baseColors = [];
    for (let i = 0; i < Math.floor(n / 2); i++) {
      baseColors.push(randomColor());
    }
    const allColors = [...baseColors, ...baseColors];
    if (n % 2 !== 0) allColors.push(randomColor()); // botón impar
    return shuffle(allColors);
  }
  function randomColor() {
    const r = Math.floor(Math.random() * 200);
    const g = Math.floor(Math.random() * 200);
    const b = Math.floor(Math.random() * 200);
    return `rgb(${r},${g},${b})`;
  }
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }
});
