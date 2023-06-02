import Helmet from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/userSlice";
import { useNavigate } from "react-router";

export default function Account() {
    const userInfo = useSelector((state) => state.user.userInfo);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function logUserOut() {
        dispatch(logout());
        navigate("/");
    }
    return (
        <>
            <Helmet title={`User | Profile ${userInfo.name}`} />
            <div className="transform-gpu transition-all selection:bg-sky-100 h-full grid place-items-center bg-gradient-to-tl to-[#FFD3A5] from-[#FD6585] dark:selection:bg-white/10">
                <div className="bg-white px-12 pt-36 mt-10 mb-16 pb-16 shadow-2xl shadow-black/[0.2] rounded-3xl text-center flex flex-col justify-center max-w-md transition-colors dark:bg-neutral-800">
                    <div className="select-none">
                        <div className="avatar placeholder">
                            <div className="bg-neutral-focus text-neutral-content rounded-full w-60 shadow-2xl shadow-black/[0.2] h-60 mx-auto -mt-40 transform-gpu transition-all hover:scale-125">
                                <span className="text-6xl">{Array.from(userInfo.name)[0]}</span>
                            </div>
                        </div>
                    </div>

                    <h1 className="mt-12 text-3xl font-bold text-slate-800 dark:text-white">
                        {userInfo.name}
                    </h1>

                    <p className="mt-4 text-slate-600 dark:text-white/90">
                        {userInfo.username}
                    </p>

                    <div className="mt-6 flex justify-center">
                        <a onClick={() => logUserOut()} className="bg-sky-500 font-bold text-white px-4 py-2 rounded-lg flex items-center space-x-2 transform-gpu transition-all duration-200 hover:bg-sky-400 active:scale-90 cursor-pointer">
                            <span>Logout</span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
