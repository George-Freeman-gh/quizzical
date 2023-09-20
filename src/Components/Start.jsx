
const Start = (props) => {

    return (
        <div className="start-container">



            <h1 className="start-title">Quizzical</h1>
            <h3 className="start-description">Are you ready to Quiz?</h3>
            <button onClick={props.toggleStart} className="button">Start Quiz</button>
            <img  className="start-blue-blob" src="/Images/blue-blob.svg"  />
            <img className="start-yellow-blob" src="/Images/yellow-blob.svg"  />

        </div>
    )
}


export default Start 