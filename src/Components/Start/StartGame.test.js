import React from "react";

import { render } from "@testing-library/react";

// import "@testing-library/jest-dom/extend-expect";
import '@testing-library/jest-dom'
import StartGame from "./StartGame";

test('render component', async ()=>{
    const component = render(<StartGame/>)

    component.getByText('BATTLESHIP')
    component.getByPlaceholderText('Player name')
})