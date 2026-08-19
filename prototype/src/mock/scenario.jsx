import { createContext, useContext, useState } from 'react';

/* PROTOTYPE CHROME — none of this ships.
 *
 * One forced scenario for the whole prototype, held outside the phone screen
 * so the control does not have to sit inside the UI it is testing. Every
 * list screen reads it, so flipping to "empty" or "error" once shows you
 * every screen in that state as you navigate.
 *
 * It used to be a dashed switcher rendered inside each screen, which meant
 * the reviewer was always looking at a screen with a debug bar wedged into
 * the middle of it.
 */
const ScenarioContext = createContext(null);

export function ScenarioProvider({ children }) {
  const [scenario, setScenario] = useState('loaded');
  return (
    <ScenarioContext.Provider value={{ scenario, setScenario }}>
      {children}
    </ScenarioContext.Provider>
  );
}

export function useScenario() {
  return useContext(ScenarioContext) ?? { scenario: 'loaded', setScenario: () => {} };
}
