body {
  margin: 0;
  background: #041d04;
  overflow: hidden;
  font-family: 'Arial', sans-serif;
}

#gameContainer {
  position: relative;
  text-align: center;
  color: white;
}

#logo {
  font-size: 32px;
  font-weight: 900;
  background: #00ffc6;
  color: black;
  padding: 10px;
}

#gameCanvas {
  border-bottom: 4px solid #00ffc6;
}

#scoreBoard {
  font-size: 20px;
  margin-top: 10px;
}

#banner {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0,255,200,0.9);
  color: black;
  padding: 20px 40px;
  border-radius: 15px;
  font-size: 30px;
  font-weight: bold;
  display: none;
  animation: glow 1.5s infinite alternate;
}

@keyframes glow {
  from { box-shadow: 0 0 10px #00ffc6; }
  to { box-shadow: 0 0 30px #00ffc6; }
}
