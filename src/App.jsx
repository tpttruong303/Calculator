import { useState } from "react"

function App() {

  const [rawEquation, setRawEquation] = useState("")
  const [calYet, setCalYet] = useState(false)
  const [theme, setTheme] = useState(1)

  const toggleThumbStyles = {
    1: {transform: "translateX(0px)", backgroundColor: 'hsl(6, 63%, 50%)'},
    2: {transform: "translateX(35px)", backgroundColor: 'hsl(25, 98%, 40%)'},
    3: {transform: "translateX(70px)", backgroundColor: 'hsl(176, 100%, 44%)'}
  }

  const textStyles = {
    1: "hsl(0, 100%, 100%)",
    2: "hsl(60, 10%, 19%)",
    3: "hsl(52, 100%, 62%)"
  }

  const mainBackGroundStyles = {
    1: "hsl(222, 26%, 31%)",
    2: "hsl(0, 0%, 90%)",
    3: "hsl(268, 75%, 9%)"
  }

  const screenBackGroundStyles = {
    1: "hsl(224, 36%, 15%)",
    2: "hsl(0, 0%, 93%)",
    3: "hsl(268, 71%, 12%)",
  }

  const keyboardBackGroundStyles = {
    1: "hsl(223, 31%, 20%)",
    2: "hsl(0, 5%, 81%)",
    3: "hsl(268, 71%, 12%)",
  }

  const normalButtonStyles = {
    1: {boxShadow: "0 4px 2px hsl(28, 16%, 65%)", backgroundColor: "hsl(0, 0%, 90%)", color: "hsl(221, 14%, 31%)"},
    2: {boxShadow: "0 4px 2px hsl(35, 11%, 61%)", backgroundColor: "hsl(0, 0%, 90%)", color: "hsl(60, 10%, 19%)"}, 
    3: {boxShadow: "0 4px 2px hsl(290, 70%, 36%)", backgroundColor: "hsl(268, 47%, 21%)", color: "hsl(52, 100%, 62%)"},
  }

  const specialButtonStyles = {
    1: {
      'DEL': {color: "hsl(0, 100%, 100%)", backgroundColor: "hsl(225, 21%, 49%)", boxShadow: "0 4px 2px hsl(224, 28%, 35%)"},
      'RESET': {color: "hsl(0, 100%, 100%)", backgroundColor: "hsl(225, 21%, 49%)", boxShadow: "0 4px 2px hsl(224, 28%, 35%)", gridColumn: "1 / span 2"},
      '=': {color: "hsl(0, 100%, 100%)", backgroundColor: "hsl(6, 63%, 50%)", boxShadow: "0 4px 2px hsl(6, 70%, 34%)", gridColumn: "3 / span 2"}
    },
    2: {
      'DEL': {color: "hsl(0, 100%, 100%)", backgroundColor: "hsl(185, 42%, 37%)", boxShadow: "0 4px 2px hsl(185, 58%, 25%)"},
      'RESET': {color: "hsl(0, 100%, 100%)", backgroundColor: "hsl(185, 42%, 37%)", boxShadow: "0 4px 2px hsl(185, 58%, 25%)", gridColumn: "1 / span 2"},
      '=': {color: "hsl(0, 100%, 100%)", backgroundColor: "hsl(25, 98%, 40%)", boxShadow: "0 4px 2px hsl(25, 99%, 27%)", gridColumn: "3 / span 2"}
    },
    3: {
      'DEL': {color: "hsl(0, 100%, 100%)", backgroundColor: "hsl(281, 89%, 26%)", boxShadow: "0 4px 2px hsl(285, 91%, 52%)"},
      'RESET': {color: "hsl(0, 100%, 100%)", backgroundColor: "hsl(281, 89%, 26%)", boxShadow: "0 4px 2px hsl(285, 91%, 52%)", gridColumn: "1 / span 2"},
      '=': {color: "hsl(198, 20%, 13%)", backgroundColor: "hsl(176, 100%, 44%)", boxShadow: "0 4px 2px hsl(177, 92%, 70%)", gridColumn: "3 / span 2"}
    }
  }

  const keys = [
    '7','8','9','DEL',
    '4','5','6','+',
    '1','2','3','-',
    '.','0','/','x',
    'RESET', '='
  ]

  function calculation(equation) {
    let result = 0
    let index = 0
    while (index < equation.length) {

      const element = equation[index]
      let currNum = 0

      if (element.length == 0) {
        setRawEquation("Error")
        setCalYet(true)
        return
      }

      if (element.includes('.')) {
        let countDot = 0
        for (let i=0; i<element.length; i++) {
          if (element[i] == '.') countDot += 1
        }
        if (countDot > 1) {
          setRawEquation("Error")
          setCalYet(true)
          return
        }
        currNum = parseFloat(element)
      }
      else currNum = parseInt(element)

      if (index == 0) {
        result = currNum
        currNum = 0
      }
      else {
        const operator = equation[index - 1]
        if (operator == '+') result += currNum
        else if (operator == '-') result -= currNum
        else if (operator == 'x') result *= currNum
        else if (operator == '/') {
          if (currNum == 0) {
            setRawEquation("Error")
            setCalYet(true)
            return
          }
          result /= currNum
        }
      }

      index += 2
    }

    setRawEquation(result.toString())
    setCalYet(true)
  }

  function handleClickKey(e) {

    if (calYet==true) {
      setRawEquation("")
      setCalYet(false)
    }

    const value = e.target.id
    if ((['DEL', 'RESET', '=']).includes(value)) {
      if (value == 'RESET') setRawEquation("")
      else if(value == 'DEL') setRawEquation(prevEquation => prevEquation.slice(0, prevEquation.length-1))
    
      else {
        let trueEquation = []
        let index = 0
        let number = ""
        while (index < rawEquation.length) {
          const currChar = rawEquation[index]
          if (['+','-','x','/'].includes(currChar)) {
            trueEquation.push(number)
            trueEquation.push(currChar)
            number = ""
          }
          else {
            number += currChar
          }
          index += 1
        }
        if (number.length > 0) trueEquation.push(number)
        calculation(trueEquation)
      }

    }
    else setRawEquation(prevEquation => prevEquation + value)
  }

  function handleClickToggle() {
    setTheme(prevTheme => {
      if (prevTheme == 3) {
        return 1
      }
      else return prevTheme + 1
    })
  }

  const keyElements = keys.map(
    (keyValue) => {
      return (
        <button 
          key={keyValue}
          style={specialButtonStyles[theme][keyValue] ? specialButtonStyles[theme][keyValue] : normalButtonStyles[theme]}
          onClick={handleClickKey}
          id={keyValue}
        >
          {keyValue}
        </button>
      )
    }
  )

  return (
    <div 
      style={{backgroundColor: mainBackGroundStyles[theme]}}
      className="main-content"
    >
      <div className="header">
        <span 
          className="logo"
          style={{color: textStyles[theme]}}
        >
          calc
        </span>

        <div 
          className="change-theme-button-container"
          style={{color: textStyles[theme]}}
        >
          <div className="toggle-labels">
            <span className="label">1</span>
            <span className="label">2</span>
            <span className="label">3</span>
          </div>
          <div className="toggle-wrapper">
            <span className="text-label">THEME</span>
            <div 
              className="toggle-container"
              style={{backgroundColor: keyboardBackGroundStyles[theme]}}
            >
              <div 
                className="toggle-thumb"
                style={toggleThumbStyles[theme]}
                onClick={handleClickToggle}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div 
        style={{backgroundColor: screenBackGroundStyles[theme], color: textStyles[theme]}}
        className="screen"
      >
        <span>{rawEquation}</span>
      </div>
      <div 
        className="keyboard"
        style={{backgroundColor: keyboardBackGroundStyles[theme]}}
      >
        <div className="row-keyboard">
          {keyElements.slice(0, 4)}
        </div>
        <div className="row-keyboard">
          {keyElements.slice(4, 8)}
        </div>
        <div className="row-keyboard">
          {keyElements.slice(8, 12)}
        </div>
        <div className="row-keyboard">
          {keyElements.slice(12, 16)}
        </div>
        <div className="row-keyboard">
          {keyElements.slice(16)}
        </div>
      </div>
    </div>
  )
}

export default App