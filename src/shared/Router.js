import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from 'pages/Home';
import Detail from 'pages/Detail';
import fakeData from 'fakeData.json';
import {LettersContext} from 'LettersContext';

function Router() {
  const [letters, setLetters] = useState(fakeData);

  return (
    <LettersContext.Provider value={{letters, setLetters}}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
    </LettersContext.Provider>
  );
};

export default Router;
