function Citation({cit}){
    return (
        <>
        <div  className="Citation" data-author={cit.author}>
        <p className="citation-text">"{cit.text}"</p>
        </div>
        
        </>
    )
}

export default Citation;