<!DOCTYPE html>

<html lang="en-GB" xmlns="http://www.w3.org/1999/html">

<head>

    <title>Piano Plinky Plonk</title>
    <link href="normalize.css" rel="stylesheet" type="text/css">
    <link href="styles.css" rel="stylesheet" type="text/css">
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
        <div class="instruction-button-container">
            <button id="instruction-button">&#8505;</button>
        </div>
        <div class="game-notes-container">
        </div>
        <div class="piano-key-container">
        </div>
    </section>


  </main>
  <footer>
    <a href="https://linktr.ee/charlotte.codes">Meet the team!</a>
  </footer>

</body>
</html>