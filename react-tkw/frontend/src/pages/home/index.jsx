import React from 'react'
import Hero from '../../components/hero'
import FileMenu from '../../components/file/file-menu'
import FileList from '../../components/file/file-list'

function Home() {
    return (
        <>
            <Hero />
            <div className="my-36 flex flex-col w-full gap-16">
                <FileMenu />
                <FileList />
            </div>
        </>
    )
}

export default Home