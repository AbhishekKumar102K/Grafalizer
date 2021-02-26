import React from 'react'
import "./Header.css"
const Header = ({modeHandler}) => {
    return (
        <div className="container">
            <div>
                <button onClick={()=>modeHandler(0)} className="ui small circular icon button green">Node</button>
                <button onClick={()=>modeHandler(1)} className="ui small circular icon button blue">Dir</button>
                <button onClick={()=>modeHandler(2)} className="ui small circular icon button red">Undir</button>
            </div>
            {/* <button class="ui animated button">
                <div class="visible content">
                    Next
                </div>
                <div class="hidden content">
                    <i aria-hidden="true" class="arrow right icon"></i>
                </div>
            </button>

            <button class="ui vertical animated button">
                <div class="hidden content">Shop</div>
                <div class="visible content"><i aria-hidden="true" class="shop icon"></i></div>

            </button><button class="ui fade animated button">
                <div class="visible content">Sign-up for a Pro account</div>
                <div class="hidden content">$12.99 a month</div>
            </button> */}
        </div>
    )
}

export default Header
