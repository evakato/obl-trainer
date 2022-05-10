import React, { useState, useEffect } from "react";
import TimerPage from "./TimerPage";
import SelectionPage from "./SelectionPage";

function App() {
  const [selection, setSelection] = useState(false);

  //{!selection ? <SelectionPage></SelectionPage> : <TimerPage></TimerPage>}
  return <TimerPage></TimerPage>;
}

export default App;
