import LoadingBar from 'react-top-loading-bar';
import { Suspense, useState } from "react";
import * as R from "react-router-dom";
import * as L from "@/layout/index";
import * as P from "@/pages/index"
import * as C from "@/components/index";
import * as Con from "@/constants/Roles";
import * as Lazy from "./index";



const Loading = () => <main className='w-full min-h-screen flex items-center justify-center bg-gray-100'><C.Spinner size="9" /></main>


interface Props {
    isToken: boolean;
    setIsToken: Function;
}


const Routing = ({ isToken, setIsToken }: Props) => {

    const [progress, setProgress] = useState<number>(0);

    const router = R.createBrowserRouter(
        R.createRoutesFromElements(
            //RootLayout start
            <R.Route path='/' element={<L.RootLayout isToken={isToken} setIsToken={setIsToken} />}>
                <R.Route index element={<P.Home setProgress={setProgress} />} />
                <R.Route path="/search" element={<P.Search setProgress={setProgress}/>} />

                {/* Logout start*/}
                <R.Route path='/' element={<L.LogOut />}>
                    <R.Route path='/login' element={<P.Login setProgress={setProgress} />} />
                    <R.Route path='/sign-up' element={<P.SignUp setProgress={setProgress} />} />
                </R.Route>
                {/* Logout  end*/}


                {/* PrivateRoutes start */}
                <R.Route path='/' element={<L.Authenticate />}>
                    {Lazy.Authenticate.length > 0 && Lazy.Authenticate.map((v, i) => <R.Route
                        key={i} path={v.path} element={
                            <Suspense fallback={<Loading />}>
                                <v.element setProgress={setProgress} />
                            </Suspense>
                        } />)}



                    {/* Admin start*/}
                    <R.Route path='/super-admin/dashboard/' element={<L.Admin role={Con.onlyAdmin} />}>
                        {Lazy.Admin.length > 0 && Lazy.Admin.map((v, i) => <R.Route
                            key={i} path={v.path} element={
                                <Suspense fallback={<Loading />}>
                                    <v.element setProgress={setProgress} />
                                </Suspense>
                            } />)}
                    </R.Route>
                    {/* Admin  end*/}





                    {/* Authorized start*/}
                    <R.Route path='/admin/dashboard/' element={<L.Authorized roles={Con.adminArray} />}>
                        {Lazy.Authorized.length > 0 && Lazy.Authorized.map((v, i) => <R.Route
                            key={i} path={v.path} element={
                                <Suspense fallback={<Loading />}>
                                    <v.element setProgress={setProgress} />
                                </Suspense>
                            } />)}
                    </R.Route>
                    {/* Authorized  end*/}



                </R.Route>
                {/* PrivateRoutes  end*/}
                <R.Route path="*" element={
                    <Suspense fallback={<Loading />}>
                        <P.NotFound setProgress={setProgress} />
                    </Suspense>
                } />

            </R.Route>
            //  RootLayout end
        )
    );


    return (
        <>
            <LoadingBar
                color="var(--APrimary)"
                shadowStyle={{ color: 'red' }}
                progress={progress}
                onLoaderFinished={() => setProgress(0)} />
            <R.RouterProvider
                router={router} />
        </>
    )
}

export default Routing