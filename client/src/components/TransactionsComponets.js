import React from 'react';

function TransactionsComponets({amoun, notion, date, type, category}) {
    return (
        <div className="transaction">
            <div className="text">
                <h2>Transpaorte</h2>
                <div><p className="notion">Lorem ipsum dolor sit</p> <p><strong> 17-01-2022</strong></p></div>
            </div>
            <h3>${amoun}</h3>
        </div>
    )
}

export default TransactionsComponets;
