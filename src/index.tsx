import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";  // 메인 화면 컴포넌트 불러오기

// 1. document.getElementById("root") - HTML에서 id가 root인 요소를 찾아옴
// 2. [타입스크립트 문법] '!' (Non-null assertion) :
//    타입스크립트가 HTML에 root라는 id를 가진 div가 없을 상황을 대비,, 걱정함
//    뒤에 느낌표(!)를 붙여주는 이유는 HTML에 무조건 root가 있다는 것을 알려주는 역할
// 3. ReactDOM.createRoot(...).render(...) - 찾아온 root 자리에 <App />을 화면에 렌더링 하라는 뜻
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);