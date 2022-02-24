<!DOCTYPE html>

<html lang="en-GB" xmlns="http://www.w3.org/1999/html">

<head>

    <title>Piano Plinky Plonk</title>
    <link href="normalize.css" rel="stylesheet" type="text/css">
    <link href="styles.css" rel="stylesheet" type="text/css">
    <script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
    <script src="script.js" defer></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100&display=swap" rel="stylesheet">

</head>

<body>

      <header>
          <h1>Piano Plinky Plonk</h1>
      </header>
  <main>
      <div class="modal-overlay-start">
          <div class="start-game-modal">
              <div class="start-game-heading">
                  <h2>Welcome to Piano Plinky Plonk!</h2>
              </div>
              <p>The game for aspiring musicians everywhere</p>
              <div class="start-game-content">
                  <p>To begin, click the start button below!</p>
                  <div>
                      <button id="start-game-button">Start</button>
                  </div>
                  <div class="instruction-button-container">
                      <button id="instruction-button">i</button>
                  </div>
              </div>
          </div>
      </div>
      <div class="modal-blurred-area">
          <div class="instruction-modal">
              <h2>Instructions</h2>
              <button id="modal-button">&#x2715;</button>
              <div class="instructions-body">
                  <p>Welcome to Piano Plinky Plonk, the interactive web-piano that allows you to play your own tunes!</p>
                  <p>To get started:</p>
                  <ul>
                      <li>using your keyboard, tap the corresponding keys to play notes</li>
                      <li class="remove-bullet-point">
                          <ul>
                              <li> 'A' to '↵' are the white piano keys</li>
                              <li>'W' to ']' are the black piano keys</li>
                          </ul>
                      </li>
                  </ul>
              </div>
          </div>
      </div>

    <section class="game-container">
        <div class="game-notes-container">
        </div>
        <div class="piano-key-container">
        </div>
    </section>

  </main>
  <footer>
    <h2>Meet the team!</h2>
    <a href="https://www.linkedin.com/in/rich-kerr-b1918583/" target="_blank">Rich Kerr</a>
    <a href="https://www.linkedin.com/in/liam-l-08a6b3140/" target="_blank">Liam Lawrence</a>
    <a href="https://www.linkedin.com/in/charlotte-buckley-93866416a/" target="_blank">Charlotte Buckley</a>
    <a href="https://www.linkedin.com/in/maxwellnewton/" target="_blank">Maxwell Newton</a>
    <a href="https://www.linkedin.com/in/oliver-ritchie-973341147/" target="_blank">Ollie Ritchie</a>
  </footer>

</body>
</html>