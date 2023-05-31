import Helmet from 'react-helmet'
import Blogging from '../assets/blogging.svg'

function smoothScrollTo(e, id) {
    e.preventDefault();
    let element = document.getElementById(id)
    element && element.scrollIntoView({ behavior: "smooth", block: "start" });
}
export default function Welcome() {
    return (
        <>
            <Helmet>
                <title>Blog | Welcome</title>
            </Helmet>
            <div className="hero min-h-screen px-10 md:px-0 bg-base-200 bg-gradient-to-r from-red-100 to-white-100" id='home'>
                <div className="flex flex-col">
                    <div className="max-w-md text-center flex flex-col items-center">
                        <h1 className="text-5xl  font-bold text-dark">Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">here</span> to your new  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">space</span></h1>
                        <p className="py-6">Welcome to our blog. This blog has been developed to demonstap the usage of React Js ecosystem in a real life application. </p>
                        <a className="bg-black cursor-pointer font-bold text-sm px-4 py-2 w-48 block text-red-50 rounded-full" onClick={(e) => smoothScrollTo(e, 'about')}>Get Started</a>
                    </div>
                </div>
            </div>
            <div className='min-h-screen w-100 bg-black text-white flex flex-col md:flex-row items-center justify-evenly' id='about' >
                <div className='text-center md:text-left pt-10 md:pt-0'>
                    <h1 className='font-bolder text-4xl'>You gonna like the content!</h1>
                    <a className="bg-primary cursor-pointer mt-10 text-center font-bold text-sm px-4 py-2 w-48 block text-red-50 rounded-full mx-auto md:mx-0" onClick={(e) => smoothScrollTo(e, 'home')}>For who is this blog?</a>
                </div>
                <img className='max-w m-6 rounded-lg shadow-2xl' src={Blogging} />
            </div>
        </>
    )
}