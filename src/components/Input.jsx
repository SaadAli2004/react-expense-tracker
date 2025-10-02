import { useEffect, useState } from "react";


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
  const [amount, setAmount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [cost, setCost] = useState(0);
  const [balanceCheck, setBalanceCheck] = useState(false);
  

  const handleDelete = (id) => {
    playClose();
    setItems(items.filter((_, index) => id !== index));
  };

  useEffect(() => {

    console.log("Updated items:", items);
  }, [items]);
  const submitHandler = (e) => {
    e.preventDefault();
    playSubmit();

    const data = {
      name: input,
      amount: amount,
    };
    

    setItems((prev) => [...prev, data]);

    setCost((prev) => prev + Number(amount));
        setBalance((prev) => Number(prev - cost));


    setInput("");
    setAmount("");
  };
  const balanceHandler = (e) => {
    e.preventDefault();
    setBalanceCheck(true);
    playSubmit();

  };
  return (
    <>
      <div className="h-screen overflow-x-hidden">
        <h1 className="text-5xl text-red-600 text-outline text-center font-[Pricedown] p-10 md:text-7xl lg:text-8xl">
          Expense Tracker App
        </h1>

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
                  onClick={()=> playClick()}

                  name="balance"
                  className="border bg-black w-80 p-3"
                  onChange={(e) =>Number(setBalance(e.target.value))}
                />
                <div className="flex justify-center">
                  <button
                  onClick={()=> playSubmit()}
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
              <div className="flex justify-center py-6 scale-80 md:scale-105 w-full relative  bottom-8  border lg:scale-120 lg:bottom-0 lg:py-10 ">
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
                    onClick={()=> playClick()}
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
                      type="number"
                      name="balance"
                      onClick={()=> playClick()}
                       value = {amount}
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
                        onClick={() => handleDelete(index)}
                        className=" bg-red-800 rounded-full flex justify-center items-center text-center w-10 h-10 xl:w-16 xl:h-16 xl:text-3xl "
                      >
                        X
                      </h1>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default Input;
