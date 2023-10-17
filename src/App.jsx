import Router from "./router";
import { useEffect } from "react";
import Header from "./layout/Header/Header";
import instance from "./api";

function App() {
  useEffect(() => {
    const _id = "6526d5bffb30d429e3c68ad7";
    instance
      .get(`order/findById/${_id}`)
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
        throw new Error("Unexpected error");
      })
      .then((data) => {
        console.log("[Order]: ", data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Header />
      <Router />
    </>
  );
}

export default App;
