import { Analytics } from "@vercel/analytics/react";
import Portfolio from "./pages/Home";

function App() {
   return (
      <>
         <Analytics />
         <Portfolio />
      </>
   );
}

export default App;
