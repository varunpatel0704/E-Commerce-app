import { useState } from "react";

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%&';

function GenerateCoupon() {
  const [includeNum, setIncludeNum] = useState(false);
  const [includeLetters, setIncludeLetters] = useState(false);
  const [includeSymbol, setIncludeSymbol] = useState(false);
  const [includedText, setIncludedText] = useState("");
  const [validTill, setValidTill] = useState('');
  const [couponLen, setCouponLen] = useState(8);
  const [coupon, setCoupon] = useState("");

  console.log(validTill);
  // const [isCopied, setIsCopied] = useState(false);

  function handleClear(e){
    e.preventDefault();
    setIncludeNum(false);
    setIncludeLetters(false);
    setIncludeSymbol(false);
    setIncludedText('');
    setValidTill('');
    setCouponLen(8);
    setCoupon('');
  }

  function handleSubmit(e){
    e.preventDefault(); 
    if(!validTill) return alert('Please set coupon valididty');

    let result = includedText.toUpperCase();
    for (let i = 0; i < couponLen-includedText.length; i++) {
      let characterPool = '';
      if(includeLetters) characterPool+=letters;
      if(includeNum) characterPool+=numbers;
      if(includeSymbol) characterPool+=symbols;

      const randomIndex = Math.floor(Math.random()*characterPool.length);
      result += characterPool[randomIndex];      
    }

    setCoupon(result);
  }


  return (
    <main className="p-5 pl-7 bg-white border shadow-md rounded w-full min-h-[98vh] flex flex-col">
      <h2 className="w-full text-xl font-bold text-black text-opacity-70 tracking-wide">
        GENERATE COUPON
      </h2>

      <section className="flex justify-center items-center mt-10">
        <form className="flex flex-col gap-8 w-[65%] border rounded p-10">
          {/* prefix and coupon len */}
          <div className="flex justify-between">
            <fieldset className="border p-2 pt-1 w-[62%] rounded shadow-sm">
              <legend className="mx-1 px-1 text-sm text-black opacity-60">
                Text to Include
              </legend>
              <input
                autoComplete="off"
                minLength={0}
                maxLength={couponLen}
                type="text"
                className="outline-none py-1 px-4 w-full"
                value={includedText}
                onChange={(e) => setIncludedText(e.target.value)}
              />
            </fieldset>

            <fieldset className="border p-2 pt-1 w-[32%] rounded shadow-sm">
              <legend className="mx-1 px-1 text-sm text-black opacity-60">
                Coupon Length
              </legend>
              <input
                type="number"
                min={8}
                max={24}
                className="outline-none py-1 px-4 w-full"
                value={couponLen}
                onChange={(e) => setCouponLen(Number(e.target.value))}
              />
            </fieldset>
          </div>

          {/* coupon character options */}
          <fieldset className="border p-3 flex justify-center items-center gap-10 w-full rounded shadow-sm">
            <legend className="mx-1 px-1 text-sm text-black opacity-60">
              Include
            </legend>

            <div className="flex gap-1 py-1.5">
              <input
                type="checkbox"
                id="numbers"
                className="cursor-pointer"
                checked={includeNum}
                onChange={(e) => setIncludeNum(e.target.checked)}
              />
              <label
                htmlFor="numbers"
                className=" text-sm text-black opacity-70"
              >
                Numbers
              </label>
            </div>

            <div className="flex gap-1 py-1.5">
              <input
                type="checkbox"
                id="characters"
                className="cursor-pointer"
                checked={includeLetters}
                onChange={(e) => setIncludeLetters(e.target.checked)}
              />
              <label
                htmlFor="characters"
                className="text-sm text-black opacity-70"
              >
                Characters
              </label>
            </div>

            <div className="flex gap-1 py-1.5">
              <input
                type="checkbox"
                id="symbols"
                className="cursor-pointer"
                checked={includeSymbol}
                onChange={(e) => setIncludeSymbol(e.target.checked)}
              />
              <label
                htmlFor="symbols"
                className="text-sm text-black opacity-70"
              >
                Symbols
              </label>
            </div>
          </fieldset>

          {/* coupon validity */}
          <fieldset className="border w-full rounded shadow-sm p-3 pt-2 flex justify-center items-center">
            <legend className="mx-1 px-1 text-sm text-black opacity-60">
              Valid Till
            </legend>                         
            <input
              type="date"
              id="date"
              className="cursor-pointer text-black opacity-70 px-2 py-1 outline-none"
              value={validTill}
              onChange={(e) => setValidTill(e.target.value)}
            />            
          </fieldset>

          {coupon && (
            <p className="text-center text-black text-opacity-70 w-full">
              <span className="font-bold text-lg">" {coupon} "</span>
              <span><button className=" border rounded py-0.5 px-2 text-xs ml-6 bg-gray-100" type="reset" onClick={handleClear}>Clear</button></span>
            </p>
          )}

          <button className="mt-4 generate-coupon-btn" type="submit" onClick={handleSubmit}>Generate Coupon</button>
        </form>
      </section>
    </main>
  );
}

export default GenerateCoupon;
