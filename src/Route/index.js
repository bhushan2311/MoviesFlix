import  React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import HeaderComponent from '../Components/Header';
import HomeContainer from '../Container/Home';
import DetailsContainer from '../Container/Details';

import AppProvider from '../context';
const  RouteComponent = ()=>{

    return (
        <>
        <AppProvider>
            <BrowserRouter>
                <HeaderComponent />
                    <Routes>
                        <Route path="/" element={<HomeContainer category="popular" heading="Popular"/>} />
                        <Route path="/top-rated" element={<HomeContainer category="top_rated" heading="Top Rated"/>} />
                        <Route path="/upcoming" element={<HomeContainer category="upcoming" heading="Upcoming"/>} />
                        <Route path="/details/:movieid" element={<DetailsContainer />} />
                    </Routes>
            </BrowserRouter>
        </AppProvider>
        </>
    )
}

export default RouteComponent;