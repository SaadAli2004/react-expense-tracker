import { useEffect, useState } from "react";
import { Modal } from "@mui/material";


function Input() {
  const playClick = () => {
    const click = new Audio("/src/sounds/click.mp3");
    click.play();
  };
  const playClose = () => {
    const close = new Audio("/src/sounds/close.mp3");
    close.play();
  };
  const playSubmit = () => {
    const submit = new Audio("/src/sounds/submit.mp3");
    submit.play();
  };
  const playError = () => {
    const error = new Audio("/src/sounds/error.mp3");
    error.play();
  };
  const playDone = () => {
    const done = new Audio("/src/sounds/done.mp3");
    done.play();
  };

  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(null);
  const [cost, setCost] = useState(0);
  const [balanceCheck, setBalanceCheck] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (item, index) => {
    playClose();
    setItems(items.filter((_, i) => i !== index));
    setCost((prev)=> prev - item.amount);
  };

 
  useEffect(() => {
    console.log("Updated items:", items);
  }, [items]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (input.trim("") && amount.trim("") !== "") {
      const data = {
        name: input,
        amount: amount,
      };

      setBalance((prev) => prev - Number(amount));

      setItems((prev) => [...prev, data]);

      setCost((prev) => prev + Number(amount));

      setInput("");
      setAmount("");
      playSubmit();
    }
    else{

      playError();
      return;
    };
    }

  const balanceHandler = (e) => {
    e.preventDefault();
    if(isNaN(Number(balance)) || Number(balance) <= 0){
     playError();
     return;
    }
    setBalanceCheck(true);
    playSubmit();
  
  };
  const handleDone = () => {
    setShowModal(true);
    if (balance >= 0){
      playDone();
      
    }
   
  }
  return (
    <>
      
      <div className="h-screen overflow-x-hidden">
        <h1 className="text-5xl text-red-600 text-outline text-center font-[Pricedown] p-10 md:text-7xl lg:text-8xl">
          Expense Tracker App
        </h1>
        <Modal open={showModal} onClose={() => setShowModal(false)}>

            <div className=" bg-black/70  h-full flex justify-center">
               {balance < 0 ? (
              
                <div className="flex flex-col justify-center items-center">


                  <h1 className="text-6xl text-red-800 text-outline font-[Pricedown]  md:text-8xl lg:text-[10rem]">mission Failed!</h1>
                 <h1 className="text-red-800 text-outline font-[Pricedown] text-4xl  md:text-7xl lg:text-8xl">You're ${balance} in debt </h1>

                </div>
               ):(
                <div className="flex flex-col justify-center items-center">

                 
                                  <h1 className="text-6xl text-yellow-700 text-outline  ease-in font-[Pricedown] md:text-8xl lg:text-[10rem]">mission Passed!</h1>
                                  {balance !== 0 ? (
                                    <h1 className="text-green-800 text-outline font-[Pricedown]  text-center text-5xl md:text-7xl lg:text-8xl">You managed to save ${balance} </h1>
                                  ) : (
                                    <h1 className="text-white text-outline font-[Pricedown] text-5xl  md:text-7xl lg:text-8xl">respect+</h1>

                                  ) }
                </div>


               )}

            </div>

        </Modal>
        {!balanceCheck ? (
          <div className="flex justify-center  py-10 text-white">
            <form
              action=""
              className="flex gap-2 font-[Futura]"
              onSubmit={balanceHandler}
            >
              <div className="flex flex-col gap-1">
                <label htmlFor="balance" className="p-1 text-center text-xl">
                  Enter Balance
                </label>

                <input
                  type="text"
                  onClick={() => playClick()}
                  name="balance"
                  className="border bg-black w-80 p-3"
                  onChange={(e) => setBalance(e.target.value)}
                />
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className=" border-green-950 border-2 w-4/12 bg-green-600 p-2 rounded-md"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div>
            {/* Form */}
            <div className="text-white">
              <div className="flex justify-center py-6 scale-80 md:scale-105 w-full relative  bottom-8 lg:scale-120 lg:bottom-0 lg:py-10 ">
                <form
                  action=""
                  className="flex gap-2 font-[Futura]"
                  onSubmit={submitHandler}
                >
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="balance"
                      className="p-1 text-center text-xl"
                    >
                      Enter Item
                    </label>
                    <input
                      type="text"
                      name="balance"
                      onClick={() => playClick()}
                      value={input}
                      className="border bg-black w-80 p-3"
                      onChange={(e) => setInput(e.target.value)}
                    />

                    <label
                      htmlFor="balance"
                      className="p-1 text-center text-xl"
                    >
                      Enter Price
                    </label>
                    <input
                      type="text"
                      name="balance"
                      onClick={() => playClick()}
                      value={amount}
                      className="border bg-black w-80 p-3"
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className=" border-green-950 border-2 w-4/12 bg-green-600 p-2 rounded-md"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            
            {/* list */}
            <div className="text-white">
              <div className="flex justify-between p-4 xl:scale-70  font-[Futura] md:text-2xl md:px-15 lg:text-3xl xl:text-4xl lg:px-30 lg:pt-20">
                <div>
                  <h1>Total Cost</h1>
                  <h1 className="text-center">${cost}</h1>
                </div>
                <div
                  className={balance >= 0 ? "text-green-800" : "text-red-800"}
                >
                  <h1>Current Balance</h1>
                  <h1 className="text-center">${balance}</h1>
                </div>
              </div>
            </div>
            <div className="text-white flex flex-col xl:scale-80  gap-1 xl:gap-8 md:items-center px-6">
              {items.map((item, index) => (
                <div
                  className="border font-[Futura] md:w-9/12 md:text-2xl p-2"
                  key={index}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col md:gap-2">
                      <h1>{item.name}</h1>
                      <h1>${item.amount}</h1>
                    </div>

                    <div>
                      <h1
                        onClick={() => handleDelete(item, index)}
                        className=" bg-red-800 rounded-full flex justify-center items-center text-center w-10 h-10 xl:w-16 xl:h-16 xl:text-3xl "
                      >
                        X
                      </h1>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center font-[Futura] text-white py-8">
            <h1 onClick={()=> handleDone()}className=" border-green-950 border-2 w-3/12 md:w-2/12 text-center bg-yellow-700 p-2 text-xl lg:w-1/12 rounded-md">Done</h1>
            </div>
          </div>
          
        )}

        <div>
          
        </div>
      </div>
    </>
  );
}
export default Input;
