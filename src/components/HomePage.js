import './HomePage.css'

function HomePage() {
    return (
        <div className="container p-5">
            <div className="row col-12 mt-3 align-items-center justify-content-center">
                <div className="col-4 mt-5">
                    <h1><b>The best way to donate with crypto</b></h1>
                    <h5>Use your crypto assets to help people for free.</h5>
                    <button className="btn-dark custom-btn-homepage mt-3">Donate</button>
                </div>
                <div className="col-7">
                    <img className="col-12" src={"pluto.jpg"} alt="pluto image"/>
                </div>
            </div>
            <div className="row mt-5" />
            <div className="row col-12 mt-5">
                <div className="col-2" />
                <div className="row col-8 mt-5 p-5 custom-card-homepage">
                    <div className="col-5 mt-5">
                        <h2><b>Donate the APY of your crypto</b></h2>
                        <h6>Deposit your assets and we'll redirect the APY to Companies or Individuals.</h6>
                        <button className="btn-dark custom-btn-homepage mt-3">Donate</button>
                    </div>
                    <div className="col-7">
                        <img className="col-12" src={"btc.jpg"} alt="btc image"/>
                    </div>
                </div>
                <div className="col-2" />
            </div>
            <div className="row mt-5" />
            <div className="row col-12 mt-5">
                <div className="col-2" />
                <div className="row col-8 mt-5 p-5">
                    <div className="col-7">
                        <img className="col-12" src={"timber.jpg"} alt="timber image"/>
                    </div>
                    <div className="col-5 mt-5">
                        <small>Example</small>
                        <h2><b>Plant a tree</b></h2>
                        <h6>Deposit your assets here and we'll use the APY to plant trees using Treedom to make our own Pluton Forest.</h6>
                        <button className="btn-dark custom-btn-homepage mt-3">Donate</button>
                    </div>
                </div>
                <div className="col-2" />
            </div>
            <div className="row mt-5" />
            <div className="row col-12 mt-5">
                <div className="col-2" />
                <div className="row col-8 mt-5 p-5">
                    <div className="col-5 mt-5">
                        <small>Example</small>
                        <h2><b>Help the developers</b></h2>
                        <h6>Help the developers pay their bills.</h6>
                        <button className="btn-dark custom-btn-homepage mt-3">Donate</button>
                    </div>
                    <div className="col-7">
                        <img className="col-6 h-100" src={"0x7183.png"} alt="0x7183 image"/>
                        <img className="col-6 h-100" src={"toran777.png"} alt="toran777 image"/>
                    </div>
                </div>
                <div className="col-2" />
            </div>
            <div className="row mt-5" />
            <div className="row mt-5" />
            <div className="row col-12 mt-5 p-5 custom-card-homepage">
                <div className="col-7">
                    <img className="col-12" src={"pig.jpg"} alt="timber image"/>
                </div>
                <div className="row col-5 p-3">
                    <h4><b>Step 1</b></h4>
                    <h6>Deposit your assets.</h6>
                    <hr className="mt-3" />
                    <h4><b>Step 2</b></h4>
                    <h6>Choose the platform between Anchor Protocol and Mars Protocol.</h6>
                    <hr className="mt-3" />
                    <h4><b>Step 3</b></h4>
                    <h6>Withdraw your assets when you need them back.</h6>
                </div>
            </div>
        </div>
    );
}

export default HomePage;