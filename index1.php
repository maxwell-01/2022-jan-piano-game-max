<!DOCTYPE html>

<html lang="en-GB">

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
      <div class="modal-blurred-area is-hidden is-visuallyHidden">
          <div class="instruction-modal">
              <h2>Instructions</h2>
              <button id="modal-button">&#x2715</button>
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
            <button id="instruction-button">&#8505</button>
        </div>
             <div class="piano-key-container">
                  <div class="piano-key white-key" data-note="g0">
                      <div class="piano-key black-key" data-note="g0#">
                          <p>Q</p>
                      </div>
                      <p>⇪</p>
                  </div>
                  <div class="piano-key white-key" data-note="a1">
                      <div class="piano-key black-key" data-note="a1#">
                          <p>W</p>
                      </div>
                      <p>A</p>
                  </div>
                  <div class="piano-key white-key" data-note="b1">
                      <p>S</p>
                  </div>
                  <div class="piano-key white-key" data-note="c1">
                      <div class="piano-key black-key" data-note="c1#">
                          <p>R</p>
                      </div>
                      <p>D</p>
                  </div>
                  <div class="piano-key white-key" data-note="d1">
                      <div class="piano-key black-key" data-note="d1#">
                          <p>T</p>
                      </div>
                      <p>F</p>
                  </div>
                  <div class="piano-key white-key" data-note="e1">
                      <p>G</p>
                  </div>
                  <div class="piano-key white-key" data-note="f1">
                      <div class="piano-key black-key" data-note="f1#">
                          <p>Y</p>
                      </div>
                      <p>H</p>
                  </div>
                  <div class="piano-key white-key" data-note="g1">
                      <div class="piano-key black-key" data-note="g1#">
                          <p>I</p>
                      </div>
                      <p>J</p>
                  </div>
                  <div class="piano-key white-key" data-note="a2">
                      <div class="piano-key black-key" data-note="a2#">
                          <p>O</p>
                      </div>
                      <p>K</p>
                  </div>
                  <div class="piano-key white-key" data-note="b2">
                      <p>L</p>
                  </div>
                  <div class="piano-key white-key" data-note="c2">
                      <div class="piano-key black-key" data-note="c2#">
                          <p>[</p>
                      </div>
                      <p>;</p>
                  </div>
                  <div class="piano-key white-key" data-note="d2">
                      <div class="piano-key black-key" data-note="d2#">
                          <p>]</p>
                      </div>
                      <p>'</p>
                  </div>
                  <div class="piano-key white-key" data-note="e2">
                      <p>\</p>
                  </div>
              </div>
    </section>


  </main>
  <footer>
    <a href="https://linktr.ee/charlotte.codes">Meet the team!</a>
  </footer>

</body>
</html>