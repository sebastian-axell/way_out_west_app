import React from 'react';
import Header from './header';
import SideColumn from './sideColumn';

function Layout({
    children
}) {
    return (
        <>
            <Header />
            <div className='flex min-h-screen justify-center lg:justify-between'>
                <SideColumn svg={"./dates.svg"} type={"dates"} repeatTimes={20} />
                <main>{children}</main>
                <SideColumn svg={"./gothenburg.svg"} repeatTimes={20} />
            </div>
        </>
    );
};

export default Layout;
