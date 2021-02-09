const ManageInterests = ({editInterest, deleteInterest, addNew, user}) => {    
    return(
        <div>
        {user.UserInterest.map(int => 
        <div className="pa3 pa5-ns" key={int.id}>
            <h4 className="f6 fw6">UserInterest</h4>
            <dl className="f6 lh-title mv2">
                <dt className="dib b">Keywords:</dt>
                <dd className="dib ml0 gray">{int.keywords}</dd>
            </dl>
            <dl className="f6 lh-title mv2">
                <dt className="dib b">Cat:</dt>
                <dd className="dib ml0 gray">{int.category}</dd>
            </dl>
            <dl className="f6 lh-title mv2">
                <dt className="dib b">Reg:</dt>
                <dd className="dib ml0 gray">{int.region}</dd>
            </dl>
            <dl className="f6 lh-title mv2">
                <dt className="dib b">Ads:</dt>
                <dd className="dib ml0 gray">{int.foundAd}</dd>
            </dl>
            <a className="f6 link dim br1 ph3 pv2 mb2 dib white bg-black" href="#0">Add</a>
            <a className="f6 link dim br1 ph3 pv2 mb2 dib white bg-black" href="#0">Edit</a>
            <a className="f6 link dim br1 ph3 pv2 mb2 dib white bg-black" href="#0">Delete</a>
        </div>
        )}
        </div>
    );
}

export default ManageInterests;