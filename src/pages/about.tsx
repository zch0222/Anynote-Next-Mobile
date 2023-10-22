import { useEffect } from "react";

function About() {
    useEffect(() => {
        console.log("hello")
    }, [])

    return (
        <div>About</div>
    )
}

export default About
