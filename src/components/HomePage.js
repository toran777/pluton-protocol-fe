import './HomePage.css'

function HomePage() {
    return (
        <div className="container p-5">
            <div className="row col-12 mt-3 align-items-center justify-content-center">
                <div className="col-4 mt-5">
                    <h1><b>The best way to pay/donate with crypto</b></h1>
                    <h5>Use your crypto assets to pay/help people for free.</h5>
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
                        <h2><b>Fund using the APY of your crypto</b></h2>
                        <h6>Deposit your UST and redirect Anchor APY to anyone.</h6>
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
                        <h6>Deposit your assets here and we'll use Anchor APY to plant trees and make our own Pluton Forest on Treedom.</h6>
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
                        <h6>We don't collect any fees from Pluton, if you like our work help us!</h6>
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
                    <img className="col-12" src={"pig.png"} alt="timber image"/>
                </div>
                <div className="row col-5 p-3">
                    <h4><b>Step 1</b></h4>
                    <h6>Deposit your assets.</h6>
                    <hr className="mt-3" />
                    <h4><b>Step 2</b></h4>
                    <h6>Insert the beneficiary address and an optional lock value.</h6>
                    <hr className="mt-3" />
                    <h4><b>Step 3</b></h4>
                    <h6>Withdraw your assets when you need them back, or wait until the lock value is reached.</h6>
                </div>
            </div>
        </div>
    );
}

export default HomePage;