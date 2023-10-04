import { useState, useEffect } from "react"

export default function Advices() {

    const [advice, setAdvice] = useState("")
    const [adviceFlag, setAdviceFlag] = useState(false)

    useEffect(() => {
        getAdvice()
        console.log(advice)
    }, [])

    function postTweet() {
        const message = `https://twitter.com/intent/tweet?text=${advice}`
        window.open(message, "_blank")
    }

    async function getAdvice() {
        try {
            setAdviceFlag(true)
            const res = await fetch("https://api.adviceslip.com/advice")
            const data = await res.json()
            const adviceText = await data.slip.advice
            setAdvice(adviceText)
            setAdviceFlag(false)
            console.log(adviceText)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <main
            className="absolute h-full w-full bg-[#d28c19] flex items-center justify-center"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='42' height='44' viewBox='0 0 42 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='Page-1' fill='none' fill-rule='evenodd'%3E%3Cg id='brick-wall' fill='%23ffffff' fill-opacity='0.85'%3E%3Cpath d='M0 0h42v44H0V0zm1 1h40v20H1V1zM0 23h20v20H0V23zm22 0h20v20H22V23z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
        >
            <div className="absolute bg-white rounded-lg w-min-content h-min-content shadow-[0_0px_30px_5px_rgba(0,0,0,.5)] ">
                <div className="h-2/3 p-4 flex items-center justify-center text-center text-xl p-2">
                    {advice}
                </div>
                <div className="h-1/3 p-4 flex items-center justify-around">
                    <button onClick={postTweet} className="bg-blue-400 w-20 rounded-lg p-2 text-white hover:brightness-105 shadow-[0_0px_10px_1px_rgba(0,0,0,.3)] mx-2">Twitter</button>
                    <button onClick={getAdvice} className=" bg-yellow-400 w-20 rounded-lg p-2 text-black  hover:brightness-105 shadow-[0_0px_10px_1px_rgba(0,0,0,.3)]" disabled={adviceFlag} > Next</button>
                </div>
            </div>
        </main >
    )
}
