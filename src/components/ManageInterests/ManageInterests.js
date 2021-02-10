const ManageInterests = ({editInterest, deleteInterest, addInterest, user}) => {    
    return(
        <div>

    <button className="f6 link dim br1 ph3 pv2 mb2 dib white bg-black" onClick={addInterest}>Add</button>
        
        {user.userInterests.map(int => {

            if(int.active){

                return <div className="pa3 pa5-ns" key={int.id}>
                    <h4 className="f6 fw6">UserInterest</h4>
                    <dl className="f6 lh-title mv2">
                        <dt className="dib b">Main keyword:</dt>
                        <dd className="dib ml0 gray">{int.keywords.mainKeyword}</dd>
                    </dl>
                    <dl className="f6 lh-title mv2">
                        <dt className="dib b">Other keywords:</dt>
                        {int.keywords.otherKeywords.map(othKyw => {
                            <dd className="dib ml0 gray">{othKyw},</dd>
                        })}
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
                        {int.foundAdverts.map(advert =>  <dd key={advert.id} className="dib ml0 gray">{advert},</dd>)}
                        {/* <dd className="dib ml0 gray">{int.foundAdverts}</dd> */}
                    </dl>
                    <button className="f6 link dim br1 ph3 pv2 mb2 dib white bg-black" onClick={editInterest()} >Edit</button>
                    <button className="f6 link dim br1 ph3 pv2 mb2 dib white bg-black" onClick={() => {
                        deleteInterest(int)
                    }}>Delete</button>
                </div>
            }
        }
        )}
        </div>
    );
}

export default ManageInterests;