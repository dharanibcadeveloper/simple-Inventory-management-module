import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "../App";
import MainLayout from "../sidebar/MainLayout";
import SignIn from "../Auth/SignIn"
import Dashboard from "../layout/Dashboard";
import CreateCategory from "../modules/category/create";
import CreateProduct from "../modules/product/create";
import IndexProduct from "../modules/product/index";


function AppRouter() {
  return (
    <BrowserRouter>
          <Routes>
            
              <Route path="/" element={<App />} >
                <Route index element={<SignIn />}/>
                  <Route element={<MainLayout />}>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/create-category" element={<CreateCategory />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/edit-product/:id" element={<CreateProduct />} />
                      <Route path="/index-product" element={<IndexProduct />} />
            
                </Route>
             </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;