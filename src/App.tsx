import {} from "react-hook-form";
import {
  NvButton,
  NvFielddropdown,
  NvFielddropdownitem,
} from "@nova-design-system/nova-react";

function App() {
  return (
    <form className="p-8">
      <NvFielddropdown label="Dropdown" value="1">
        <ul slot="content">
          <NvFielddropdownitem value="1" label="Item 1"></NvFielddropdownitem>
          <NvFielddropdownitem value="2" label="Item 2"></NvFielddropdownitem>
          <NvFielddropdownitem value="3" label="Item 2"></NvFielddropdownitem>
        </ul>
      </NvFielddropdown>
      <NvButton disabled>Hello World</NvButton>
    </form>
  );
}

export default App;
