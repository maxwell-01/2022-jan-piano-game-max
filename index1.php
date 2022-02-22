<!DOCTYPE html>

<html lang="en-GB">

<head>

    <title>Piano Plinky Plonk</title>
    <link href="normalize.css" rel="stylesheet" type="text/css">
    <link href="styles.css" rel="stylesheet" type="text/css">
    <script src="script.js" defer></script>
</head>

<body>

      <header><h1>Piano Plinky Plonk</h1></header>
  <main>
      <div class="instruction-button-container">
          <svg id="instruction-button" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm.5 17h-1v-9h1v9zm-.5-12c.466 0 .845.378.845.845 0 .466-.379.844-.845.844-.466 0-.845-.378-.845-.844 0-.467.379-.845.845-.845z"/></svg>
      </div>
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
                              <li> '⇪ ' (caps lock) to '\' are the white piano keys</li>
                              <li>'Q' to ']' are the black piano keys</li>
                          </ul>
                      </li>
                  </ul>
              </div>
          </div>
      </div>

    <section class="game-container">
             <div class="piano-key-container">
                  <div class="piano-key white-key" data-note="g0">
                      <div class="piano-key black-key" data-note="g0#">
                          <p>Q</p>
                      </div>
                      <p>Caps Lock</p>
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
                      <div class="piano-key black-key" data-note="e1#">
                          <p>Y</p>
                      </div>
                      <p>G</p>
                  </div>
                  <div class="piano-key white-key" data-note="f1">
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
    <a href="#">Meet the team!</a>
  </footer>

</body>
</html>